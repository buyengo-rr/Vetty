from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


from .user import User
from .service import Service
from .appointment import Appointment
from .products import Product
from .order import Order
from .orderItem import OrderItem
from .cart import Cart
from .serviceBooking import ServiceBooking
from .cartItem import CartItem

__all__ = [
    "db", "User", "Service", "Appointment", "Product",
    "Order", "OrderItem", "Cart", "ServiceBooking", "CartItem"
]
