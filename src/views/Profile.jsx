'use client';
import React from 'react';
import { Link, useNavigate } from '../utils/router-compat';
import { useAuth } from '../context/AuthContext';
import { 
  User, MapPin, Lock, Package, Truck, Phone, AlertTriangle, 
  ShieldCheck, FileText, Moon, LogOut, ChevronRight, ShoppingBag
} from 'lucide-react';

const Profile = () => {
  const { user, userIsAuthenticated, userLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    userLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-cream/10 pb-24 font-sans select-none">
      <div className="max-w-md mx-auto bg-[#F8FAFC] min-h-screen flex flex-col justify-between relative shadow-lg border-x border-mv-dark-green/5 p-6">
        
        <div className="space-y-6 flex-grow pb-16">
          
          {/* ========================================== */}
          {/* 1. PROFILE HEADER CARD (Figma Image 3) */}
          {/* ========================================== */}
          <div className="bg-white rounded-[2rem] p-5 border border-mv-dark-green/5 shadow-sm flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-mv-olive/30 flex items-center justify-center bg-mv-yellow-green/20 text-mv-dark-green font-sans font-black text-lg">
              {userIsAuthenticated && user ? user.name.slice(0, 2).toUpperCase() : 'MV'}
            </div>
            <div className="space-y-0.5">
              <h2 className="text-base font-black text-mv-dark-green">
                {userIsAuthenticated && user ? user.name : 'Guest Seeker'}
              </h2>
              <p className="text-xs text-charcoal/50 leading-none">
                {userIsAuthenticated && user ? user.email : 'guest@maatraveda.com'}
              </p>
            </div>
          </div>

          {/* ========================================== */}
          {/* 2. APPEARANCE (Figma Image 3) */}
          {/* ========================================== */}
          <div className="bg-white rounded-[1.5rem] p-4 border border-mv-dark-green/5 shadow-sm flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-mv-dark-green/70" />
              <span className="text-sm font-black text-mv-dark-green">Appearance</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-charcoal/45">
              <span>Light</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          {/* ========================================== */}
          {/* 3. ACCOUNT ACTIONS BLOCK (Figma Image 3) */}
          {/* ========================================== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-l-4 border-mv-olive pl-2">
              <h3 className="text-xs font-black uppercase text-mv-dark-green/50 tracking-wider">Account</h3>
            </div>
            <div className="bg-white rounded-[2rem] overflow-hidden border border-mv-dark-green/5 shadow-sm divide-y divide-mv-dark-green/5">
              
              <Link to="/profile" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                  <span className="text-sm font-black text-mv-dark-green">Your Profile</span>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
              </Link>

              <Link to="/profile" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                  <span className="text-sm font-black text-mv-dark-green">Manage Address</span>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
              </Link>

              <Link to="/profile" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                  <span className="text-sm font-black text-mv-dark-green">Change Password</span>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
              </Link>

            </div>
          </div>

          {/* ========================================== */}
          {/* 4. ORDERS BLOCK (Figma Image 3) */}
          {/* ========================================== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-l-4 border-mv-olive pl-2">
              <h3 className="text-xs font-black uppercase text-mv-dark-green/50 tracking-wider">Orders</h3>
            </div>
            <div className="bg-white rounded-[2rem] overflow-hidden border border-mv-dark-green/5 shadow-sm divide-y divide-mv-dark-green/5">
              
              <Link to="/profile" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                  <span className="text-sm font-black text-mv-dark-green">My Orders</span>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
              </Link>

              <Link to="/profile" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                  <span className="text-sm font-black text-mv-dark-green">Track Order</span>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
              </Link>

            </div>
          </div>

          {/* ========================================== */}
          {/* 5. HELP & CONTACT (Figma Image 3) */}
          {/* ========================================== */}
          <div className="bg-white rounded-[2rem] overflow-hidden border border-mv-dark-green/5 shadow-sm divide-y divide-mv-dark-green/5">
            
            <Link to="/contact" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                <span className="text-sm font-black text-mv-dark-green">Contact Us</span>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
            </Link>

            <Link to="/contact" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                <span className="text-sm font-black text-mv-dark-green">Report a Problem</span>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
            </Link>

          </div>

          {/* ========================================== */}
          {/* 6. LEGAL BLOCK (Figma Image 3) */}
          {/* ========================================== */}
          <div className="bg-white rounded-[2rem] overflow-hidden border border-mv-dark-green/5 shadow-sm divide-y divide-mv-dark-green/5">
            
            <Link to="/about" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                <span className="text-sm font-black text-mv-dark-green">Privacy Policy</span>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
            </Link>

            <Link to="/about" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                <span className="text-sm font-black text-mv-dark-green">Terms & Conditions</span>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
            </Link>

            <Link to="/about" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-mv-dark-green/70 w-5 text-center leading-none">₹</span>
                <span className="text-sm font-black text-mv-dark-green">Refund & Cancellation</span>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
            </Link>

            <Link to="/about" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                <span className="text-sm font-black text-mv-dark-green">Shipping & Delivery</span>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
            </Link>

          </div>

          {/* ========================================== */}
          {/* 7. LOG OUT TRIGGER (Figma Image 3) */}
          {/* ========================================== */}
          <div className="bg-white rounded-[1.5rem] p-4 border border-mv-dark-green/5 shadow-sm text-left">
            {userIsAuthenticated ? (
              <button 
                onClick={handleLogoutClick}
                className="flex items-center justify-between w-full text-red-600 font-bold hover:text-red-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-black">Log out</span>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-red-600" />
              </button>
            ) : (
              <Link 
                to="/login"
                className="flex items-center justify-between w-full text-mv-olive font-bold hover:text-mv-deep-green cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-black">Sign in / Log in</span>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-mv-olive" />
              </Link>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
