from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Order, User, OrderItem 
from functools import wraps

order_bp = Blueprint('order', __name__)

def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        identity = get_jwt_identity()
        user = User.query.get(identity['id']) if isinstance(identity, dict) else None
        if not user or user.role != 'admin':
            return jsonify({"error": "Admin access required"}), 403
        return fn(*args, **kwargs)
    return wrapper

@order_bp.route('/orders', methods=['GET'])
@admin_required
def get_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders])

@order_bp.route('/orders/<int:order_id>', methods=['GET'])
@admin_required
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict())

@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
@admin_required
def update_order(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    order.delivery_status = data.get('delivery_status', order.delivery_status)
    db.session.commit()
    return jsonify({"message": "Order updated", "order": order.to_dict()})

@order_bp.route('/orders/<int:order_id>', methods=['DELETE'])
@admin_required
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": "Order deleted"}), 204
@order_bp.route('/checkout', methods=['POST'])
@jwt_required()
def checkout():
    data = request.get_json()
    user_id = get_jwt_identity()['id']

    products = data.get('products', [])
    if not products:
        return jsonify({"error": "Cart is empty"}), 400

    order = Order(
        user_id=user_id,
        delivery_status="Pending",
        is_paid=data.get("is_paid", False)
    )
    db.session.add(order)
    db.session.flush()

    for item in products:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item['product_id'],
            quantity=item['quantity']
        )
        db.session.add(order_item)

    db.session.commit()
    return jsonify({"message": "Order placed", "order": order.to_dict()}), 201
