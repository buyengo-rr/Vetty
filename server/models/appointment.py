from . import db
from datetime import datetime


class Appointment(db.Model):
    __tablename__ = 'appointments'
     
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)

    scheduled_time = db.Column(db.DateTime, nullable=False)
    vet_name = db.Column(db.String(100)) 
    status = db.Column(db.String(50), default="pending") 
    notes = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    user = db.relationship('User', backref='appointments')
    service = db.relationship('Service', backref='appointments')

    def __repr__(self):
<
        return f"<Appointment {self.id} for User {self.user_id} on {self.scheduled_time}>"

