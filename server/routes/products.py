from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db, Product, User
import uuid

products_bp = Blueprint('products', __name__)

# Create product
@products_bp.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    currency = data.get('currency', 'USD')
    product_type = data.get('type', 'one_time')  # one_time, subscription
    category = data.get('category')
    sku = data.get('sku')
    is_active = data.get('is_active', True)
    metadata = data.get('metadata', {})
    
    if not name or price is None:
        return jsonify({"error": "Name and price are required"}), 400
    
    if product_type not in ['one_time', 'subscription']:
        return jsonify({"error": "Invalid product type"}), 400
    
    # Check if SKU already exists
    if sku:
        existing_product = Product.query.filter_by(sku=sku).first()
        if existing_product:
            return jsonify({"error": "Product with this SKU already exists"}), 409
    
    product = Product(
        id=str(uuid.uuid4()),
        name=name,
        description=description,
        price=price,
        currency=currency,
        type=product_type,
        category=category,
        sku=sku,
        is_active=is_active,
        metadata=metadata,
        created_by=current_user['id'],
        created_at=datetime.utcnow()
    )
    
    db.session.add(product)
    db.session.commit()
    
    return jsonify({
        "message": "Product created successfully",
        "product": {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "currency": product.currency,
            "type": product.type,
            "category": product.category,
            "sku": product.sku,
            "is_active": product.is_active,
            "created_at": product.created_at.isoformat()
        }
    }), 201

# Get all products
@products_bp.route('/products', methods=['GET'])
@jwt_required()
def get_products():
    current_user = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    category_filter = request.args.get('category')
    type_filter = request.args.get('type')
    active_only = request.args.get('active_only', 'false').lower() == 'true'
    search = request.args.get('search')
    
    query = Product.query.filter_by(created_by=current_user['id'])
    
    if category_filter:
        query = query.filter_by(category=category_filter)
    
    if type_filter:
        query = query.filter_by(type=type_filter)
    
    if active_only:
        query = query.filter_by(is_active=True)
    
    if search:
        query = query.filter(
            db.or_(
                Product.name.ilike(f'%{search}%'),
                Product.description.ilike(f'%{search}%'),
                Product.sku.ilike(f'%{search}%')
            )
        )
    
    products = query.order_by(Product.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        "products": [{
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "currency": product.currency,
            "type": product.type,
            "category": product.category,
            "sku": product.sku,
            "is_active": product.is_active,
            "created_at": product.created_at.isoformat(),
            "updated_at": product.updated_at.isoformat() if product.updated_at else None
        } for product in products.items],
        "total": products.total,
        "pages": products.pages,
        "current_page": page
    }), 200

# Get specific product
@products_bp.route('/products/<product_id>', methods=['GET'])
@jwt_required()
def get_product(product_id):
    current_user = get_jwt_identity()
    product = Product.query.filter_by(id=product_id, created_by=current_user['id']).first()
    
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    return jsonify({
        "product": {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "currency": product.currency,
            "type": product.type,
            "category": product.category,
            "sku": product.sku,
            "is_active": product.is_active,
            "metadata": product.metadata,
            "created_at": product.created_at.isoformat(),
            "updated_at": product.updated_at.isoformat() if product.updated_at else None
        }
    }), 200

# Update product
@products_bp.route('/products/<product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    
    product = Product.query.filter_by(id=product_id, created_by=current_user['id']).first()
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    # Update fields
    if 'name' in data:
        product.name = data['name']
    if 'description' in data:
        product.description = data['description']
    if 'price' in data:
        product.price = data['price']
    if 'currency' in data:
        product.currency = data['currency']
    if 'type' in data:
        if data['type'] not in ['one_time', 'subscription']:
            return jsonify({"error": "Invalid product type"}), 400
        product.type = data['type']
    if 'category' in data:
        product.category = data['category']
    if 'sku' in data:
        # Check if SKU is already taken by another product
        existing = Product.query.filter(
            Product.sku == data['sku'],
            Product.id != product_id
        ).first()
        if existing:
            return jsonify({"error": "SKU already exists"}), 409
        product.sku = data['sku']
    if 'is_active' in data:
        product.is_active = data['is_active']
    if 'metadata' in data:
        product.metadata = data['metadata']
    
    product.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Product updated successfully",
        "product": {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "is_active": product.is_active,
            "updated_at": product.updated_at.isoformat()
        }
    }), 200

