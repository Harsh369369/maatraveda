'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate } from '../utils/router-compat';
import { useAuth } from '../context/AuthContext';
import { Leaf, Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const { login, isAuthenticated, adminLoading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // If already authenticated, redirect straight to admin panel dashboard
  useEffect(() => {
    if (!adminLoading && isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, adminLoading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { email, password } = formData;
    if (!email || !password) {
      setErrorMsg('Please specify both administrative credentials.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await login(email, password);
      if (response.success) {
        navigate('/admin');
      } else {
        setErrorMsg(response.message || 'Invalid administrative credentials.');
      }
    } catch (error) {
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Admin Login Card Panel */}
      <div className="max-w-md w-full bg-cream border border-forest/10 p-8 sm:p-10 rounded-2xl shadow-lg space-y-8 text-center relative overflow-hidden">
        
        {/* Top Gold Corner decoration */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl pointer-events-none"></div>

        {/* Card Header Brand Logo */}
        <div className="space-y-3 flex flex-col items-center">
          <div className="p-3 bg-forest/5 text-forest inline-block rounded-full border border-forest/10 shadow-inner">
            <Leaf className="h-8 w-8 text-gold fill-gold/15" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-forest uppercase tracking-wide">Matriveda Dispensary</h3>
            <p className="font-sans text-xs text-charcoal/50 mt-1 uppercase tracking-wider font-semibold">
              Secure Staff Portal
            </p>
          </div>
        </div>

        {/* Error Dialog Banners */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 p-3.5 bg-red-900/10 text-red-700 border border-red-200 text-xs rounded-xl text-left font-bold animate-pulse">
            <ShieldAlert className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Inputs forms */}
        <form onSubmit={handleLogin} className="space-y-6 text-left">
          
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Email Coordinates
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g. admin@matree.com"
              className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> Password Secret
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
              required
              disabled={submitting}
            />
          </div>

          {/* Submit Action button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-forest text-cream hover:bg-leaf font-sans text-xs font-bold py-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'Authenticating...' : 'Access Dispensary'} <ArrowRight className="h-4 w-4" />
          </button>

        </form>

        {/* Back link */}
        <div className="pt-2 border-t border-forest/5">
          <p className="text-[10px] text-charcoal/40 font-semibold leading-relaxed">
            🔐 Authorized administrative staff only. All dashboard access logs are recorded securely.
          </p>
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
