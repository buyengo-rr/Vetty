class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, default=1)

    cart = db.relationship('Cart', back_populates='items')
    product = db.relationship('Product')

    def __repr__(self):
        return f"<CartItem Cart#{self.cart_id} Product#{self.product_id} x{self.quantity}>"
