import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProductCategoryDetail from './pages/ProductCategoryDetail';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
    
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname, location.hash]);

  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname === '/admin';

  return (
    <div>
      {!isDashboard && (
        <Navbar 
          cartItems={cart} 
          setCartItems={setCart} 
          isCartOpen={isCartOpen} 
          setIsCartOpen={setIsCartOpen} 
        />
      )}
      <ScrollToTop />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              cart={cart} 
              setCart={setCart} 
              setIsCartOpen={setIsCartOpen} 
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout 
                cartItems={cart} 
                setCartItems={setCart} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products/detail/:id" 
          element={
            <ProductDetail 
              cart={cart} 
              setCart={setCart} 
              setIsCartOpen={setIsCartOpen} 
            />
          } 
        />
        <Route 
          path="/products/:category" 
          element={
            <ProductCategoryDetail 
              cart={cart} 
              setCart={setCart} 
              setIsCartOpen={setIsCartOpen} 
            />
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      {!isDashboard && <Footer />}
    </div>
  );
}
