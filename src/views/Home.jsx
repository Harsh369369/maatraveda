"use client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "../utils/router-compat";
import { productServices } from "../services/api";
import {
  ArrowRight,
  Heart,
  Star,
  ShoppingBag,
  Compass,
  Leaf,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Sub-components
import HomeHeader from "../components/HomeHeader";
import SearchFilterBar from "../components/SearchFilterBar";
import HeroSlider from "../components/hero/HeroSlider";
import TrustBadges from "../components/TrustBadges";
import CategoryGrid from "../components/CategoryGrid";
import WhyChooseUs from "../components/WhyChooseUs";
import IngredientsSection from "../components/IngredientsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import LatestBlogSection from "../components/LatestBlogSection";

const Home = () => {
  const { user, userIsAuthenticated } = useAuth();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("matree_wishlist");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {}
      }
    }
    return [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productServices.getAllProducts("all");
        if (response.success) {
          setProducts(response.products);
          setFilteredProducts(response.products);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search & category selection
  useEffect(() => {
    let result = products;

    if (activeCategory !== "All") {
      if (activeCategory === "Hair Care") {
        result = result.filter((p) => p.category === "hair");
      } else if (activeCategory === "Skin Care") {
        result = result.filter((p) => p.category === "face");
      } else if (activeCategory === "Wellness") {
        result = result.filter((p) => p.category === "health");
      } else if (activeCategory === "Oils") {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes("oil") ||
            p.name.toLowerCase().includes("elixir") ||
            p.name.toLowerCase().includes("serum"),
        );
      } else if (activeCategory === "Herbs") {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes("capsule") ||
            p.name.toLowerCase().includes("shampoo") ||
            p.name.toLowerCase().includes("neem") ||
            p.name.toLowerCase().includes("amla") ||
            p.name.toLowerCase().includes("brahmi"),
        );
      } else if (activeCategory === "Body Care") {
        result = result.filter((p) => p.category === "body");
      }
    }

    if (searchQuery.trim() !== "") {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description &&
            p.description.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, products]);

  const toggleFavorite = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    let updated;
    if (favorites.includes(productId)) {
      updated = favorites.filter((id) => id !== productId);
    } else {
      updated = [...favorites, productId];
    }
    setFavorites(updated);
    localStorage.setItem("matree_wishlist", JSON.stringify(updated));
  };

  // Helper to map backend products to Bestsellers display details
  const getBestsellerDisplayDetails = (product) => {
    const details = {
      name: product.name,
      rating: product.rating || 4.7,
      reviews: product.reviewsCount || 120,
      price: product.price,
      mrp: product.mrp || Math.floor(product.price * 1.3),
      badge: null,
    };

    if (product._id === "prod_1") {
      details.name = "Bringadi Hair Oil";
      details.rating = 4.8;
      details.reviews = 312;
      details.price = 499;
      details.mrp = 699;
      details.badge = "Bestseller";
    } else if (product._id === "prod_3") {
      details.name = "Kumkumadi Face Oil";
      details.rating = 4.7;
      details.reviews = 421;
      details.price = 799;
      details.mrp = 999;
    } else if (product._id === "prod_4") {
      details.name = "Aloe Vera Gel";
      details.rating = 4.6;
      details.reviews = 268;
      details.price = 249;
      details.mrp = 449;
    } else if (product._id === "prod_8") {
      details.name = "Ashwagandha Capsules";
      details.rating = 4.8;
      details.reviews = 512;
      details.price = 549;
      details.mrp = 699;
    } else if (product._id === "prod_5") {
      details.name = "Neem & Tulsi Face Wash";
      details.rating = 4.6;
      details.reviews = 287;
      details.price = 249;
      details.mrp = 349;
    }
    return details;
  };

  return (
    <div className="space-y-2 md:space-y-12 pb-12 select-none">
      {/* 1. MOBILE HEADER - Location Picker, Heart & Profile Avatar */}
      <HomeHeader user={user} userIsAuthenticated={userIsAuthenticated} />

      {/* 2 & 2B. MOBILE & DESKTOP SEARCH BAR / QUICK CATEGORY FILTER ROW */}
      <SearchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* 3. HERO SLIDER BANNER (Kashmiri Saffron Collection Redesign) */}
      <HeroSlider />

      {/* 4. TRUST BADGES ROW (5 Columns) */}
      <TrustBadges />

      {/* 5. SHOP BY CATEGORY SECTION */}
      <CategoryGrid
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* 6. BEST SELLERS SECTION */}
      <section className="px-6 max-w-7xl mx-auto space-y-5 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-black text-mv-dark-green">
            Best Sellers
          </h3>
          <Link
            to="/products"
            className="text-xs font-bold text-[#5B7917] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-none snap-x snap-mandatory md:grid md:grid-cols-5 md:gap-5 md:pb-0 md:overflow-visible">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-72 bg-white rounded-2xl animate-pulse border border-[#D8D5CD]/40 shrink-0 w-[200px] sm:w-[220px] snap-start md:w-auto md:shrink"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-none snap-x snap-mandatory md:grid md:grid-cols-5 md:gap-5 md:pb-0 md:overflow-visible">
            {products.slice(0, 5).map((product) => {
              const details = getBestsellerDisplayDetails(product);
              const isFav = favorites.includes(product._id);
              const cartItem = cartItems.find(
                (item) => item.product._id === product._id,
              );
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <div
                  key={product._id}
                  className="bg-white border border-[#D8D5CD] rounded-2xl p-3 flex flex-col justify-between hover:shadow-md transition-all group relative shrink-0 w-[200px] sm:w-[220px] snap-start md:w-auto md:shrink"
                >
                  {/* Bestseller Badge */}
                  {details.badge && (
                    <span className="absolute top-4 left-4 bg-[#305700] text-cream text-[9px] font-bold px-2 py-0.5 rounded-full z-10">
                      {details.badge}
                    </span>
                  )}

                  {/* Heart overlay */}
                  <button
                    onClick={(e) => toggleFavorite(product._id, e)}
                    className="absolute top-4 right-4 w-7 h-7 bg-white/90 backdrop-blur-3xs rounded-full flex items-center justify-center shadow-xs z-10 hover:scale-105 transition-transform cursor-pointer border border-[#D8D5CD]/20"
                  >
                    <Heart
                      className={`h-4 w-4 ${isFav ? "text-red-600 fill-red-600" : "text-charcoal/45"}`}
                    />
                  </button>

                  <Link
                    to={`/products/${product._id}`}
                    className="space-y-3 block"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-cream border border-[#D8D5CD]/30">
                      <img
                        src={
                          product.images && product.images[0]
                            ? product.images[0]
                            : "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=250&auto=format&fit=crop"
                        }
                        alt={details.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[10px] text-[#E1A12C] font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{details.rating}</span>
                        <span className="text-charcoal/40 font-medium">
                          ({details.reviews})
                        </span>
                      </div>
                      <h4 className="font-sans text-xs font-black text-mv-dark-green group-hover:text-mv-olive transition-colors line-clamp-1">
                        {details.name}
                      </h4>
                      <p className="text-[10px] text-charcoal/50 line-clamp-2 leading-relaxed">
                        {product.description ||
                          "Crafted with wild-harvested herbs and cold-pressed botanical oils."}
                      </p>
                    </div>
                  </Link>

                  {/* Pricing and Action Button */}
                  <div className="pt-2.5 mt-2.5 border-t border-[#D8D5CD]/40 flex flex-col gap-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-black text-[#5B7917]">
                        ₹{details.price}
                      </span>
                      <span className="text-[9px] text-charcoal/30 line-through">
                        ₹{details.mrp}
                      </span>
                    </div>

                    {quantity > 0 ? (
                      <div className="flex items-center justify-between bg-mv-olive/10 border border-mv-olive/20 rounded-lg px-2 py-1 shadow-inner">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateQuantity(product._id, quantity - 1);
                          }}
                          className="w-5 h-5 flex items-center justify-center text-mv-olive hover:bg-mv-olive hover:text-cream rounded transition-colors text-xs font-black cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-mv-dark-green">
                          {quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateQuantity(product._id, quantity + 1);
                          }}
                          className="w-5 h-5 flex items-center justify-center text-mv-olive hover:bg-mv-olive hover:text-cream rounded transition-colors text-xs font-black cursor-pointer"
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
                        className="w-full py-2 bg-[#305700] hover:bg-mv-dark-green text-cream rounded-lg text-[10px] font-black tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 7. FIND YOUR DOSHA SECTION */}
      <section className="px-6 max-w-7xl mx-auto select-none">
        <div className="relative rounded-[2rem] bg-gradient-to-r from-[#F5ECD7] to-[#EADEC7] border border-[#D8D5CD] overflow-hidden p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-4 max-w-md z-10">
            <span className="text-[10px] font-bold text-charcoal/50 uppercase tracking-widest block leading-none">
              Not sure what your body needs?
            </span>
            <h2 className="font-serif text-3xl font-black text-mv-dark-green leading-none">
              Find Your Dosha
            </h2>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Take our quick quiz and discover products that are perfect for
              your unique constitution.
            </p>
            <div className="pt-2">
              <Link
                to="/dosha-quiz"
                className="inline-flex items-center gap-2 bg-[#305700] hover:bg-mv-dark-green text-cream font-sans text-xs font-bold py-3 px-6 rounded-full shadow-md transition-all uppercase tracking-wider cursor-pointer"
              >
                Start Dosha Quiz <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Features Column */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-xl z-10 w-full">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 p-3 bg-white/40 rounded-xl backdrop-blur-xs">
              <div className="p-2 bg-[#305700]/5 text-[#305700] rounded-full">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-black text-mv-dark-green leading-snug">
                Personalized
              </h4>
              <p className="text-[10px] text-charcoal/60 leading-normal">
                Recommendations
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 p-3 bg-white/40 rounded-xl backdrop-blur-xs">
              <div className="p-2 bg-[#305700]/5 text-[#305700] rounded-full">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-black text-mv-dark-green leading-snug">
                Balance Your
              </h4>
              <p className="text-[10px] text-charcoal/60 leading-normal">
                Mind & Body
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 p-3 bg-white/40 rounded-xl backdrop-blur-xs">
              <div className="p-2 bg-[#305700]/5 text-[#305700] rounded-full">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-black text-mv-dark-green leading-snug">
                Ancient Wisdom
              </h4>
              <p className="text-[10px] text-charcoal/60 leading-normal">
                Modern Care
              </p>
            </div>
          </div>

          {/* Background image overlay */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none">
            <img
              src="/images/bg_mortar.jpg"
              className="w-full h-full object-cover"
              alt="ayurveda background"
            />
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE MAATRAVEDA? SECTION */}
      <WhyChooseUs />

      {/* 9. NATURE'S FINEST INGREDIENTS SECTION */}
      <IngredientsSection />

      {/* 10. TESTIMONIAL SLIDER SECTION */}
      <TestimonialsSection />

      {/* 11. LATEST FROM OUR BLOG SECTION */}
      <LatestBlogSection />
    </div>
  );
};

export default Home;
