from . import db
from typing import Dict, Any


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(50), nullable=True)
    type = db.Column(db.String(50))  

    # Relationships
    order_items = db.relationship('OrderItem', back_populates='product', lazy=True)

    def __repr__(self):
        return f"<Product {self.name} (ID: {self.id}) - ${self.price}>"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "image_url": self.image_url,
            "category": self.category,
            "type": self.type  
        }
