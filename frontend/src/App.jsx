import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProductCategoryDetail from './pages/ProductCategoryDetail';
import About from './pages/About/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './dashboard/Dashboard';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on path change
  useEffect(() => {
    // If there is a hash (e.g., #about), handle scrolling after route changes
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Default to top scroll
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname, location.hash]);

  const isDashboard = location.pathname.startsWith('/dashboard');

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
            <Checkout 
              cartItems={cart} 
              setCartItems={setCart} 
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
      {!isDashboard && <Footer />}
    </div>
  );
}