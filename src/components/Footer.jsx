import React, { useState } from 'react';
import { Link } from '../utils/router-compat';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { newsletterServices } from '../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await newsletterServices.subscribe(email);
      if (response.success) {
        setStatus({ type: 'success', message: response.message });
        setEmail('');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please check your connection.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#FAF7F2] text-mv-dark-green font-sans border-t border-[#D8D5CD]">
      
      {/* Join Our Wellness Circle */}
      <div className="bg-[#F3F1EC] py-10 border-b border-[#D8D5CD] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-left max-w-xl">
            <h3 className="font-serif text-2xl font-black text-mv-dark-green">Join Our Wellness Circle</h3>
            <p className="text-sm text-charcoal/70 mt-1">Get exclusive offers, wellness tips & early access to new launches.</p>
          </div>
          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-0 rounded-md overflow-hidden shadow-xs border border-[#D8D5CD]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white px-4 py-3 text-xs text-charcoal placeholder-charcoal/40 focus:outline-none min-w-[220px] md:min-w-[260px]"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#305700] text-cream hover:bg-mv-dark-green transition-colors px-6 py-3 text-xs font-bold cursor-pointer disabled:opacity-60 shrink-0"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {status.type && (
              <span className={`text-[11px] ${status.type === 'success' ? 'text-mv-olive' : 'text-red-700'}`}>
                {status.message}
              </span>
            )}
          </div>
        </div>

        {/* Botanical leaf branch decoration */}
        <svg className="w-44 h-44 text-[#5B7917]/10 absolute -right-6 -bottom-6 pointer-events-none" viewBox="0 0 200 200" fill="currentColor">
          <path d="M20 180 C 80 140 140 80 180 20 C 150 50 120 70 90 90" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M180 20 C 175 40 160 50 145 45 C 130 40 135 25 155 25 C 170 25 175 15 180 20 Z" />
          <path d="M145 45 C 140 60 125 70 110 65 C 95 60 100 45 120 45 C 135 45 140 35 145 45 Z" />
          <path d="M110 65 C 105 80 90 90 75 85 C 60 80 65 65 85 65 C 100 65 105 55 110 65 Z" />
          <path d="M150 35 C 165 40 170 55 165 70 C 160 85 145 80 145 60 C 145 45 155 40 150 35 Z" />
          <path d="M115 55 C 130 60 135 75 130 90 C 125 105 110 100 110 80 C 110 65 120 60 115 55 Z" />
        </svg>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left">
          
          {/* Column 1: Logo and Bio */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <svg className="w-10 h-10 text-[#5B7917]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <span className="font-sans text-xl font-black tracking-[0.16em] text-mv-dark-green leading-none uppercase">
                  MAATRAVEDA
                </span>
                <span className="font-sans text-[8px] font-bold tracking-[0.24em] text-[#5B7917]/80 mt-0.5 leading-none uppercase">
                  AYURVEDA REIMAGINED
                </span>
              </div>
            </Link>
            <p className="text-xs text-charcoal/70 leading-relaxed max-w-sm">
              Rooted in Ayurveda. Made for You.<br/>
              Pure. Natural. Effective.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-[#D8D5CD] flex items-center justify-center text-mv-dark-green hover:bg-[#305700] hover:text-white transition-all" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-[#D8D5CD] flex items-center justify-center text-mv-dark-green hover:bg-[#305700] hover:text-white transition-all" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-[#D8D5CD] flex items-center justify-center text-mv-dark-green hover:bg-[#305700] hover:text-white transition-all" aria-label="YouTube">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-[#D8D5CD] flex items-center justify-center text-mv-dark-green hover:bg-[#305700] hover:text-white transition-all" aria-label="Pinterest">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.983-5.367 11.983-11.987C24 5.367 18.637 0 12.017 0z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-4">
            <h4 className="font-sans text-[13px] font-black text-mv-dark-green uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-xs text-charcoal/75 font-medium">
              <li><Link to="/products" className="hover:text-mv-olive transition-colors">All Products</Link></li>
              <li><Link to="/products" className="hover:text-mv-olive transition-colors">Best Sellers</Link></li>
              <li><Link to="/products" className="hover:text-mv-olive transition-colors">New Arrivals</Link></li>
              <li><Link to="/products" className="hover:text-mv-olive transition-colors">Gift Sets</Link></li>
              <li><Link to="/products" className="hover:text-mv-olive transition-colors">Offers</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-4">
            <h4 className="font-sans text-[13px] font-black text-mv-dark-green uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-charcoal/75 font-medium">
              <li><Link to="/contact" className="hover:text-mv-olive transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-mv-olive transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-mv-olive transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-mv-olive transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-mv-olive transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Company & Support */}
          <div className="space-y-4">
            <h4 className="font-sans text-[13px] font-black text-mv-dark-green uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-xs text-charcoal/75 font-medium">
              <li><Link to="/about" className="hover:text-mv-olive transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-mv-olive transition-colors">Our Story</Link></li>
              <li><Link to="/blog" className="hover:text-mv-olive transition-colors">Blogs</Link></li>
              <li><a href="#" className="hover:text-mv-olive transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-mv-olive transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 5: Support */}
          <div className="space-y-4">
            <h4 className="font-sans text-[13px] font-black text-mv-dark-green uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-xs text-charcoal/75 font-medium">
              <li><a href="#" className="hover:text-mv-olive transition-colors">FAQ's</a></li>
              <li><Link to="/dosha-quiz" className="hover:text-mv-olive transition-colors">Dosha Quiz</Link></li>
              <li><a href="#" className="hover:text-mv-olive transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-mv-olive transition-colors">Wholesale</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D8D5CD] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-charcoal/50 uppercase tracking-widest">Secure Payments</span>
            <div className="flex gap-2 items-center">
              {/* Visa */}
              <div className="w-10 h-6 bg-white border border-[#D8D5CD] rounded flex items-center justify-center overflow-hidden">
                <span className="text-[9px] font-black font-sans text-blue-900 italic">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="w-10 h-6 bg-white border border-[#D8D5CD] rounded flex items-center justify-center gap-0.5 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-90 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-90 inline-block -ml-1.5"></span>
              </div>
              {/* RuPay */}
              <div className="w-10 h-6 bg-white border border-[#D8D5CD] rounded flex items-center justify-center overflow-hidden font-sans font-black italic text-[8px] text-blue-900 leading-none">
                <span className="text-orange-500">Ru</span>Pay
              </div>
              {/* UPI */}
              <div className="w-10 h-6 bg-white border border-[#D8D5CD] rounded flex items-center justify-center overflow-hidden font-sans font-black text-[8px] text-blue-600">
                UPI
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-charcoal/50">
            <span>© 2025 Maatraveda. All rights reserved.</span>
            <Link to="/admin/login" className="hover:text-mv-olive underline transition-colors">🔐 Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
