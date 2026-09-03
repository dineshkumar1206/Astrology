import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Checkout = lazy(() => import('./components/Checkout'));
const ProductCategoryDetail = lazy(() => import('./pages/ProductCategoryDetail'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));

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
      
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center text-sara-gold"><div className="w-8 h-8 border-4 border-sara-gold border-t-transparent rounded-full animate-spin"></div></div>}>
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
      </Suspense>
      
      {!isDashboard && <Footer />}
    </div>
  );
}
