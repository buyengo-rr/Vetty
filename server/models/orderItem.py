from . import db
from typing import Dict ,Any

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)   
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)  
    quantity = db.Column(db.Integer, default=1)

   
    order = db.relationship('Order', back_populates='items')
    product = db.relationship('Product', back_populates='order_items')


    def to_dict(self)->[Dict,Any]:
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "product": self.product.to_dict() if self.product else None
        }
    

    def __repr__(self):
        return f"<OrderItem {self.product.name if self.product else 'Unknown'} (ID: {self.id}) - Quantity: {self.quantity}>"
