from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db, Webhook, WebhookEvent, User
import uuid
import hmac
import hashlib
import json

webhooks_bp = Blueprint('webhooks', __name__)

# Create webhook endpoint
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

# Update webhook
@webhooks_bp.route('/webhooks/<webhook_id>', methods=['PUT'])
@jwt_required()
def update_webhook(webhook_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    
    webhook = Webhook.query.filter_by(id=webhook_id, user_id=current_user['id']).first()
    if not webhook:
        return jsonify({"error": "Webhook not found"}), 404
    
    # Update allowed fields
    if 'url' in data:
        webhook.url = data['url']
    
    if 'events' in data:
        events = data['events']
        valid_events = [
            'payment.created', 'payment.completed', 'payment.failed',
            'subscription.created', 'subscription.updated', 'subscription.cancelled',
            'invoice.created', 'invoice.sent', 'invoice.paid', 'invoice.overdue',
            'customer.created', 'customer.updated', 'customer.deleted'
        ]
        
        for event in events:
            if event not in valid_events:
                return jsonify({"error": f"Invalid event: {event}"}), 400
        
        webhook.events = events
    
    if 'description' in data:
        webhook.description = data['description']
    
    if 'secret' in data:
        webhook.secret = data['secret']
    
    if 'is_active' in data:
        webhook.is_active = data['is_active']
    
    webhook.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Webhook updated successfully",
        "webhook": {
            "id": webhook.id,
            "url": webhook.url,
            "events": webhook.events,
            "is_active": webhook.is_active,
            "updated_at": webhook.updated_at.isoformat()
        }
    }), 200

# Delete webhook
@webhooks_bp.route('/webhooks/<webhook_id>', methods=['DELETE'])
@jwt_required()
def delete_webhook(webhook_id):
    current_user = get_jwt_identity()
    webhook = Webhook.query.filter_by(id=webhook_id, user_id=current_user['id']).first()
    
    if not webhook:
        return jsonify({"error": "Webhook not found"}), 404
    
    db.session.delete(webhook)
    db.session.commit()
    
    return jsonify({"message": "Webhook deleted successfully"}), 200

# Test webhook
@webhooks_bp.route('/webhooks/<webhook_id>/test', methods=['POST'])
@jwt_required()
def test_webhook(webhook_id):
    current_user = get_jwt_identity()
    webhook = Webhook.query.filter_by(id=webhook_id, user_id=current_user['id']).first()
    
    if not webhook:
        return jsonify({"error": "Webhook not found"}), 404
    
    # Create test payload
    test_payload = {
        "event": "webhook.test",
        "created": datetime.utcnow().isoformat(),
        "data": {
            "message": "This is a test webhook event",
            "webhook_id": webhook_id
        }
    }
    
    # Send webhook (in real implementation, this would be queued)
    try:
        success = send_webhook(webhook, test_payload)
        if success:
            return jsonify({"message": "Test webhook sent successfully"}), 200
        else:
            return jsonify({"error": "Failed to send test webhook"}), 500
    except Exception as e:
        return jsonify({"error": f"Webhook test failed: {str(e)}"}), 500

# Get webhook events/logs
@webhooks_bp.route('/webhooks/<webhook_id>/events', methods=['GET'])
@jwt_required()
def get_webhook_events(webhook_id):
    current_user = get_jwt_identity()
    webhook = Webhook.query.filter_by(id=webhook_id, user_id=current_user['id']).first()
    
    if not webhook:
        return jsonify({"error": "Webhook not found"}), 404
    
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    events = WebhookEvent.query.filter_by(webhook_id=webhook_id).order_by(
        WebhookEvent.created_at.desc()
    ).paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        "events": [{
            "id": event.id,
            "event_type": event.event_type,
            "status": event.status,
            "response_code": event.response_code,
            "response_body": event.response_body,
            "attempts": event.attempts,
            "created_at": event.created_at.isoformat(),
            "last_attempt": event.last_attempt.isoformat() if event.last_attempt else None
        } for event in events.items],
        "total": events.total,
        "pages": events.pages,
        "current_page": page
    }), 200

# Retry webhook event
@webhooks_bp.route('/webhook-events/<event_id>/retry', methods=['POST'])
@jwt_required()
def retry_webhook_event(event_id):
    current_user = get_jwt_identity()
    
    event = WebhookEvent.query.join(Webhook).filter(
        WebhookEvent.id == event_id,
        Webhook.user_id == current_user['id']
    ).first()
    
    if not event:
        return jsonify({"error": "Webhook event not found"}), 404
    
    if event.status == 'success':
        return jsonify({"error": "Cannot retry successful webhook event"}), 400
    
    webhook = Webhook.query.get(event.webhook_id)
    
    try:
        # Reconstruct payload from stored data
        payload = json.loads(event.payload)
        success = send_webhook(webhook, payload)
        
        event.attempts += 1
        event.last_attempt = datetime.utcnow()
        
        if success:
            event.status = 'success'
            event.response_code = 200
            event.response_body = "Retry successful"
        else:
            event.status = 'failed'
            event.response_body = "Retry failed"
        
        db.session.commit()
        
        return jsonify({
            "message": "Webhook event retried successfully",
            "status": event.status,
            "attempts": event.attempts
        }), 200
        
    except Exception as e:
        event.attempts += 1
        event.last_attempt = datetime.utcnow()
        event.status = 'failed'
        event.response_body = str(e)
        db.session.commit()
        
        return jsonify({"error": f"Retry failed: {str(e)}"}), 500

