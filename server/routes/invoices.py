from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
from models import db, Invoice, InvoiceItem, User, Product
import uuid

invoices_bp = Blueprint('invoices', __name__)

# Create invoice
@invoices_bp.route('/invoices', methods=['POST'])
@jwt_required()
def create_invoice():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    customer_id = data.get('customer_id', current_user['id'])
    due_date = data.get('due_date')
    items = data.get('items', [])
    notes = data.get('notes')
    
    if not items:
        return jsonify({"error": "At least one item is required"}), 400
    
    # Parse due date
    if due_date:
        try:
            due_date = datetime.fromisoformat(due_date.replace('Z', '+00:00'))
        except ValueError:
            return jsonify({"error": "Invalid due date format"}), 400
    else:
        due_date = datetime.utcnow() + timedelta(days=30)  # Default 30 days
    
    # Calculate total
    total_amount = 0
    for item in items:
        quantity = item.get('quantity', 1)
        unit_price = item.get('unit_price', 0)
        total_amount += quantity * unit_price
    
    invoice = Invoice(
        id=str(uuid.uuid4()),
        invoice_number=f"INV-{datetime.utcnow().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}",
        user_id=customer_id,
        total_amount=total_amount,
        status='draft',
        due_date=due_date,
        notes=notes,
        created_at=datetime.utcnow()
    )
    
    db.session.add(invoice)
    db.session.flush()  # Get invoice ID
    
    # Add invoice items
    for item_data in items:
        item = InvoiceItem(
            id=str(uuid.uuid4()),
            invoice_id=invoice.id,
            product_id=item_data.get('product_id'),
            description=item_data.get('description'),
            quantity=item_data.get('quantity', 1),
            unit_price=item_data.get('unit_price', 0),
            total_price=item_data.get('quantity', 1) * item_data.get('unit_price', 0)
        )
        db.session.add(item)
    
    db.session.commit()
    
    return jsonify({
        "message": "Invoice created successfully",
        "invoice": {
            "id": invoice.id,
            "invoice_number": invoice.invoice_number,
            "total_amount": invoice.total_amount,
            "status": invoice.status,
            "due_date": invoice.due_date.isoformat(),
            "created_at": invoice.created_at.isoformat()
        }
    }), 201

# Get invoices
@invoices_bp.route('/invoices', methods=['GET'])
@jwt_required()
def get_invoices():
    current_user = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    status_filter = request.args.get('status')
    
    query = Invoice.query.filter_by(user_id=current_user['id'])
    if status_filter:
        query = query.filter_by(status=status_filter)
    
    invoices = query.order_by(Invoice.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        "invoices": [{
            "id": invoice.id,
            "invoice_number": invoice.invoice_number,
            "total_amount": invoice.total_amount,
            "status": invoice.status,
            "due_date": invoice.due_date.isoformat(),
            "paid_date": invoice.paid_date.isoformat() if invoice.paid_date else None,
            "created_at": invoice.created_at.isoformat(),
            "updated_at": invoice.updated_at.isoformat() if invoice.updated_at else None
        } for invoice in invoices.items],
        "total": invoices.total,
        "pages": invoices.pages,
        "current_page": page
    }), 200

# Get specific invoice
@invoices_bp.route('/invoices/<invoice_id>', methods=['GET'])
@jwt_required()
def get_invoice(invoice_id):
    current_user = get_jwt_identity()
    invoice = Invoice.query.filter_by(id=invoice_id, user_id=current_user['id']).first()
    
    if not invoice:
        return jsonify({"error": "Invoice not found"}), 404
    
    # Get invoice items
    items = InvoiceItem.query.filter_by(invoice_id=invoice_id).all()
    
    return jsonify({
        "invoice": {
            "id": invoice.id,
            "invoice_number": invoice.invoice_number,
            "total_amount": invoice.total_amount,
            "status": invoice.status,
            "due_date": invoice.due_date.isoformat(),
            "paid_date": invoice.paid_date.isoformat() if invoice.paid_date else None,
            "notes": invoice.notes,
            "created_at": invoice.created_at.isoformat(),
            "updated_at": invoice.updated_at.isoformat() if invoice.updated_at else None,
            "items": [{
                "id": item.id,
                "product_id": item.product_id,
                "description": item.description,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "total_price": item.total_price
            } for item in items]
        }
    }), 200

