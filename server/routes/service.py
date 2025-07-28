from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Service, User

service_bp = Blueprint('service_bp', __name__)

# Utility: check if current user is admin
def is_admin(user_id):
    user = User.query.get(user_id)
    return user and user.role == 'admin'

# --- Admin: Add Service ---
@service_bp.route('/admin/services', methods=['POST'])
@jwt_required()
def add_service():
    user_id = get_jwt_identity()
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    new_service = Service(
        name=data['name'],
        price=data['price'],
        description=data.get('description'),
        image_url=data.get('image_url'),
        type=data.get('type')  # optional service type/category
    )
    db.session.add(new_service)
    db.session.commit()
    return jsonify({"message": "Service created", "service": new_service.to_dict()}), 201

# --- Admin: Update Service ---
@service_bp.route('/admin/services/<int:service_id>', methods=['PUT'])
@jwt_required()
def update_service(service_id):
    user_id = get_jwt_identity()
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 403

    service = Service.query.get_or_404(service_id)
    data = request.get_json()
    service.name = data.get('name', service.name)
    service.price = data.get('price', service.price)
    service.description = data.get('description', service.description)
    service.image_url = data.get('image_url', service.image_url)
    service.type = data.get('type', service.type)

    db.session.commit()
    return jsonify({"message": "Service updated", "service": service.to_dict()}), 200

# --- Admin: Delete Service ---
@service_bp.route('/admin/services/<int:service_id>', methods=['DELETE'])
@jwt_required()
def delete_service(service_id):
    user_id = get_jwt_identity()
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 403

    service = Service.query.get_or_404(service_id)
    db.session.delete(service)
    db.session.commit()
    return jsonify({"message": "Service deleted"}), 204

# --- User & Admin: Get All Services ---
@service_bp.route('/services', methods=['GET'])
@jwt_required()
def get_all_services():
    service_type = request.args.get('type')
    query = Service.query
    if service_type:
        query = query.filter_by(type=service_type)

    services = query.all()
    return jsonify([service.to_dict() for service in services])

# --- User & Admin: Get Single Service ---
@service_bp.route('/services/<int:service_id>', methods=['GET'])
@jwt_required()
def get_service(service_id):
    service = Service.query.get_or_404(service_id)
    return jsonify(service.to_dict())
