from . import db

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    duration_minutes = db.Column(db.Integer)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    bookings = db.relationship('ServiceBooking', back_populates='service', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Service {self.name} (ID: {self.id}) - ${self.price}>"
