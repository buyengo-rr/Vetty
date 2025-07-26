from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Product, Service, Order, Appointment

dashboard_bp = Blueprint('dashboard', __name__, url_prefix="/api/dashboard")

@dashboard_bp.route('/', methods=['GET'])
@jwt_required()
def dashboard_data():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    role = user.role.name

    if role == "admin":
        # Admin dashboard summary
        total_users = User.query.count()
        total_products = Product.query.count()
        total_services = Service.query.count()
        total_orders = Order.query.count()
        total_appointments = Appointment.query.count()

        return jsonify({
            "role": "admin",
            "summary": {
                "total_users": total_users,
                "total_products": total_products,
                "total_services": total_services,
                "total_orders": total_orders,
                "total_appointments": total_appointments
            }
        }), 200

    else:
        # Normal user dashboard summary
        user_appointments = Appointment.query.filter_by(user_id=user_id).count()
        cart_items = len(user.cart_items) if hasattr(user, 'cart_items') else 0
        booked_services = len(user.appointments) if hasattr(user, 'appointments') else 0
        orders = Order.query.filter_by(user_id=user_id).count()

        return jsonify({
            "role": "user",
            "summary": {
                "appointments": user_appointments,
                "cart_items": cart_items,
                "booked_services": booked_services,
                "orders": orders
            }
        }), 200
