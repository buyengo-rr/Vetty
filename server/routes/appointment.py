from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Appointment, User
from functools import wraps

appointment_bp = Blueprint('appointment_bp', __name__)

# --- Optional admin-only decorator ---
def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user.role != 'admin':
            return jsonify({"error": "Admin access required"}), 403
        return fn(*args, **kwargs)
    return wrapper

# --- Create Appointment (User) ---
@appointment_bp.route('/appointments', methods=['POST'])
@jwt_required()
def create_appointment():
    data = request.get_json()
    user_id = get_jwt_identity()
    appointment = Appointment(
        user_id=user_id,
        service=data.get('service'),
        date=data.get('date'),
        time=data.get('time'),
        notes=data.get('notes', ''),
        status='pending'
    )
    db.session.add(appointment)
    db.session.commit()
    return jsonify({"message": "Appointment booked successfully", "appointment": appointment.to_dict()}), 201

# --- Get Appointments for Logged-in User ---
@appointment_bp.route('/appointments/user', methods=['GET'])
@jwt_required()
def get_user_appointments():
    user_id = get_jwt_identity()
    appointments = Appointment.query.filter_by(user_id=user_id).order_by(Appointment.date.desc()).all()
    return jsonify([a.to_dict() for a in appointments])

# --- Get All Appointments (Admin) ---
@appointment_bp.route('/appointments', methods=['GET'])
@admin_required
def get_all_appointments():
    appointments = Appointment.query.order_by(Appointment.date.desc()).all()
    return jsonify([a.to_dict() for a in appointments])

# --- Update Appointment Status (Admin) ---
@appointment_bp.route('/appointments/<int:appointment_id>', methods=['PUT'])
@admin_required
def update_appointment(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)
    data = request.get_json()
    appointment.status = data.get('status', appointment.status)
    db.session.commit()
    return jsonify({"message": "Appointment status updated", "appointment": appointment.to_dict()})

# --- Delete Appointment (Admin) ---
@appointment_bp.route('/appointments/<int:appointment_id>', methods=['DELETE'])
@admin_required
def delete_appointment(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({"message": "Appointment deleted"}), 204
