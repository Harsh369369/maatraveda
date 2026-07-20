import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchFilterBar({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <>
      {/* ========================================================================= */}
      {/* 2. MOBILE SEARCH BAR (FLEX ON MOBILE, HIDDEN ON DESKTOP) */}
      {/* ========================================================================= */}
      <section className="md:hidden px-6 pt-3 pb-1.5 max-w-7xl mx-auto select-none bg-[#FAF7F2]">
        <div className="flex items-center bg-white border border-[#D8D5CD]/60 rounded-full py-2.5 px-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <Search className="h-5 w-5 text-charcoal/40 shrink-0 stroke-[2]" />
          <input
            type="text"
            placeholder="Search Ayurvedic herbs, oils, skincare..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-2 bg-transparent text-xs text-charcoal placeholder-charcoal/35 focus:outline-none"
          />
          <div className="flex items-center gap-3 shrink-0 pl-2">
            <button className="text-charcoal/60 hover:text-charcoal cursor-pointer" aria-label="Voice Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <div className="h-5 w-[1px] bg-[#D8D5CD]/60" />
            <button className="text-charcoal/60 hover:text-[#305700] cursor-pointer" aria-label="Filters">
              <SlidersHorizontal className="h-5 w-5 stroke-[1.8]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2B. DESKTOP SEARCH BAR & QUICK CATEGORY FILTER ROW (HIDDEN ON MOBILE) */}
      {/* ========================================================================= */}
      <section className="hidden md:flex max-w-7xl mx-auto px-8 py-2.5 items-center gap-8 justify-between select-none">
        <div className="flex items-center flex-grow max-w-2xl border border-[#D8D5CD] rounded-full bg-white p-1.5 pl-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300">
          <div className="text-charcoal/40 flex items-center justify-center shrink-0">
            <Search className="h-4.5 w-4.5 stroke-[2]" />
          </div>
          <input
            id="desktop-search-input"
            type="text"
            placeholder="Search Ayurvedic herbs, oils, wellness products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3.5 pr-4 py-2 bg-transparent text-xs text-charcoal placeholder-charcoal/30 focus:outline-none"
          />
          <button className="px-6 py-2.5 bg-[#305700] hover:bg-[#254200] text-xs font-bold text-cream rounded-full transition-colors cursor-pointer shrink-0 shadow-sm">
            Search
          </button>
        </div>

        <div className="flex gap-3.5 items-center flex-wrap lg:flex-nowrap">
          {[
            "Hair Care",
            "Skin Care",
            "Wellness",
            "Oils",
            "Herbs",
            "Body Care",
          ].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(cat === activeCategory ? "All" : cat)
                }
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  isActive
                    ? "bg-[#305700] text-cream border-[#305700] shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    : "bg-white text-charcoal/80 border-[#D8D5CD] hover:bg-[#F3F1EC] hover:border-charcoal/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}