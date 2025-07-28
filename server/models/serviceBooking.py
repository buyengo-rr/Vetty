from . import db

class ServiceBooking(db.Model):
    __tablename__ = 'service_bookings'

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    scheduled_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), default="Scheduled")
    notes = db.Column(db.Text)
    vet_name = db.Column(db.String(100))

    service = db.relationship('Service', back_populates='bookings')
    user = db.relationship('User', back_populates='service_bookings')

    def __repr__(self):
        return f"<Booking for {self.service.name} by User#{self.user_id} at {self.scheduled_time}>"
