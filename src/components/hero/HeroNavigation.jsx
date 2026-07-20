import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroNavigation({
  totalSlides,
  currentSlide,
  progress,
  nextSlide,
  previousSlide,
  goToSlide,
}) {
  return (
    <>
      {/* ========================================================= */}
      {/* Previous Button                                           */}
      {/* ========================================================= */}

      <button
        onClick={previousSlide}
        aria-label="Previous Slide"
        className="
          hidden
          md:flex

          absolute

          left-10
          md:left-12

          top-1/2

          -translate-y-1/2

          z-40

          w-12

          h-12

          items-center

          justify-center

          rounded-full

          bg-white/90

          backdrop-blur

          border

          border-[#ECE5D7]

          shadow-xl

          transition-all

          duration-300

          hover:bg-white

          hover:scale-110

          hover:shadow-2xl
        "
      >
        <ChevronLeft
          className="
            w-5
            h-5
            text-[#305700]
          "
        />
      </button>

      {/* ========================================================= */}
      {/* Next Button                                               */}
      {/* ========================================================= */}

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="
          hidden
          md:flex

          absolute

          right-10
          md:right-12

          top-1/2

          -translate-y-1/2

          z-40

          w-12

          h-12

          items-center

          justify-center

          rounded-full

          bg-white/90

          backdrop-blur

          border

          border-[#ECE5D7]

          shadow-xl

          transition-all

          duration-300

          hover:bg-white

          hover:scale-110

          hover:shadow-2xl
        "
      >
        <ChevronRight
          className="
            w-5
            h-5
            text-[#305700]
          "
        />
      </button>

      {/* ========================================================= */}
      {/* Desktop Indicators                                        */}
      {/* ========================================================= */}

      <div
        className="
          absolute

          bottom-8

          left-1/2

          -translate-x-1/2

          z-40

          hidden

          md:flex

          items-center

          gap-3
        "
      >
        {Array.from({ length: totalSlides }).map((_, index) => {
          const active = currentSlide === index;

          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to Slide ${index + 1}`}
              aria-current={active}
              className={`
                relative

                overflow-hidden

                rounded-full

                transition-all

                duration-500

                ${
                  active
                    ? "w-16 h-3 bg-white/60"
                    : "w-3 h-3 bg-white/60 hover:bg-white"
                }
              `}
            >
              {active && (
                <div
                  className="
                    absolute

                    left-0

                    top-0

                    h-full

                    rounded-full

                    bg-[#305700]

                    transition-all

                    duration-100
                  "
                  style={{
                    width: `${progress}%`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* Mobile Indicators                                         */}
      {/* ========================================================= */}

      <div
        className="
          absolute

          bottom-6

          left-1/2

          -translate-x-1/2

          flex

          md:hidden

          gap-2

          z-40
        "
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              rounded-full

              transition-all

              duration-300

              ${
                currentSlide === index
                  ? "w-8 h-2 bg-[#305700]"
                  : "w-2 h-2 bg-white"
              } `}
          />
        ))}
      </div>
    </>
  );
}
