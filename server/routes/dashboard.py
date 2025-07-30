from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, Appointment, Order, CartItem, Product, Service
from datetime import datetime
from sqlalchemy import func

dashboard_bp = Blueprint('dashboard', __name__)

def format_time(dt):
    return dt.strftime("%Y-%m-%d %H:%M")

# ------------------- USER DASHBOARD -------------------

@dashboard_bp.route("/user/dashboard", methods=["GET"])
@jwt_required()
def user_dashboard():
    identity = get_jwt_identity()
    user_id = identity["id"]

    appointments = Appointment.query.filter_by(user_id=user_id, status="upcoming").count()
    cart_items = CartItem.query.filter_by(user_id=user_id).count()
    orders = Order.query.filter_by(user_id=user_id).count()
    booked_services = Appointment.query.filter_by(user_id=user_id, status="confirmed").count()

    # Recent activity
    recent = []

    latest_appt = Appointment.query.filter_by(user_id=user_id)\
        .order_by(Appointment.created_at.desc()).first()
    if latest_appt and latest_appt.created_at:
        recent.append({
            "time": format_time(latest_appt.created_at),
            "message": "Booked a vet appointment 🐶"
        })

    latest_order = Order.query.filter_by(user_id=user_id)\
        .order_by(Order.created_at.desc()).first()
    if latest_order and latest_order.created_at:
        recent.append({
            "time": format_time(latest_order.created_at),
            "message": f"Placed order #{latest_order.id}"
        })

    latest_cart = CartItem.query.filter_by(user_id=user_id)\
        .order_by(CartItem.created_at.desc()).first()
    if latest_cart and latest_cart.created_at:
        recent.append({
            "time": format_time(latest_cart.created_at),
            "message": "Added item to cart 🛒"
        })

    recent.sort(key=lambda x: x["time"], reverse=True)

    return jsonify({
        "appointments": appointments,
        "cart_items": cart_items,
        "orders": orders,
        "booked_services": booked_services,
        "recent_logs": recent
    }), 200

# ------------------- ADMIN DASHBOARD -------------------

@dashboard_bp.route("/admin/dashboard", methods=["GET"])
@jwt_required()
def admin_dashboard():
    identity = get_jwt_identity()
    user_role = identity["role"]

    if user_role != "admin":
        return jsonify({"msg": "Access forbidden: Admins only"}), 403

    user_count = User.query.count()
    order_count = Order.query.count()
    service_count = Service.query.count()
    appointment_count = Appointment.query.count()

    recent = []

    latest_user = User.query.order_by(User.created_at.desc()).first()
    if latest_user and latest_user.created_at:
        recent.append({
            "time": format_time(latest_user.created_at),
            "message": f"New user registered: {latest_user.username}"
        })

    latest_order = Order.query.order_by(Order.created_at.desc()).first()
    if latest_order and latest_order.created_at:
        recent.append({
            "time": format_time(latest_order.created_at),
            "message": f"Order #{latest_order.id} placed"
        })

    latest_service = Service.query.order_by(Service.created_at.desc()).first()
    if latest_service and latest_service.created_at:
        recent.append({
            "time": format_time(latest_service.created_at),
            "message": f"New service added: {latest_service.name}"
        })

    recent.sort(key=lambda x: x["time"], reverse=True)

    return jsonify({
        "total_users": user_count,
        "total_orders": order_count,
        "total_services": service_count,
        "total_appointments": appointment_count,
        "recent_logs": recent
    }), 200