# Update invoice
@invoices_bp.route('/invoices/<invoice_id>', methods=['PUT'])
@jwt_required()
def update_invoice(invoice_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    
    invoice = Invoice.query.filter_by(id=invoice_id, user_id=current_user['id']).first()
    if not invoice:
        return jsonify({"error": "Invoice not found"}), 404
    
    if invoice.status == 'paid':
        return jsonify({"error": "Cannot update paid invoice"}), 400
    
    # Update allowed fields
    if 'due_date' in data:
        try:
            invoice.due_date = datetime.fromisoformat(data['due_date'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({"error": "Invalid due date format"}), 400
    
    if 'notes' in data:
        invoice.notes = data['notes']
    
    if 'items' in data:
        # Remove existing items
        InvoiceItem.query.filter_by(invoice_id=invoice_id).delete()
        
        # Add new items
        total_amount = 0
        for item_data in data['items']:
            quantity = item_data.get('quantity', 1)
            unit_price = item_data.get('unit_price', 0)
            total_amount += quantity * unit_price
            
            item = InvoiceItem(
                id=str(uuid.uuid4()),
                invoice_id=invoice_id,
                product_id=item_data.get('product_id'),
                description=item_data.get('description'),
                quantity=quantity,
                unit_price=unit_price,
                total_price=quantity * unit_price
            )
            db.session.add(item)
        
        invoice.total_amount = total_amount
    
    invoice.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Invoice updated successfully",
        "invoice": {
            "id": invoice.id,
            "total_amount": invoice.total_amount,
            "updated_at": invoice.updated_at.isoformat()
        }
    }), 200

# Send invoice
@invoices_bp.route('/invoices/<invoice_id>/send', methods=['POST'])
@jwt_required()
def send_invoice(invoice_id):
    current_user = get_jwt_identity()
    invoice = Invoice.query.filter_by(id=invoice_id, user_id=current_user['id']).first()
    
    if not invoice:
        return jsonify({"error": "Invoice not found"}), 404
    
    if invoice.status == 'paid':
        return jsonify({"error": "Cannot send paid invoice"}), 400
    
    invoice.status = 'sent'
    invoice.sent_date = datetime.utcnow()
    invoice.updated_at = datetime.utcnow()
    db.session.commit()
    
    # Here you would typically integrate with an email service
    # to actually send the invoice
    
    return jsonify({
        "message": "Invoice sent successfully",
        "invoice": {
            "id": invoice.id,
            "status": invoice.status,
            "sent_date": invoice.sent_date.isoformat()
        }
    }), 200

# Mark invoice as paid
@invoices_bp.route('/invoices/<invoice_id>/pay', methods=['POST'])
@jwt_required()
def mark_invoice_paid(invoice_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    payment_method = data.get('payment_method')
    
    invoice = Invoice.query.filter_by(id=invoice_id, user_id=current_user['id']).first()
    if not invoice:
        return jsonify({"error": "Invoice not found"}), 404
    
    if invoice.status == 'paid':
        return jsonify({"error": "Invoice is already paid"}), 400
    
    invoice.status = 'paid'
    invoice.paid_date = datetime.utcnow()
    invoice.payment_method = payment_method
    invoice.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Invoice marked as paid",
        "invoice": {
            "id": invoice.id,
            "status": invoice.status,
            "paid_date": invoice.paid_date.isoformat()
        }
    }), 200

# Cancel invoice
@invoices_bp.route('/invoices/<invoice_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_invoice(invoice_id):
    current_user = get_jwt_identity()
    
    invoice = Invoice.query.filter_by(id=invoice_id, user_id=current_user['id']).first()
    if not invoice:
        return jsonify({"error": "Invoice not found"}), 404
    
    if invoice.status == 'paid':
        return jsonify({"error": "Cannot cancel paid invoice"}), 400
    
    invoice.status = 'cancelled'
    invoice.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Invoice cancelled successfully",
        "invoice": {
            "id": invoice.id,
            "status": invoice.status,
            "updated_at": invoice.updated_at.isoformat()
        }
    }), 200