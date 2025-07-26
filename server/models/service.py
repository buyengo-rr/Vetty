class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    duration_minutes = db.Column(db.Integer)

    bookings = db.relationship('ServiceBooking', back_populates='service')

    def __repr__(self):
        return f"<Service {self.name} (ID: {self.id}) - ${self.price}>"
        
