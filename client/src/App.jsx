import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from './components/common/Footer';
import Header from "./components/common/Header";
import Sidebar from "./components/common/sidebar"; 
import ServiceBooking from "./components/booking/ServiceBooking";
import AppointmentSchedule from "./components/booking/AppointmentSchedule";
import BookingConfirmation from "./components/booking/BookingConfirmation";



import Home from './pages/Home';
import AdminDashboard from './components/admin/Dashboard'; 
import UserDashboard from "./components/user/Dashboard";
import Products from './pages/Products';
import Services from './pages/Services';
import './App.css';
import UserProfile from "./components/user/Profile";

import UsersList from "./components/admin/UsersList";
import AdminProfile from "./components/admin/AdminProfile";


function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem("token");
  const publicPaths = ["/", "/login", "/register"];
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

    const loadTimer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div className="App">
      {isLoading && (
        <div className="page-loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className={`app-container ${isLoading ? 'loading' : ''}`}>
        {isAuthenticated && !isPublicPage ? <Sidebar /> : <Header />}

        <main className={`main-content
          ${isAuthenticated && !isPublicPage ? 'with-sidebar' : ''}
          ${location.pathname === '/' ? 'home-page' : ''}
        `}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
            <Route path="/user/dashboard" element={<UserDashboard />} /> 
            <Route path="/user/products" element={<Products />} />
            <Route path="/user/services" element={<Services />} />
            <Route path="/user/profile" element={<UserProfile/>}/>

            <Route path="/user/Appointment" element={<AppointmentSchedule />} />
            <Route path="/user/Booking" element={<BookingConfirmation />} />
            <Route path="/user/Service" element={<ServiceBooking />} />

            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/profile" element={<AdminProfile />} />

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
        <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default App;
