from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User

profile_bp = Blueprint('profile', __name__, url_prefix="/api/profile")

@profile_bp.route('/', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    profile_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role.name,
        "person": {
            "full_name": user.person.full_name if user.person else None,
            "phone": user.person.phone if user.person else None,
            "avatar": user.person.avatar if user.person else None,
        }
    }
    return jsonify(profile_data), 200

@profile_bp.route('/', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    email = data.get('email')
    phone = data.get('phone')
    full_name = data.get('full_name')
    avatar = data.get('avatar')

    if email:
        user.email = email

    if not user.person:
        user.person = Person(user_id=user.id)

    if phone:
        user.person.phone = phone
    if full_name:
        user.person.full_name = full_name
    if avatar:
        user.person.avatar = avatar

    db.session.commit()
    return jsonify({"message": "Profile updated successfully"}), 200
