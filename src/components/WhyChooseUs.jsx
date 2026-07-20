import React from "react";
import { Leaf, ShieldAlert } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="px-6 max-w-7xl mx-auto space-y-6 select-none">
      <h3 className="font-serif text-2xl font-black text-mv-dark-green text-center">
        Why Choose Maatraveda?
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        <div className="bg-[#FAF7F2] border border-[#D8D5CD]/70 rounded-2xl p-5 text-center flex flex-col items-center space-y-3">
          <div className="p-3 bg-white border border-[#D8D5CD]/50 text-mv-olive rounded-full">
            <Leaf className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="font-sans text-xs font-black text-mv-dark-green uppercase tracking-wide">
              100% Natural
            </h4>
            <p className="text-[10px] text-charcoal/50 leading-relaxed mt-1">
              Pure ingredients from nature
            </p>
          </div>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D8D5CD]/70 rounded-2xl p-5 text-center flex flex-col items-center space-y-3">
          <div className="p-3 bg-white border border-[#D8D5CD]/50 text-mv-olive rounded-full">
            <svg
              className="w-5 h-5 text-mv-olive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-sans text-xs font-black text-mv-dark-green uppercase tracking-wide">
              Ayurvedic Expertise
            </h4>
            <p className="text-[10px] text-charcoal/50 leading-relaxed mt-1">
              Backed by ancient wisdom
            </p>
          </div>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D8D5CD]/70 rounded-2xl p-5 text-center flex flex-col items-center space-y-3">
          <div className="p-3 bg-white border border-[#D8D5CD]/50 text-mv-olive rounded-full">
            <ShieldAlert className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="font-sans text-xs font-black text-mv-dark-green uppercase tracking-wide">
              No Toxins
            </h4>
            <p className="text-[10px] text-charcoal/50 leading-relaxed mt-1">
              Free from harmful chemicals
            </p>
          </div>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D8D5CD]/70 rounded-2xl p-5 text-center flex flex-col items-center space-y-3">
          <div className="p-3 bg-white border border-[#D8D5CD]/50 text-mv-olive rounded-full">
            <svg
              className="w-5 h-5 text-mv-olive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-sans text-xs font-black text-mv-dark-green uppercase tracking-wide">
              Cruelty Free
            </h4>
            <p className="text-[10px] text-charcoal/50 leading-relaxed mt-1">
              Kind to you and our planet
            </p>
          </div>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D8D5CD]/70 rounded-2xl p-5 text-center flex flex-col items-center space-y-3">
          <div className="p-3 bg-white border border-[#D8D5CD]/50 text-mv-olive rounded-full">
            <svg
              className="w-5 h-5 text-mv-olive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-sans text-xs font-black text-mv-dark-green uppercase tracking-wide">
              Sustainable
            </h4>
            <p className="text-[10px] text-charcoal/50 leading-relaxed mt-1">
              Eco-friendly & responsible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
