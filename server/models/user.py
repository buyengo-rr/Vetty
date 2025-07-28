from . import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    orders = db.relationship('Order', back_populates='user')

    appointments = db.relationship('Appointment', backref='user')
    service_bookings = db.relationship('ServiceBooking', back_populates='user')
    cart=db.relationship('Cart', back_populates='user', uselist=False)

    def __repr__(self):
        return f"<User {self.username} (ID: {self.id}) - Email: {self.email}>"
