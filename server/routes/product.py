from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from models import db
from models.products import Product
from middleware.auth import token_required, admin_required
import os

product_bp = Blueprint("product_bp", __name__)

# ─────────────────────────────────────────────
def save_image(file):
    if not file:
        return None

    filename = secure_filename(file.filename)

    # Ensure uploads directory exists
    upload_folder = os.path.join(current_app.root_path, "static", "uploads")
    os.makedirs(upload_folder, exist_ok=True)

    filepath = os.path.join(upload_folder, filename)
    file.save(filepath)

    # Return the URL path for the image
    return f"/static/uploads/{filename}"

# ─────────────────────────────────────────────
@product_bp.route("/product", methods=["GET"])
def get_all_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products]), 200

@product_bp.route("/product/<int:id>", methods=["GET"])
def get_product_by_id(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict()), 200

@product_bp.route("/admin/product", methods=["GET"])
@token_required
def get_all_products_for_dashboard(current_user):
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products]), 200

@product_bp.route("/admin/product", methods=["POST"])
@token_required
@admin_required
def create_product(current_user):
    name = request.form.get("name")
    price = request.form.get("price")
    stock = request.form.get("stock")
    description = request.form.get("description")
    category = request.form.get("category")
    ptype = request.form.get("type")
    image_file = request.files.get("image")

    if not name or not price:
        return jsonify({"error": "Name and price are required"}), 400

    image_url = save_image(image_file)

    new_product = Product(
        name=name,
        price=float(price),
        stock=int(stock or 0),
        description=description,
        category=category,
        type=ptype,
        image_url=image_url
    )

    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@product_bp.route("/admin/product/<int:id>", methods=["PUT"])
@token_required
@admin_required
def update_product(current_user, id):
    product = Product.query.get_or_404(id)

    product.name = request.form.get("name", product.name)
    product.price = float(request.form.get("price", product.price))
    product.stock = int(request.form.get("stock", product.stock))
    product.description = request.form.get("description", product.description)
    product.category = request.form.get("category", product.category)
    product.type = request.form.get("type", product.type)

    image_file = request.files.get("image")
    if image_file:
        product.image_url = save_image(image_file)

    db.session.commit()
    return jsonify(product.to_dict()), 200

@product_bp.route("/admin/product/<int:id>", methods=["DELETE"])
@token_required
@admin_required
def delete_product(current_user, id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200
