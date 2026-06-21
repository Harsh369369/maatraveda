'use client';
import React from 'react';
import { Link } from '../utils/router-compat';
import { ArrowRight, Sparkles, ShieldCheck, Heart } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-cream via-cream/50 to-cream overflow-hidden py-16 lg:py-24 border-b border-mv-dark-green/5">
      
      {/* Decorative background elements */}
      <div className="absolute top-12 left-4 md:left-12 opacity-5 md:opacity-10 animate-float-slow pointer-events-none">
        <Sparkles className="h-16 w-16 text-mv-olive" />
      </div>
      <div className="absolute bottom-20 right-8 md:right-24 opacity-5 md:opacity-10 animate-float-slower pointer-events-none">
        <Heart className="h-20 w-20 text-mv-lime rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Columns - Text content */}
          <div className="lg:col-span-7 space-y-6 text-left z-10">
            
            {/* Small Brand Logo indicator */}
            <div className="space-y-1">
              <span className="font-sans text-xs font-black tracking-[0.25em] text-mv-olive uppercase block">
                MAATRAVEDA
              </span>
            </div>

            {/* Core Onboarding-style Heading */}
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-mv-dark-green leading-tight tracking-tight">
              Your journey to <br />
              <span className="text-mv-olive">glowing skin</span> starts now.
            </h1>

            {/* Sub-text description */}
            <p className="font-sans text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-xl">
              Experience the pure botanical power of ancient Indian Ayurveda. Our certified organic, chemical-free elixirs are crafted with fresh hand-pressed herbs and cold-pressed oils to restore your skin's natural balance.
            </p>

            {/* Core Trust Pillars */}
            <div className="grid grid-cols-2 gap-4 border-t border-mv-dark-green/10 pt-6 max-w-lg">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-mv-olive shrink-0" />
                <span className="font-sans text-sm font-bold text-mv-dark-green">100% Organic Recipes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-mv-olive shrink-0" />
                <span className="font-sans text-sm font-bold text-mv-dark-green">Certified AYUSH Safe</span>
              </div>
            </div>

            {/* Onboarding-style Pill Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/products"
                className="bg-mv-olive text-cream hover:bg-mv-deep-green font-sans text-sm font-bold py-4 px-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 uppercase tracking-wider cursor-pointer"
              >
                Shop Rituals <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dosha-quiz"
                className="bg-cream border border-charcoal/10 text-mv-dark-green hover:bg-mv-input-bg font-sans text-sm font-bold py-4 px-10 rounded-full shadow-sm hover:shadow-md transition-all duration-300 uppercase tracking-wider cursor-pointer"
              >
                Find Your Dosha
              </Link>
            </div>

          </div>

          {/* Right Columns - Premium visual display of glowing skin */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Backplate */}
            <div className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-mv-yellow-green/10 filter blur-2xl -z-10 animate-pulse duration-3000"></div>
            
            {/* Onboarding image frame */}
            <div className="relative p-2 max-w-sm sm:max-w-md w-full">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-cream shadow-mv-dark-green/5 hover:shadow-mv-dark-green/10 transition-shadow duration-300 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
                  alt="Ayurvedic Glowing Skincare Journey"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Glassmorphism Tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-cream/85 backdrop-blur-sm border border-mv-olive/10 p-4 rounded-3xl flex items-center justify-between shadow-lg">
                  <div>
                    <h5 className="font-sans text-sm font-black text-mv-dark-green">100% Organic</h5>
                    <p className="text-[11px] text-charcoal/60">Radiant Skincare Elixirs</p>
                  </div>
                  <span className="font-sans text-[10px] bg-mv-olive text-cream px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                    Pure Active
                  </span>
                </div>
              </div>

              {/* Floating rating badge tag */}
              <div className="absolute -top-3 -right-3 bg-mv-yellow-green text-mv-dark-green py-3 px-4 rounded-full font-sans font-black shadow-lg text-center flex flex-col items-center justify-center leading-none border-2 border-cream rotate-6 animate-bounce">
                <span className="text-[10px] uppercase font-bold tracking-tight">Rated</span>
                <span className="text-base font-black">4.9★</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default HeroSection;
