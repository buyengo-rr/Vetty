class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'))
    scheduled_time = db.Column(db.DateTime, nullable=False)
    vet_name = db.Column(db.String,)
    status = db.Column(db.String, default="pending")
    notes = db.Column(db.Text)
    user = db.relationship('User', backref='appointments')
    service = db.relationship('Service', backref='appointments')

    def __repr__(self):
        return f"<Appointment {self.id} for User {self.user_id} on {self.scheduled_time}>"
    