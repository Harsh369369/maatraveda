import React from "react";
import { Link } from "../utils/router-compat";
import { ArrowRight } from "lucide-react";

const INGREDIENTS = [
  {
    name: "Ashwagandha",
    desc: "Reduces stress & boosts energy",
    image: "/ingredients/ashwagandha.png",
  },
  {
    name: "Neem",
    desc: "Purifies skin & fights acne",
    image: "/ingredients/neem.png",
  },
  {
    name: "Amla",
    desc: "Rich in Vitamin C & strengthens hair",
    image: "/ingredients/amla.png",
  },
  {
    name: "Saffron",
    desc: "Brightens skin & improves glow",
    image: "/ingredients/saffron.png",
  },
  {
    name: "Turmeric",
    desc: "Natural healer & anti-inflammatory",
    image: "/ingredients/turmeric.png",
  },
  {
    name: "Aloevera",
    desc: "Improves memory & mental clarity",
    image: "/ingredients/aloevera.png",
  },
];

export default function IngredientsSection() {
  return (
    <section className="px-6 max-w-7xl mx-auto space-y-5 select-none text-left">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl font-black text-mv-dark-green">
          Nature's Finest Ingredients
        </h3>
        <Link
          to="/products"
          className="text-xs font-bold text-[#5B7917] hover:underline flex items-center gap-1 cursor-pointer"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-none snap-x snap-mandatory md:grid md:grid-cols-6 md:gap-6 md:pb-0 md:overflow-visible">
        {INGREDIENTS.map((ing) => (
          <div
            key={ing.name}
            className="flex flex-col items-center text-center space-y-3.5 group cursor-pointer shrink-0 w-[140px] sm:w-[170px] snap-start md:w-auto md:shrink"
          >
            <div className="relative w-34 h-34 sm:w-44 sm:h-44 rounded-full overflow-hidden bg-[#FAF7F2] border border-[#D8D5CD]/40 group-hover:border-[#5B7917] transition-all duration-300 shadow-xs group-hover:shadow-md">
              <img
                src={ing.image}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={ing.name}
              />
              <div className="absolute inset-0 bg-[#5B7917]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-md font-black text-mv-dark-green group-hover:text-[#5B7917] transition-colors">
                {ing.name}
              </h4>
              <p className="text-sm text-charcoal/50 leading-relaxed max-w-[120px] mx-auto">
                {ing.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
