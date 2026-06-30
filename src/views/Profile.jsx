'use client';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '../utils/router-compat';
import { useAuth } from '../context/AuthContext';
import { 
  User, MapPin, Lock, Package, Truck, Phone, AlertTriangle, 
  ShieldCheck, FileText, Moon, LogOut, ChevronRight, ShoppingBag,
  ArrowLeft, CheckCircle, Save, Key, Loader, ShieldAlert
} from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 
  'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
];

const Profile = () => {
  const { user, userIsAuthenticated, userLoading, userLogout, userUpdateProfile } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if guest
  useEffect(() => {
    if (!userLoading && !userIsAuthenticated) {
      navigate('/login', { state: { from: '/profile' } });
    }
  }, [userIsAuthenticated, userLoading, navigate]);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] md:bg-cream/10 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <Loader className="h-8 w-8 text-mv-olive animate-spin" />
          <p className="text-xs font-bold text-mv-dark-green/40">Aligning energy...</p>
        </div>
      </div>
    );
  }

  const [activeSection, setActiveSection] = useState('main'); // main, appearance, profile, address, orders, track
  const [isDark, setIsDark] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchOrderId, setSearchOrderId] = useState('');

  // Forms
  const [profileData, setProfileData] = useState({
    name: '',
    address: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    password: '',
    confirmPassword: ''
  });

  const [updating, setUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle dark mode initial check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDarkTheme = document.documentElement.classList.contains('dark') || 
        localStorage.getItem('theme') === 'dark';
      setIsDark(isDarkTheme);
      if (isDarkTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Pre-fill profile state
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || 'Karnataka',
        pincode: user.pincode || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const toggleTheme = (val) => {
    setIsDark(val);
    if (val) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogoutClick = () => {
    userLogout();
    navigate('/login');
  };

  const fetchUserOrders = async () => {
    setOrdersLoading(true);
    try {
      const token = localStorage.getItem('matree_user_token');
      const response = await fetch('/api/auth/user/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleUpdate = async (type) => {
    setErrorMsg('');
    setSuccessMsg('');
    
    let payload = {};
    if (type === 'profile') {
      if (!profileData.name.trim()) {
        setErrorMsg('Name is required');
        return;
      }
      payload = { name: profileData.name };
    } else if (type === 'password') {
      if (!profileData.password || profileData.password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long');
        return;
      }
      if (profileData.password !== profileData.confirmPassword) {
        setErrorMsg('Passwords do not match');
        return;
      }
      payload = { password: profileData.password };
    } else if (type === 'address') {
      if (!profileData.address.trim() || !profileData.city.trim() || !profileData.pincode.trim()) {
        setErrorMsg('Please fill in all address fields');
        return;
      }
      if (profileData.pincode.trim().length !== 6) {
        setErrorMsg('Pincode must be exactly 6 digits');
        return;
      }
      payload = {
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        pincode: profileData.pincode
      };
    }
    
    setUpdating(true);
    try {
      const res = await userUpdateProfile(payload);
      if (res.success) {
        setSuccessMsg(
          type === 'profile' 
            ? 'Profile details updated!' 
            : type === 'password'
              ? 'Password successfully changed!'
              : 'Delivery address saved successfully!'
        );
        if (type === 'password') {
          setProfileData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        }
      } else {
        setErrorMsg(res.message || 'Action failed');
      }
    } catch (err) {
      setErrorMsg('Server connection failure. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const navigateToSection = (section) => {
    setErrorMsg('');
    setSuccessMsg('');
    setActiveSection(section);
    if (section === 'orders' || section === 'track') {
      fetchUserOrders();
    }
  };

  // Helper to get formatted status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-50 border border-green-200';
      case 'shipped': return 'text-blue-600 bg-blue-50 border border-blue-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border border-red-200';
      default: return 'text-amber-600 bg-amber-50 border border-amber-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-cream/10 pb-24 font-sans select-none transition-colors duration-300">
      <div className="max-w-md mx-auto bg-[#F8FAFC] min-h-screen flex flex-col justify-between relative shadow-lg border-x border-mv-dark-green/5 p-6">
        
        <div className="space-y-6 flex-grow pb-16">
          
          {/* HEADER BACK NAVIGATION BAR */}
          {activeSection !== 'main' && (
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setActiveSection('main')}
                className="w-10 h-10 rounded-full bg-white border border-mv-dark-green/5 shadow-sm flex items-center justify-center text-mv-dark-green hover:bg-mv-input-bg transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-base font-black text-mv-dark-green capitalize tracking-wide">
                {activeSection === 'profile' ? 'Change Password' : activeSection === 'track' ? 'Track Order' : activeSection.replace('-', ' ')}
              </h1>
            </div>
          )}

          {/* Alert messages */}
          {errorMsg && (
            <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs font-bold text-left animate-slide-in">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-green-50 border border-green-100 text-green-700 text-xs font-bold text-left animate-slide-in">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: MAIN PROFILE PAGE MENU */}
          {/* ========================================== */}
          {activeSection === 'main' && (
            <div className="space-y-6">
              {/* Profile Card */}
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

              {/* Appearance Toggle */}
              <div className="bg-white rounded-[1.5rem] p-4 border border-mv-dark-green/5 shadow-sm flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-mv-dark-green/70" />
                  <span className="text-sm font-black text-mv-dark-green">Appearance</span>
                </div>
                <button 
                  onClick={() => navigateToSection('appearance')}
                  className="flex items-center gap-1 text-xs font-bold text-charcoal/45 hover:text-mv-olive cursor-pointer"
                >
                  <span>{isDark ? 'Dark' : 'Light'}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Account Block */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-l-4 border-mv-olive pl-2">
                  <h3 className="text-xs font-black uppercase text-mv-dark-green/50 tracking-wider">Account</h3>
                </div>
                <div className="bg-white rounded-[2rem] overflow-hidden border border-mv-dark-green/5 shadow-sm divide-y divide-mv-dark-green/5">
                  
                  <button 
                    onClick={() => navigateToSection('profile')}
                    className="flex items-center justify-between w-full p-4.5 hover:bg-mv-input-bg transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                      <span className="text-sm font-black text-mv-dark-green">Your Profile</span>
                    </div>
                    <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
                  </button>

                  <button 
                    onClick={() => navigateToSection('address')}
                    className="flex items-center justify-between w-full p-4.5 hover:bg-mv-input-bg transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                      <span className="text-sm font-black text-mv-dark-green">Manage Address</span>
                    </div>
                    <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
                  </button>

                </div>
              </div>

              {/* Orders Block */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-l-4 border-mv-olive pl-2">
                  <h3 className="text-xs font-black uppercase text-mv-dark-green/50 tracking-wider">Orders</h3>
                </div>
                <div className="bg-white rounded-[2rem] overflow-hidden border border-mv-dark-green/5 shadow-sm divide-y divide-mv-dark-green/5">
                  
                  <button 
                    onClick={() => navigateToSection('orders')}
                    className="flex items-center justify-between w-full p-4.5 hover:bg-mv-input-bg transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                      <span className="text-sm font-black text-mv-dark-green">My Orders</span>
                    </div>
                    <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
                  </button>

                  <button 
                    onClick={() => navigateToSection('track')}
                    className="flex items-center justify-between w-full p-4.5 hover:bg-mv-input-bg transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                      <span className="text-sm font-black text-mv-dark-green">Track Order</span>
                    </div>
                    <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
                  </button>

                </div>
              </div>

              {/* Legal Block */}
              <div className="bg-white rounded-[2rem] overflow-hidden border border-mv-dark-green/5 shadow-sm divide-y divide-mv-dark-green/5">
                <Link to="/contact" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                    <span className="text-sm font-black text-mv-dark-green">Contact Us</span>
                  </div>
                  <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
                </Link>
                <Link to="/about" className="flex items-center justify-between p-4.5 hover:bg-mv-input-bg transition-colors text-left group">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-mv-dark-green/70 group-hover:text-mv-olive transition-colors" />
                    <span className="text-sm font-black text-mv-dark-green">Privacy Policy & Terms</span>
                  </div>
                  <ChevronRight className="h-4.5 w-4.5 text-charcoal/30 group-hover:text-mv-olive transition-all group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Logout Block */}
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
          )}

          {/* ========================================== */}
          {/* VIEW: APPEARANCE SECTION */}
          {/* ========================================== */}
          {activeSection === 'appearance' && (
            <div className="bg-white rounded-[2rem] p-6 border border-mv-dark-green/5 shadow-sm space-y-6 text-left animate-slide-in">
              <p className="text-xs text-charcoal/50 leading-relaxed font-medium">
                Choose a visualization interface theme standard for your wellness experience.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => toggleTheme(false)}
                  className={`flex items-center justify-between w-full p-4 rounded-2xl border transition-all cursor-pointer ${
                    !isDark 
                      ? 'border-mv-olive bg-mv-yellow-green/10 text-mv-dark-green font-bold' 
                      : 'border-mv-dark-green/5 text-charcoal/70'
                  }`}
                >
                  <span className="text-sm font-black">Light Ritual Mode</span>
                  {!isDark && <CheckCircle className="h-5 w-5 text-mv-olive" />}
                </button>

                <button
                  onClick={() => toggleTheme(true)}
                  className={`flex items-center justify-between w-full p-4 rounded-2xl border transition-all cursor-pointer ${
                    isDark 
                      ? 'border-mv-yellow-green bg-mv-olive/20 text-[#fafdf6] font-bold' 
                      : 'border-mv-dark-green/5 text-charcoal/70'
                  }`}
                >
                  <span className="text-sm font-black">Dark Forest Mode</span>
                  {isDark && <CheckCircle className="h-5 w-5 text-mv-yellow-green" />}
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: YOUR PROFILE SECTION */}
          {/* ========================================== */}
          {activeSection === 'profile' && (
            <div className="space-y-6 text-left animate-slide-in">
              {!userIsAuthenticated ? (
                <div className="bg-white rounded-[2rem] p-6 text-center space-y-4 border border-mv-dark-green/5 shadow-sm">
                  <p className="text-sm font-bold text-charcoal/60">Please sign in to update your profile details.</p>
                  <Link to="/login" className="inline-block px-6 py-2.5 bg-mv-olive text-cream rounded-full font-bold text-xs uppercase tracking-wider hover:bg-mv-deep-green transition-colors">
                    Go to Sign In
                  </Link>
                </div>
              ) : (
                <>
                  {/* Name Details Update */}
                  <div className="bg-white rounded-[2rem] p-5.5 border border-mv-dark-green/5 shadow-sm space-y-4">
                    <h3 className="text-xs font-black uppercase text-mv-dark-green/50 tracking-wider">Profile Information</h3>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-charcoal/60">Full Name</label>
                      <input 
                        type="text" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-mv-input-bg/70 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mv-olive font-bold text-mv-dark-green"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-charcoal/60">Email Address (Cannot Change)</label>
                      <input 
                        type="email" 
                        value={user.email} 
                        disabled
                        className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl px-4 py-3 text-sm font-bold text-charcoal/40 cursor-not-allowed"
                      />
                    </div>

                    <button
                      onClick={() => handleUpdate('profile')}
                      disabled={updating}
                      className="w-full bg-mv-olive text-cream hover:bg-mv-deep-green py-3.5 rounded-full shadow-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {updating ? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Update Profile
                    </button>
                  </div>

                  {/* Password Update */}
                  <div className="bg-white rounded-[2rem] p-5.5 border border-mv-dark-green/5 shadow-sm space-y-4">
                    <h3 className="text-xs font-black uppercase text-mv-dark-green/50 tracking-wider">Change Password</h3>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-charcoal/60">New Password</label>
                      <input 
                        type="password" 
                        value={profileData.password} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="••••••••"
                        className="w-full bg-mv-input-bg/70 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mv-olive font-bold text-mv-dark-green"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-charcoal/60">Confirm New Password</label>
                      <input 
                        type="password" 
                        value={profileData.confirmPassword} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="••••••••"
                        className="w-full bg-mv-input-bg/70 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mv-olive font-bold text-mv-dark-green"
                      />
                    </div>

                    <button
                      onClick={() => handleUpdate('password')}
                      disabled={updating}
                      className="w-full bg-mv-olive text-cream hover:bg-mv-deep-green py-3.5 rounded-full shadow-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {updating ? <Loader className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
                      Change Password
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: MANAGE ADDRESS SECTION */}
          {/* ========================================== */}
          {activeSection === 'address' && (
            <div className="space-y-6 text-left animate-slide-in">
              {!userIsAuthenticated ? (
                <div className="bg-white rounded-[2rem] p-6 text-center space-y-4 border border-mv-dark-green/5 shadow-sm">
                  <p className="text-sm font-bold text-charcoal/60">Please sign in to manage your addresses.</p>
                  <Link to="/login" className="inline-block px-6 py-2.5 bg-mv-olive text-cream rounded-full font-bold text-xs uppercase tracking-wider hover:bg-mv-deep-green transition-colors">
                    Go to Sign In
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-5.5 border border-mv-dark-green/5 shadow-sm space-y-4">
                  <h3 className="text-xs font-black uppercase text-mv-dark-green/50 tracking-wider">Default Delivery Address</h3>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal/60">Street Address</label>
                    <textarea 
                      value={profileData.address} 
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      rows="3"
                      placeholder="Apartment name, building, street address"
                      className="w-full bg-mv-input-bg/70 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mv-olive font-bold text-mv-dark-green resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-charcoal/60">City</label>
                      <input 
                        type="text" 
                        value={profileData.city} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Bengaluru"
                        className="w-full bg-mv-input-bg/70 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mv-olive font-bold text-mv-dark-green"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-charcoal/60">Pincode</label>
                      <input 
                        type="text" 
                        value={profileData.pincode} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '') }))}
                        placeholder="560001"
                        maxLength="6"
                        className="w-full bg-mv-input-bg/70 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mv-olive font-bold text-mv-dark-green"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal/60">State</label>
                    <select
                      value={profileData.state}
                      onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full bg-mv-input-bg/70 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mv-olive font-bold text-mv-dark-green appearance-none cursor-pointer"
                    >
                      {INDIAN_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => handleUpdate('address')}
                    disabled={updating}
                    className="w-full bg-mv-olive text-cream hover:bg-mv-deep-green py-3.5 rounded-full shadow-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                  >
                    {updating ? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Shipping Address
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: MY ORDERS SECTION */}
          {/* ========================================== */}
          {activeSection === 'orders' && (
            <div className="space-y-6 text-left animate-slide-in">
              {!userIsAuthenticated ? (
                <div className="bg-white rounded-[2rem] p-6 text-center space-y-4 border border-mv-dark-green/5 shadow-sm">
                  <p className="text-sm font-bold text-charcoal/60">Please sign in to view your orders.</p>
                  <Link to="/login" className="inline-block px-6 py-2.5 bg-mv-olive text-cream rounded-full font-bold text-xs uppercase tracking-wider hover:bg-mv-deep-green transition-colors">
                    Go to Sign In
                  </Link>
                </div>
              ) : ordersLoading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader className="h-8 w-8 text-mv-olive animate-spin" />
                  <p className="text-xs font-bold text-charcoal/40">Fetching your wellness logs...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-8 text-center border border-mv-dark-green/5 shadow-sm space-y-4">
                  <div className="w-16 h-16 rounded-full bg-mv-yellow-green/10 flex items-center justify-center mx-auto text-mv-olive">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-mv-dark-green">No orders found</p>
                    <p className="text-xs text-charcoal/50">You haven't ordered any Ayurvedic elixirs yet.</p>
                  </div>
                  <Link to="/products" className="inline-block px-6 py-2.5 bg-mv-olive text-cream rounded-full font-bold text-xs uppercase tracking-wider hover:bg-mv-deep-green transition-colors">
                    Explore Elixirs
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div 
                      key={order.id} 
                      className="bg-white rounded-[2rem] p-5 border border-mv-dark-green/5 shadow-sm space-y-3.5"
                    >
                      <div className="flex items-center justify-between border-b border-mv-dark-green/5 pb-2.5">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-black uppercase text-mv-dark-green/50 tracking-wider">Order ID</p>
                          <p className="text-xs font-black text-mv-dark-green font-mono">{order.id.slice(0, 10).toUpperCase()}...</p>
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-2.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="font-bold text-charcoal/80">
                              {item.product?.name || 'Ayurvedic Elixir'} <span className="text-[10px] font-bold text-charcoal/40">x{item.quantity}</span>
                            </span>
                            <span className="font-bold text-mv-dark-green">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-mv-dark-green/5 pt-3">
                        <div className="text-[10px] text-charcoal/40 font-bold">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[10px] font-bold text-charcoal/40">Total:</span>
                          <span className="text-sm font-black text-mv-dark-green">₹{order.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: TRACK ORDER SECTION */}
          {/* ========================================== */}
          {activeSection === 'track' && (
            <div className="space-y-6 text-left animate-slide-in">
              {/* Order Search bar */}
              <div className="bg-white rounded-[2rem] p-5.5 border border-mv-dark-green/5 shadow-sm space-y-4">
                <h3 className="text-xs font-black uppercase text-mv-dark-green/50 tracking-wider">Track Order Progress</h3>
                
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchOrderId} 
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    placeholder="Enter Order ID"
                    className="w-full bg-mv-input-bg/70 border border-charcoal/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-mv-olive font-bold text-mv-dark-green font-mono uppercase"
                  />
                  <button 
                    onClick={() => {
                      if (!searchOrderId.trim()) return;
                      const matched = orders.find(o => o.id.toLowerCase() === searchOrderId.trim().toLowerCase() || o.id.slice(0, 10).toLowerCase() === searchOrderId.trim().toLowerCase());
                      if (matched) {
                        setSelectedOrder(matched);
                        setErrorMsg('');
                      } else {
                        setSelectedOrder(null);
                        setErrorMsg('Order ID not found in your purchase history.');
                      }
                    }}
                    className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-mv-olive text-cream flex items-center justify-center hover:bg-mv-deep-green cursor-pointer transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {orders.length > 0 && !selectedOrder && (
                  <div className="space-y-2.5 pt-1">
                    <p className="text-[10px] font-bold text-charcoal/45 uppercase tracking-wide">Or select from recent purchases:</p>
                    <div className="max-h-36 overflow-y-auto divide-y divide-mv-dark-green/5 border border-mv-dark-green/5 rounded-xl pr-1">
                      {orders.map(order => (
                        <button
                          key={order.id}
                          onClick={() => {
                            setSelectedOrder(order);
                            setErrorMsg('');
                          }}
                          className="w-full text-left p-3 hover:bg-mv-input-bg transition-colors flex items-center justify-between text-xs cursor-pointer font-bold"
                        >
                          <span className="font-mono text-mv-dark-green">{order.id.slice(0, 10).toUpperCase()}...</span>
                          <span className="text-[10px] text-charcoal/45 uppercase">{order.status}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Status Timeline Tracker */}
              {selectedOrder && (
                <div className="bg-white rounded-[2rem] p-6 border border-mv-dark-green/5 shadow-sm space-y-6 animate-slide-in">
                  <div className="flex items-center justify-between border-b border-mv-dark-green/5 pb-3">
                    <div>
                      <p className="text-[10px] font-black uppercase text-mv-dark-green/50 tracking-wider">Tracking Order</p>
                      <p className="text-xs font-black text-mv-dark-green font-mono">{selectedOrder.id.toUpperCase()}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedOrder(null)}
                      className="text-[10px] font-bold text-mv-olive hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Status Steps */}
                  <div className="relative pl-6 space-y-6">
                    <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-mv-yellow-green/30"></div>
                    
                    {/* Step 1: Placed */}
                    <div className="relative flex gap-3 text-left">
                      <div className="absolute -left-[22px] top-1.5 w-4 h-4 rounded-full bg-green-500 border border-white shadow-sm flex items-center justify-center text-cream">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-mv-dark-green">Order Received</h4>
                        <p className="text-[10px] text-charcoal/50 leading-relaxed font-medium">Your elixir blend details were received and logged into our dispensary logs.</p>
                      </div>
                    </div>

                    {/* Step 2: Preparing */}
                    <div className="relative flex gap-3 text-left">
                      <div className={`absolute -left-[22px] top-1.5 w-4 h-4 rounded-full border border-white shadow-sm flex items-center justify-center ${
                        ['shipped', 'delivered'].includes(selectedOrder.status.toLowerCase())
                          ? 'bg-green-500 text-cream'
                          : selectedOrder.status.toLowerCase() === 'pending'
                            ? 'bg-amber-400 text-cream animate-pulse'
                            : 'bg-mv-yellow-green/30'
                      }`}>
                        {['shipped', 'delivered'].includes(selectedOrder.status.toLowerCase()) ? <CheckCircle className="h-3 w-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-mv-dark-green">Preparing for Dispatch</h4>
                        <p className="text-[10px] text-charcoal/50 leading-relaxed font-medium">Bottle inspection, sealing, and packaging rituals are underway.</p>
                      </div>
                    </div>

                    {/* Step 3: Shipped */}
                    <div className="relative flex gap-3 text-left">
                      <div className={`absolute -left-[22px] top-1.5 w-4 h-4 rounded-full border border-white shadow-sm flex items-center justify-center ${
                        ['delivered'].includes(selectedOrder.status.toLowerCase())
                          ? 'bg-green-500 text-cream'
                          : selectedOrder.status.toLowerCase() === 'shipped'
                            ? 'bg-blue-500 text-cream animate-pulse'
                            : 'bg-mv-yellow-green/30'
                      }`}>
                        {['delivered'].includes(selectedOrder.status.toLowerCase()) ? <CheckCircle className="h-3 w-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-mv-dark-green">Shipped</h4>
                        <p className="text-[10px] text-charcoal/50 leading-relaxed font-medium">Handed over to our courier partner. Transit details are being verified.</p>
                      </div>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="relative flex gap-3 text-left">
                      <div className={`absolute -left-[22px] top-1.5 w-4 h-4 rounded-full border border-white shadow-sm flex items-center justify-center ${
                        selectedOrder.status.toLowerCase() === 'delivered'
                          ? 'bg-green-500 text-cream'
                          : 'bg-mv-yellow-green/30'
                      }`}>
                        {selectedOrder.status.toLowerCase() === 'delivered' ? <CheckCircle className="h-3 w-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-mv-dark-green">Delivered</h4>
                        <p className="text-[10px] text-charcoal/50 leading-relaxed font-medium">Your Ayurvedic elixirs reached their destination. Namaste!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;
