import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_PLAY_DELAY = 6000;
const SWIPE_THRESHOLD = 60;

export default function useHeroSlider(totalSlides) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const [progress, setProgress] = useState(0);

  const touchStartX = useRef(null);

  const touchEndX = useRef(null);

  const intervalRef = useRef(null);

  const progressRef = useRef(null);

  /* ---------------------------------------------------------- */
  /* Navigation                                                  */
  /* ---------------------------------------------------------- */

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  /* ---------------------------------------------------------- */
  /* Auto Play                                                   */
  /* ---------------------------------------------------------- */

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(intervalRef.current);
  }, [nextSlide, isPaused]);

  /* ---------------------------------------------------------- */
  /* Progress Bar                                                */
  /* ---------------------------------------------------------- */

  useEffect(() => {
    if (isPaused) return;

    setProgress(0);

    let start = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;

      const percentage = Math.min(
        (elapsed / AUTO_PLAY_DELAY) * 100,
        100
      );

      setProgress(percentage);
    }, 30);

    return () => clearInterval(progressRef.current);
  }, [currentSlide, isPaused]);

  /* ---------------------------------------------------------- */
  /* Pause                                                       */
  /* ---------------------------------------------------------- */

  const pauseSlider = () => {
    setIsPaused(true);
  };

  const resumeSlider = () => {
    setIsPaused(false);
  };

  /* ---------------------------------------------------------- */
  /* Keyboard Navigation                                         */
  /* ---------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        previousSlide();
      }

      if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide]);

  /* ---------------------------------------------------------- */
  /* Touch Swipe                                                 */
  /* ---------------------------------------------------------- */

  const handleTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > SWIPE_THRESHOLD) {
      nextSlide();
    }

    if (distance < -SWIPE_THRESHOLD) {
      previousSlide();
    }
  };

  /* ---------------------------------------------------------- */
  /* Image Preload                                               */
  /* ---------------------------------------------------------- */

  const preloadImages = (slides) => {
    slides.forEach((slide) => {
      const desktop = new Image();
      desktop.src = slide.desktopImage;

      const mobile = new Image();
      mobile.src = slide.mobileImage;
    });
  };

  return {
    currentSlide,

    progress,

    nextSlide,

    previousSlide,

    goToSlide,

    pauseSlider,

    resumeSlider,

    handleTouchStart,

    handleTouchMove,

    handleTouchEnd,

    preloadImages,
  };
}