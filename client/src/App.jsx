import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from './components/common/Footer';
import Header from "./components/common/Header";
import Sidebar from "./components/common/sidebar";
import Home from './pages/Home';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from './pages/Products';
import Services from './pages/Services';
import AdminDashboard from "./components/admin/Dashboard";
import UserDashboard from "./components/user/Dashboard";
import UserProfile from "./components/user/Profile";
import BookAppointment from "./components/user/appointment";
import UsersList from "./components/admin/UsersList";
import AdminProfile from "./components/admin/AdminProfile";
import AdminProducts from "./components/admin/ProductManagement";
import OrderManagement from "./components/admin/OrderManagement";
import AdminServicePage from "./components/admin/ServiceManagement";
import Cart from "./components/cart/Cart";
import CheckoutPage from "./components/cart/Checkout";

import './App.css';
import AdminAppointmentsPage from "./components/admin/appointment";
import UserProducts from "./components/user/Products";
import ServiceList from "./shop/ServiceList";


function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!localStorage.getItem("token");

  const publicPaths = ["/", "/login", "/register", "/about", "/contact"];
  const isPublicPage = publicPaths.includes(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    const imageUrls = [
      '/hero-pets.jpg',
      '/dog-checkup.jpg',
      '/pet-grooming.jpg',
      '/pet-surgery.jpg',
      '/cta-pets.jpg'
    ];
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <div className="App">
      {isLoading && (
        <div className="page-loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className={`app-container ${isLoading ? 'loading' : ''}`}>
        {/* Show Header only on public pages */}
        {isPublicPage && <Header />}

        {/* Show Sidebar on private authenticated pages */}
        {!isPublicPage && isAuthenticated && <Sidebar />}

        <main
          className={`main-content 
            ${isAuthenticated && !isPublicPage ? 'with-sidebar' : 'no-sidebar'} 
            ${location.pathname === '/' ? 'home-page' : ''}
          `}
        >
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
             Modal.setAppElement('#root');

            {/* User */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/products" element={<UserProducts/>}/>
            <Route path="/user/services" element={<ServiceList/>}/>
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/appointment" element={<BookAppointment/>}/>
            <Route path="/user/cart" element={<Cart />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/admin/services" element={<AdminServicePage />} />
            <Route path="/admin/appointments" element={<AdminAppointmentsPage/>}/>

            {/* Shared */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <ToastContainer />
        {isPublicPage && <Footer />}
        <ScrollToTop />
      </div>
    </div>
  );
}

// Not Found
function NotFound() {
  return (
    <div className="not-found">
      <div className="error-content">
        <div className="error-icon">🐾</div>
        <h1>Page Not Found</h1>
        <p>Looks like this page wandered off! Let's get you back home.</p>
        <a href="/" className="primary-button">Go Home</a>
      </div>
    </div>
  );
}

// Scroll To Top
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default App;
