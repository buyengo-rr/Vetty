from . import db
from datetime import datetime

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255))
    type = db.Column(db.String(50))  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    bookings = db.relationship("ServiceBooking", back_populates="service", cascade="all, delete-orphan")

    # ✅ Add this correctly
    appointments = db.relationship(
        'Appointment',
        backref=db.backref('service', passive_deletes=True),
        cascade='all, delete-orphan'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url,
            "type": self.type
        }
