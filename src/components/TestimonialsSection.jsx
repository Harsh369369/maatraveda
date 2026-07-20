import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-[2rem] bg-gradient-to-r from-[#F3EFE9] to-[#EAE5DC] border border-[#D8D5CD] overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="space-y-4 max-w-lg z-10">
          <span className="text-[10px] font-bold text-[#5B7917] uppercase tracking-widest block leading-none">
            Loved by Thousands
          </span>
          <blockquote className="font-serif text-base sm:text-lg lg:text-xl font-bold text-mv-dark-green italic leading-relaxed">
            "Maatraveda products have truly transformed my skin and hair.
            Pure, effective and 100% trustworthy."
          </blockquote>

          <div className="space-y-1">
            <span className="text-xs font-black text-mv-dark-green">
              — Priya Sharma
            </span>
            <div className="flex gap-0.5 text-[#E1A12C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Styling Image */}
        <div className="w-full md:w-[42%] max-w-sm rounded-xl overflow-hidden bg-cream border border-[#D8D5CD]/40 relative aspect-1.3 shrink-0 shadow-sm">
          <img
            src="/images/bg_towels.jpg"
            className="w-full h-full object-cover"
            alt="premium beauty products"
          />
        </div>

        {/* Navigation Circles */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white hover:bg-cream text-charcoal shadow-xs rounded-full flex items-center justify-center transition-colors cursor-pointer border border-[#D8D5CD]/20">
          <ChevronLeft className="h-4 w-4 text-charcoal/50" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white hover:bg-cream text-charcoal shadow-xs rounded-full flex items-center justify-center transition-colors cursor-pointer border border-[#D8D5CD]/20">
          <ChevronRight className="h-4 w-4 text-charcoal/50" />
        </button>
      </div>
    </section>
  );
}
