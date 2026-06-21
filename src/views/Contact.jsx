'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'What are your shipping and delivery timelines?',
    answer: 'We offer pan-India shipping. Orders placed in metro cities are typically delivered within 2-3 business days. For Tier 2, Tier 3, and remote cities, standard delivery timelines range between 3 to 5 business days from order confirmation.'
  },
  {
    question: 'What is your return and refund policy?',
    answer: 'Matriveda provides a 15-day return policy for all unopened, sealed products. If a botanical oil or serum is unopened, you can return it for a full refund or exchange. For hygiene reasons, opened or texture close-up applied products cannot be returned.'
  },
  {
    question: 'Where do you source your wellness ingredients from?',
    answer: 'We source 100% of our ingredients sustainably directly from local organic cooperatives in India. For example, our Kashmiri Saffron (Kesar) is sourced from dedicated Pampore farms, and our Ashwagandha roots are harvested from the pure Himalayan foothills.'
  },
  {
    question: 'How do I track my dispatched order?',
    answer: 'Once your package leaves our Ayurvedic dispensary, you will receive a tracking link via SMS and email. You can also chat directly with our WhatsApp care coordinators at +91 91190 47015 for real-time dispatch updates!'
  },
  {
    question: 'How does Cash on Delivery (COD) work?',
    answer: 'We provide free Cash on Delivery (COD) across major Indian cities for orders above ₹499. Upon package delivery, you can choose to pay the delivery associate in physical cash, or simply scan their secure UPI QR code with GPay, PhonePe, or Paytm.'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  // Accordion FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', orderNumber: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Launch direct Ayurvedic consultation via WhatsApp
  const handleConsultWhatsApp = () => {
    const msg = `Hi Matriveda! 🌿 I would like to book a holistic Ayurvedic consultation with a certified Vaidya. Please let me know the available time slots!`;
    const waUrl = `https://wa.me/919119047015?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-20 text-left">
      
      {/* Header Text */}
      <div className="text-center space-y-2 mb-8 max-w-2xl mx-auto">
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold bg-forest/5 border border-forest/10 px-3.5 py-1.5 rounded-full">
          Direct Connect
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-forest">
          Connect with Matriveda Care
        </h1>
        <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
          Have an inquiry about your order? Need help selecting herbs for your dosha type? Or would you like to consult with our certified Ayurvedic Vaidyas? Reach out, we are here to guide you.
        </p>
      </div>

      {/* Grid Layout splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Intake details & WhatsApp consult box (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-cream border border-forest/10 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
            <h4 className="font-serif text-lg font-bold text-forest border-b border-forest/10 pb-3">
              Dispensation Coordinates
            </h4>
            
            <ul className="space-y-6 text-sm text-charcoal/80">
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-forest/5 border border-forest/10 text-forest shadow-inner">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-serif font-semibold text-forest">Matriveda Ayurvedic Bhavan</h5>
                  <p className="text-xs text-charcoal/50 mt-0.5">12, Spice Garden, HAL Layout, Bengaluru, KA - 560037</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-forest/5 border border-forest/10 text-forest shadow-inner">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-serif font-semibold text-forest">Care Support Hotline</h5>
                  <p className="text-xs text-charcoal/50 mt-0.5">+91 91190 47015 (Mon-Sat, 9AM to 6PM)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-forest/5 border border-forest/10 text-forest shadow-inner">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-serif font-semibold text-forest">Support Dispatch Email</h5>
                  <p className="text-xs text-charcoal/50 mt-0.5">care@matriveda.com • trade@matriveda.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Consult banner */}
          <div className="bg-gold/15 border border-gold/30 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm">
            <h4 className="font-serif text-lg font-bold text-forest flex items-center gap-1.5">
              <MessageCircle className="h-5 w-5 text-gold fill-gold/15 animate-bounce" /> Vaidya Consultation
            </h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Skip filling forms completely! Chat directly with our Ayurvedic wellness coordinators on WhatsApp to schedule an online pulse consultation or receive custom product recommendations.
            </p>
            <button
              onClick={handleConsultWhatsApp}
              className="w-full bg-forest text-cream hover:bg-leaf font-sans text-xs font-bold py-3.5 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 fill-cream" /> Consult on WhatsApp
            </button>
          </div>

        </div>

        {/* Right Column: Contact Inbox Form (7 cols) */}
        <div className="lg:col-span-7 bg-cream border border-forest/10 p-6 sm:p-8 rounded-2xl shadow-sm">
          <h4 className="font-serif text-xl font-bold text-forest mb-6">
            Botanical Message Inbox
          </h4>

          {submitted && (
            <div className="mb-6 p-4 bg-forest/10 text-forest border border-forest/20 text-sm rounded-xl font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>🌿 Thank you! Your wellness message has been dispatched successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-xs font-bold text-forest uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-bold text-forest uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="yourname@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="orderNumber" className="text-xs font-bold text-forest uppercase tracking-wider">Order Number (Optional)</label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleInputChange}
                placeholder="e.g. MATRIVEDA_4F7A9"
                className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-xs font-bold text-forest uppercase tracking-wider">Message Description</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Detail your queries, order concerns, or skin history..."
                className="w-full px-3.5 py-2.5 bg-cream border border-forest/20 rounded-lg text-sm text-charcoal focus:outline-none focus:border-forest"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-forest text-cream hover:bg-leaf font-sans text-xs font-bold py-4 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
            >
              <Send className="h-4 w-4" /> Dispatch Message
            </button>
          </form>
        </div>

      </div>

      {/* 3. Accordion FAQs Section below fold */}
      <section className="border-t border-forest/10 pt-16 space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <HelpCircle className="h-8 w-8 text-gold fill-gold/10 mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-forest">
            Frequently Asked Queries
          </h3>
          <p className="font-sans text-sm text-charcoal/60">
            Find immediate answers regarding dispatch, return options, and sourcing credentials.
          </p>
        </div>

        {/* FAQs list accordion */}
        <div className="divide-y divide-forest/10 border-y border-forest/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4.5 text-left">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center font-serif text-sm sm:text-base font-bold text-forest hover:text-leaf transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="h-4.5 w-4.5 text-gold shrink-0" /> : <ChevronDown className="h-4.5 w-4.5 text-gold shrink-0" />}
                </button>
                
                {isOpen && (
                  <p className="mt-3 font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed animate-fade-in pl-1">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Contact;
