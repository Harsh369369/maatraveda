'use client';
import React, { useState, useEffect } from 'react';
import { Link } from '../utils/router-compat';
import { productServices } from '../services/api';
import { 
  Search, SlidersHorizontal, Heart, MapPin, Bell, User,
  Sparkles, ArrowRight, CheckCircle, Flame, ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const HERO_SLIDES = [
  {
    badge: 'Up to 15% Off',
    title: 'Ancient Herbal Wisdom, \nValidated by Modern Science.',
    bgGradient: 'from-[#DFE6EE] to-[#E2EAF4]',
    textColor: '#4A150E',
    badgeBg: 'bg-mv-olive/10 text-mv-olive',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=150&auto=format&fit=crop'
    ]
  },
  {
    badge: 'Pure Ayurvedic Care',
    title: '100% Organic Oils \n& Cold-Pressed Elixirs.',
    bgGradient: 'from-[#F5EBE6] to-[#EADED7]',
    textColor: '#4A2E15',
    badgeBg: 'bg-[#4A2E15]/10 text-[#4A2E15]',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=150&auto=format&fit=crop'
    ]
  },
  {
    badge: 'Premium Glow Series',
    title: 'Kashmiri Saffron, \nFor An Ageless Radiance.',
    bgGradient: 'from-[#FCF3E3] to-[#F7E7C4]',
    textColor: '#5C3E08',
    badgeBg: 'bg-[#5C3E08]/10 text-[#5C3E08]',
    images: [
      'https://images.unsplash.com/photo-1590156546746-c237073c6838?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=150&auto=format&fit=crop'
    ]
  }
];

