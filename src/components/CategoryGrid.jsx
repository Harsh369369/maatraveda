import React from "react";
import { Link } from "../utils/router-compat";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "Hair Care",
    subtitle: "Nourish & Strengthen",
    image: "/images/categories/hair-care.png",
    icon: "🌿",
  },
  {
    name: "Skin Care",
    subtitle: "Glow & Rejuvenate",
    image: "/images/categories/skin-care.png",
    icon: "✨",
  },
  {
    name: "Wellness",
    subtitle: "Holistic Well-being",
    image: "/images/categories/bath-shower.png",
    icon: "💪",
  },
  {
    name: "Oils",
    subtitle: "Pure & Natural Oils",
    image: "/images/categories/face-care.png",
    icon: "💧",
  },
  {
    name: "Herbs",
    subtitle: "Nature's Finest",
    image: "/images/categories/wellness.png",
    icon: "🌱",
  },
  {
    name: "Body Care",
    subtitle: "Pure & Organic Care",
    image: "/images/categories/body-care.png",
    icon: "🌸",
  },
];

export default function CategoryGrid({ activeCategory, setActiveCategory }) {
  return (
    <section className="px-6 max-w-7xl mx-auto space-y-5 select-none">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl font-black text-mv-dark-green">
          Shop by Category
        </h3>
        <Link
          to="/products"
          className="text-xs font-bold text-[#5B7917] hover:underline flex items-center gap-1 cursor-pointer"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-none snap-x snap-mandatory md:grid md:grid-cols-5 md:gap-5 md:pb-0 md:overflow-visible">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <div
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer text-center group flex flex-col items-center justify-between space-y-3 shrink-0 w-[140px] sm:w-[160px] snap-start md:w-auto md:shrink ${
                isActive
                  ? "border-[#305700] ring-1 ring-[#305700]"
                  : "border-[#D8D5CD] hover:border-[#305700]/50 hover:shadow-sm"
              }`}
            >
              <div className="w-full rounded-xl overflow-hidden bg-cream border border-[#D8D5CD]/40 relative">
                <img
                  src={cat.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={cat.name}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
