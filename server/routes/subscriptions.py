from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
from models import db, Subscription, Product
import uuid

subscriptions_bp = Blueprint('subscriptions', __name__)

@subscriptions_bp.route('/subscriptions', methods=['POST'])
@jwt_required()
def create_subscription():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    product_id = data.get('product_id')
    billing_cycle = data.get('billing_cycle', 'monthly')
    trial_days = data.get('trial_days', 0)
    
    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400
    
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    # Calculate dates
    start_date = datetime.utcnow()
    if trial_days > 0:
        trial_end_date = start_date + timedelta(days=trial_days)
        next_billing_date = trial_end_date
        status = 'trial'
    else:
        trial_end_date = None
        next_billing_date = start_date + timedelta(days=30 if billing_cycle == 'monthly' else 365)
        status = 'active'
    
    subscription = Subscription(
        id=str(uuid.uuid4()),
        user_id=current_user['id'],
        product_id=product_id,
        status=status,
        billing_cycle=billing_cycle,
        start_date=start_date,
        trial_end_date=trial_end_date,
        next_billing_date=next_billing_date,
        created_at=datetime.utcnow()
    )
    
    db.session.add(subscription)
    db.session.commit()
    
    return jsonify({
        "message": "Subscription created successfully",
        "subscription": subscription.to_dict()
    }), 201