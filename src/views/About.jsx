'use client';
import React from 'react';
import { Leaf, Award, Compass, Heart, ShieldCheck, CheckCircle, Sparkles, Star } from 'lucide-react';

const TIMELINE_STEPS = [
  {
    year: '1000 BCE',
    title: 'The Sanskrit Manuscripts',
    desc: 'The foundation sages (Rishis) pen down detailed biological classifications of Himalayan plants in foundational textbooks like the Charaka Samhita and Sushruta Samhita, defining dynamic Tridosha healing.'
  },
  {
    year: '2023',
    title: 'A Seeker\'s Discovery',
    desc: 'Matriveda\'s founders notice a chemical flood in modern cosmetics masquerading as "organic." They team up with traditional Indian doctors (Vaidyas) to restore pure, untarnished Ayurvedic wellness.'
  },
  {
    year: '2024',
    title: 'Ethical Sourcing Network',
    desc: 'We form dedicated partnerships with organic forest cooperatives in the Himalayan foothills and Pampore saffron farms, establishing sustainable fair-trade wages and sustainable harvesting cycles.'
  },
  {
    year: '2025',
    title: 'AYUSH Certification',
    desc: 'Our state-of-the-art small-batch dispensary receives certified AYUSH and traditional GMP compliance, ensuring that every drop preserves maximum biological active potency.'
  },
  {
    year: '2026',
    title: 'Pan-India Reach',
    desc: 'Matriveda launches globally, delivering pure, chemical-free hair, skin, and healthcare rituals directly to metros, Tier 2, and Tier 3 cities across the Indian subcontinent.'
  }
];

