from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
from models import db, Invoice, InvoiceItem
import uuid

invoices_bp = Blueprint('invoices', __name__)

@invoices_bp.route('/invoices', methods=['POST'])
@jwt_required()
def create_invoice():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    items = data.get('items', [])
    if not items:
        return jsonify({"error": "At least one item is required"}), 400
    
    # Calculate total and create invoice
    total_amount = sum(item.get('quantity', 1) * item.get('unit_price', 0) for item in items)
    
    invoice = Invoice(
        id=str(uuid.uuid4()),
        invoice_number=f"INV-{datetime.utcnow().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}",
        user_id=current_user['id'],
        total_amount=total_amount,
        status='draft',
        due_date=datetime.utcnow() + timedelta(days=30),
        created_at=datetime.utcnow()
    )
    
    db.session.add(invoice)
    db.session.flush()
    
    # Add invoice items
    for item_data in items:
        db.session.add(InvoiceItem(
            id=str(uuid.uuid4()),
            invoice_id=invoice.id,
            product_id=item_data.get('product_id'),
            description=item_data.get('description'),
            quantity=item_data.get('quantity', 1),
            unit_price=item_data.get('unit_price', 0),
            total_price=item_data.get('quantity', 1) * item_data.get('unit_price', 0)
        ))
    
    db.session.commit()
    
    return jsonify({
        "message": "Invoice created successfully",
        "invoice": invoice.to_dict()
    }), 201