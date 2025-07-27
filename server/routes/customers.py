from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db, Customer
import uuid

customers_bp = Blueprint('customers', __name__)

@customers_bp.route('/customers', methods=['POST'])
@jwt_required()
def create_customer():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    
    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400
    
    existing_customer = Customer.query.filter_by(email=email).first()
    if existing_customer:
        return jsonify({"error": "Customer with this email already exists"}), 409
    
    customer = Customer(
        id=str(uuid.uuid4()),
        name=name,
        email=email,
        created_by=current_user['id'],
        created_at=datetime.utcnow()
    )
    
    db.session.add(customer)
    db.session.commit()
    
    return jsonify({
        "message": "Customer created successfully",
        "customer": {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "created_at": customer.created_at.isoformat()
        }
    }), 201

@customers_bp.route('/customers', methods=['GET'])
@jwt_required()
def get_customers():
    current_user = get_jwt_identity()
    customers = Customer.query.filter_by(created_by=current_user['id']).all()
    
    return jsonify({
        "customers": [{
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "created_at": customer.created_at.isoformat()
        } for customer in customers]
    }), 200

@customers_bp.route('/customers/<customer_id>', methods=['GET'])
@jwt_required()
def get_customer(customer_id):
    current_user = get_jwt_identity()
    customer = Customer.query.filter_by(id=customer_id, created_by=current_user['id']).first()
    
    if not customer:
        return jsonify({"error": "Customer not found"}), 404
    
    return jsonify({
        "customer": {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email
        }
    }), 200

@customers_bp.route('/customers/<customer_id>', methods=['PUT'])
@jwt_required()
def update_customer(customer_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    
    customer = Customer.query.filter_by(id=customer_id, created_by=current_user['id']).first()
    if not customer:
        return jsonify({"error": "Customer not found"}), 404
    
    if 'name' in data:
        customer.name = data['name']
    if 'email' in data:
        existing = Customer.query.filter(Customer.email == data['email'], Customer.id != customer_id).first()
        if existing:
            return jsonify({"error": "Email already exists"}), 409
        customer.email = data['email']
    
    db.session.commit()
    
    return jsonify({
        "message": "Customer updated successfully",
        "customer": {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email
        }
    }), 200

@customers_bp.route('/customers/<customer_id>', methods=['DELETE'])
@jwt_required()
def delete_customer(customer_id):
    current_user = get_jwt_identity()
    customer = Customer.query.filter_by(id=customer_id, created_by=current_user['id']).first()
    
    if not customer:
        return jsonify({"error": "Customer not found"}), 404
    
    db.session.delete(customer)
    db.session.commit()
    
    return jsonify({"message": "Customer deleted successfully"}), 200
@customers_bp.route('/customers', methods=['GET'])
@jwt_required()
def get_customers():
    current_user = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    customers = Customer.query.filter_by(created_by=current_user['id'])\
        .order_by(Customer.created_at.desc())\
        .paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        "customers": [{
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone,
            "company": customer.company,
            "created_at": customer.created_at.isoformat(),
            "updated_at": customer.updated_at.isoformat() if customer.updated_at else None
        } for customer in customers.items],
        "total": customers.total,
        "pages": customers.pages,
        "current_page": page
    }), 200

@customers_bp.route('/customers/<customer_id>', methods=['GET'])
@jwt_required()
def get_customer(customer_id):
    current_user = get_jwt_identity()
    customer = Customer.query.filter_by(id=customer_id, created_by=current_user['id']).first()
    
    if not customer:
        return jsonify({"error": "Customer not found"}), 404
    
    return jsonify({
        "customer": {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone,
            "company": customer.company,
            "address": customer.address,
            "city": customer.city,
            "state": customer.state,
            "postal_code": customer.postal_code,
            "country": customer.country,
            "notes": customer.notes,
            "created_at": customer.created_at.isoformat(),
            "updated_at": customer.updated_at.isoformat() if customer.updated_at else None
        }
    }), 200
@customers_bp.route('/customers', methods=['GET'])
@jwt_required()
def get_customers():
    current_user = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    search = request.args.get('search')
    
    query = Customer.query.filter_by(created_by=current_user['id'])
    
    if search:
        query = query.filter(
            db.or_(
                Customer.name.ilike(f'%{search}%'),
                Customer.email.ilike(f'%{search}%'),
                Customer.company.ilike(f'%{search}%')
            )
        )
    
    customers = query.order_by(Customer.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        "customers": [{
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone,
            "company": customer.company,
            "created_at": customer.created_at.isoformat()
        } for customer in customers.items],
        "total": customers.total,
        "pages": customers.pages,
        "current_page": page
    }), 200