# Delete product
@products_bp.route('/products/<product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    current_user = get_jwt_identity()
    product = Product.query.filter_by(id=product_id, created_by=current_user['id']).first()
    
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    # Check if product is being used in active subscriptions or pending invoices
    from models import Subscription, InvoiceItem, Invoice
    
    active_subscriptions = Subscription.query.filter_by(
        product_id=product_id,
        status='active'
    ).count()
    
    pending_invoices = db.session.query(InvoiceItem).join(Invoice).filter(
        InvoiceItem.product_id == product_id,
        Invoice.status.in_(['draft', 'sent'])
    ).count()
    
    if active_subscriptions > 0 or pending_invoices > 0:
        return jsonify({
            "error": "Cannot delete product with active subscriptions or pending invoices"
        }), 400
    
    db.session.delete(product)
    db.session.commit()
    
    return jsonify({"message": "Product deleted successfully"}), 200

# Get product categories
@products_bp.route('/products/categories', methods=['GET'])
@jwt_required()
def get_product_categories():
    current_user = get_jwt_identity()
    
    categories = db.session.query(Product.category).filter(
        Product.created_by == current_user['id'],
        Product.category.isnot(None)
    ).distinct().all()
    
    category_list = [cat[0] for cat in categories if cat[0]]
    
    return jsonify({
        "categories": category_list
    }), 200

# Get product statistics
@products_bp.route('/products/<product_id>/stats', methods=['GET'])
@jwt_required()
def get_product_stats(product_id):
    current_user = get_jwt_identity()
    product = Product.query.filter_by(id=product_id, created_by=current_user['id']).first()
    
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    from models import Subscription, InvoiceItem, Invoice
    
    # Calculate statistics
    total_subscriptions = Subscription.query.filter_by(product_id=product_id).count()
    active_subscriptions = Subscription.query.filter_by(
        product_id=product_id,
        status='active'
    ).count()
    
    # Revenue from invoices
    invoice_revenue = db.session.query(db.func.sum(InvoiceItem.total_price)).join(Invoice).filter(
        InvoiceItem.product_id == product_id,
        Invoice.status == 'paid'
    ).scalar() or 0
    
    # Recent sales
    recent_sales = db.session.query(InvoiceItem, Invoice).join(Invoice).filter(
        InvoiceItem.product_id == product_id,
        Invoice.status == 'paid'
    ).order_by(Invoice.paid_date.desc()).limit(10).all()
    
    return jsonify({
        "stats": {
            "total_subscriptions": total_subscriptions,
            "active_subscriptions": active_subscriptions,
            "total_revenue": float(invoice_revenue),
            "recent_sales": [{
                "invoice_id": sale[1].id,
                "invoice_number": sale[1].invoice_number,
                "quantity": sale[0].quantity,
                "total_price": sale[0].total_price,
                "paid_date": sale[1].paid_date.isoformat()
            } for sale in recent_sales]
        }
    }), 200

# Activate/Deactivate product
@products_bp.route('/products/<product_id>/toggle', methods=['POST'])
@jwt_required()
def toggle_product_status(product_id):
    current_user = get_jwt_identity()
    product = Product.query.filter_by(id=product_id, created_by=current_user['id']).first()
    
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    product.is_active = not product.is_active
    product.updated_at = datetime.utcnow()
    db.session.commit()
    
    status = "activated" if product.is_active else "deactivated"
    
    return jsonify({
        "message": f"Product {status} successfully",
        "product": {
            "id": product.id,
            "is_active": product.is_active,
            "updated_at": product.updated_at.isoformat()
        }
    }), 200