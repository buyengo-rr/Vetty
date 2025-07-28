from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Product, User

product_bp = Blueprint('product_bp', __name__)

# --- Utility: check if current user is admin ---
def is_admin(user_id):
    user = User.query.get(user_id)
    return user and user.role == 'admin'


# --- Admin Only: Add Product ---
@product_bp.route('/admin/products', methods=['POST'])
@jwt_required()
def add_product():
    user_id = get_jwt_identity()
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    new_product = Product(
        name=data['name'],
        price=data['price'],
        stock=data['stock'],
        type=data.get('type'),
        description=data.get('description'),
        image_url=data.get('image_url')
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully", "product": new_product.to_dict()}), 201


# --- Admin Only: Edit Product ---
@product_bp.route('/admin/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def edit_product(product_id):
    user_id = get_jwt_identity()
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 403

    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.stock = data.get('stock', product.stock)
    product.type = data.get('type', product.type)
    product.description = data.get('description', product.description)
    product.image_url = data.get('image_url', product.image_url)

    db.session.commit()
    return jsonify({"message": "Product updated", "product": product.to_dict()})


# --- Admin Only: Delete Product ---
@product_bp.route('/admin/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    user_id = get_jwt_identity()
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized"}), 403

    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"}), 204


# --- User & Admin: Get All Products ---
@product_bp.route('/products', methods=['GET'])
@jwt_required()
def get_all_products():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    product_type = request.args.get('type')

    query = Product.query
    if product_type:
        query = query.filter_by(type=product_type)

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    products = [product.to_dict() for product in pagination.items]

    return jsonify({
        "products": products,
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": pagination.page
    })


# --- User & Admin: Get Single Product ---
@product_bp.route('/products/<int:product_id>', methods=['GET'])
@jwt_required()
def get_single_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())
