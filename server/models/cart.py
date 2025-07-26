class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='cart', uselist=False)
    items = db.relationship('CartItem', back_populates='cart', cascade='all, delete-orphan')
    total_price = db.Column(db.Float, default=0.0)
    

    def __repr__(self):
        return f"<Cart User#{self.user_id}>"
