class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_paid = db.Column(db.Boolean, default=False)
    delivery_status = db.Column(db.String, default="Pending")

    user = db.relationship('User', back_populates='orders')
    items = db.relationship('OrderItem', back_populates='order')
    

    def __repr__(self):
        return f"<Order ID: {self.id} for User#{self.user_id} - Status: {self.delivery_status}>"
