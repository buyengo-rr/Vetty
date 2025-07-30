from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from models import db
from models.user import User
from models.service import Service
from models.appointment import Appointment
from models.products import Product
from models.order import Order
from models.orderItem import OrderItem
from models.cart import Cart
from models.serviceBooking import ServiceBooking
from models.cartItem import CartItem

from routes.auth import auth_bp
from routes.service import service_bp
from routes.appointment import appointment_bp
from routes.product import product_bp
from routes.order import order_bp
from routes.cart import cart_bp
from routes.dashboard import dashboard_bp
from routes.profile import profile_bp
from routes.user import user_bp
from flask import send_from_directory
import os



def create_app():
    app = Flask(__name__)

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'super-secret-key'
    app.config['UPLOAD_FOLDER'] = 'static/uploads'

    # CORS setup
    CORS(
        app,
        supports_credentials=True,
        resources={r"/*": {"origins": "http://localhost:5173"}},
    )


    @app.route('/static/uploads/<path:filename>')
    def uploaded_file(filename):
       upload_folder = os.path.join(app.root_path, 'static', 'uploads')
       return send_from_directory(upload_folder, filename)


    # Extensions
    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)

    # Blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(service_bp)
    app.register_blueprint(appointment_bp, url_prefix='/appointments')
    app.register_blueprint(product_bp)
    app.register_blueprint(order_bp, url_prefix='/order')
    app.register_blueprint(cart_bp, url_prefix='/cart')
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(profile_bp, url_prefix='/profile')
    app.register_blueprint(user_bp, url_prefix='/user')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
