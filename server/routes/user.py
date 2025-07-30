from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

user_bp = Blueprint('user_bp', __name__, url_prefix='/user')

@user_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    current_user_data = get_jwt_identity()   # now this is a dict, e.g., {"id": 1, "role": "admin"}
    current_user_id = current_user_data.get("id")

    current_user = User.query.get(current_user_id)
    if not current_user:
        return jsonify({'msg': 'User not found'}), 404

    if current_user.role != 'admin':
        return jsonify({'msg': 'Unauthorized'}), 403

    users = User.query.all()
    return jsonify([{
        "id": u.id,
        "username": u.username,
        "email": u.email,
        "role": u.role,
        "created_at": u.created_at,
    } for u in users])
