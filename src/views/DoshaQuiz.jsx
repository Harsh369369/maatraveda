'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { productServices } from '../services/api';
import { Check, Sparkles, RefreshCw, Mail, ArrowRight, ShieldCheck, Heart, Leaf, Sun } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const QUESTIONS = [
  {
    id: 1,
    title: 'How would you describe your skin type?',
    options: [
      { text: 'Dry, thin, cool, easily chapped, or rough under fingers.', dosha: 'Vata' },
      { text: 'Sensitive, warm, prone to redness, acne breakouts, or rashes.', dosha: 'Pitta' },
      { text: 'Thick, smooth, soft, cool, prone to oiliness or open pores.', dosha: 'Kapha' }
    ]
  },
  {
    id: 2,
    title: 'Describe the natural state of your hair:',
    options: [
      { text: 'Dry, frizzy, brittle, thin, or easily tangled with split ends.', dosha: 'Vata' },
      { text: 'Fine, soft, prone to premature greying or early thinning.', dosha: 'Pitta' },
      { text: 'Thick, heavy, wavy, strong roots, and naturally oily.', dosha: 'Kapha' }
    ]
  },
  {
    id: 3,
    title: 'How do your energy levels behave throughout the day?',
    options: [
      { text: 'Fluctuating. High bursts of energy, but tires very easily.', dosha: 'Vata' },
      { text: 'High and driven. Intense focus, works long hours without fatigue.', dosha: 'Pitta' },
      { text: 'Steady and constant. Slow to start, but possesses immense endurance.', dosha: 'Kapha' }
    ]
  },
  {
    id: 4,
    title: 'What is your typical digestion and appetite pattern?',
    options: [
      { text: 'Irregular. Variable appetite, easily bloated or gassy after meals.', dosha: 'Vata' },
      { text: 'Strong and intense hunger. Prone to acidity or heartburn.', dosha: 'Pitta' },
      { text: 'Slow and heavy. Regular digestion, can easily skip meals.', dosha: 'Kapha' }
    ]
  },
  {
    id: 5,
    title: 'How would you describe your sleep pattern?',
    options: [
      { text: 'Light, interrupted, easily disturbed by noises. Awake early.', dosha: 'Vata' },
      { text: 'Sound and moderate. Can sleep 7 hours but wakes up feeling hot.', dosha: 'Pitta' },
      { text: 'Deep, heavy, and long. Hard to wake up in the morning.', dosha: 'Kapha' }
    ]
  },
  {
    id: 6,
    title: 'What is your immediate reaction under stress or pressure?',
    options: [
      { text: 'Anxious, worried, fearful. My mind immediately starts racing.', dosha: 'Vata' },
      { text: 'Irritable, angry, impatient. I become highly critical.', dosha: 'Pitta' },
      { text: 'Calm, steady, but withdrawn. I become quiet or stubborn.', dosha: 'Kapha' }
    ]
  }
];

const DOSHA_PROFILES = {
  Vata: {
    name: 'Vata Dominant',
    description: 'Your mind and body are naturally governed by the elements of Air and Ether. This represents movement, change, and light energy. Prone to dryness, frizz, and coldness, your tridosha balance thrives on warm, rich, and deeply grounding wellness rituals.',
    skinHairInfo: 'Dry, brittle hair and dehydrated, flaky skin require heavy botanical lipids like sesame oil, sandalwood, and sweet almond extracts to lock in optimal nourishment.',
    categories: ['hair', 'body']
  },
  Pitta: {
    name: 'Pitta Dominant',
    description: 'Your mind and body are governed by Fire and Water. You represent digestion, intelligence, and thermal energy. High Pitta manifests as heat, meaning you are prone to skin sensitivity, redness, and early hair greying or thinning.',
    skinHairInfo: 'Cooling, anti-inflammatory herbs like Kashmiri Saffron, Sandalwood, Aloe Vera, and organic Reetha are perfect to soothe heat and bring back natural radiance.',
    categories: ['face', 'hair']
  },
  Kapha: {
    name: 'Kapha Dominant',
    description: 'Your mind and body are governed by Earth and Water. You represent structure, stability, and calm endurance. While naturally blessed with abundance, excess Kapha manifests as sluggishness, heavy skin congestion, and oil build-up.',
    skinHairInfo: 'Light, clarifying, and highly active detox ingredients like Neem, fresh Turmeric, and Triphala are essential to deep cleanse pores and stimulate metabolic energy.',
    categories: ['body', 'health']
  }
};

const DoshaQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [dominantDosha, setDominantDosha] = useState('');
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Handle Option Select
  const handleOptionSelect = (dosha) => {
    const updatedAnswers = [...answers, dosha];
    setAnswers(updatedAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate dominant dosha
      const counts = updatedAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});

      let maxDosha = 'Vata';
      let maxCount = 0;
      Object.keys(counts).forEach((d) => {
        if (counts[d] > maxCount) {
          maxCount = counts[d];
          maxDosha = d;
        }
      });

      setDominantDosha(maxDosha);
      setQuizCompleted(true);
    }
  };

  // Fetch Recommended Products
  useEffect(() => {
    if (quizCompleted && dominantDosha) {
      const fetchRecommended = async () => {
        setLoadingProducts(true);
        try {
          const response = await productServices.getAllProducts('all');
          if (response.success) {
            const profile = DOSHA_PROFILES[dominantDosha];
            // Filter products matching recommended categories for this dosha
            const filtered = response.products.filter(
              (p) => profile.categories.includes(p.category) && !p.isComingSoon
            ).slice(0, 3);
            setRecommendedProducts(filtered);
          }
        } catch (error) {
          console.error('Failed to load recommended products:', error);
        } finally {
          setLoadingProducts(false);
        }
      };

      fetchRecommended();
    }
  }, [quizCompleted, dominantDosha]);

  // Restart Quiz
  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizCompleted(false);
    setDominantDosha('');
    setRecommendedProducts([]);
    setEmail('');
    setEmailSaved(false);
  };

  // Save Dosha Profile Email
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSaved(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
      
      {/* Decorative Heading */}
      <div className="text-center space-y-2 mb-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10">
          <Sparkles className="h-4 w-4 text-gold fill-gold/25" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-forest">Ayurvedic Tridosha Science</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-forest">
          Discover Your Ayurvedic Dosha
        </h1>
        <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
          In Ayurveda, tridoshas (Vata, Pitta, and Kapha) govern all physical and mental traits. Take our expert-designed quiz to reveal your dominant energy and unlock a customized wellness ritual.
        </p>
      </div>

      {!quizCompleted ? (
        /* QUIZ CARD SECTION */
        <div className="max-w-2xl mx-auto bg-cream border border-forest/10 p-6 sm:p-10 rounded-3xl shadow-sm space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-sandstone">
            <div 
              className="bg-forest h-full transition-all duration-500" 
              style={{ width: `${((currentQuestion) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Counter */}
          <div className="flex justify-between items-center text-xs text-charcoal/50 font-bold tracking-widest uppercase">
            <span>Step {currentQuestion + 1} of {QUESTIONS.length}</span>
            <span className="text-forest">{Math.round(((currentQuestion) / QUESTIONS.length) * 100)}% Done</span>
          </div>

          {/* Question Title */}
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest text-left leading-snug">
            {QUESTIONS[currentQuestion].title}
          </h2>

          {/* Options Grid */}
          <div className="space-y-4">
            {QUESTIONS[currentQuestion].options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(opt.dosha)}
                className="w-full text-left p-5 sm:p-6 bg-cream border border-forest/10 rounded-2xl hover:border-forest hover:bg-forest/5 hover:translate-y-[-1px] transition-all duration-300 shadow-sm flex items-start gap-4 group"
              >
                <div className="h-6 w-6 rounded-full border border-forest/20 group-hover:border-forest flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-forest text-cream font-bold text-xs">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-sans text-sm sm:text-base text-charcoal/80 group-hover:text-forest leading-relaxed">
                  {opt.text}
                </span>
              </button>
            ))}
          </div>

          {/* Sourcing Promise Footer badge */}
          <div className="flex items-center justify-center gap-1.5 pt-4 text-[10px] text-forest/50 font-bold uppercase tracking-wider border-t border-forest/5">
            <ShieldCheck className="h-4 w-4" /> 100% Traditional Sanskrit Assessment
          </div>
        </div>
      ) : (
        /* RESULTS SECTION */
        <div className="space-y-12">
          
          {/* Main Diagnostic Card */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-sandstone/40 via-cream/80 to-cream border border-forest/10 p-8 sm:p-12 rounded-3xl shadow-sm text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 border-b-2 border-l-2 border-gold/15 rounded-bl-[100%] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-8 space-y-6">
                <span className="inline-flex items-center gap-1 text-[10px] font-sans font-black bg-gold text-forest px-3 py-1.5 rounded-full uppercase tracking-wider">
                  <Sun className="h-3 w-3 text-forest fill-forest/15" /> Personal Diagnosis
                </span>
                
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-forest leading-tight">
                  You are {DOSHA_PROFILES[dominantDosha].name}!
                </h2>
                
                <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed">
                  {DOSHA_PROFILES[dominantDosha].description}
                </p>

                <div className="p-4 bg-forest/5 border border-forest/10 rounded-xl space-y-1.5">
                  <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
                    <Leaf className="h-4 w-4" /> Skin & Hair Tendencies
                  </h5>
                  <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                    {DOSHA_PROFILES[dominantDosha].skinHairInfo}
                  </p>
                </div>
              </div>

              {/* Reset/Restart Panel */}
              <div className="md:col-span-4 flex flex-col items-center justify-center bg-cream border border-forest/15 p-6 rounded-2xl shadow-inner gap-4 text-center shrink-0">
                <Heart className="h-10 w-10 text-gold fill-gold/15" />
                <div className="space-y-1">
                  <h5 className="font-serif font-bold text-forest text-sm">Want to try again?</h5>
                  <p className="text-[10px] text-charcoal/50">Your physical constitution changes slightly with seasons.</p>
                </div>
                <button
                  onClick={handleRestart}
                  className="w-full bg-forest text-cream hover:bg-leaf font-sans text-xs font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <RefreshCw className="h-4 w-4" /> Retake The Quiz
                </button>
              </div>

            </div>

            {/* Email Save Form */}
            <div className="mt-8 pt-8 border-t border-forest/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="font-serif font-bold text-forest text-base">Save Your Dosha Profile</h4>
                <p className="text-xs text-charcoal/60">Get a personalized Ayurvedic daily routine chart sent straight to your inbox.</p>
              </div>
              
              {emailSaved ? (
                <div className="p-3 bg-forest/10 text-forest border border-forest/20 text-xs font-bold rounded-lg flex items-center gap-2">
                  <Check className="h-4 w-4" /> Customized routine chart dispatched successfully!
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex rounded-lg overflow-hidden border border-forest/20 bg-cream w-full md:w-96 focus-within:border-forest shadow-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent px-4 py-2.5 text-xs text-charcoal placeholder-charcoal/40 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-forest text-cream hover:bg-leaf font-sans text-xs font-bold px-4 py-2.5 flex items-center justify-center gap-1 shrink-0 uppercase tracking-widest transition-colors duration-200"
                  >
                    Save Profile <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* RECOMMENDED PRODUCTS LIST */}
          <div className="space-y-8 max-w-7xl mx-auto">
            <div className="text-left space-y-1 border-b border-forest/10 pb-4">
              <h3 className="font-serif text-2xl font-black text-forest flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gold fill-gold/15" /> Recommended Matriveda Products
              </h3>
              <p className="font-sans text-sm text-charcoal/60">
                Formulated precisely to balance your {dominantDosha} energy levels and soothe skin/hair issues.
              </p>
            </div>

            {loadingProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-96 bg-cream-dark/25 rounded-2xl border border-forest/5 animate-pulse"></div>
                ))}
              </div>
            ) : recommendedProducts.length === 0 ? (
              <div className="text-center py-8 text-charcoal/50">
                Failed to load recommendations. Please browse the main store.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProducts.map((product) => (
                  <div key={product._id} className="h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

export default DoshaQuiz;
