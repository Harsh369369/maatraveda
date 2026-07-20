import React, { useEffect } from "react";
import HeroSlide from "./HeroSlide";
import HeroNavigation from "./HeroNavigation";
import { HERO_SLIDES } from "./heroData";
import useHeroSlider from "./useHeroSlider";

export default function HeroSlider() {
  const slider = useHeroSlider(HERO_SLIDES.length);

  /* ------------------------------------------------------------ */
  /* Preload Images                                                */
  /* ------------------------------------------------------------ */

  useEffect(() => {
    slider.preloadImages(HERO_SLIDES);
  }, []);

  return (
    <section className="relative w-full px-4 lg:px-8 max-w-7xl mx-auto">
      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          shadow-lg
          aspect-[1092/1440]
          md:aspect-[21/9]
          bg-[#FCF9F4]
        "
        onMouseEnter={slider.pauseSlider}
        onMouseLeave={slider.resumeSlider}
        onTouchStart={slider.handleTouchStart}
        onTouchMove={slider.handleTouchMove}
        onTouchEnd={slider.handleTouchEnd}
      >
        {/* ----------------------------------------------------- */}
        {/* Hero Content                                          */}
        {/* ----------------------------------------------------- */}

        <HeroSlide slide={HERO_SLIDES[slider.currentSlide]} />

        {/* ----------------------------------------------------- */}
        {/* Navigation                                            */}
        {/* ----------------------------------------------------- */}

        <HeroNavigation
          totalSlides={HERO_SLIDES.length}
          currentSlide={slider.currentSlide}
          progress={slider.progress}
          nextSlide={slider.nextSlide}
          previousSlide={slider.previousSlide}
          goToSlide={slider.goToSlide}
        />
      </div>
    </section>
  );
}