const Home = () => {
  const { user, userIsAuthenticated } = useAuth();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('matree_wishlist');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {}
      }
    }
    return [];
  });

  // Category Icons (matching circular designs in Figma)
  const CATEGORIES = [
    { name: 'Cleanse', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=150&auto=format&fit=crop' },
    { name: 'Treat', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=150&auto=format&fit=crop' },
    { name: 'Moisturize', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=150&auto=format&fit=crop' },
    { name: 'Protect', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=150&auto=format&fit=crop' }
  ];

  // Map backend products to categories
  const getProductCategory = (productName) => {
    const name = productName.toLowerCase();
    if (name.includes('shampoo') || name.includes('wash') || name.includes('cleanse')) return 'Cleanse';
    if (name.includes('oil') || name.includes('serum') || name.includes('elixir')) return 'Treat';
    if (name.includes('butter') || name.includes('mask') || name.includes('ubtan')) return 'Moisturize';
    return 'Protect'; // fallback
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productServices.getAllProducts('all');
        if (response.success) {
          setProducts(response.products);
          setFilteredProducts(response.products);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  // Filter products based on search & category selection
  useEffect(() => {
    let result = products;

    if (activeCategory !== 'All') {
      result = result.filter(p => getProductCategory(p.name) === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, products]);

  const toggleFavorite = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    let updated;
    if (favorites.includes(productId)) {
      updated = favorites.filter(id => id !== productId);
    } else {
      updated = [...favorites, productId];
    }
    setFavorites(updated);
    localStorage.setItem('matree_wishlist', JSON.stringify(updated));
  };

  return (
    <div className="space-y-5 md:space-y-8 pb-12 select-none">
      
      {/* ========================================================================= */}
      {/* 1. MOBILE HEADER - Location Picker, Heart & Profile Avatar (Figma Mockup) */}
      {/* ========================================================================= */}
      <div className="md:hidden flex items-center justify-between px-6 pt-4 bg-cream">
        <div className="flex items-center gap-2 text-left">
          <div className="p-2 bg-mv-olive/10 text-mv-olive rounded-full">
            <MapPin className="h-4.5 w-4.5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-sans font-black text-charcoal/40 uppercase block leading-none">Home</span>
            <span className="text-xs font-sans font-black text-mv-dark-green truncate max-w-[180px] block mt-0.5">
              Amarapali Golf Homes, Noida
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2.5">
          {/* Notifications/Heart */}
          <Link to="/wishlist" className="p-2 rounded-full border border-mv-dark-green/5 bg-white text-mv-olive hover:shadow-sm">
            <Heart className="h-4.5 w-4.5 stroke-[2.5]" />
          </Link>
          {/* User Avatar */}
          <Link to="/profile" className="w-9 h-9 rounded-full overflow-hidden border border-mv-olive/20 hover:scale-105 transition-transform flex items-center justify-center bg-mv-yellow-green/30 text-mv-dark-green font-sans font-black text-xs">
            {userIsAuthenticated && user ? user.name.slice(0, 2).toUpperCase() : <User className="h-4 w-4" />}
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SLIDING HERO BANNER (Figma Mockup - Ancient Wisdom, 15% Off) */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`relative rounded-3xl md:rounded-[2.5rem] bg-gradient-to-r ${HERO_SLIDES[currentSlide].bgGradient} overflow-hidden p-4 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between border-4 border-white shadow-md transition-all duration-700 ease-in-out`}>
          <div className="space-y-2 md:space-y-4 max-w-md text-left z-10 transition-all duration-500 ease-in-out">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${HERO_SLIDES[currentSlide].badgeBg} text-[10px] font-black uppercase tracking-wider font-sans`}>
              <Flame className="h-3.5 w-3.5 fill-current" /> {HERO_SLIDES[currentSlide].badge}
            </div>
            <h1 className="font-sans text-lg sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight whitespace-pre-line" style={{ color: HERO_SLIDES[currentSlide].textColor }}>
              {HERO_SLIDES[currentSlide].title}
            </h1>
            <div className="pt-1">
              <Link 
                to="/products"
                className="inline-block bg-mv-olive hover:bg-mv-deep-green text-cream font-sans text-[10px] md:text-xs font-black py-2.5 px-5 md:py-3.5 md:px-8 rounded-full shadow-md transition-all uppercase tracking-wider cursor-pointer"
              >
                Shop now
              </Link>
            </div>
          </div>

          {/* Banner Images (overlapping layout similar to mockup) */}
          <div className="relative h-28 md:h-44 lg:h-52 w-full md:w-[280px] mt-4 md:mt-0 flex items-center justify-center select-none transition-all duration-500">
            <div className="absolute right-0 w-16 h-24 md:w-24 md:h-36 rounded-xl md:rounded-2xl overflow-hidden shadow-md rotate-6 border border-white transition-all duration-500">
              <img src={HERO_SLIDES[currentSlide].images[0]} className="w-full h-full object-cover" alt="product1" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-18 h-28 md:w-26 md:h-40 rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 border-white z-10 -rotate-3 transition-all duration-500">
              <img src={HERO_SLIDES[currentSlide].images[1]} className="w-full h-full object-cover" alt="product2" />
            </div>
            <div className="absolute left-0 w-14 h-22 md:w-22 md:h-32 rounded-xl md:rounded-2xl overflow-hidden shadow-sm -rotate-12 border border-white transition-all duration-500">
              <img src={HERO_SLIDES[currentSlide].images[2]} className="w-full h-full object-cover" alt="product3" />
            </div>
          </div>
          
          {/* Slide dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx ? 'w-4 h-1.5 bg-mv-dark-green' : 'w-1.5 h-1.5 bg-mv-dark-green/35'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SEARCH BAR - with horizontal filter layout (Figma Mockup) */}
      {/* ========================================================================= */}
      <section className="px-6 max-w-7xl mx-auto select-none">
        <div className="flex items-center gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-charcoal/45 stroke-[2.5]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-mv-dark-green/5 shadow-inner rounded-full text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-mv-olive transition-all"
            />
          </div>
          <button className="p-3.5 bg-white border border-mv-dark-green/5 rounded-full text-mv-dark-green hover:bg-mv-input-bg shadow-sm cursor-pointer transition-colors" aria-label="Filters">
            <SlidersHorizontal className="h-4.5 w-4.5 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CATEGORIES - Horizontal Scroll Circle Cards (Figma Mockup) */}
      {/* ========================================================================= */}
      <section className="px-6 max-w-7xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-sans text-base sm:text-lg font-black text-mv-dark-green">Categories</h3>
          <button 
            onClick={() => setActiveCategory('All')}
            className="text-xs font-black text-charcoal/40 uppercase hover:text-mv-olive transition-colors cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2 select-none justify-start md:justify-center">
          {/* Custom "All" filter circle */}
          <div 
            onClick={() => setActiveCategory('All')}
            className="flex flex-col items-center gap-2 cursor-pointer shrink-0 group"
          >
            <div className={`w-[70px] h-[70px] rounded-2xl border-2 flex items-center justify-center shadow-md overflow-hidden transition-all duration-300 ${
              activeCategory === 'All' ? 'border-mv-olive bg-mv-olive text-cream scale-102' : 'border-white bg-white group-hover:border-mv-olive/30'
            }`}>
              <span className="font-sans text-[11px] font-black uppercase tracking-wider">All</span>
            </div>
            <span className={`text-xs font-bold transition-colors ${
              activeCategory === 'All' ? 'text-mv-olive' : 'text-charcoal/65 group-hover:text-mv-olive'
            }`}>All Products</span>
          </div>

          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.name;
            return (
              <div 
                key={cat.name} 
                onClick={() => setActiveCategory(cat.name)}
                className="flex flex-col items-center gap-2 cursor-pointer shrink-0 group"
              >
                <div className={`w-[70px] h-[70px] rounded-2xl border-2 shadow-md overflow-hidden transition-all duration-300 relative ${
                  active ? 'border-mv-olive scale-102' : 'border-white group-hover:border-mv-olive/30'
                }`}>
                  <img src={cat.image} className="w-full h-full object-cover pointer-events-none" alt={cat.name} />
                  {active && (
                    <div className="absolute inset-0 bg-mv-olive/30 backdrop-blur-3xs" />
                  )}
                </div>
                <span className={`text-xs font-bold transition-colors ${
                  active ? 'text-mv-olive' : 'text-charcoal/65 group-hover:text-mv-olive'
                }`}>{cat.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRODUCT CATALOG GRID - "Special For You" (Figma Mockup) */}
      {/* ========================================================================= */}
      <section className="px-6 max-w-7xl mx-auto space-y-4 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-sans text-base sm:text-lg font-black text-mv-dark-green">
            {activeCategory === 'All' ? 'Special For You' : `${activeCategory} Rituals`}
          </h3>
          <span className="text-[10px] font-sans font-black text-charcoal/30 uppercase tracking-widest leading-none">
            {filteredProducts.length} Results
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-3xl animate-pulse border border-mv-dark-green/5"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-mv-dark-green/5 shadow-sm">
            <p className="text-sm font-semibold text-charcoal/50">No products found matching your filter coordinates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const isFav = favorites.includes(product._id);
              const cartItem = cartItems.find(item => item.product._id === product._id);
              const quantity = cartItem ? cartItem.quantity : 0;
              return (
                <div key={product._id} className="bg-white rounded-3xl p-3 shadow-md hover:shadow-lg transition-all flex flex-col justify-between border border-mv-dark-green/5 group relative">
                  
                  {/* Heart overlay */}
                  <button
                    onClick={(e) => toggleFavorite(product._id, e)}
                    className="absolute top-5 right-5 w-8 h-8 bg-white/90 backdrop-blur-3xs rounded-full flex items-center justify-center shadow-md z-10 hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Heart className={`h-4.5 w-4.5 ${isFav ? 'text-red-600 fill-red-600' : 'text-charcoal/45'}`} />
                  </button>

                  <Link to={`/products/${product._id}`} className="space-y-3.5 block">
                    {/* Image */}
                    <div className="aspect-square rounded-2xl overflow-hidden bg-mv-input-bg border border-mv-dark-green/5">
                      <img 
                        src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=250&auto=format&fit=crop'} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>

                    {/* Metadata & Title */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-sans font-bold text-mv-olive uppercase tracking-widest">
                        {getProductCategory(product.name)} Care
                      </span>
                      <h4 className="font-sans text-xs sm:text-sm font-black text-mv-dark-green line-clamp-1 leading-snug">
                        {product.name}
                      </h4>
                      <p className="text-[10px] text-charcoal/50 font-sans line-clamp-2 leading-relaxed">
                        {product.description || 'Crafted with wild-harvested herbs and cold-pressed botanical oils.'}
                      </p>
                    </div>
                  </Link>

                  {/* Pricing and Action row */}
                  <div className="pt-2.5 mt-2.5 border-t border-mv-dark-green/5 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-sans font-black text-mv-olive">₹{product.price}</span>
                      <span className="text-[10px] font-sans text-charcoal/30 line-through">₹{Math.floor(product.price * 1.25)}</span>
                    </div>
                    
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2 bg-mv-olive/10 border border-mv-olive/20 rounded-full px-2 py-0.5 shadow-inner">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateQuantity(product._id, quantity - 1);
                          }}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-mv-olive hover:bg-mv-olive hover:text-cream transition-colors text-xs font-black cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-mv-dark-green min-w-[12px] text-center">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateQuantity(product._id, quantity + 1);
                          }}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-mv-olive hover:bg-mv-olive hover:text-cream transition-colors text-xs font-black cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="p-2 bg-mv-olive text-cream rounded-full hover:bg-mv-deep-green shadow-sm transition-colors cursor-pointer"
                        aria-label="Add to Cart"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;
