from . import db
from datetime import datetime, timezone
from typing import Dict, Any

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    quantity = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)


    # ✅ Relationships
    cart = db.relationship('Cart', back_populates='items')
    product = db.relationship('Product')

    def to_dict(self)-> Dict[str, Any]:
        return {
            "id": self.id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "cart_id": self.cart_id,
            "name": self.product.name if self.product else None,
            "price": self.product.price if self.product else 0.0,
            "image": self.product.image if self.product else ""
        }
