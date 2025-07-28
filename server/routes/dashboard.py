from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db, User, Order, Appointment, Service, CartItem

dashboard_bp = Blueprint("dashboard", __name__)

# Helper for formatting time
def format_time(dt):
    if not dt:
        return "Unknown"
    return dt.strftime("%Y-%m-%d %H:%M")

# Admin Dashboard Route
@dashboard_bp.route("/admin/dashboard", methods=["GET"])
@jwt_required()
def admin_dashboard():
    total_users = User.query.count()
    total_orders = Order.query.count()
    total_appointments = Appointment.query.count()
    total_services = Service.query.count()

    recent_activities = []

    latest_users = User.query.order_by(User.created_at.desc()).limit(2).all()
    for user in latest_users:
        recent_activities.append({
            "time": format_time(user.created_at),
            "message": f"New user registered: {user.username}"
        })

    latest_orders = Order.query.order_by(Order.created_at.desc()).limit(2).all()
    for order in latest_orders:
        recent_activities.append({
            "time": format_time(order.created_at),
            "message": f"Order #{order.id} placed"
        })

    latest_services = Service.query.order_by(Service.updated_at.desc()).limit(1).all()
    for svc in latest_services:
        recent_activities.append({
            "time": format_time(svc.updated_at),
            "message": f"Service '{svc.name}' updated"
        })

    latest_appointments = Appointment.query.filter_by(status="approved") \
                            .order_by(Appointment.updated_at.desc()).limit(1).all()
    for appt in latest_appointments:
        recent_activities.append({
            "time": format_time(appt.updated_at),
            "message": "Appointment request approved"
        })

    # Return sorted by newest
    recent_activities.sort(key=lambda x: x['time'], reverse=True)

    return jsonify({
        "users": total_users,
        "orders": total_orders,
        "appointments": total_appointments,
        "services": total_services,
        "recent_logs": recent_activities
    }), 200


# User Dashboard Route
@dashboard_bp.route("/user/dashboard", methods=["GET"])
@jwt_required()
def user_dashboard():
    user_id = get_jwt_identity()

    appointments = Appointment.query.filter_by(user_id=user_id, status="upcoming").count()
    cart_items = CartItem.query.filter_by(user_id=user_id).count()
    orders = Order.query.filter_by(user_id=user_id).count()
    booked_services = Appointment.query.filter_by(user_id=user_id, status="confirmed").count()

    # Recent activity for user
    recent = []

    latest_appts = Appointment.query.filter_by(user_id=user_id) \
                     .order_by(Appointment.created_at.desc()).limit(1).all()
    for appt in latest_appts:
        recent.append({
            "time": format_time(appt.created_at),
            "message": "Booked a vet appointment 🐶"
        })

    latest_orders = Order.query.filter_by(user_id=user_id) \
                      .order_by(Order.created_at.desc()).limit(1).all()
    for order in latest_orders:
        recent.append({
            "time": format_time(order.created_at),
            "message": f"Placed order #{order.id}"
        })

    latest_cart = CartItem.query.filter_by(user_id=user_id) \
                     .order_by(CartItem.created_at.desc()).limit(1).all()
    for item in latest_cart:
        recent.append({
            "time": format_time(item.created_at),
            "message": f"Added item to cart 🛒"
        })

    recent.sort(key=lambda x: x['time'], reverse=True)

    return jsonify({
        "appointments": appointments,
        "cart_items": cart_items,
        "orders": orders,
        "booked_services": booked_services,
        "recent_logs": recent
    }), 200
