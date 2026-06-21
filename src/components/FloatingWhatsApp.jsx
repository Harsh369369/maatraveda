'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const handleOpenWhatsApp = () => {
    const defaultMsg = 'Hi Matriveda! 🌿 I am browsing your e-commerce store and would like to learn more about your organic Ayurvedic wellness rituals and dosha alignments.';
    const encoded = encodeURIComponent(defaultMsg);
    const waUrl = `https://wa.me/919119047015?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <button
      onClick={handleOpenWhatsApp}
      className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#20ba5a] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group animate-bounce"
      style={{ boxShadow: '0 8px 30px rgba(37, 211, 102, 0.35)' }}
      aria-label="Chat on WhatsApp"
      title="Chat with Ayurvedic Vaidya"
    >
      <MessageCircle className="h-6 w-6 stroke-[2px] fill-current group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Glow pulsing ripple overlay */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/25 animate-ping -z-10 duration-2000"></span>
      
      {/* Tooltip bubble on hover */}
      <span className="absolute right-16 bg-cream border border-forest/10 text-forest font-sans text-xs font-bold py-2 px-3.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 pointer-events-none whitespace-nowrap">
        🌿 Chat with Vaidya
      </span>
    </button>
  );
};

export default FloatingWhatsApp;
