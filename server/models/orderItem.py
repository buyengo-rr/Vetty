from . import db

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)   
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)  
    quantity = db.Column(db.Integer, default=1)

   
    order = db.relationship('Order', back_populates='items')
    product = db.relationship('Product', back_populates='order_items')
    

    def __repr__(self):
        return f"<OrderItem {self.product.name if self.product else 'Unknown'} (ID: {self.id}) - Quantity: {self.quantity}>"
