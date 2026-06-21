'use client';
import React, { useState } from 'react';
import { Link } from '../utils/router-compat';
import { Leaf, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
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
    <footer className="bg-forest text-cream font-sans border-t-4 border-gold pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Philosophy & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-gold fill-gold/20" />
              <span className="font-serif text-2xl font-black tracking-wider uppercase text-cream">Matriveda</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed">
              "Ancient Wisdom. Modern Rituals." <br />
              We blend pure, wild-harvested Himalayan botanicals and certified Ayurvedic recipes to deliver authentic, chemical-free wellness directly to your home.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-cream/10 hover:bg-gold hover:text-forest transition-all duration-300" aria-label="Instagram">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-cream/10 hover:bg-gold hover:text-forest transition-all duration-300" aria-label="YouTube">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a href="https://wa.me/919119047015" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-cream/10 hover:bg-gold hover:text-forest transition-all duration-300" aria-label="WhatsApp">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gold">
              Wellness Rituals
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/products?category=hair" className="text-cream/80 hover:text-gold transition-colors duration-200 block py-0.5">
                  🌿 Keshya Haircare
                </Link>
              </li>
              <li>
                <Link to="/products?category=face" className="text-cream/80 hover:text-gold transition-colors duration-200 block py-0.5">
                  ✨ Soundarya Facecare
                </Link>
              </li>
              <li>
                <Link to="/products?category=body" className="text-cream/80 hover:text-gold transition-colors duration-200 block py-0.5">
                  🌸 Suryakanti Skincare
                </Link>
              </li>
              <li>
                <Link to="/products?category=health" className="text-cream/80 hover:text-gold transition-colors duration-200 block py-0.5">
                  💪 Ojas Healthcare
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gold">
              Direct Contact
            </h4>
            <ul className="space-y-4 text-sm text-cream/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>Matriveda Ayurvedic Bhavan, 12, Spice Garden, Bengaluru, KA - 560037</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <span>+91 91190 47015</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <span>care@matriveda.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Panel */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gold">
              Botanical Letters
            </h4>
            <p className="text-sm text-cream/70 mb-4 leading-relaxed">
              Subscribe to receive weekly Ayurvedic self-care tips, herbal recipe books, and seasonal sales!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative flex rounded-lg overflow-hidden border border-cream/20 bg-cream/5 shadow-sm focus-within:border-gold transition-colors duration-300">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full bg-transparent px-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gold text-forest hover:bg-cream hover:text-forest transition-colors duration-300 px-4 py-3 flex items-center justify-center disabled:opacity-55"
                  aria-label="Subscribe"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Newsletter Toast Feedback */}
              {status.type && (
                <div
                  className={`flex items-start gap-2.5 p-3 rounded-lg text-xs leading-relaxed animate-fade-in ${
                    status.type === 'success' ? 'bg-cream/10 text-gold border border-gold/20' : 'bg-red-900/40 text-red-200 border border-red-800/30'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Brand Bottom Badges & Payments */}
        <div className="border-t border-cream/15 pt-8 pb-4 flex flex-wrap gap-8 justify-between items-center mb-8">
          <div className="flex flex-wrap gap-6 text-xs text-cream/50 tracking-wider font-semibold uppercase">
            <span>🌿 ISO 9001 CERTIFIED</span>
            <span>⚡ GMP APPROVED RITUALS</span>
            <span>🛡️ 100% TOXIN FREE</span>
            <span>🐒 CRUELTY FREE & VEGAN</span>
          </div>
          <div className="flex gap-3 text-xs font-bold text-gold uppercase tracking-wider">
            <span>💳 UPI</span>
            <span>•</span>
            <span>💳 VISA</span>
            <span>•</span>
            <span>💳 MC</span>
            <span>•</span>
            <span>🚚 COD</span>
          </div>
        </div>

        {/* Copy / Admin Footer */}
        <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-cream/40 gap-4">
          <p>© {new Date().getFullYear()} Matriveda Ayurvedic Wellness. All Rights Reserved. Built with tradition.</p>
          <div className="flex gap-6">
            <Link to="/admin/login" className="hover:text-gold transition-colors">🔐 Admin Portal</Link>
            <a href="#" className="hover:text-gold transition-colors">Terms of Wellness</a>
            <a href="#" className="hover:text-gold transition-colors">Botanical Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
