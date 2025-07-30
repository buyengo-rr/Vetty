from . import db
from datetime import datetime
from typing import Dict, Any

class Appointment(db.Model):
    __tablename__ = 'appointments'
     
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id', ondelete='CASCADE'), nullable=False)  # ✅ cascade delete

    scheduled_time = db.Column(db.DateTime, nullable=False)
    vet_name = db.Column(db.String(100)) 
    status = db.Column(db.String(50), default="pending") 
    notes = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='appointments') 

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "user_id": self.user_id,
            "service_id": self.service_id,
            "service": self.service.name if self.service else None,
            "scheduled_time": self.scheduled_time.isoformat(),
            "status": self.status,
            "notes": self.notes,
            "vet_name": self.vet_name,
            "created_at": self.created_at.isoformat(),
        }

    def __repr__(self):
        return f"<Appointment {self.id} for User {self.user_id} on {self.scheduled_time}>"
