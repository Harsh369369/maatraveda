'use client';
import React from 'react';
import { Sparkles, Flower, Heart, Droplets, Grid } from 'lucide-react';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Rituals', icon: Grid },
    { id: 'hair', name: 'Keshya (Hair)', icon: Droplets },
    { id: 'face', name: 'Soundarya (Face)', icon: Flower },
    { id: 'body', name: 'Suryakanti (Body)', icon: Sparkles },
    { id: 'health', name: 'Ojas (Health)', icon: Heart }
  ];

  return (
    <div className="w-full py-8 border-b border-forest/5 bg-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title / Description */}
        <div className="text-center mb-8 space-y-2">
          <h3 className="font-serif text-2xl md:text-3xl font-black text-forest">
            Explore Sacred Rituals
          </h3>
          <p className="font-sans text-sm text-charcoal/60 max-w-md mx-auto">
            Choose your daily Ayurvedic healing category to restore balance, soothe the senses, and nourish the body.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex overflow-x-auto flex-nowrap scrollbar-none whitespace-nowrap px-4 pb-2 justify-start md:justify-center items-center gap-3 w-full">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`flex items-center gap-2 py-3 px-5 sm:px-6 rounded-xl font-sans text-sm font-bold tracking-wide transition-all duration-300 shadow-sm shrink-0 ${
                  isSelected
                    ? 'bg-forest text-cream shadow-forest/15 translate-y-[-1px]'
                    : 'bg-cream-dark/50 text-charcoal/80 hover:bg-cream-dark hover:text-forest'
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? 'text-gold fill-gold/20' : 'text-forest/60'}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CategoryFilter;
