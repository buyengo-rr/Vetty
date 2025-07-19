import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from './components/common/Footer';
import Header from "./components/common/Header";
import Sidebar from "./components/common/sidebar"; 

import Home from './pages/Home';
import Dashboard from './components/admin/Dashboard'; 
import './App.css';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem("token");
  const publicPaths = ["/", "/login", "/register"];
  const isPublicPage = publicPaths.includes(location.pathname);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Page transition effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  // Preload images
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

    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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
        {/* Show Sidebar on protected pages, else Header */}
        {isAuthenticated && !isPublicPage ? <Sidebar /> : <Header />}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* sample protected */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Show footer only on public pages */}
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
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default App;
