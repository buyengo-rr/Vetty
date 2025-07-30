from flask import Blueprint, request, jsonify, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from models import db, User
import os

profile_bp = Blueprint('profile', __name__)
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@profile_bp.route('/', methods=['GET'])
@jwt_required()
def get_profile():
    identity = get_jwt_identity()
    user_id = identity.get("id") if isinstance(identity, dict) else identity

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": getattr(user, "full_name", ""),
        "phone": getattr(user, "phone", ""),
        "avatar": user.avatar,
        "role": user.role.name if hasattr(user.role, "name") else user.role
    }), 200

@profile_bp.route('/', methods=['PUT'])
@jwt_required()
def update_profile():
    identity = get_jwt_identity()
    user_id = identity.get("id") if isinstance(identity, dict) else identity

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    email = request.form.get('email')
    full_name = request.form.get('full_name')
    phone = request.form.get('phone')

    if email:
        user.email = email
    if full_name:
        user.full_name = full_name
    if phone:
        user.phone = phone

    if 'profilePhoto' in request.files:
        image = request.files['profilePhoto']
        filename = secure_filename(f"user_{user.id}_{image.filename}")
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        image.save(filepath)
        user.avatar = f"/static/uploads/{filename}"

    db.session.commit()

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "phone": user.phone,
        "avatar": user.avatar,
        "role": user.role.name if hasattr(user.role, "name") else user.role
    }), 200

# Serve static uploads
@profile_bp.route('/uploads/<path:filename>')
def serve_uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