const About = () => {
  return (
    <div className="space-y-16 pb-20 text-left">
      
      {/* 1. Header Hero Banner */}
      <section className="relative bg-gradient-to-b from-sandstone/30 to-cream overflow-hidden py-20 text-center border-b border-forest/10 shrink-0">
        <div className="absolute top-10 left-1/12 opacity-10 animate-float-slow pointer-events-none">
          <Leaf className="h-16 w-16 text-forest" />
        </div>
        <div className="absolute bottom-10 right-1/12 opacity-10 animate-float-slower pointer-events-none">
          <Leaf className="h-20 w-20 text-forest rotate-45" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold bg-forest/5 border border-forest/10 px-4 py-1.5 rounded-full">
            Our Sacred Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-forest leading-tight">
            Dispensing Ancient Wellness <br />
            <span className="text-gold font-normal italic">for Modern Lives.</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            Matriveda is rooted in ancient Ayurvedic tradition with a modern, trustworthy presentation. We believe wellness is a sacred connection between the soil and your skin.
          </p>
        </div>
      </section>

      {/* 2. How Matriveda Was Born (Founder Story) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Visual flat lay image representation */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute w-72 h-72 rounded-full bg-sandstone/50 filter blur-xl -z-10 animate-pulse"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-cream rotate-1 shadow-forest/15">
              <img
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop"
                alt="Traditional Indian Copper and Brass Bowls Sourcing"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right: Founder Story text block */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-sans font-black bg-gold text-forest px-3 py-1.5 rounded-full uppercase tracking-wider">
              How Matriveda Was Born
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-forest leading-snug">
              A Personal Journey of Soil & Soul
            </h2>
            
            <p className="font-sans text-sm sm:text-base text-charcoal/75 leading-relaxed">
              Matriveda was conceived in the serene foothills of Uttarakhand, India, when our founders witnessed a disturbing trend in the wellness industry: the term "Ayurveda" was being widely exploited. Cosmetics companies were utilizing "herbal extracts" as marketing labels, while filling bottles with aggressive silicones, toxic sulphates, parabens, and cheap synthetic fragrances.
            </p>

            <p className="font-sans text-sm sm:text-base text-charcoal/75 leading-relaxed">
              Restoring tradition required a return to absolute purity. Partnering with certified Vaidyas and rural Indian women farmers, we designed a line of wellness rituals that are 100% natural, preservative-free, and biologically active. Our formulas follow precise Sanskrit recipes documented over 3,000 years ago in scriptures like the Charaka Samhita.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="flex items-center gap-2 text-xs font-bold text-forest">
                <CheckCircle className="h-4.5 w-4.5 text-gold" /> 100% Raw Actives
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-forest">
                <CheckCircle className="h-4.5 w-4.5 text-gold" /> Small Batch Freshness
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-forest">
                <CheckCircle className="h-4.5 w-4.5 text-gold" /> Sourced Sustainably
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Founder Quote & Photo Block */}
      <section className="bg-sandstone/30 py-12 shrink-0 border-y border-forest/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="h-16 w-16 rounded-full bg-forest text-cream font-serif text-xl font-bold flex items-center justify-center mx-auto shadow-md border-2 border-gold/45">
            VS
          </div>
          
          <blockquote className="font-serif text-base sm:text-lg text-forest italic leading-relaxed max-w-2xl mx-auto">
            "Our mission is to bridge the gap between ancient tridosha science and modern daily self-care rituals. Each oil, serum, and wash represents a promise: a promise of absolute biological purity, sustainable trade for our tribal farmers, and lab-tested safety."
          </blockquote>
          
          <div>
            <h5 className="font-serif font-bold text-forest text-sm">Vaidya Sandeep Shastri</h5>
            <p className="text-[10px] text-charcoal/50 uppercase tracking-widest font-black mt-0.5">Founder & Chief Formulator</p>
          </div>
        </div>
      </section>

      {/* 4. Three Sourcing & Philosophy Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-forest">
            Our Sourcing & Philosophy Pillars
          </h3>
          <p className="font-sans text-xs text-charcoal/50 uppercase tracking-widest font-bold">
            How we protect wellness authenticity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Philosophy */}
          <div className="bg-cream border border-forest/10 p-8 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-forest/5 text-forest inline-block rounded-xl border border-forest/15 shadow-inner">
              <Heart className="h-6 w-6" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest">Our Philosophy</h4>
            <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              We align recipes with Ayurvedic Tridosha sciences. We believe health issues result from energy displacement (Vata, Pitta, Kapha) and address them through cooling, grounding botanical elements.
            </p>
          </div>
          {/* Sourcing */}
          <div className="bg-cream border border-forest/10 p-8 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-forest/5 text-forest inline-block rounded-xl border border-forest/15 shadow-inner">
              <Compass className="h-6 w-6" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest">Our Sourcing</h4>
            <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              We buy directly from organic farms in the Pampore valley of Kashmir, Kerala, and Himalayan foothills, giving Indian farmers fair trade wages and promoting pesticide-free biodiversity.
            </p>
          </div>
          {/* Promise */}
          <div className="bg-cream border border-forest/10 p-8 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-forest/5 text-forest inline-block rounded-xl border border-forest/15 shadow-inner">
              <Award className="h-6 w-6" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest">Our Promise</h4>
            <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              Zero mineral oils, parabens, chemical dyes, or foaming SLS compounds. Fully certified AYUSH and GMP compliance, lab-tested safe for sensitive skin types.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Timeline-style visual journey */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-forest">
            Vedic Timeline Journey
          </h3>
          <p className="font-sans text-sm text-charcoal/60">
            The historical lineage behind every Matriveda drop.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-forest/20 ml-4 md:ml-32 space-y-12">
          {TIMELINE_STEPS.map((step, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12">
              {/* Year circle indicator left */}
              <div className="absolute -left-3 top-1.5 h-6 w-6 rounded-full bg-forest border-4 border-cream flex items-center justify-center shadow-sm">
                <Sparkles className="h-2 w-2 text-gold fill-gold/15" />
              </div>
              
              {/* Year badge label */}
              <div className="absolute left-[-115px] top-1.5 hidden md:block w-24 text-right">
                <span className="font-sans text-xs font-bold text-gold uppercase tracking-wider bg-sandstone/40 border border-gold/20 px-2 py-1 rounded">
                  {step.year}
                </span>
              </div>

              {/* Year label inside for mobile */}
              <span className="inline-block md:hidden font-sans text-[10px] font-black text-gold uppercase tracking-widest bg-sandstone/30 px-2.5 py-1 rounded mb-2 border border-gold/15">
                {step.year}
              </span>

              {/* Text info */}
              <div className="space-y-1.5 text-left bg-cream border border-forest/5 p-5 rounded-2xl shadow-sm">
                <h4 className="font-serif font-bold text-forest text-base leading-none">{step.title}</h4>
                <p className="font-sans text-xs sm:text-sm text-charcoal/60 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Certifications & Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-forest/10 pt-16 text-center space-y-8">
        <h3 className="font-serif text-lg font-bold text-forest uppercase tracking-widest">
          Verified Ayurvedic Certifications
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-10 opacity-70">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="h-10 w-10 text-forest" />
            <span className="font-sans text-[10px] font-bold text-forest uppercase tracking-wide">AYUSH Certified</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Award className="h-10 w-10 text-forest" />
            <span className="font-sans text-[10px] font-bold text-forest uppercase tracking-wide">GMP Approved</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Star className="h-10 w-10 text-forest" />
            <span className="font-sans text-[10px] font-bold text-forest uppercase tracking-wide">100% Organic Sourced</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="h-10 w-10 text-forest" />
            <span className="font-sans text-[10px] font-bold text-forest uppercase tracking-wide">Toxin Free Certificate</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
