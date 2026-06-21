'use client';
import React, { useState, useEffect } from 'react';
import { Link } from '../utils/router-compat';
import { productServices } from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Heart, ArrowRight } from 'lucide-react';

const Wishlist = () => {
  const { addToCart, cartItems } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const storedWishlist = localStorage.getItem('matree_wishlist');
        const wishlistIds = storedWishlist ? JSON.parse(storedWishlist) : [];

        const response = await productServices.getAllProducts('all');
        if (response.success) {
          const filtered = response.products.filter(p => wishlistIds.includes(p._id));
          setWishlistItems(filtered);
        }
      } catch (error) {
        console.error('Failed to load wishlist products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, []);

  const removeFromWishlist = (productId) => {
    const storedWishlist = localStorage.getItem('matree_wishlist');
    let wishlistIds = storedWishlist ? JSON.parse(storedWishlist) : [];
    wishlistIds = wishlistIds.filter(id => id !== productId);
    localStorage.setItem('matree_wishlist', JSON.stringify(wishlistIds));

    // Update state
    setWishlistItems(prev => prev.filter(p => p._id !== productId));
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none text-left ${wishlistItems.length === 0 ? 'h-[calc(100vh-160px)] overflow-hidden flex flex-col' : ''}`}>
      
      {/* Page Header */}
      <div className="border-b border-mv-dark-green/10 pb-4 mb-6 space-y-1 shrink-0">
        <h1 className="font-serif text-2xl md:text-3xl font-black text-mv-dark-green flex items-center gap-2.5">
          <Heart className="h-7 w-7 text-mv-olive fill-mv-olive/15 stroke-[2]" /> Your Ayurvedic Wishlist
        </h1>
        <p className="font-sans text-xs text-charcoal/60">
          Your saved organic elixirs and Ayurvedic wellness rituals.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-mv-dark-green/5"></div>
          ))}
        </div>
      ) : wishlistItems.length === 0 ? (
        /* Empty State */
        <div className="flex-grow flex items-center justify-center pb-12">
          <div className="text-center py-12 px-8 bg-white border border-mv-dark-green/5 shadow-md rounded-[2.5rem] w-full max-w-xl space-y-6">
            <div className="inline-flex p-5 bg-mv-olive/5 text-mv-olive rounded-full border border-mv-olive/10 shadow-inner">
              <Heart className="h-10 w-10 text-mv-olive/40 stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-sans text-lg font-black text-mv-dark-green">Your Wishlist is Empty</h3>
              <p className="font-sans text-sm text-charcoal/50 max-w-sm mx-auto leading-relaxed">
                Explore our range of 100% organic, chemical-free Ayurvedic products to find your perfect daily routine.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-mv-olive hover:bg-mv-deep-green text-cream font-sans text-xs font-black py-4 px-8 rounded-full shadow-md transition-all uppercase tracking-wider cursor-pointer"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Wishlist Grid - Responsive 2 columns on mobile, 4 columns on desktop */
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistItems.map((product) => {
            const cartItem = cartItems ? cartItems.find(item => item.product._id === product._id) : null;
            const cartQty = cartItem ? cartItem.quantity : 0;
            return (
              <div key={product._id} className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-mv-dark-green/5 flex flex-col justify-between group relative">
              
              {/* Heart/Remove Button Overlay */}
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-3xs rounded-full flex items-center justify-center shadow-md z-10 text-red-600 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-mv-dark-green/5"
                title="Remove from wishlist"
              >
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-red-600 text-red-600" />
              </button>

              <Link to={`/products/${product._id}`} className="space-y-2 sm:space-y-3 block">
                {/* Product Image */}
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-mv-input-bg border border-mv-dark-green/5">
                  <img
                    src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=250&auto=format&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 pointer-events-none"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1 text-left mt-2">
                  <span className="text-[9px] font-sans font-bold text-mv-olive uppercase tracking-widest block leading-none">
                    {product.category} Care
                  </span>
                  <h3 className="font-sans text-xs sm:text-sm font-black text-mv-dark-green line-clamp-1 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-charcoal/50 font-sans line-clamp-2 leading-relaxed mt-1 hidden sm:block">
                    {product.description || 'Ayurvedic elixir crafted with wild-harvested herbs.'}
                  </p>
                </div>
              </Link>

              {/* Price & Actions */}
              <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-mv-dark-green/5 flex items-center justify-between gap-1.5">
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-sans font-black text-mv-olive">₹{product.price}</span>
                  <span className="text-[9px] text-charcoal/35 line-through">₹{product.mrp || Math.floor(product.price * 1.25)}</span>
                </div>

                {cartQty > 0 ? (
                  <Link
                    to="/cart"
                    className="inline-flex items-center gap-1 py-1.5 sm:py-2 px-2.5 sm:px-4 bg-mv-dark-green text-cream rounded-full hover:bg-[#082200] font-sans text-[9px] sm:text-xs font-black transition-all shadow-sm cursor-pointer uppercase tracking-wider whitespace-nowrap"
                  >
                    <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Go to Cart
                  </Link>
                ) : (
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="inline-flex items-center gap-1 py-1.5 sm:py-2 px-2.5 sm:px-4 bg-mv-olive text-cream rounded-full hover:bg-mv-deep-green font-sans text-[9px] sm:text-xs font-black transition-all shadow-sm cursor-pointer uppercase tracking-wider whitespace-nowrap"
                  >
                    <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Add to Cart
                  </button>
                )}
              </div>

            </div>
          );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
