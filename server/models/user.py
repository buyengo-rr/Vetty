from . import db
from datetime import datetime
from typing import Dict,Any

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), default='user')
    avatar = db.Column(db.String, nullable=True, default="default_avatar.png")
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)


    orders = db.relationship('Order', back_populates='user')
    appointments = db.relationship('Appointment', back_populates='user')
    service_bookings = db.relationship('ServiceBooking', back_populates='user')
    cart = db.relationship('Cart', back_populates='user', uselist=False)
    

    def to_dict(self) -> {Dict,Any}:
     return {
        "id": self.id,
        "username": self.username,
        "email": self.email,
        "role": self.role,
        "createdAt": self.created_at.isoformat() if self.created_at else None,
    }

    

    