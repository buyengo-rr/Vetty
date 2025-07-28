from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db, Webhook, WebhookEvent, User
import uuid
import hmac
import hashlib
import json

webhooks_bp = Blueprint('webhooks', __name__)
@webhooks_bp.route('/webhooks', methods=['POST'])
@jwt_required()
def create_webhook():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    url = data.get('url')
    events = data.get('events', [])
    description = data.get('description')
    secret = data.get('secret')
    is_active = data.get('is_active', True)
    
    if not url or not events:
        return jsonify({"error": "URL and events are required"}), 400
    
    # Validate events
    valid_events = [
        'payment.created', 'payment.completed', 'payment.failed',
        'subscription.created', 'subscription.updated', 'subscription.cancelled',
        'invoice.created', 'invoice.sent', 'invoice.paid', 'invoice.overdue',
        'customer.created', 'customer.updated', 'customer.deleted'
    ]
    
    for event in events:
        if event not in valid_events:
            return jsonify({"error": f"Invalid event: {event}"}), 400
    
    webhook = Webhook(
        id=str(uuid.uuid4()),
        user_id=current_user['id'],
        url=url,
        events=events,
        description=description,
        secret=secret,
        is_active=is_active,
        created_at=datetime.utcnow()
    )
    
    db.session.add(webhook)
    db.session.commit()
    
    return jsonify({
        "message": "Webhook created successfully",
        "webhook": {
            "id": webhook.id,
            "url": webhook.url,
            "events": webhook.events,
            "description": webhook.description,
            "is_active": webhook.is_active,
            "created_at": webhook.created_at.isoformat()
        }
    }), 201
# Get all webhooks
@webhooks_bp.route('/webhooks', methods=['GET'])
@jwt_required()
def get_webhooks():
    current_user = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    webhooks = Webhook.query.filter_by(user_id=current_user['id']).order_by(
        Webhook.created_at.desc()
    ).paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        "webhooks": [{
            "id": webhook.id,
            "url": webhook.url,
            "events": webhook.events,
            "description": webhook.description,
            "is_active": webhook.is_active,
            "created_at": webhook.created_at.isoformat(),
            "updated_at": webhook.updated_at.isoformat() if webhook.updated_at else None
        } for webhook in webhooks.items],
        "total": webhooks.total,
        "pages": webhooks.pages,
        "current_page": page
    }), 200

# Get specific webhook
@webhooks_bp.route('/webhooks/<webhook_id>', methods=['GET'])
@jwt_required()
def get_webhook(webhook_id):
    current_user = get_jwt_identity()
    webhook = Webhook.query.filter_by(id=webhook_id, user_id=current_user['id']).first()
    
    if not webhook:
        return jsonify({"error": "Webhook not found"}), 404
    
    return jsonify({
        "webhook": {
            "id": webhook.id,
            "url": webhook.url,
            "events": webhook.events,
            "description": webhook.description,
            "secret": webhook.secret,
            "is_active": webhook.is_active,
            "created_at": webhook.created_at.isoformat(),
            "updated_at": webhook.updated_at.isoformat() if webhook.updated_at else None
        }
    }), 200