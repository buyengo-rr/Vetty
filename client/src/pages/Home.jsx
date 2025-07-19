import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Heart, ShoppingCart, Calendar, Shield, Clock, Award, Users, Zap, CheckCircle, PlayCircle } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counters, setCounters] = useState({ pets: 0, services: 0, products: 0 });

  const heroSlides = [
    {
      title: "Premium Pet Care at Your Doorstep",
      subtitle: "Professional veterinary services and quality products delivered with love",
      bgClass: "hero-slide-purple",
      accentClass: "accent-gradient-1"
    },
    {
      title: "Emergency Care When You Need It Most",
      subtitle: "24/7 veterinary support for your beloved companions",
      bgClass: "hero-slide-emerald",
      accentClass: "accent-gradient-2"
    },
    {
      title: "Everything Your Pet Needs, One Click Away",
      subtitle: "From premium food to medical supplies, we've got you covered",
      bgClass: "hero-slide-amber",
      accentClass: "accent-gradient-3"
    }
  ];

  const services = [
    { icon: Shield, title: "Health Checkups", desc: "Comprehensive wellness exams", price: "From $45" },
    { icon: Heart, title: "Vaccinations", desc: "Complete immunization programs", price: "From $30" },
    { icon: Calendar, title: "Grooming", desc: "Professional pet grooming services", price: "From $35" },
    { icon: Clock, title: "Emergency Care", desc: "24/7 emergency veterinary support", price: "From $80" }
  ];

  const products = [
    { name: "Premium Dog Food", price: "$29.99", rating: 4.8, image: "🦴" },
    { name: "Cat Wellness Kit", price: "$24.99", rating: 4.9, image: "🐱" },
    { name: "Bird Seed Mix", price: "$12.99", rating: 4.7, image: "🦜" },
    { name: "Fish Tank Setup", price: "$89.99", rating: 4.6, image: "🐠" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const animateCounter = (target, key) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 30);
      };
      animateCounter(5000, 'pets');
      animateCounter(50, 'services');
      animateCounter(1000, 'products');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="vetty-home">
      {/* Hero Section */}
      <div className="hero-section">
        <div className={`hero-slide ${heroSlides[currentSlide].bgClass}`}>
          <div className="hero-overlay"></div>
          <div className="hero-gradient-overlay"></div>
          
          <div className="hero-content">
            <div className={`hero-badge ${heroSlides[currentSlide].accentClass}`}>
              <Zap className="badge-icon" />
              <span>New: Same-day delivery available</span>
            </div>
            
            <h1 className={`hero-title ${heroSlides[currentSlide].accentClass}`}>
              {heroSlides[currentSlide].title}
            </h1>
            
            <p className="hero-subtitle">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            <div className="hero-buttons">
              <button className={`primary-button ${heroSlides[currentSlide].accentClass}`}>
                <ShoppingCart className="button-icon" />
                Shop Now
                <ArrowRight className="button-arrow" />
              </button>
              
              <button className="secondary-button">
                <PlayCircle className="button-icon" />
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="gradient-text-purple">
              Why Choose Vetty?
            </h2>
            <p className="section-description">
              Join thousands of pet parents who trust us with their furry family members
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-container gradient-purple">
                <Users className="stat-icon" />
              </div>
              <h3 className="stat-number purple">{counters.pets.toLocaleString()}+</h3>
              <p className="stat-label">Happy Pets Served</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container gradient-emerald">
                <Award className="stat-icon" />
              </div>
              <h3 className="stat-number emerald">{counters.services}+</h3>
              <p className="stat-label">Expert Services</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container gradient-amber">
                <ShoppingCart className="stat-icon" />
              </div>
              <h3 className="stat-number amber">{counters.products.toLocaleString()}+</h3>
              <p className="stat-label">Premium Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <div className="section-container">
          <h2 className="section-title gradient-text-purple">
            Premium Services
          </h2>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-checkmark gradient-purple">
                  <CheckCircle className="checkmark-icon" />
                </div>
                
                <div className="service-icon-container gradient-purple">
                  <service.icon className="service-icon" />
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.desc}</p>
                <div className="service-footer">
                  <span className="service-price purple">{service.price}</span>
                  <button className="service-button gradient-purple">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <div className="section-container">
          <h2 className="section-title gradient-text-emerald">
            Featured Products
          </h2>
          
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image gradient-emerald">
                  {product.image}
                </div>
                
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`} />
                      ))}
                    </div>
                    <span className="rating-value">({product.rating})</span>
                  </div>
                  
                  <div className="product-footer">
                    <span className="product-price emerald">{product.price}</span>
                    <button className="product-button gradient-emerald">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Give Your Pet the Best?
          </h2>
          <p className="cta-description">
            Join thousands of pet parents who trust Vetty for all their pet care needs
          </p>
          
          <div className="cta-buttons">
            <button className="cta-primary-button gradient-purple">
              <Calendar className="button-icon" />
              Schedule Service
              <ArrowRight className="button-arrow" />
            </button>
            
            <button className="cta-secondary-button">
              <ShoppingCart className="button-icon" />
              Browse Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;