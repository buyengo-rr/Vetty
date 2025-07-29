from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from models import User, Service, Appointment, Product, Order, OrderItem, Cart, ServiceBooking, CartItem
from routes.auth import auth_bp
from routes.service import service_bp
from routes.appointment import appointment_bp
from routes.product import product_bp
from routes.order import order_bp
from routes.cart import cart_bp
from routes.dashboard import dashboard_bp
from routes.profile import profile_bp


def create_app():
    app = Flask(__name__)

    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'  
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    
    db.init_app(app)
    Migrate(app, db)

    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(service_bp, url_prefix='/service')
    app.register_blueprint(appointment_bp, url_prefix='/appointment')
    app.register_blueprint(product_bp, url_prefix='/product')
    app.register_blueprint(order_bp, url_prefix='/order')
    app.register_blueprint(cart_bp, url_prefix='/cart')
    app.register_blueprint(dashboard_bp, url_prefix='/dashboard')
    app.register_blueprint(profile_bp, url_prefix='/profile')


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
