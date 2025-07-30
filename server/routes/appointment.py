from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Appointment, db, User, Service
from datetime import datetime

appointment_bp = Blueprint('appointments', __name__)

# -----------------------
# Helper: Serialize Appointment
# -----------------------
def serialize_appointment(appointment):
    return {
        "id": appointment.id,
        "user_id": appointment.user_id,
        "service_id": appointment.service_id,
        "service_name": appointment.service.name if appointment.service else None,
        "scheduled_time": appointment.scheduled_time,
        "vet_name": appointment.vet_name,
        "status": appointment.status,
        "notes": appointment.notes,
        "created_at": appointment.created_at,
        "updated_at": appointment.updated_at
    }

# -----------------------
# Get Appointments for Authenticated User
# -----------------------
@appointment_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user_appointments():
    identity = get_jwt_identity()
    user_id = identity['id'] if isinstance(identity, dict) else identity

    appointments = Appointment.query.filter_by(user_id=user_id).all()
    return jsonify([serialize_appointment(app) for app in appointments]), 200

# -----------------------
# ✅ Get All Appointments (Admin Only) – Now at /appointments/
# -----------------------
@appointment_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_appointments():
    identity = get_jwt_identity()
    role = identity.get('role') if isinstance(identity, dict) else None

    if role != 'admin':
        return jsonify({"msg": "Admins only."}), 403

    appointments = Appointment.query.all()
    return jsonify([serialize_appointment(app) for app in appointments]), 200

# -----------------------
# Delete an Appointment (Admin Only)
# -----------------------
@appointment_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(id):
    identity = get_jwt_identity()
    role = identity.get('role') if isinstance(identity, dict) else None

    if role != 'admin':
        return jsonify({"msg": "Admins only."}), 403

    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()

    return jsonify({"message": "Appointment deleted"}), 200

# -----------------------
# Update an Appointment (Admin or Owner)
# -----------------------
@appointment_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_appointment(id):
    identity = get_jwt_identity()
    user_id = identity['id'] if isinstance(identity, dict) else identity
    role = identity.get('role') if isinstance(identity, dict) else None

    appointment = Appointment.query.get_or_404(id)

    if role != 'admin' and appointment.user_id != user_id:
        return jsonify({"msg": "Not authorized"}), 403

    data = request.get_json()
    appointment.status = data.get("status", appointment.status)
    appointment.notes = data.get("notes", appointment.notes)
    db.session.commit()

    return jsonify(serialize_appointment(appointment)), 200


@appointment_bp.route('/user/appointments', methods=['POST'])
@jwt_required()
def create_user_appointment():
    identity = get_jwt_identity()
    user_id = identity['id'] if isinstance(identity, dict) else identity

    data = request.get_json()

    try:
        # Parse string datetime into Python datetime object
        scheduled_time_str = data.get("scheduled_time")
        scheduled_time = datetime.fromisoformat(scheduled_time_str)

        new_appointment = Appointment(
            user_id=user_id,
            service_id=data.get('service_id'),
            scheduled_time=scheduled_time,
            vet_name=data.get('vet_name'),
            notes=data.get('notes'),
            status='Pending'
        )

        db.session.add(new_appointment)
        db.session.commit()

        return jsonify({"message": "Appointment booked successfully"}), 201

    except ValueError:
        return jsonify({"error": "Invalid datetime format. Use ISO format (e.g. '2025-08-01T16:00')"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

