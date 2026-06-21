'use client';
import React, { useState, useEffect } from 'react';

const DeliveryBanner = () => {
  const messages = [
    '🚚 Free Delivery across India on orders above ₹499!',
    '🌿 Rooted in Nature, Trusted by Tradition — 100% Ayurvedic & Chemical-Free',
    '🎁 Festive Wellness Sale: Get botanical gifts on orders above ₹999!'
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-forest text-cream py-2 px-4 text-xs md:text-sm font-sans tracking-wide transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center font-medium">
        <span className="animate-pulse duration-1000">{messages[index]}</span>
      </div>
    </div>
  );
};

export default DeliveryBanner;
