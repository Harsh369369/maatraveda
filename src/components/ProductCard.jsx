'use client';
import React from 'react';
import { Link } from '../utils/router-compat';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Eye, Sparkles } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const {
    _id,
    name,
    category,
    price,
    mrp,
    discount,
    images,
    isComingSoon,
    isFeatured,
    inStock
  } = product;

  const displayImage = images && images[0] ? images[0] : 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop';

  return (
    <div className="group relative bg-cream-dark/30 hover:bg-cream border border-forest/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full herbal-card-glow">
      
      {/* Visual Badge Overlays */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {isFeatured && (
          <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold bg-gold text-forest px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-white/20">
            <Sparkles className="h-3 w-3 fill-forest/10" /> Featured
          </span>
        )}
        {discount > 0 && !isComingSoon && (
          <span className="inline-flex items-center text-[10px] font-sans font-bold bg-terracotta text-cream px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-white/10">
            {discount}% Off
          </span>
        )}
      </div>

      {/* Image Gallery Container */}
      <div className="relative overflow-hidden aspect-square bg-cream-dark/20 shrink-0">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Coming Soon Overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-forest/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
            <span className="font-serif text-cream text-lg font-bold">Ritual in Testing</span>
            <span className="font-sans text-[10px] text-gold uppercase tracking-widest font-black mt-1.5 border border-gold/40 px-2.5 py-1 rounded-md">
              🔬 Coming Soon
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!inStock && !isComingSoon && (
          <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-[1px] flex items-center justify-center p-4 text-center">
            <span className="font-sans text-xs bg-cream/90 text-charcoal px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-md">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick View Hover overlay (Only shown if NOT coming soon) */}
        {!isComingSoon && (
          <div className="absolute inset-0 bg-forest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Link
              to={`/products/${_id}`}
              className="p-3 rounded-full bg-cream text-forest hover:bg-gold hover:text-forest shadow-md hover:scale-110 transition-all duration-300"
              title="View Ritual Details"
            >
              <Eye className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>

      {/* Info & Call-To-Actions Container */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        
        {/* Texts */}
        <div className="space-y-1 text-left">
          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-forest/65">
            {category} care
          </span>
          <h4 className="font-serif text-base font-bold text-forest group-hover:text-leaf transition-colors line-clamp-1">
            {name}
          </h4>
          <p className="font-sans text-xs text-charcoal/60 line-clamp-2 leading-relaxed">
            {product.description || 'Pure Ayurvedic traditional wellness blend formulated with clean botanicals.'}
          </p>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="space-y-4 pt-2 border-t border-forest/5">
          
          {/* Pricing Row */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-lg font-bold text-forest">₹{price}</span>
              {mrp > price && (
                <span className="font-sans text-xs line-through text-charcoal/40">₹{mrp}</span>
              )}
            </div>
            <span className="text-[10px] font-sans text-forest/50 font-bold uppercase tracking-tight">
              {inStock && !isComingSoon ? '✓ In Stock' : ''}
            </span>
          </div>

          {/* Action Row */}
          {isComingSoon ? (
            <button
              disabled
              className="w-full bg-forest/15 text-forest/50 font-sans text-xs font-bold py-3 px-4 rounded-lg cursor-not-allowed border border-forest/10 uppercase tracking-wider"
            >
              Coming Soon
            </button>
          ) : !inStock ? (
            <button
              disabled
              className="w-full bg-charcoal/10 text-charcoal/40 font-sans text-xs font-bold py-3 px-4 rounded-lg cursor-not-allowed uppercase tracking-wider"
            >
              Out of Stock
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => addToCart(product, 1)}
                className="flex-grow bg-forest text-cream hover:bg-leaf font-sans text-xs font-bold py-3 px-4 rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="h-4 w-4" /> Add To Cart
              </button>
              <Link
                to={`/products/${_id}`}
                className="bg-cream-dark/50 border border-forest/10 text-forest hover:bg-cream-dark p-3 rounded-lg transition-colors flex items-center justify-center"
                title="View Details"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductCard;
