'use client';
import React, { useState } from 'react';
import { Link, useNavigate } from '../utils/router-compat';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart
  } = useCart();

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponStatus, setCouponStatus] = useState({ type: null, message: '' });
  const [discountPercent, setDiscountPercent] = useState(0);

  // Discount & total calculations
  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const grandTotal = cartTotal - discountAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponStatus({ type: null, message: '' });

    if (!couponCode) return;

    const normalizedCode = couponCode.trim().toUpperCase();
    if (normalizedCode === 'RITUAL10' || normalizedCode === 'MATRIVEDA') {
      setAppliedCoupon(normalizedCode);
      setDiscountPercent(10);
      setCouponStatus({
        type: 'success',
        message: `Coupon Applied: ${normalizedCode} (-10%)`
      });
      localStorage.setItem('matree_checkout_discount', JSON.stringify({
        code: normalizedCode,
        percent: 10
      }));
    } else {
      setCouponStatus({
        type: 'error',
        message: 'Invalid code. Use "RITUAL10" for 10% off!'
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setDiscountPercent(0);
    setCouponStatus({ type: null, message: '' });
    setCouponCode('');
    localStorage.removeItem('matree_checkout_discount');
  };

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:bg-cream/10 font-sans">
      <div className="max-w-md mx-auto bg-[#F8FAFC] min-h-screen flex flex-col justify-between relative shadow-lg border-x border-mv-dark-green/5">
        
        {/* ========================================== */}
        {/* 1. HEADER - Back button, My Cart Title */}
        {/* ========================================== */}
        <div className="flex items-center justify-between px-6 py-5 select-none">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-white border border-mv-dark-green/5 shadow-sm flex items-center justify-center text-mv-dark-green hover:bg-mv-input-bg cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
          </button>
          <h1 className="text-base font-black text-mv-dark-green uppercase tracking-wider">
            My Cart
          </h1>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>

        {/* ========================================== */}
        {/* 2. CART ITEMS LIST */}
        {/* ========================================== */}
        <div className="px-6 flex-grow pb-60 space-y-4">
          
          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-white border border-mv-dark-green/5 rounded-[2.5rem] space-y-6 shadow-sm px-6 my-10 select-none">
              <div className="p-4 rounded-full bg-mv-olive/10 text-mv-olive inline-block">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-mv-dark-green">Your Cart is Empty</h3>
                <p className="text-xs text-charcoal/60 max-w-[240px] mx-auto leading-relaxed">
                  Start your Ayurvedic skincare journey by adding products to your routine.
                </p>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-mv-olive text-cream hover:bg-mv-deep-green font-sans text-xs font-bold py-3.5 px-8 rounded-full shadow-md uppercase tracking-wider transition-all cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4" /> Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.product._id} 
                  className="bg-white rounded-[2rem] p-4 flex gap-4 items-center border border-mv-dark-green/5 shadow-sm relative group"
                >
                  {/* Remove Button Icon (Top Right) */}
                  <button 
                    onClick={() => removeFromCart(item.product._id)}
                    className="absolute top-4 right-4 text-charcoal/30 hover:text-red-700 p-1 cursor-pointer transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Image */}
                  <img 
                    src={item.product.images && item.product.images[0] ? item.product.images[0] : 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=150&auto=format&fit=crop'} 
                    alt={item.product.name}
                    className="h-20 w-20 object-cover rounded-2xl bg-mv-input-bg border border-mv-dark-green/5 shrink-0 select-none pointer-events-none"
                  />

                  {/* Details */}
                  <div className="flex-grow text-left space-y-1 pr-6">
                    <span className="text-[8px] font-sans font-bold text-mv-olive uppercase tracking-widest block leading-none">
                      {item.product.category || 'Skincare'}
                    </span>
                    <h4 className="font-sans text-xs sm:text-sm font-black text-mv-dark-green leading-snug line-clamp-1">
                      <Link to={`/products/${item.product._id}`} className="hover:text-mv-olive transition-colors">{item.product.name}</Link>
                    </h4>
                    <p className="text-[10px] text-charcoal/50 font-sans line-clamp-1 leading-none">
                      {item.product.description || 'Gently purifies and hydrates for a radiant glow.'}
                    </p>
                    
                    {/* Price & Quantity Selector */}
                    <div className="flex items-center justify-between pt-1.5 gap-2">
                      <div className="flex items-baseline gap-1.5 select-none">
                        <span className="text-xs font-black text-mv-olive">₹{item.price}</span>
                        <span className="text-[9px] font-sans text-charcoal/30 line-through">₹{item.product.mrp || Math.floor(item.price * 1.25)}</span>
                      </div>

                      {/* Qty Pill Selector */}
                      <div className="flex items-center bg-mv-input-bg rounded-full px-1 py-0.5 border border-mv-dark-green/5 select-none scale-90">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-cream transition-colors cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2.5 text-[11px] font-black font-sans text-mv-dark-green">
                          {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-cream transition-colors cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
              
              {/* Reset Cart Actions */}
              <div className="flex justify-between items-center text-xs px-2 pt-2 select-none">
                <Link to="/products" className="font-black text-mv-olive hover:underline">← Continue Shopping</Link>
                <button onClick={clearCart} className="text-charcoal/40 hover:text-red-700 font-bold uppercase tracking-wider">Clear All</button>
              </div>
            </div>
          )}

        </div>

        {/* ========================================== */}
        {/* 3. STICKY BOTTOM ROW - Discount summary, Check out */}
        {/* ========================================== */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-mv-dark-green/5 px-6 py-5 space-y-4 z-20 shadow-md rounded-t-3xl select-none">
            
            {/* Discount Code Input Box */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-mv-olive/10 border border-mv-olive/20 p-3.5 rounded-full text-xs text-mv-dark-green font-bold">
                <span>✓ Applied: {appliedCoupon} (-10%)</span>
                <button 
                  onClick={handleRemoveCoupon}
                  className="text-red-700 font-black uppercase text-[10px] tracking-wider hover:underline ml-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="bg-mv-input-bg rounded-full p-1 flex items-center border border-mv-dark-green/5 focus-within:border-mv-olive/30 shadow-inner">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Discount Code"
                  className="w-full bg-transparent pl-4 pr-2 py-2.5 text-xs text-charcoal placeholder-charcoal/30 uppercase focus:outline-none font-bold"
                />
                <button
                  type="submit"
                  className="bg-white text-mv-dark-green hover:bg-cream active:text-mv-olive font-sans text-xs font-black px-6 py-2.5 rounded-full shadow-sm cursor-pointer uppercase transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>
            )}

            {couponStatus.message && !appliedCoupon && (
              <div className={`p-2.5 rounded-2xl text-[10px] font-bold leading-relaxed flex items-center gap-1.5 justify-center ${
                couponStatus.type === 'success' ? 'bg-mv-olive/10 text-mv-olive border border-mv-olive/20' : 'bg-red-900/10 text-red-700 border border-red-200'
              }`}>
                {couponStatus.type === 'success' ? <CheckCircle className="h-3.5 w-3.5 shrink-0" /> : <AlertCircle className="h-3.5 w-3.5 shrink-0" />}
                <span>{couponStatus.message}</span>
              </div>
            )}

            {/* Total Cost summary */}
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-sm font-black text-mv-dark-green uppercase tracking-wider">Total Cost</span>
              <span className="text-xl font-black text-mv-dark-green">₹{grandTotal}</span>
            </div>

            {/* Check out CTA */}
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-mv-olive hover:bg-mv-deep-green text-cream font-sans text-xs font-black py-4 rounded-full shadow-md uppercase tracking-wider transition-colors cursor-pointer"
            >
              Check out
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
