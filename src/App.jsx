import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ClientLayoutWrapper from './components/ClientLayoutWrapper';

// Import Route-level Pages
import Home from './views/Home';
import Products from './views/Products';
import ProductDetail from './views/ProductDetail';
import About from './views/About';
import Contact from './views/Contact';
import Login from './views/Login';
import AdminLogin from './views/AdminLogin';
import AdminDashboard from './views/AdminDashboard';
import DoshaQuiz from './views/DoshaQuiz';
import Blog from './views/Blog';
import BlogPost from './views/BlogPost';
import Cart from './views/Cart';
import Checkout from './views/Checkout';
import OrderConfirmation from './views/OrderConfirmation';
import Profile from './views/Profile';
import Onboarding from './views/Onboarding';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ClientLayoutWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/dosha-quiz" element={<DoshaQuiz />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
          </ClientLayoutWrapper>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
