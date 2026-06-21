'use client';
import React, { useState } from 'react';
import { Link, useNavigate } from '../utils/router-compat';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Menu, X, Leaf, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { cartCount, setCartOpen } = useCart();
  const { admin, isAuthenticated, logout, user, userIsAuthenticated, userLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Wellness Products', path: '/products' },
    { name: 'Find Your Dosha', path: '/dosha-quiz' },
    { name: 'Learn Ayurveda', path: '/blog' },
    { name: 'Our Story', path: '/about' },
    { name: 'Connect', path: '/contact' }
  ];

  const handleAdminLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-mv-dark-green/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-sans text-2xl md:text-3xl font-black tracking-[0.18em] text-mv-dark-green group-hover:text-mv-olive transition-colors duration-300 uppercase">
                MAATRAVEDA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-sans text-sm font-semibold text-charcoal/80 hover:text-mv-olive transition-colors duration-200 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mv-olive transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Customer Auth Profile or Login icon */}
            {userIsAuthenticated ? (
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-mv-dark-green pl-4 border-l border-mv-dark-green/15">
                <span>Namaste, {user.name}</span>
                <button
                  onClick={userLogout}
                  className="text-terracotta hover:text-red-700 font-semibold cursor-pointer underline ml-1"
                  title="Sign Out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-charcoal/60 hover:text-mv-olive transition-colors pl-4 border-l border-mv-dark-green/15"
                title="Customer Sign In"
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* Admin specific link */}
            {isAuthenticated && (
              <div className="flex items-center gap-4 pl-4 border-l border-mv-dark-green/20">
                <Link
                  to="/admin"
                  className="font-sans text-xs bg-mv-olive text-cream font-bold py-1.5 px-3 rounded-full hover:bg-mv-deep-green transition-all shadow-sm flex items-center gap-1.5"
                >
                  <User className="h-3 w-3" /> Dashboard
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="text-terracotta hover:text-red-700 transition-colors p-1 cursor-pointer"
                  title="Logout Admin"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons (Cart & Mobile Hamburger) */}
          <div className="flex items-center gap-4">

            {/* Shopping Bag Icon with Badge */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-mv-olive/5 text-mv-dark-green hover:text-mv-olive transition-all duration-300 group"
              aria-label="Open Cart"
            >
              <ShoppingBag className="h-6 w-6 stroke-[2px] group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-cream bg-terracotta rounded-full scale-95 border-2 border-cream animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-mv-dark-green hover:text-mv-olive hover:bg-mv-olive/5 focus:outline-none transition-colors duration-200"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Sliding Navigation Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-cream border-b border-mv-dark-green/10 shadow-lg transition-all duration-300 ease-in-out transform ${mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
          }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md font-sans text-base font-semibold text-charcoal/80 hover:text-mv-olive hover:bg-mv-olive/5 transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}

          {/* Customer Auth Portal - Mobile View */}
          {userIsAuthenticated ? (
            <div className="pt-4 border-t border-mv-dark-green/10 flex items-center justify-between px-3">
              <div className="flex items-center gap-2 text-sm font-sans font-bold text-mv-dark-green">
                <User className="h-4 w-4 text-mv-olive fill-mv-olive/10" />
                <span>Namaste, {user.name}</span>
              </div>
              <button
                onClick={() => {
                  userLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-terracotta hover:text-red-700 font-semibold text-sm cursor-pointer underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-mv-dark-green/10 px-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 text-sm font-sans font-bold text-mv-dark-green hover:text-mv-olive transition-colors py-1"
              >
                <User className="h-4 w-4 text-mv-dark-green/60" />
                <span>Customer Sign In</span>
              </Link>
            </div>
          )}

          {/* Admin Specific Portal - Mobile View */}
          {isAuthenticated ? (
            <div className="pt-3 border-t border-mv-dark-green/5 flex items-center justify-between px-3">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 text-mv-dark-green font-bold text-xs bg-mv-olive/5 py-1.5 px-3 rounded-full border border-mv-olive/20"
              >
                <User className="h-3 w-3" /> Admin Dashboard
              </Link>
              <button
                onClick={() => {
                  handleAdminLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-terracotta font-semibold text-xs flex items-center gap-1"
              >
                <LogOut className="h-3 w-3" /> Logout Admin
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-mv-dark-green/5 px-3">
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 font-sans text-xs text-charcoal/40 hover:text-mv-olive transition-colors"
              >
                🔐 Admin Portal
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