# Toggle webhook status
@webhooks_bp.route('/webhooks/<webhook_id>/toggle', methods=['POST'])
@jwt_required()
def toggle_webhook_status(webhook_id):
    current_user = get_jwt_identity()
    webhook = Webhook.query.filter_by(id=webhook_id, user_id=current_user['id']).first()
    
    if not webhook:
        return jsonify({"error": "Webhook not found"}), 404
    
    webhook.is_active = not webhook.is_active
    webhook.updated_at = datetime.utcnow()
    db.session.commit()
    
    status = "activated" if webhook.is_active else "deactivated"
    
    return jsonify({
        "message": f"Webhook {status} successfully",
        "webhook": {
            "id": webhook.id,
            "is_active": webhook.is_active,
            "updated_at": webhook.updated_at.isoformat()
        }
    }), 200

# Helper function to send webhooks
def send_webhook(webhook, payload):
    """
    Send webhook payload to the specified URL.
    In a production environment, this should be handled by a background task queue.
    """
    import requests
    
    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'PaymentSystem-Webhook/1.0'
    }
    
    # Add signature if secret is provided
    if webhook.secret:
        payload_str = json.dumps(payload, sort_keys=True)
        signature = hmac.new(
            webhook.secret.encode('utf-8'),
            payload_str.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        headers['X-Webhook-Signature'] = f'sha256={signature}'
    
    try:
        response = requests.post(
            webhook.url,
            json=payload,
            headers=headers,
            timeout=30
        )
        
        # Log the webhook event
        webhook_event = WebhookEvent(
            id=str(uuid.uuid4()),
            webhook_id=webhook.id,
            event_type=payload.get('event', 'unknown'),
            payload=json.dumps(payload),
            status='success' if response.status_code == 200 else 'failed',
            response_code=response.status_code,
            response_body=response.text[:1000],  # Limit response body length
            attempts=1,
            created_at=datetime.utcnow(),
            last_attempt=datetime.utcnow()
        )
        
        db.session.add(webhook_event)
        db.session.commit()
        
        return response.status_code == 200
        
    except requests.exceptions.RequestException as e:
        # Log failed webhook event
        webhook_event = WebhookEvent(
            id=str(uuid.uuid4()),
            webhook_id=webhook.id,
            event_type=payload.get('event', 'unknown'),
            payload=json.dumps(payload),
            status='failed',
            response_code=0,
            response_body=str(e)[:1000],
            attempts=1,
            created_at=datetime.utcnow(),
            last_attempt=datetime.utcnow()
        )
        
        db.session.add(webhook_event)
        db.session.commit()
        
        return False

# Function to trigger webhooks (to be called from other modules)
def trigger_webhook(user_id, event_type, data):
    """
    Trigger webhooks for a specific event type.
    This function should be called from other modules when events occur.
    """
    webhooks = Webhook.query.filter(
        Webhook.user_id == user_id,
        Webhook.is_active == True,
        Webhook.events.contains([event_type])
    ).all()
    
    if not webhooks:
        return
    
    payload = {
        "event": event_type,
        "created": datetime.utcnow().isoformat(),
        "data": data
    }
    
    for webhook in webhooks:
        try:
            # In production, this should be queued for background processing
            send_webhook(webhook, payload)
        except Exception as e:
            print(f"Failed to send webhook {webhook.id}: {str(e)}")

# Get webhook statistics
@webhooks_bp.route('/webhooks/stats', methods=['GET'])
@jwt_required()
def get_webhook_stats():
    current_user = get_jwt_identity()
    
    total_webhooks = Webhook.query.filter_by(user_id=current_user['id']).count()
    active_webhooks = Webhook.query.filter_by(
        user_id=current_user['id'],
        is_active=True
    ).count()
    
    # Get events from last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_events = WebhookEvent.query.join(Webhook).filter(
        Webhook.user_id == current_user['id'],
        WebhookEvent.created_at >= thirty_days_ago
    ).count()
    
    successful_events = WebhookEvent.query.join(Webhook).filter(
        Webhook.user_id == current_user['id'],
        WebhookEvent.created_at >= thirty_days_ago,
        WebhookEvent.status == 'success'
    ).count()
    
    success_rate = (successful_events / recent_events * 100) if recent_events > 0 else 0
    
    return jsonify({
        "stats": {
            "total_webhooks": total_webhooks,
            "active_webhooks": active_webhooks,
            "recent_events": recent_events,
            "successful_events": successful_events,
            "success_rate": round(success_rate, 2)
        }
    }), 200