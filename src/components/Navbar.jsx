'use client';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '../utils/router-compat';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Menu, X, User, LogOut, Search, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { cartCount, setCartOpen } = useCart();
  const { admin, isAuthenticated, logout, user, userIsAuthenticated, userLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Shop', path: '/products', hasDropdown: true },
    { name: 'Find Your Dosha', path: '/dosha-quiz' },
    { name: 'Best Sellers', path: '/products' },
    { name: 'Learn Ayurveda', path: '/blog', hasDropdown: true },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' }
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
            <Link to="/" className="flex items-center gap-3 group">
              <svg className="w-9 h-9 text-[#5B7917] group-hover:text-mv-deep-green transition-colors shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M50 15C50 15 26 38 26 60C26 72 35 82 47 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M50 15C50 15 74 38 74 60C74 72 65 82 53 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M50 15V85" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M50 35C57 32 68 35 72 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M50 48C57 45 68 48 72 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M50 62C57 59 66 62 69 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M50 35C43 32 32 35 28 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M50 48C43 45 32 48 28 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M50 62C43 59 34 62 31 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="font-sans text-xl md:text-2xl font-black tracking-[0.16em] text-mv-dark-green group-hover:text-[#5B7917] transition-colors leading-none uppercase">
                  MAATRAVEDA
                </span>
                <span className="font-sans text-[8px] font-bold tracking-[0.24em] text-[#5B7917]/80 group-hover:text-mv-deep-green transition-colors mt-0.5 leading-none uppercase">
                  AYURVEDA REIMAGINED
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-sans text-[13px] font-semibold text-charcoal/90 hover:text-mv-olive transition-colors duration-200 relative group py-2 flex items-center gap-1"
              >
                <span>{link.name}</span>
                {link.hasDropdown && (
                  <ChevronDown className="h-3.5 w-3.5 text-charcoal/45 group-hover:text-mv-olive transition-colors" />
                )}
              </Link>
            ))}

            {/* Customer Auth Profile or Login icon - integrated directly */}
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
            ) : null}

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
          <div className="flex items-center gap-5">
            
            {/* Search Icon (Desktop only) */}
            <button 
              onClick={() => {
                const searchInput = document.getElementById('desktop-search-input');
                if (searchInput) {
                  searchInput.focus();
                  searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                  navigate('/products');
                }
              }}
              className="hidden md:block text-charcoal/85 hover:text-mv-olive transition-colors cursor-pointer"
              title="Search Products"
            >
              <Search className="h-5 w-5 stroke-[2]" />
            </button>

            {/* Profile silhouette icon */}
            {!userIsAuthenticated && (
              <Link
                to="/login"
                className="hidden md:block text-charcoal/85 hover:text-mv-olive transition-colors"
                title="Customer Sign In"
              >
                <User className="h-5 w-5 stroke-[2]" />
              </Link>
            )}
            {userIsAuthenticated && (
              <Link
                to="/profile"
                className="hidden md:block text-charcoal/85 hover:text-mv-olive transition-colors"
                title="Profile"
              >
                <User className="h-5 w-5 stroke-[2]" />
              </Link>
            )}

            {/* Shopping Bag Icon with Badge */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1.5 rounded-full text-charcoal/85 hover:text-mv-olive transition-all group cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="h-5.5 w-5.5 stroke-[2]" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[9px] font-bold text-cream bg-[#305700] rounded-full border border-cream">
                {cartCount}
              </span>
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
