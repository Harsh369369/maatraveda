'use client';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from '../utils/router-compat';
import { productServices } from '../services/api';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, ShoppingCart, Plus, Minus, Star, Heart, CheckCircle, ShieldCheck, ShoppingBag
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const cartItem = product ? cartItems.find(item => item.product._id === product._id) : null;
  const currentCartQty = cartItem ? cartItem.quantity : 0;
  const displayQty = currentCartQty > 0 ? currentCartQty : quantity;

  useEffect(() => {
    if (currentCartQty === 0) {
      setQuantity(1);
    }
  }, [currentCartQty]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [successMsg, setSuccessMsg] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await productServices.getProductById(id);
        if (response.success) {
          setProduct(response.product);
        }
      } catch (error) {
        console.error('Failed to retrieve product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQtyChange = (type) => {
    if (type === 'dec') {
      if (currentCartQty > 0) {
        updateQuantity(product._id, currentCartQty - 1);
      } else {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      }
    }
    if (type === 'inc') {
      if (currentCartQty > 0) {
        updateQuantity(product._id, currentCartQty + 1);
      } else {
        setQuantity(quantity + 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 animate-pulse space-y-8">
        <div className="h-6 w-32 bg-mv-olive/10 rounded-full mx-auto"></div>
        <div className="aspect-[4/5] bg-mv-olive/5 rounded-[2.5rem]"></div>
        <div className="space-y-4">
          <div className="h-8 w-2/3 bg-mv-olive/10 rounded-full"></div>
          <div className="h-4 w-1/3 bg-mv-olive/10 rounded-full"></div>
          <div className="h-20 w-full bg-mv-olive/10 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center space-y-4 font-sans">
        <h4 className="text-lg font-black text-mv-dark-green">Ritual Not Found</h4>
        <p className="text-sm text-charcoal/60">This skincare item could not be retrieved.</p>
        <Link to="/products" className="inline-block bg-mv-olive text-cream font-bold py-3 px-8 rounded-full">
          Back to Store
        </Link>
      </div>
    );
  }

  const { name, description, category, price, mrp, images, rating, reviewsCount } = product;

  // Slider gallery fallback
  const galleryImages = images && images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-cream/10 font-sans">
      <div className="max-w-md mx-auto bg-[#F8FAFC] min-h-screen flex flex-col justify-between relative shadow-lg border-x border-mv-dark-green/5">
        
        {/* ========================================== */}
        {/* 1. HEADER - Back, Details Title, Cart Bag */}
        {/* ========================================== */}
        <div className="flex items-center justify-between px-6 py-5 select-none">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-white border border-mv-dark-green/5 shadow-sm flex items-center justify-center text-mv-dark-green hover:bg-mv-input-bg cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
          </button>
          <h1 className="text-base font-black text-mv-dark-green uppercase tracking-wider">
            Details
          </h1>
          <Link 
            to="/cart" 
            className="w-10 h-10 rounded-full bg-white border border-mv-dark-green/5 shadow-sm flex items-center justify-center text-mv-dark-green hover:bg-mv-input-bg cursor-pointer transition-colors"
          >
            <ShoppingBag className="h-5 w-5 stroke-[2]" />
          </Link>
        </div>

        {/* ========================================== */}
        {/* 2. PRODUCT IMAGE FRAME - (Figma Image 4 Layout) */}
        {/* ========================================== */}
        <div className="px-6 relative flex-grow">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-md aspect-[4/5] border border-mv-dark-green/5 select-none">
            
            {/* Heart Button Overlay */}
            <button
              onClick={() => setIsFav(!isFav)}
              className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-3xs rounded-full flex items-center justify-center shadow-md z-10 hover:scale-105 transition-transform cursor-pointer"
            >
              <Heart className={`h-5 w-5 ${isFav ? 'text-red-600 fill-red-600' : 'text-charcoal/45'}`} />
            </button>

            <img
              src={galleryImages[activeImageIndex]}
              alt={name}
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Slider Dots */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/10 backdrop-blur-3xs px-3 py-1.5 rounded-full">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeImageIndex === idx ? 'w-4.5 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ========================================== */}
          {/* 3. META DETAILS - Title, Rating, Price, Desc */}
          {/* ========================================== */}
          <div className="mt-6 text-left space-y-4 px-1 pb-32">
            
            {/* Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-black text-mv-olive uppercase tracking-widest block">
                {category || 'Skincare'} Care
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-mv-dark-green leading-snug">
                {name}
              </h2>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4 text-xs font-bold text-charcoal/70 select-none">
              <div className="flex items-center gap-1 text-mv-olive bg-mv-olive/5 border border-mv-olive/15 px-3 py-1 rounded-full">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{rating || '4.7'}/5</span>
              </div>
              <span className="text-charcoal/40 font-medium">({reviewsCount || '2.4k'} Reviews)</span>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-xs font-bold text-charcoal/40">From:</span>
              <span className="text-xl font-black text-mv-olive">₹{price}</span>
              <span className="text-xs text-charcoal/30 line-through">₹{mrp || Math.floor(price * 1.25)}</span>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-mv-dark-green uppercase tracking-wider">
                Description
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-normal">
                {description || 'Glow\'s Gentle Foaming Cleanser lathers into a soft, bubbly foam that gently removes impurities and makeup while soothing and hydrating skin for a refreshed, radiant glow.'}
              </p>
            </div>
            
            {/* Quick Trust Checklist */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-[10px] font-black uppercase text-mv-olive tracking-wider">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> 100% Vegan Sourcing
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Lab Certified Safe
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 4. STICKY BOTTOM ROW - Add to Cart + Qty Pill */}
        {/* ========================================== */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-mv-dark-green/5 px-6 py-4 flex items-center justify-between gap-4 z-20 shadow-md select-none rounded-t-3xl">
          
          {/* Qty Selector Pill */}
          <div className="flex items-center bg-mv-input-bg rounded-full px-1.5 py-1 shadow-inner border border-mv-dark-green/5 shrink-0">
            <button
              onClick={() => handleQtyChange('dec')}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-cream transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-4 text-xs font-black font-sans text-mv-dark-green">
              {displayQty < 10 ? `0${displayQty}` : displayQty}
            </span>
            <button
              onClick={() => handleQtyChange('inc')}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-cream transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Add to Cart or Go to Cart Button */}
          {currentCartQty > 0 ? (
            <button
              onClick={() => navigate('/cart')}
              className="flex-grow bg-mv-dark-green hover:bg-[#082200] text-cream font-sans text-xs font-black py-4 px-6 rounded-full shadow-md transition-colors flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" /> Go to Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex-grow bg-mv-olive hover:bg-mv-deep-green text-cream font-sans text-xs font-black py-4 px-6 rounded-full shadow-md transition-colors flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
          )}

        </div>

        {/* Success Alert Overlay */}
        {successMsg && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-mv-dark-green text-cream text-xs font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 z-50 animate-bounce">
            <CheckCircle className="h-4 w-4 text-mv-yellow-green" /> Item Added to Cart!
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
