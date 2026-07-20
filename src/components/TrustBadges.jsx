import React from "react";
import { Leaf, RefreshCw, Users, ShieldCheck } from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="px-6 max-w-7xl mx-auto py-2">
      <div className="grid grid-cols-4 md:grid-cols-5 gap-2 border border-[#D8D5CD]/40 bg-white rounded-2xl p-4 md:p-6 shadow-xs select-none">
        
        {/* Item 1 */}
        <div className="flex flex-col items-center text-center gap-1.5 border-r border-[#D8D5CD]/35 md:flex-row md:text-left md:gap-3.5 pr-1 md:pr-2 md:border-r md:border-[#D8D5CD]/40">
          <div className="p-2 bg-mv-olive/5 rounded-full text-mv-olive shrink-0">
            <Leaf className="h-5 w-5 md:h-6 md:w-6 stroke-[1.8]" />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-[9px] md:text-xs font-black text-mv-dark-green leading-snug">
              100% Ayurvedic
            </h4>
            <p className="text-[7.5px] md:text-[10px] text-charcoal/50 font-medium leading-none mt-0.5">
              Pure & Natural Ingredients
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-center text-center gap-1.5 border-r border-[#D8D5CD]/35 md:flex-row md:text-left md:gap-3.5 pr-1 md:pr-2 md:border-r md:border-[#D8D5CD]/40">
          <div className="p-2 bg-mv-olive/5 rounded-full text-mv-olive shrink-0">
            <svg
              className="h-5 w-5 md:h-6 md:w-6 stroke-[1.8]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-[9px] md:text-xs font-black text-mv-dark-green leading-snug">
              Free Shipping
            </h4>
            <p className="text-[7.5px] md:text-[10px] text-charcoal/50 font-medium leading-none mt-0.5">
              On orders above ₹999
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-center text-center gap-1.5 border-r border-[#D8D5CD]/35 md:flex-row md:text-left md:gap-3.5 pr-1 md:pr-2 md:border-r md:border-[#D8D5CD]/40">
          <div className="p-2 bg-mv-olive/5 rounded-full text-mv-olive shrink-0">
            <RefreshCw className="h-5 w-5 md:h-6 md:w-6 stroke-[1.8]" />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-[9px] md:text-xs font-black text-mv-dark-green leading-snug">
              Easy Returns
            </h4>
            <p className="text-[7.5px] md:text-[10px] text-charcoal/50 font-medium leading-none mt-0.5">
              30 Day Return Policy
            </p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="flex flex-col items-center text-center gap-1.5 md:flex-row md:text-left md:gap-3.5 pr-1 md:pr-2 md:border-r md:border-[#D8D5CD]/40">
          <div className="p-2 bg-mv-olive/5 rounded-full text-mv-olive shrink-0">
            <Users className="h-5 w-5 md:h-6 md:w-6 stroke-[1.8]" />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-[9px] md:text-xs font-black text-mv-dark-green leading-snug">
              10,000+ Customers
            </h4>
            <p className="text-[7.5px] md:text-[10px] text-charcoal/50 font-medium leading-none mt-0.5">
              Happy & Trusting Us
            </p>
          </div>
        </div>

        {/* Item 5 - Hidden on Mobile */}
        <div className="hidden md:flex flex-col items-center text-center gap-1.5 md:flex-row md:text-left md:gap-3.5 pr-1 md:pr-2 last:border-none">
          <div className="p-2 bg-mv-olive/5 rounded-full text-mv-olive shrink-0">
            <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 stroke-[1.8]" />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-[9px] md:text-xs font-black text-mv-dark-green leading-snug">
              Secure Payments
            </h4>
            <p className="text-[7.5px] md:text-[10px] text-charcoal/50 font-medium leading-none mt-0.5">
              100% Secure Checkout
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
