class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String)
    category = db.Column(db.String) 

    order_items = db.relationship('OrderItem', back_populates='product')

    def __repr__(self):
        return f"<Product {self.name} (ID: {self.id}) - ${self.price}>"
