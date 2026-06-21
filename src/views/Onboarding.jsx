import React, { useState, useEffect } from 'react';
import { useRouter } from '../utils/router-compat';
import { ArrowRight, Sparkles, Camera } from 'lucide-react';

const SLIDES = [
  {
    id: 'intro',
    title: 'Your Personal Beauty Store',
    subtitle: 'Shop top beauty products handpicked for your skin. Simple, smart, and tailored to you.',
    image: '/9720eabcffccec16e1dd2a27bb8bf2edb8ccbd26 (1).png',
    type: 'default',
  },
  {
    id: 'questions',
    title: 'Tell Us About Your Skin',
    subtitle: 'Answer a few quick questions so we can recommend the perfect products for your needs.',
    image: '/a07659a7895971016fdf36c3cbc5b44d9b373ba0.png',
    type: 'default',
  },
  {
    id: 'scan',
    title: "Let's Analyze Your Skin",
    subtitle: 'Use our AI-powered face scan to detect your skin type, concerns, and get smarter product suggestions.',
    image: '/f38f395a4f91ff98354316fd6d80adc6bd521d7c.png',
    type: 'scan',
  },
  {
    id: 'concerns',
    title: 'Personalize Your Glow',
    subtitle: 'Select your concerns—like acne, dryness, or dullness—for more accurate product matches.',
    image: '/17fcd4fb136479bb92b19b5097f329b2369a4e89.png',
    type: 'default',
  },
  {
    id: 'glow',
    title: "Let's Glow",
    subtitle: 'Start browsing personalized picks, build your routine, and glow effortlessly.',
    image: '/1cd284b6ffd96ea3ca946de82df42d4318d1971d (1).png',
    type: 'glow',
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    router.push('/');
  };

  // AI Scan simulation counting up when slide 3 is active
  useEffect(() => {
    if (currentSlide === 2) {
      setScanProgress(0);
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 35);
      return () => clearInterval(interval);
    }
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-[#F0F3F7] flex items-center justify-center sm:py-6 sm:px-4 font-sans select-none">
      
      {/* Sleek Mobile Frame on Desktop, full screen on Mobile */}
      <div className="w-full sm:max-w-[400px] h-screen sm:h-[812px] bg-[#E9EFF6] rounded-none sm:rounded-[3rem] shadow-none sm:shadow-2xl overflow-hidden border-0 sm:border-8 sm:border-white relative flex flex-col justify-between pt-4">
        
        {/* Top Header Section (Time, Battery, Logo, Titles) */}
        <div className="px-6 space-y-4 shrink-0">
          
          {/* Device Status Bar */}
          <div className="flex justify-between items-center text-xs font-bold text-mv-dark-green/70 pt-1 select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <svg className="h-3 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M2 11.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <div className="w-5.5 h-3 border border-mv-dark-green/60 rounded-sm p-0.5 flex items-center">
                <div className="h-full w-3.5 bg-mv-dark-green/70 rounded-2xs"></div>
              </div>
            </div>
          </div>

          {/* Top Logo */}
          <div className="text-center select-none">
            <span className="font-sans text-xs font-black tracking-[0.25em] text-[#0D3500] uppercase">
              MAATRAVEDA
            </span>
          </div>

          {/* Slide Title and Description */}
          <div className="text-center px-2 space-y-2 select-none">
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-[#49150B] tracking-tight leading-tight">
              {slide.title}
            </h2>
            <p className="font-sans text-xs sm:text-[13px] text-charcoal/70 leading-relaxed min-h-[38px]">
              {slide.subtitle}
            </p>
          </div>

        </div>

        {/* Bottom Portion - Image (Fills the remaining screen) */}
        <div className="relative flex-grow w-full mt-6 rounded-t-[3rem] overflow-hidden shadow-inner bg-white">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Gradient Overlay at the bottom for text contrast */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 via-black/25 to-transparent pointer-events-none z-10"></div>

          {/* Step 3: Face Scan Laser Grid Animation */}
          {slide.type === 'scan' && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-20">
              
              {/* Green/Cyan Scanning Laser Line */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#22C55E] to-transparent opacity-95 shadow-[0_0_12px_#22C55E] animate-bounce" style={{ animationDuration: '4s' }}></div>
              
              {/* Animating Scanning Node Circles */}
              <div className="absolute top-[35%] left-[45%] w-3 h-3 bg-[#22C55E] rounded-full opacity-75 animate-ping"></div>
              <div className="absolute top-[48%] left-[50%] w-3 h-3 bg-[#22C55E] rounded-full opacity-75 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-[62%] left-[48%] w-3 h-3 bg-[#22C55E] rounded-full opacity-75 animate-ping" style={{ animationDelay: '1s' }}></div>
              
              {/* AI Scan Progress Widget */}
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-white text-xs font-bold font-mono tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                SCANNING: {scanProgress}%
              </div>

              {/* Status indicator badges */}
              <div className="absolute bottom-28 left-6 p-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white">
                <Camera className="h-4.5 w-4.5" />
              </div>
              <div className="absolute bottom-28 right-6 py-1.5 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10px] font-black uppercase tracking-widest">
                AI ACTIVE
              </div>
            </div>
          )}

          {/* Step 5: Sparkle overlay for Completion */}
          {slide.type === 'glow' && (
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Sparkles */}
              <div className="absolute top-12 left-10 text-white animate-pulse" style={{ animationDuration: '2s' }}>
                <Sparkles className="h-6 w-6 fill-white" />
              </div>
              <div className="absolute top-1/3 right-12 text-white animate-ping" style={{ animationDuration: '3s' }}>
                <Sparkles className="h-4 w-4 fill-white" />
              </div>
              <div className="absolute bottom-28 left-16 text-white animate-pulse" style={{ animationDuration: '2.5s' }}>
                <Sparkles className="h-5 w-5 fill-white" />
              </div>
            </div>
          )}

          {/* Overlay Navigation Controls (Back/Skip, Dots, Next Chevron) */}
          <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between z-30 select-none">
            
            {/* Left Action: Skip or Back */}
            {currentSlide === 0 ? (
              <button
                onClick={handleSkip}
                className="text-sm font-bold text-white hover:text-white/80 transition-colors cursor-pointer drop-shadow-md"
              >
                Skip
              </button>
            ) : (
              <button
                onClick={handleBack}
                className="text-sm font-bold text-white hover:text-white/80 transition-colors cursor-pointer drop-shadow-md"
              >
                Back
              </button>
            )}

            {/* Middle Action: Dots Indicator */}
            {currentSlide < SLIDES.length - 1 ? (
              <div className="flex items-center gap-1.5">
                {SLIDES.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            ) : null}

            {/* Right Action: Next Circle or Get Starter wide pill */}
            {currentSlide === SLIDES.length - 1 ? (
              <button
                onClick={handleNext}
                className="bg-white text-[#0D3500] font-sans font-black text-xs py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-cream cursor-pointer uppercase tracking-widest"
              >
                Get Starter
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-mv-dark-green hover:bg-cream shadow-lg hover:shadow-xl transition-all cursor-pointer"
                aria-label="Next Slide"
              >
                <ArrowRight className="h-5 w-5 stroke-[2.5]" />
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
