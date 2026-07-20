import React, { useEffect, useState } from "react";
import { Link } from "../utils/router-compat";
import {
  Leaf,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  FlaskRound,
} from "lucide-react";

const HERO_SLIDES = [
  {
    badge: "PREMIUM GLOW SERIES",
    title: "Reveal Timeless Radiance\nwith Pure Kashmiri Saffron",
    subtitle:
      "Experience the golden touch of nature for bright, youthful and glowing skin.",
    bgGradient: "from-[#FCF3E3] to-[#F7E7C4]",
    textColor: "#0D3500",
    badgeBg: "bg-[#5B7917]/10 text-[#5B7917]",
    image: "/images/banner/banner1.png",
    showSticker: true,
  },
  {
    badge: "HERBS EDITION",
    title: "Rooted in Nature.\nCrafted for You.",
    subtitle: "The goodness of ancient herbs for modern life.",
    bgGradient: "from-[#EAF4E2] to-[#DCEAD0]",
    textColor: "#0D3500",
    badgeBg: "bg-[#5B7917]/10 text-[#5B7917]",
    image: "/images/hero_herbs.jpg",
    showSticker: false,
  },
  {
    badge: "LIFESTYLE GLOW",
    title: "The Ayurvedic\nGlow You Deserve.",
    subtitle: "Natural care. Visible results.",
    bgGradient: "from-[#F5EBE6] to-[#EADED7]",
    textColor: "#0D3500",
    badgeBg: "bg-[#5B7917]/10 text-[#5B7917]",
    image: "/images/hero_lifestyle.jpg",
    showSticker: false,
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderHeading = (title) => {
    if (title.includes("Pure Kashmiri Saffron")) {
      return (
        <>
          Reveal Timeless Radiance
          <br />
          with <span className="text-[#305700]">Pure Kashmiri Saffron</span>
        </>
      );
    }
    if (title.includes("Crafted for You")) {
      return (
        <>
          Rooted in Nature.
          <br />
          <span className="text-[#305700]">Crafted for You.</span>
        </>
      );
    }
    if (title.includes("Glow You Deserve")) {
      return (
        <>
          The Ayurvedic
          <br />
          <span className="text-[#305700]">Glow You Deserve.</span>
        </>
      );
    }
    return title.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < title.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="relative w-full overflow-hidden rounded-[36px] aspect-[1920/800] lg:aspect-[21/9] min-h-[520px] lg:min-h-[620px] shadow-2xl">
        {/* Background Image */}
        <img
          src={HERO_SLIDES[currentSlide].image}
          alt={HERO_SLIDES[currentSlide].title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />

        {/* Gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#FFFDF8]
            via-[#FFFDF8]/72
            via-40%
            to-transparent
          "
        />

        {/* Decorative Blur */}
        <div
          className="
            absolute
            left-[-120px]
            top-1/2
            -translate-y-1/2
            w-[500px]
            h-[500px]
            rounded-full
            bg-[#F8F3E8]/70
            blur-[140px]
          "
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-xl px-8 sm:px-12 lg:px-20">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full shadow-sm ${HERO_SLIDES[currentSlide].badgeBg}`}
            >
              <Leaf className="w-4 h-4" />
              <span className="uppercase tracking-[0.2em] text-xs font-bold">
                {HERO_SLIDES[currentSlide].badge}
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                mt-8
                font-serif
                text-3xl
                sm:text-4xl
                md:text-5xl
                xl:text-6xl
                font-black
                leading-tight
                text-[#18311B]
                whitespace-pre-line
              "
            >
              {renderHeading(HERO_SLIDES[currentSlide].title)}
            </h1>

            {/* Subtitle */}
            <p
              className="
                mt-6
                text-base
                md:text-lg
                leading-8
                text-[#5B5B5B]
                max-w-xl
              "
            >
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            {/* Buttons and Inline Trust Icons */}
            <div className="flex flex-wrap items-center gap-6 mt-8 sm:mt-10 justify-center sm:justify-start">
              <Link
                to="/products"
                className="
                  bg-[#18311B]
                  hover:bg-[#305700]
                  text-white
                  px-7
                  py-3.5
                  rounded-full
                  font-bold
                  text-sm
                  transition
                  inline-flex
                  items-center
                  gap-1.5
                  shadow-lg
                  shrink-0
                "
              >
                Explore Collection
                <ArrowRight size={16} />
              </Link>

              <div className="hidden lg:flex items-center gap-6 border-l border-charcoal/10 pl-6">
                <div className="flex flex-col items-center gap-1 select-none text-center">
                  <Leaf className="w-5 h-5 text-[#305700] stroke-[2]" />
                  <span className="text-[9px] font-bold text-charcoal/70 tracking-tight leading-none">
                    100%
                    <br />
                    Ayurvedic
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1 select-none text-center">
                  <ShieldCheck className="w-5 h-5 text-[#305700] stroke-[2]" />
                  <span className="text-[9px] font-bold text-charcoal/70 tracking-tight leading-none">
                    Clinically
                    <br />
                    Tested
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1 select-none text-center">
                  <FlaskRound className="w-5 h-5 text-[#305700] stroke-[2]" />
                  <span className="text-[9px] font-bold text-charcoal/70 tracking-tight leading-none">
                    No Harmful
                    <br />
                    Chemicals
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1 select-none text-center">
                  <Sparkles className="w-5 h-5 text-[#305700] stroke-[2]" />
                  <span className="text-[9px] font-bold text-charcoal/70 tracking-tight leading-none">
                    Pure &<br />
                    Natural
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Gold Seal */}
        {HERO_SLIDES[currentSlide].showSticker && (
          <div
            className="
              hidden
              sm:flex
              absolute
              top-8
              right-10
              w-28
              h-28
              rounded-full
              bg-gradient-to-br
              from-[#F5D77A]
              via-[#D6A93A]
              to-[#B88411]
              border-[5px]
              border-white
              shadow-2xl
              flex-col
              justify-center
              items-center
              text-center
              z-20
            "
          >
            <span className="text-[10px] uppercase tracking-[0.18em] text-white font-bold">
              Pure
            </span>
            <span className="font-serif text-lg text-white font-bold">
              Kashmiri
            </span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-white font-semibold">
              Saffron
            </span>
          </div>
        )}

        {/* Decorative Leaf */}
        <div
          className="
            absolute
            left-0
            bottom-0
            w-44
            h-44
            bg-gradient-to-tr
            from-[#8EA768]/15
            to-transparent
            rounded-full
            blur-3xl
          "
        />

        {/* Navigation */}
        {/* Previous Button */}
        <button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? HERO_SLIDES.length - 1 : prev - 1,
            )
          }
          className="
            hidden
            md:flex
            absolute
            left-6
            top-1/2
            -translate-y-1/2
            z-30
            w-10
            h-10
            rounded-full
            bg-white
            border
            border-charcoal/10
            shadow-md
            hover:scale-110
            hover:bg-cream
            transition-all
            duration-300
            items-center
            justify-center
          "
        >
          <ChevronLeft className="w-5 h-5 text-charcoal/50" />
        </button>

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
          }
          className="
            hidden
            md:flex
            absolute
            right-6
            top-1/2
            -translate-y-1/2
            z-30
            w-10
            h-10
            rounded-full
            bg-white
            border
            border-charcoal/10
            shadow-md
            hover:scale-110
            hover:bg-cream
            transition-all
            duration-300
            items-center
            justify-center
          "
        >
          <ChevronRight className="w-5 h-5 text-charcoal/50" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                transition-all
                duration-500
                rounded-full
                ${
                  currentSlide === index
                    ? "w-12 h-2.5 bg-[#305700]"
                    : "w-2.5 h-2.5 bg-white/70 hover:bg-white"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
