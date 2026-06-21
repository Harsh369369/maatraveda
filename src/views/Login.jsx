'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from '../utils/router-compat';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowRight, CheckCircle, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Login = () => {
  const { userLogin, userRegister, userIsAuthenticated, userLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState('login'); // login, register
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect to where they came from or home
  useEffect(() => {
    if (!userLoading && userIsAuthenticated) {
      const fromPath = location.state?.from || '/products';
      navigate(fromPath);
    }
  }, [userIsAuthenticated, userLoading, navigate, location]);

  // Handle postMessage OAuth callbacks
  useEffect(() => {
    const handleOAuthMessage = async (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.type === 'MOCK_OAUTH_SUCCESS') {
        const { user: oauthUser, provider: authProvider } = event.data;
        
        setSubmitting(true);
        setErrorMsg('');
        setSuccessMsg(`Authenticating with ${authProvider.charAt(0).toUpperCase() + authProvider.slice(1)}...`);
        
        try {
          const response = await userRegister(oauthUser.name, oauthUser.email, 'mock_oauth_password_123');
          if (response.success) {
            setSuccessMsg(`🌿 Successfully authenticated via ${authProvider.charAt(0).toUpperCase() + authProvider.slice(1)}! Redirecting...`);
            setTimeout(() => navigate('/products'), 1500);
          } else {
            setErrorMsg('Social login simulation failed.');
          }
        } catch (err) {
          setErrorMsg('Authentication failed.');
        } finally {
          setSubmitting(false);
        }
      }
    };
    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, [navigate, userRegister]);

  const handleSocialLogin = (provider) => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      `/mock-oauth.html?provider=${provider}`,
      'oauth_popup',
      `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes`
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const { name, email, password, confirmPassword } = formData;

    if (activeTab === 'login') {
      if (!email || !password) {
        setErrorMsg('Please specify both your email and password credentials.');
        return;
      }

      setSubmitting(true);
      try {
        const response = await userLogin(email, password);
        if (response.success) {
          setSuccessMsg('Successfully authenticated! Redirecting...');
          setTimeout(() => navigate('/products'), 1500);
        } else {
          setErrorMsg(response.message || 'Invalid email or password.');
        }
      } catch (err) {
        setErrorMsg('Login failed due to a server connection error.');
      } finally {
        setSubmitting(false);
      }
    } else {
      // Register validation
      if (!name || !email || !password || !confirmPassword) {
        setErrorMsg('Please fully fill out all registration fields.');
        return;
      }

      if (password.length < 6) {
        setErrorMsg('Your password must contain at least 6 characters.');
        return;
      }

      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify your typing.');
        return;
      }

      setSubmitting(true);
      try {
        const response = await userRegister(name, email, password);
        if (response.success) {
          setSuccessMsg('🌿 Account created successfully! Preparing your workspace...');
          setTimeout(() => navigate('/products'), 1500);
        } else {
          setErrorMsg(response.message || 'Registration failed. Email might already be taken.');
        }
      } catch (err) {
        setErrorMsg('Registration failed due to a server connection error.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const toggleTab = (tabId) => {
    setActiveTab(tabId);
    setErrorMsg('');
    setSuccessMsg('');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-cream/10">
      
      {/* Auth Card Panel */}
      <div className="max-w-md w-full bg-white border border-mv-dark-green/5 p-8 sm:p-10 rounded-[2.5rem] shadow-xl space-y-6 relative overflow-hidden">
        
        {/* Top Logo */}
        <div className="text-center">
          <span className="font-sans text-xs font-black tracking-[0.25em] text-mv-dark-green uppercase">
            MAATRAVEDA
          </span>
        </div>

        {/* Header Titles */}
        <div className="text-left space-y-1">
          <h2 className="font-sans text-2xl sm:text-3xl font-black text-mv-dark-green tracking-tight">
            {activeTab === 'login' ? 'Sign in to your Account' : 'Create an Account'}
          </h2>
          <p className="font-sans text-sm text-charcoal/50">
            {activeTab === 'login' 
              ? 'Enter your email and password to log in' 
              : 'Sign up to begin your personalized Ayurvedic journey'}
          </p>
        </div>

        {/* Feedback Banners */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 p-3.5 bg-red-900/10 text-red-700 border border-red-200 text-xs rounded-2xl text-left font-bold animate-pulse">
            <ShieldAlert className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="flex items-start gap-2.5 p-3.5 bg-mv-olive/10 text-mv-olive border border-mv-olive/20 text-xs rounded-2xl text-left font-bold animate-bounce">
            <CheckCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
          
          {/* Name Input (Register Only) */}
          {activeTab === 'register' && (
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold text-mv-dark-green uppercase tracking-wider pl-4">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="enter your full name"
                  className="w-full px-5 py-3.5 bg-mv-input-bg border-0 focus:ring-2 focus:ring-mv-olive rounded-full text-sm text-charcoal placeholder-charcoal/30 outline-none transition-all duration-200"
                  required
                  disabled={submitting}
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold text-mv-dark-green uppercase tracking-wider pl-4">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                className="w-full px-5 py-3.5 bg-mv-input-bg border-0 focus:ring-2 focus:ring-mv-olive rounded-full text-sm text-charcoal placeholder-charcoal/30 outline-none transition-all duration-200"
                required
                disabled={submitting}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-mv-dark-green uppercase tracking-wider pl-4">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="enter your password"
                className="w-full px-5 py-3.5 bg-mv-input-bg border-0 focus:ring-2 focus:ring-mv-olive rounded-full text-sm text-charcoal placeholder-charcoal/30 outline-none pr-12 transition-all duration-200"
                required
                disabled={submitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-mv-olive transition-colors"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input (Register Only) */}
          {activeTab === 'register' && (
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-xs font-bold text-mv-dark-green uppercase tracking-wider pl-4">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="confirm your password"
                className="w-full px-5 py-3.5 bg-mv-input-bg border-0 focus:ring-2 focus:ring-mv-olive rounded-full text-sm text-charcoal placeholder-charcoal/30 outline-none transition-all duration-200"
                required
                disabled={submitting}
              />
            </div>
          )}

          {/* Log In Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-mv-olive text-cream hover:bg-mv-deep-green font-sans text-sm font-bold py-4 rounded-full shadow-md transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 cursor-pointer mt-4"
          >
            {submitting ? 'Processing...' : activeTab === 'login' ? 'Log In' : 'Sign Up'} 
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Divider "Or login with" */}
        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-charcoal/10"></div>
          </div>
          <div className="relative px-4 bg-white text-xs text-charcoal/40 font-semibold uppercase tracking-wider">
            Or login with
          </div>
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-4">
          <button 
            type="button" 
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-charcoal/10 hover:bg-mv-input-bg hover:border-mv-olive/30 transition-all duration-200 text-charcoal/70 hover:text-mv-olive cursor-pointer"
            aria-label="Sign in with Google"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.54 0-6.423-2.883-6.423-6.423s2.883-6.423 6.423-6.423c1.547 0 2.956.556 4.053 1.652l3.056-3.056C19.23 2.502 15.938 1 12 1 5.925 1 1 5.925 1 12s4.925 11 11 11c6.333 0 10.536-4.444 10.536-10.714 0-.741-.067-1.3-.15-1.715H12.24z"/>
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => handleSocialLogin('facebook')}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-charcoal/10 hover:bg-mv-input-bg hover:border-mv-olive/30 transition-all duration-200 text-charcoal/70 hover:text-mv-olive cursor-pointer"
            aria-label="Sign in with Facebook"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => handleSocialLogin('apple')}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-charcoal/10 hover:bg-mv-input-bg hover:border-mv-olive/30 transition-all duration-200 text-charcoal/70 hover:text-mv-olive cursor-pointer"
            aria-label="Sign in with Apple"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.09.08 2.21-.57 2.94-1.39z"/>
            </svg>
          </button>
        </div>

        {/* Footer Navigation Toggle */}
        <div className="pt-2 text-center text-sm font-medium">
          {activeTab === 'login' ? (
            <p className="text-charcoal/60">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => toggleTab('register')}
                className="text-mv-olive hover:text-mv-deep-green font-bold hover:underline cursor-pointer transition-colors"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-charcoal/60">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => toggleTab('login')}
                className="text-mv-olive hover:text-mv-deep-green font-bold hover:underline cursor-pointer transition-colors"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>

    </div>
  );
};

export default Login;
