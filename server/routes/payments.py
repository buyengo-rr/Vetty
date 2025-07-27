from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db, Payment, User, Invoice
import uuid

payments_bp = Blueprint('payments', __name__)

# Create payment
@payments_bp.route('/payments', methods=['POST'])
@jwt_required()
def create_payment():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    amount = data.get('amount')
    currency = data.get('currency', 'USD')
    payment_method = data.get('payment_method')
    invoice_id = data.get('invoice_id')
    description = data.get('description')
    
    if not amount or not payment_method:
        return jsonify({"error": "Amount and payment method are required"}), 400
    
    # Validate invoice if provided
    if invoice_id:
        invoice = Invoice.query.get(invoice_id)
        if not invoice:
            return jsonify({"error": "Invoice not found"}), 404
    
    payment = Payment(
        id=str(uuid.uuid4()),
        user_id=current_user['id'],
        amount=amount,
        currency=currency,
        payment_method=payment_method,
        invoice_id=invoice_id,
        description=description,
        status='pending',
        created_at=datetime.utcnow()
    )
    
    db.session.add(payment)
    db.session.commit()
    
    return jsonify({
        "message": "Payment created successfully",
        "payment": {
            "id": payment.id,
            "amount": payment.amount,
            "currency": payment.currency,
            "status": payment.status,
            "payment_method": payment.payment_method,
            "created_at": payment.created_at.isoformat()
        }
    }), 201

# Get all payments for user
@payments_bp.route('/payments', methods=['GET'])
@jwt_required()
def get_payments():
    current_user = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    payments = Payment.query.filter_by(user_id=current_user['id']).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        "payments": [{
            "id": payment.id,
            "amount": payment.amount,
            "currency": payment.currency,
            "status": payment.status,
            "payment_method": payment.payment_method,
            "description": payment.description,
            "created_at": payment.created_at.isoformat(),
            "updated_at": payment.updated_at.isoformat() if payment.updated_at else None
        } for payment in payments.items],
        "total": payments.total,
        "pages": payments.pages,
        "current_page": page
    }), 200

# Get specific payment
@payments_bp.route('/payments/<payment_id>', methods=['GET'])
@jwt_required()
def get_payment(payment_id):
    current_user = get_jwt_identity()
    payment = Payment.query.filter_by(id=payment_id, user_id=current_user['id']).first()
    
    if not payment:
        return jsonify({"error": "Payment not found"}), 404
    
    return jsonify({
        "payment": {
            "id": payment.id,
            "amount": payment.amount,
            "currency": payment.currency,
            "status": payment.status,
            "payment_method": payment.payment_method,
            "description": payment.description,
            "invoice_id": payment.invoice_id,
            "created_at": payment.created_at.isoformat(),
            "updated_at": payment.updated_at.isoformat() if payment.updated_at else None
        }
    }), 200

# Update payment status
@payments_bp.route('/payments/<payment_id>/status', methods=['PUT'])
@jwt_required()
def update_payment_status(payment_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    new_status = data.get('status')
    
    if new_status not in ['pending', 'completed', 'failed', 'cancelled']:
        return jsonify({"error": "Invalid status"}), 400
    
    payment = Payment.query.filter_by(id=payment_id, user_id=current_user['id']).first()
    if not payment:
        return jsonify({"error": "Payment not found"}), 404
    
    payment.status = new_status
    payment.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Payment status updated successfully",
        "payment": {
            "id": payment.id,
            "status": payment.status,
            "updated_at": payment.updated_at.isoformat()
        }
    }), 200

# Process refund
@payments_bp.route('/payments/<payment_id>/refund', methods=['POST'])
@jwt_required()
def refund_payment(payment_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    refund_amount = data.get('amount')
    reason = data.get('reason')
    
    payment = Payment.query.filter_by(id=payment_id, user_id=current_user['id']).first()
    if not payment:
        return jsonify({"error": "Payment not found"}), 404
    
    if payment.status != 'completed':
        return jsonify({"error": "Can only refund completed payments"}), 400
    
    if refund_amount and refund_amount > payment.amount:
        return jsonify({"error": "Refund amount cannot exceed payment amount"}), 400
    
    # Create refund record
    refund = Payment(
        id=str(uuid.uuid4()),
        user_id=current_user['id'],
        amount=-(refund_amount or payment.amount),
        currency=payment.currency,
        payment_method=payment.payment_method,
        description=f"Refund for payment {payment_id}: {reason or 'No reason provided'}",
        status='completed',
        created_at=datetime.utcnow()
    )
    
    db.session.add(refund)
    db.session.commit()
    
    return jsonify({
        "message": "Refund processed successfully",
        "refund": {
            "id": refund.id,
            "amount": refund.amount,
            "currency": refund.currency,
            "created_at": refund.created_at.isoformat()
        }
    }), 201