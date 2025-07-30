from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from models import db, Service, User
import os

service_bp = Blueprint('service_bp', __name__)

def get_user_id():
    identity = get_jwt_identity()
    return identity.get("id") if isinstance(identity, dict) else identity

def is_admin(user_id):
    user = User.query.get(user_id)
    return user and user.role == 'admin'

def save_image(file):
    if not file:
        return None
    filename = secure_filename(file.filename)
    upload_folder = current_app.config.get("UPLOAD_FOLDER", "static/uploads")
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    file_path = os.path.join(upload_folder, filename)
    file.save(file_path)
    return f"/static/uploads/{filename}"

@service_bp.route('/admin/services', methods=['POST'])
@jwt_required()
def add_service():
    user_id = get_user_id()
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 403

    name = request.form.get('name')
    price = request.form.get('price')
    description = request.form.get('description')
    type = request.form.get('type')
    image_file = request.files.get('image')
    image_url = save_image(image_file)

    new_service = Service(
        name=name,
        price=float(price),
        description=description,
        image_url=image_url,
        type=type
    )
    db.session.add(new_service)
    db.session.commit()

    return jsonify({"message": "Service created", "service": new_service.to_dict()}), 201

@service_bp.route('/services', methods=['GET'])
@jwt_required()
def get_all_services():
    service_type = request.args.get('type')
    query = Service.query
    if service_type:
        query = query.filter_by(type=service_type)
    services = query.all()
    return jsonify([s.to_dict() for s in services])


@service_bp.route('/admin/services/<int:service_id>', methods=['DELETE'])
@jwt_required()
def delete_service(service_id):
    user_id = get_user_id()
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 403

    service = Service.query.get(service_id)
    if not service:
        return jsonify({"error": "Service not found"}), 404

    db.session.delete(service)
    db.session.commit()

    return jsonify({"message": "Service deleted"}), 200

@service_bp.route('/admin/services/<int:service_id>', methods=['PUT'])
@jwt_required()
def update_service(service_id):
    user_id = get_user_id()
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 403

    service = Service.query.get(service_id)
    if not service:
        return jsonify({"error": "Service not found"}), 404

    data = request.form
    image_file = request.files.get('image')

    service.name = data.get('name', service.name)
    service.description = data.get('description', service.description)
    service.price = float(data.get('price', service.price))
    service.type = data.get('type', service.type)

    if image_file:
        service.image_url = save_image(image_file)

    db.session.commit()

    return jsonify({"message": "Service updated", "service": service.to_dict()}), 200

