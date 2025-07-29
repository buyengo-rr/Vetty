

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

from .user import User
from .service import Service
from .appointment import Appointment
from .products import Product
from .order import Order
from .orderItem import OrderItem
from .cart import Cart
from .appointment import Appointment
from .serviceBooking import ServiceBooking 
from .cartItem import CartItem
        
        
       
        


