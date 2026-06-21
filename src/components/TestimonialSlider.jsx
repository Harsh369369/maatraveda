'use client';
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Leaf, ShieldCheck } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Priya Iyer',
    initials: 'PI',
    location: 'Chennai, Tamil Nadu',
    ritual: 'Bhringraj & Amla Hair Oil',
    text: 'My hair fall reduced significantly within two weeks of using the Keshya hair oil. It has a beautiful earthy, natural herbal aroma that brings back memories of home-pressed recipes. Truly pure!',
    rating: 5,
    verified: true
  },
  {
    name: 'Rohan Sharma',
    initials: 'RS',
    location: 'New Delhi',
    ritual: 'Kumkumadi Radiant Serum',
    text: 'Soundarya Kumkumadi serum has worked like magic on my pigmentation. I apply it overnight, and my face has a natural gold glow in the morning without any greasy, sticky feel. Incredible Ayurvedic science.',
    rating: 5,
    verified: true
  },
  {
    name: 'Ananya Deshmukh',
    initials: 'AD',
    location: 'Pune, Maharashtra',
    ritual: 'Neem & Turmeric Body Wash',
    text: 'I have very sensitive skin and was prone to breakouts. This body wash is so gentle, cooling, and completely cleared my skin irritations. The natural fresh neem fragrance is so therapeutic!',
    rating: 5,
    verified: true
  },
  {
    name: 'Dr. Sandeep Verma',
    initials: 'SV',
    location: 'Rishikesh, Uttarakhand',
    ritual: 'Ashwagandha Vitality Elixir',
    text: 'As an Ayurvedic practitioner, I highly respect the sourcing of Matriveda. Their Ashwagandha elixir is exceptionally concentrated and potent, offering great cortisol reduction and deep, restful sleep.',
    rating: 5,
    verified: true
  },
  {
    name: 'Meera Nair',
    initials: 'MN',
    location: 'Kochi, Kerala',
    ritual: 'Shikakai Herbal Shampoo',
    text: 'It cleanses my scalp perfectly without standard sulfates or parabens. My hair feels incredibly voluminous, silky, and easy to manage. A beautiful return to our traditional soapnut wash.',
    rating: 5,
    verified: true
  },
  {
    name: 'Vikram Malhotra',
    initials: 'VM',
    location: 'Mumbai, Maharashtra',
    ritual: 'Royal Sandalwood Body Butter',
    text: 'The Royal Mysore Sandalwood fragrance is absolutely heavenly and grounds my senses. It locks in intense hydration for 24 hours, keeping dry skin completely at bay during dry office days.',
    rating: 5,
    verified: true
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-sandstone/20 py-16 border-t border-b border-forest/10 relative overflow-hidden">
      
      {/* Decorative leaf background floaters */}
      <div className="absolute top-6 left-6 opacity-5 animate-float-slow pointer-events-none">
        <Leaf className="h-20 w-20 text-forest" />
      </div>
      <div className="absolute bottom-6 right-6 opacity-5 animate-float-slower pointer-events-none">
        <Leaf className="h-24 w-24 text-forest" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Title */}
        <div className="space-y-2 mb-10 flex flex-col items-center">
          <Quote className="h-10 w-10 text-gold fill-gold/15 rotate-180" />
          <h3 className="font-serif text-2xl md:text-3xl font-black text-forest">
            Trusted by Tradition, Loved by Thousands
          </h3>
          <p className="font-sans text-sm text-charcoal/60">
            Real feedback from our wellness community across metro and tier cities in India.
          </p>
        </div>

        {/* Slider Box */}
        <div className="relative bg-cream border border-forest/10 p-8 sm:p-12 rounded-3xl shadow-sm max-w-3xl mx-auto min-h-[260px] flex flex-col justify-between transition-all duration-500 text-left md:text-center">
          
          <div className="space-y-5">
            {/* Stars Row & Verified badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest/5 pb-3">
              <div className="flex gap-1 justify-start md:justify-center w-full md:w-auto">
                {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                ))}
              </div>
              {REVIEWS[currentIndex].verified && (
                <span className="inline-flex items-center gap-1 text-[9px] font-sans font-bold text-forest uppercase tracking-wider bg-forest/5 px-2.5 py-1 rounded-full border border-forest/10">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified Purchase
                </span>
              )}
            </div>

            {/* Testimonial Text */}
            <p className="font-sans text-sm sm:text-base text-charcoal/80 italic leading-relaxed">
              "{REVIEWS[currentIndex].text}"
            </p>
          </div>

          {/* Customer Meta Row */}
          <div className="mt-6 pt-4 border-t border-forest/5 flex items-center gap-4 justify-start md:justify-center">
            <div className="h-10 w-10 rounded-full bg-forest text-cream font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-sm border border-gold/25">
              {REVIEWS[currentIndex].initials}
            </div>
            <div className="text-left">
              <h5 className="font-serif text-sm font-bold text-forest">{REVIEWS[currentIndex].name}</h5>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-charcoal/50 mt-0.5">
                <span>{REVIEWS[currentIndex].location}</span>
                <span>•</span>
                <span className="text-gold font-semibold uppercase tracking-wider text-[10px]">
                  {REVIEWS[currentIndex].ritual}
                </span>
              </div>
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:-left-6 z-20">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-cream border border-forest/10 hover:bg-forest hover:text-cream transition-all text-forest shadow-md"
              aria-label="Previous Review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:-right-6 z-20">
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-cream border border-forest/10 hover:bg-forest hover:text-cream transition-all text-forest shadow-md"
              aria-label="Next Review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

        {/* Indicators Dots */}
        <div className="flex justify-center gap-2.5 mt-6">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'w-6 bg-forest' : 'w-2 bg-forest/20'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TestimonialSlider;
