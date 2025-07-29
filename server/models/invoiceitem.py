from . import db

class InvoiceItem(db.Model):
    id = db.Column(db.String, primary_key=True)
    invoice_id = db.Column(db.String, db.ForeignKey('invoice.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    description = db.Column(db.Text)
    quantity = db.Column(db.Integer)
    unit_price = db.Column(db.Float)
    total_price = db.Column(db.Float)
