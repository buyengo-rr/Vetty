# Vetty - Data-Driven Veterinary E-Commerce Platform

A comprehensive e-commerce application providing veterinary services and products with real-time ordering and delivery capabilities.

## 🐾 Project Overview

Vetty solves the common problem pet owners face when they need veterinary products or services quickly. Whether your pet cat is running low on food or needs a vaccination appointment, Vetty provides a seamless platform to order products and book veterinary services with just a few clicks.

## 👥 Team Members

- **Yasir Mohammed** - Full Stack Developer
- **Ian Njoroge** - Backend Developer  
- **Sheileh Kipkemoi** - Frontend Developer
- **Diagne Buyengo** - UI/UX Designer & QA

## 🚀 Features

### Admin Management
- **Secure Authentication**: Admin login with role-based access control
- **Service Management**: Add, update, and delete veterinary services (grooming, vaccination, health checkups)
- **Product Management**: Manage inventory of pet products (food, toys, medicines, vaccines)
- **Order Processing**: Approve/disapprove service requests and product orders
- **Inventory Control**: Track stock levels with automated low-stock alerts
- **Delivery Management**: Configure delivery zones and location-based pricing
- **Analytics Dashboard**: Generate comprehensive sales reports and business insights
- **Purchase History**: View complete transaction and service history

### User Experience
- **User Registration & Authentication**: Secure account creation and login
- **Product Catalog**: Browse products with detailed descriptions, images, and specifications
- **Service Booking**: Schedule veterinary appointments with real-time availability
- **Shopping Cart**: Add products with quantity selection and price calculations
- **Secure Checkout**: Multiple payment options with delivery address management
- **Order Tracking**: Real-time status updates and delivery progress monitoring
- **Reviews & Ratings**: Rate and review products and services post-purchase

## 🛠️ Technology Stack

### Backend
- **Framework**: Python Flask
- **Database**: PostgreSQL
- **Testing**: Minitests

### Frontend
- **Framework**: React.js
- **State Management**: Redux Toolkit
- **Testing**: Jest
- **Design**: Mobile-responsive UI (Figma wireframes)

### Integrations
- **Payment Processing**: M-Pesa API, Stripe
- **File Storage**: AWS S3 / Cloudinary for product images
- **Real-time Updates**: WebSocket connections for order tracking

## 📱 User Stories

### For Pet Owners
- Register and securely login to the platform
- Browse comprehensive veterinary services and products
- Add items to cart and schedule service appointments
- Complete secure checkout with multiple payment options
- Track orders and appointments in real-time
- Leave reviews and ratings for purchased items/services

### For Administrators
- Manage product inventory and service offerings
- Process and approve customer orders and service requests
- Monitor stock levels with automated alerts
- Generate business analytics and sales reports
- Configure delivery zones and pricing strategies

## 🏗️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- Git

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/your-team/vetty.git
cd vetty/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Configure your database URL, API keys, etc.

# Run database migrations
flask db upgrade

# Start the development server
flask run
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Configure API endpoints and keys

# Start development server
npm start
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📊 API Documentation

The API follows RESTful conventions with the following main endpoints:

- `GET/POST /api/products` - Product management
- `GET/POST /api/services` - Service management  
- `GET/POST /api/orders` - Order processing
- `GET/POST /api/appointments` - Service booking
- `POST /api/payments` - Payment processing
- `GET /api/analytics` - Business analytics

Full API documentation available at `/api/docs` when running the development server.

## 🔐 Security Features

- JWT-based authentication
- Role-based access control (Admin/User)
- Secure payment processing
- Data validation and sanitization
- HTTPS enforcement in production

## 📈 Future Enhancements

- Push notifications for order updates
- Loyalty program and rewards system
- Advanced analytics with ML insights
- Multi-language support
- Integration with veterinary clinic management systems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Vetty** - Making pet care accessible, one click at a time! 🐕🐱