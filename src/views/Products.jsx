'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from '../utils/router-compat';
import { productServices } from '../services/api';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get active category from URL search query (e.g. ?category=hair), default to 'all'
  const activeCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // Options: newest, price-low, price-high, discount

  // Fetch products when activeCategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productServices.getAllProducts(activeCategory);
        if (response.success) {
          setProducts(response.products);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // Handle category changes, update URL param
  const handleCategoryChange = (catId) => {
    setSearchParams({ category: catId });
  };

  // Filter products by local search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'discount') {
      return b.discount - a.discount;
    }
    // Default: 'newest' (chronologically)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-8 pb-28 md:pb-16">
      
      {/* 1. Category Tabs Bar Component */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Brand Intro Line requested by user */}
        <div className="text-center bg-sandstone/30 border border-forest/10 p-4 rounded-xl">
          <p className="font-sans text-xs sm:text-sm text-forest font-bold tracking-wide uppercase">
            All formulas crafted from Ayurvedic wisdom, free from parabens, sulfates, and artificial fragrances
          </p>
        </div>

        {/* 2. Search & Sort Control Panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-sandstone/15 border border-forest/10 rounded-2xl shadow-sm">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80 flex items-center bg-cream border border-forest/20 rounded-xl overflow-hidden px-3.5 py-2.5 focus-within:border-forest transition-colors duration-300 shadow-inner">
            <Search className="h-4 w-4 text-forest/50 shrink-0" />
            <input
              type="text"
              placeholder="Search herbs, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-2.5 text-sm text-charcoal focus:outline-none placeholder-charcoal/40"
            />
          </div>

          {/* Sorter and Count Indicators */}
          <div className="flex items-center justify-between w-full md:w-auto gap-6">
            
            {/* Total Results */}
            <span className="font-sans text-xs font-semibold text-charcoal/50 uppercase tracking-widest shrink-0">
              {sortedProducts.length} Sacred Rituals
            </span>

            {/* Sorting Dropdown */}
            <div className="relative flex items-center bg-cream border border-forest/20 rounded-xl px-3.5 py-2.5 shadow-sm text-sm text-charcoal gap-2 focus-within:border-forest">
              <ArrowUpDown className="h-4 w-4 text-forest/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none font-semibold text-xs text-forest cursor-pointer"
              >
                <option value="newest">Latest Harvest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Savings</option>
              </select>
            </div>

          </div>

        </div>

        {/* 3. Products adaptive grid: 3 columns on desktop, 2 on mobile */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 py-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-cream-dark/25 rounded-2xl border border-forest/5 animate-pulse"></div>
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-forest/20 rounded-2xl bg-cream-dark/10 my-8 space-y-4 max-w-lg mx-auto">
            <SlidersHorizontal className="h-10 w-10 text-forest/45 mx-auto" />
            <div>
              <h4 className="font-serif font-bold text-forest text-base">No wellness rituals match your filters</h4>
              <p className="text-xs text-charcoal/50 max-w-[280px] mt-1 mx-auto leading-relaxed">
                Try searching for alternate ingredients or browse other sacred categories above.
              </p>
            </div>
            <button
              onClick={() => { setSearchQuery(''); setSearchParams({ category: 'all' }); }}
              className="bg-forest text-cream font-bold text-xs py-2 px-5 rounded-lg hover:bg-leaf transition-all shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 py-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;
