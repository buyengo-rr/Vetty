from . import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(255))
    category = db.Column(db.String(50))

    order_items = db.relationship('OrderItem', back_populates='product')

    def __repr__(self):
        return f"<Product {self.name} (ID: {self.id}) - ${self.price}>"
