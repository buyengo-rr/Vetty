from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
from models import db, Subscription, User, Product
import uuid

subscriptions_bp = Blueprint('subscriptions', __name__)

# Create subscription
@subscriptions_bp.route('/subscriptions', methods=['POST'])
@jwt_required()
def create_subscription():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    product_id = data.get('product_id')
    billing_cycle = data.get('billing_cycle', 'monthly')  # monthly, yearly
    trial_days = data.get('trial_days', 0)
    
    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400
    
    # Validate product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    # Check if user already has active subscription for this product
    existing_subscription = Subscription.query.filter_by(
        user_id=current_user['id'],
        product_id=product_id,
        status='active'
    ).first()
    
    if existing_subscription:
        return jsonify({"error": "User already has an active subscription for this product"}), 409
    
    # Calculate dates
    start_date = datetime.utcnow()
    if trial_days > 0:
        trial_end_date = start_date + timedelta(days=trial_days)
        next_billing_date = trial_end_date
    else:
        trial_end_date = None
        if billing_cycle == 'yearly':
            next_billing_date = start_date + timedelta(days=365)
        else:  # monthly
            next_billing_date = start_date + timedelta(days=30)
    
    subscription = Subscription(
        id=str(uuid.uuid4()),
        user_id=current_user['id'],
        product_id=product_id,
        status='active' if trial_days == 0 else 'trial',
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
        "subscription": {
            "id": subscription.id,
            "product_id": subscription.product_id,
            "status": subscription.status,
            "billing_cycle": subscription.billing_cycle,
            "start_date": subscription.start_date.isoformat(),
            "trial_end_date": subscription.trial_end_date.isoformat() if subscription.trial_end_date else None,
            "next_billing_date": subscription.next_billing_date.isoformat(),
            "created_at": subscription.created_at.isoformat()
        }
    }), 201

# Get user subscriptions
@subscriptions_bp.route('/subscriptions', methods=['GET'])
@jwt_required()
def get_subscriptions():
    current_user = get_jwt_identity()
    status_filter = request.args.get('status')
    
    query = Subscription.query.filter_by(user_id=current_user['id'])
    if status_filter:
        query = query.filter_by(status=status_filter)
    
    subscriptions = query.all()
    
    return jsonify({
        "subscriptions": [{
            "id": sub.id,
            "product_id": sub.product_id,
            "status": sub.status,
            "billing_cycle": sub.billing_cycle,
            "start_date": sub.start_date.isoformat(),
            "end_date": sub.end_date.isoformat() if sub.end_date else None,
            "trial_end_date": sub.trial_end_date.isoformat() if sub.trial_end_date else None,
            "next_billing_date": sub.next_billing_date.isoformat() if sub.next_billing_date else None,
            "created_at": sub.created_at.isoformat(),
            "updated_at": sub.updated_at.isoformat() if sub.updated_at else None
        } for sub in subscriptions]
    }), 200

# Get specific subscription
@subscriptions_bp.route('/subscriptions/<subscription_id>', methods=['GET'])
@jwt_required()
def get_subscription(subscription_id):
    current_user = get_jwt_identity()
    subscription = Subscription.query.filter_by(
        id=subscription_id, 
        user_id=current_user['id']
    ).first()
    
    if not subscription:
        return jsonify({"error": "Subscription not found"}), 404
    
    return jsonify({
        "subscription": {
            "id": subscription.id,
            "product_id": subscription.product_id,
            "status": subscription.status,
            "billing_cycle": subscription.billing_cycle,
            "start_date": subscription.start_date.isoformat(),
            "end_date": subscription.end_date.isoformat() if subscription.end_date else None,
            "trial_end_date": subscription.trial_end_date.isoformat() if subscription.trial_end_date else None,
            "next_billing_date": subscription.next_billing_date.isoformat() if subscription.next_billing_date else None,
            "created_at": subscription.created_at.isoformat(),
            "updated_at": subscription.updated_at.isoformat() if subscription.updated_at else None
        }
    }), 200

# Update subscription
@subscriptions_bp.route('/subscriptions/<subscription_id>', methods=['PUT'])
@jwt_required()
def update_subscription(subscription_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    
    subscription = Subscription.query.filter_by(
        id=subscription_id, 
        user_id=current_user['id']
    ).first()
    
    if not subscription:
        return jsonify({"error": "Subscription not found"}), 404
    
    # Update allowed fields
    if 'billing_cycle' in data:
        billing_cycle = data['billing_cycle']
        if billing_cycle in ['monthly', 'yearly']:
            subscription.billing_cycle = billing_cycle
            # Recalculate next billing date
            if billing_cycle == 'yearly':
                subscription.next_billing_date = datetime.utcnow() + timedelta(days=365)
            else:
                subscription.next_billing_date = datetime.utcnow() + timedelta(days=30)
    
    subscription.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Subscription updated successfully",
        "subscription": {
            "id": subscription.id,
            "billing_cycle": subscription.billing_cycle,
            "next_billing_date": subscription.next_billing_date.isoformat(),
            "updated_at": subscription.updated_at.isoformat()
        }
    }), 200

# Cancel subscription
@subscriptions_bp.route('/subscriptions/<subscription_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_subscription(subscription_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    immediate = data.get('immediate', False)
    
    subscription = Subscription.query.filter_by(
        id=subscription_id, 
        user_id=current_user['id']
    ).first()
    
    if not subscription:
        return jsonify({"error": "Subscription not found"}), 404
    
    if subscription.status in ['cancelled', 'expired']:
        return jsonify({"error": "Subscription is already cancelled or expired"}), 400
    
    if immediate:
        subscription.status = 'cancelled'
        subscription.end_date = datetime.utcnow()
        subscription.next_billing_date = None
    else:
        # Cancel at end of billing period
        subscription.status = 'pending_cancellation'
        subscription.end_date = subscription.next_billing_date
    
    subscription.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Subscription cancelled successfully",
        "subscription": {
            "id": subscription.id,
            "status": subscription.status,
            "end_date": subscription.end_date.isoformat() if subscription.end_date else None,
            "updated_at": subscription.updated_at.isoformat()
        }
    }), 200

# Reactivate subscription
@subscriptions_bp.route('/subscriptions/<subscription_id>/reactivate', methods=['POST'])
@jwt_required()
def reactivate_subscription(subscription_id):
    current_user = get_jwt_identity()
    
    subscription = Subscription.query.filter_by(
        id=subscription_id, 
        user_id=current_user['id']
    ).first()
    
    if not subscription:
        return jsonify({"error": "Subscription not found"}), 404
    
    if subscription.status not in ['cancelled', 'pending_cancellation']:
        return jsonify({"error": "Only cancelled subscriptions can be reactivated"}), 400
    
    subscription.status = 'active'
    subscription.end_date = None
    
    # Set next billing date
    if subscription.billing_cycle == 'yearly':
        subscription.next_billing_date = datetime.utcnow() + timedelta(days=365)
    else:
        subscription.next_billing_date = datetime.utcnow() + timedelta(days=30)
    
    subscription.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Subscription reactivated successfully",
        "subscription": {
            "id": subscription.id,
            "status": subscription.status,
            "next_billing_date": subscription.next_billing_date.isoformat(),
            "updated_at": subscription.updated_at.isoformat()
        }
    }), 200