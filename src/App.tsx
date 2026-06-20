import React, { useState } from 'react';
import { 
  Car, Sparkles, Truck, DollarSign, Search, ShieldCheck, Heart, Wrench, 
  Calendar, Star, Phone, Instagram, MapPin, ChevronRight, Check, Award, 
  Eye, MessageSquare, ExternalLink, Info, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import Navbar from './components/Navbar';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import InteractiveEstimator from './components/InteractiveEstimator';
import ContactForm from './components/ContactForm';

// Data
import { IMAGES, SERVICES_LIST, FEATURES_LIST, TESTIMONIALS_LIST, ADDONS_LIST } from './data';
import { Testimonial } from './types';

export default function App() {
  // Estimator prefill state
  const [prefilledSize, setPrefilledSize] = useState<'small' | 'midsize' | 'large' | null>(null);
  const [prefilledAddons, setPrefilledAddons] = useState<string[]>([]);
  const [prefilledTotal, setPrefilledTotal] = useState<number>(0);

  // Leave active review state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [userTestimonials, setUserTestimonials] = useState<Testimonial[]>(TESTIMONIALS_LIST);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewVehicle, setNewReviewVehicle] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);

  // Handle estimate submission
  const handleEstimateConfirmed = (
    size: 'small' | 'midsize' | 'large',
    addons: string[],
    total: number
  ) => {
    setPrefilledSize(size);
    setPrefilledAddons(addons);
    setPrefilledTotal(total);
  };

  const handleResetPrefills = () => {
    setPrefilledSize(null);
    setPrefilledAddons([]);
    setPrefilledTotal(0);
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewText) return;

    const newTestimonial: Testimonial = {
      id: `custom-${Date.now()}`,
      name: newReviewName,
      vehicle: newReviewVehicle || 'Automotive Client',
      rating: newReviewRating,
      text: newReviewText,
      date: 'Just now',
      isVerifiedGoogle: false
    };

    setUserTestimonials([newTestimonial, ...userTestimonials]);
    setReviewSubmitSuccess(true);
    setTimeout(() => {
      setNewReviewName('');
      setNewReviewVehicle('');
      setNewReviewRating(5);
      setNewReviewText('');
      setReviewSubmitSuccess(false);
      setShowReviewModal(false);
    }, 2000);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans antialiased overflow-x-hidden">
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar onOpenBooking={() => scrollToId('contact')} />

      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center pt-20 overflow-hidden z-10"
      >
        {/* Background Image with Rich Dark Gradient Masks */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.heroBg}
            alt="ES Detailing luxury sports car interior background"
            className="w-full h-full object-cover object-center scale-102 filter brightness-[0.35] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Gradients to merge background into dark layout */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/60" />
          {/* Subtle Red ambient glow spotlight */}
          <div className="absolute bottom-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#dc2626]/10 blur-[150px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#ea2b2b] animate-ping" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-300">
                  Chicago’s Expert Automotive Care
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Professional <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-white via-zinc-200 to-[#ea2b2b] bg-clip-text text-transparent">
                  Interior Car
                </span> <br />
                Detailing Services
              </h1>

              <p className="font-sans text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed">
                Transforming vehicles with premium interior detailing services. We clean, sanitize, restore, and protect your cabin back to showroom specs.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  onClick={() => scrollToId('contact')}
                  className="accent-red text-white text-xs sm:text-sm font-display font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-center shadow-lg text-glow"
                >
                  Book Instant Service
                </button>
                <button
                  onClick={() => scrollToId('estimator')}
                  className="bg-[#050505]/40 hover:bg-zinc-900 border border-white/10 hover:border-[#dc2626]/30 text-white text-xs sm:text-sm font-display font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105 cursor-pointer text-center"
                >
                  Calculate Custom Rate
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5 max-w-md">
                <div>
                  <span className="block text-xl font-bold text-white font-display">100%</span>
                  <span className="block text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Satisfaction</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-[#ea2b2b] font-display">Premium</span>
                  <span className="block text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Steam Extractors</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-white font-display">5.0 Star</span>
                  <span className="block text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Average Rating</span>
                </div>
              </div>
            </div>

            {/* Quick Promo Window Card */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="glass-panel border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                {/* Gloss flare line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ea2b2b] to-transparent" />
                
                <h3 className="font-display font-bold text-lg text-white mb-2 pb-2 border-b border-white/5">
                  Interior Focus Package
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                  Stuffy cabin? Stuck-on spills or dog hair? ES Detailing meticulously extracts contaminants to improve breathing air quality and physical style.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-zinc-300">
                    <Check className="w-4 h-4 text-[#ea2b2b]" />
                    <span>Commercial Vapor Steam Sanitation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-300">
                    <Check className="w-4 h-4 text-[#ea2b2b]" />
                    <span>pH-Balanced Leather Nourishment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-300">
                    <Check className="w-4 h-4 text-[#ea2b2b]" />
                    <span>Deep Seat & Carpet Fiber Extraction</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-zinc-950/70 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-mono font-medium text-zinc-500 uppercase">Starting at</p>
                    <span className="text-2xl font-extrabold text-white font-display">$55</span>
                  </div>
                  <button
                    onClick={() => scrollToId('services')}
                    className="text-white hover:text-[#ea2b2b] text-xs font-mono flex items-center font-bold tracking-wider uppercase transition-colors"
                  >
                    View Tiers <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer select-none" onClick={() => scrollToId('about')}>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Discover ES</span>
          <div className="w-[18px] h-[30px] rounded-full border-2 border-zinc-700 p-1">
            <div className="w-1.5 h-1.5 bg-[#ea2b2b] rounded-full mx-auto animate-bounce mt-1"></div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-[#ea2b2b]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ea2b2b] bg-[#ea2b2b]/10 px-3 py-1 rounded-full inline-block">
                Driven by Passion
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                About ES Detailing
              </h2>
              
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Welcome to ES Detailing! Founded by a highly motivated young entrepreneur, this company is built entirely from the ground up on three core principles: **uncompromising attention to detail**, **outstanding customer relationships**, and **reliable craftsman-tier quality**.
                </p>
                <p>
                  What started as a personal obsession with automotive preservation has quickly evolved into Chicago's trusted interior preservation provider. For us, detailing is not just a standard car wash or a quick vacuum sweep. It is a precise restoration craft designed to enhance your driving environment, protect physical materials, and maintain your vehicle’s high resell value.
                </p>
                <p>
                  Whether you drive a compact daily commuter sedan, a specialized utility truck, or a top-tier luxury family SUV, we treat your vehicle with the exact same level of respect and thoroughness. We use only premium chemical compounds, professional-grade continuous steam extractors, and non-greasy UV block conditioners to safeguard your interior surfaces.
                </p>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-2">
                  <div className="w-8 h-8 rounded bg-[#ea2b2b]/10 flex items-center justify-center text-[#ea2b2b]">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-white text-xs uppercase font-mono font-bold tracking-wider">Owner Operated</h4>
                  <p className="text-[11px] text-zinc-400">Direct accountability for flawless outcome.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-2">
                  <div className="w-8 h-8 rounded bg-[#ea2b2b]/10 flex items-center justify-center text-[#ea2b2b]">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h4 className="text-white text-xs uppercase font-mono font-bold tracking-wider">Pro Diagnostics</h4>
                  <p className="text-[11px] text-zinc-400">Specialized steam cleaners & high-power vacuums.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-2 col-span-2 sm:col-span-1">
                  <div className="w-8 h-8 rounded bg-[#ea2b2b]/10 flex items-center justify-center text-[#ea2b2b]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-white text-xs uppercase font-mono font-bold tracking-wider">Fully Insured</h4>
                  <p className="text-[11px] text-zinc-400">100% peace of mind for luxury cabins.</p>
                </div>
              </div>
            </div>

            {/* Overlapping Artistic Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-4/3 lg:aspect-square group">
                <img
                  src={IMAGES.detailingWork}
                  alt="Detailer brushing leather seats and steam sanitization"
                  className="w-full h-full object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                
                {/* Floating Stat card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center text-white font-bold font-display">ES</div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Meticulous Clean Guarantee</p>
                      <p className="text-[10px] text-[#ea2b2b] font-mono uppercase tracking-widest">Nothing overlooked</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-24 bg-zinc-950/40 relative border-y border-white/5">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-zinc-900/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ea2b2b] bg-[#ea2b2b]/10 px-3 py-1 rounded-full mb-3 inline-block">
              Meticulous Interior Detailing Tiers
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1">
              Select Your Vehicle Tier
            </h2>
            <p className="text-zinc-400 text-sm mt-3.5 max-w-xl mx-auto">
              Our packages are transparently sized by vehicle volume. Each tier includes a deep, surgical restoration of major touch surfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_LIST.map((service, index) => {
              const isPopular = service.category === 'midsize';
              return (
                <div
                  key={service.id}
                  className={`relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    isPopular 
                      ? 'bg-zinc-900/90 border-[#ea2b2b] scale-[1.03] shadow-[0_10px_35px_rgba(234,43,43,0.15)] md:z-10' 
                      : 'bg-zinc-900/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-0 bg-[#ea2b2b] text-white font-mono text-[9px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-xl shadow-lg">
                      Best Value
                    </div>
                  )}

                  <div className="p-6 sm:p-8">
                    {/* Header info */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800/80 flex items-center justify-center border border-white/5 text-[#ea2b2b]">
                        {service.category === 'small' && <Car className="w-5 h-5" />}
                        {service.category === 'midsize' && <Sparkles className="w-5 h-5 animate-pulse" />}
                        {service.category === 'large' && <Truck className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-xl text-white text-left">{service.name}</h3>
                        <span className="text-[10px] text-zinc-500 uppercase font-mono">{service.timeEstimate}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline mb-4 text-left">
                      <span className="text-zinc-500 font-mono text-sm">Starting at</span>
                      <span className="text-3xl sm:text-4xl font-display font-black text-white ml-2">${service.price}</span>
                    </div>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 border-b border-white/5 pb-4 text-left">
                      {service.description}
                    </p>

                    <p className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider mb-3 text-left">Included Treatments:</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs text-zinc-300 text-left">
                          <Check className="w-4 h-4 text-[#ea2b2b] shrink-0 mr-2.5 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing action button */}
                  <div className="p-6 sm:p-8 bg-zinc-950/60 border-t border-white/5 mt-auto">
                    <button
                      onClick={() => {
                        handleEstimateConfirmed(service.category as 'small' | 'midsize' | 'large', [], service.price);
                        scrollToId('contact');
                      }}
                      className={`w-full py-3.5 rounded-full text-xs font-display font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                        isPopular
                          ? 'accent-red text-white hover:scale-102 shadow-md text-glow'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white'
                      }`}
                    >
                      Instant Quote Pre-fill
                    </button>
                    <p className="text-zinc-500 text-[10px] text-center font-mono mt-3">
                      ({service.vehicleExamples})
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Disclaimer Panel */}
          <div className="mt-12 p-4 rounded-xl border border-white/5 bg-zinc-900/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left select-none">
            <Info className="w-5 h-5 text-[#ea2b2b] shrink-0" />
            <p className="text-zinc-400 text-xs leading-relaxed">
              <strong className="text-white">Note:</strong> Prices may vary slightly based on actual vehicle condition (e.g. excessive dog hair carpet extraction, severe mold stains, biohazard cleanup, or deeply embedded organic grease). We will inspect and provide absolute transparent diagnostic quotes prior to beginning operations.
            </p>
          </div>

        </div>
      </section>

      {/* 4. BEFORE & AFTER GALLERY SECTION */}
      <section id="before-after" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BeforeAfterSlider 
            beforeImage={IMAGES.beforeConsole}
            afterImage={IMAGES.afterConsole}
            title="Interactive Before & After Transformation"
            subtitle="Drag the slider button left or right to experience the power of ES Detailing interior restorations"
          />

          {/* Small Masonry/Grid of detailed work areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
            <div className="group relative rounded-xl overflow-hidden aspect-video sm:aspect-square bg-zinc-900 border border-white/5">
              <img
                src={IMAGES.detailingWork}
                alt="Intense Steam brush action on interior doors"
                className="w-full h-full object-cover filter brightness-[0.6] group-hover:scale-105 group-hover:brightness-[0.75] transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] font-mono text-[#ea2b2b] uppercase tracking-widest font-semibold">Step 1: Agitation</span>
                <h4 className="text-sm font-bold text-white mt-0.5">Steam Vent Sanitizing</h4>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden aspect-video sm:aspect-square bg-zinc-900 border border-white/5">
              <img
                src={IMAGES.heroBg}
                alt="Immaculate leather shine"
                className="w-full h-full object-cover filter brightness-[0.6] group-hover:scale-105 group-hover:brightness-[0.75] transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] font-mono text-[#ea2b2b] uppercase tracking-widest font-semibold">Step 2: Hydration</span>
                <h4 className="text-sm font-bold text-white mt-0.5">pH Leather Sealant Coating</h4>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden aspect-video sm:aspect-square bg-zinc-900 border border-white/5 col-span-1 sm:col-span-2 md:col-span-1">
              <img
                src={IMAGES.afterConsole}
                alt="Vacuum lines on carpets"
                className="w-full h-full object-cover filter brightness-[0.5] group-hover:scale-105 group-hover:brightness-[0.7] transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] font-mono text-[#ea2b2b] uppercase tracking-widest font-semibold">Step 3: Stripes</span>
                <h4 className="text-sm font-bold text-white mt-0.5">Carpet Stripe Grooming</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE ES DETAILING */}
      <section id="features" className="py-24 bg-zinc-950/40 relative border-t border-white/5">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#ea2b2b]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ea2b2b] bg-[#ea2b2b]/10 px-3 py-1 rounded-full mb-3 inline-block">
              Engineered Quality
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1">
              Why Choose ES Detailing?
            </h2>
            <p className="text-zinc-400 text-sm mt-3 max-w-xl mx-auto">
              We treat every vehicle as our own, deploying pro-grade equipment and meticulous procedures to make sure your driving space is cleaner than ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES_LIST.map((feature) => {
              return (
                <div
                  key={feature.id}
                  className="glass-panel glass-panel-hover rounded-xl p-6 border border-white/5 transition-all text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/15 flex items-center justify-center text-[#ea2b2b] mb-5 shadow-inner">
                    {feature.iconName === 'DollarSign' && <DollarSign className="w-5 h-5 text-[#ea2b2b]" />}
                    {feature.iconName === 'Search' && <Search className="w-5 h-5 text-[#ea2b2b]" />}
                    {feature.iconName === 'ShieldCheck' && <ShieldCheck className="w-5 h-5 text-[#ea2b2b]" />}
                    {feature.iconName === 'Heart' && <Heart className="w-5 h-5 text-[#ea2b2b]" />}
                    {feature.iconName === 'Wrench' && <Wrench className="w-5 h-5 text-[#ea2b2b]" />}
                    {feature.iconName === 'Calendar' && <Calendar className="w-5 h-5 text-[#ea2b2b]" />}
                  </div>
                  <h4 className="font-display font-extrabold text-lg text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 right-10 w-[250px] h-[250px] bg-[#ea2b2b]/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ea2b2b] bg-[#ea2b2b]/10 px-3 py-1 rounded-full mb-3 inline-block">
                Verified Backed Excellence
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1">
                Client Reviews
              </h2>
              <p className="text-zinc-400 text-sm mt-3.5">
                Every client receives undivided focus. Read experiences from local vehicle owners who trust **ES Detailing** to refresh their interiors.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setReviewSubmitSuccess(false);
                  setShowReviewModal(true);
                }}
                className="bg-transparent hover:bg-white/[0.04] border border-white/10 hover:border-[#ea2b2b]/30 text-white text-xs uppercase tracking-wider font-mono font-bold px-5 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#ea2b2b]" />
                <span>Write a Review</span>
              </button>

              <div className="bg-zinc-900 border border-white/5 py-2.5 px-4 rounded-xl flex items-center space-x-3 text-left">
                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-red-500 font-extrabold text-xs">G</div>
                <div>
                  <div className="flex text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider mt-0.5">Verified on Google Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial cards list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userTestimonials.map((testimonial) => {
              return (
                <div
                  key={testimonial.id}
                  className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors duration-200 text-left relative overflow-hidden group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-sm font-bold text-white">{testimonial.name}</h4>
                        <span className="text-[10px] text-zinc-400 font-mono">{testimonial.vehicle}</span>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex text-amber-500">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        {testimonial.isVerifiedGoogle && (
                          <span className="text-[8px] font-mono text-emerald-400 flex items-center mt-1 uppercase tracking-widest">
                            <CheckCircle2 className="w-2.5 h-2.5 mr-0.5 shrink-0" /> Verified Googl
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-zinc-500 text-[10px] font-mono">
                    <span>{testimonial.date}</span>
                    <span className="text-zinc-600">ES DETAILING</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 border border-white/10 p-6 sm:p-8 rounded-2xl max-w-md w-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ea2b2b]/15 blur-2xl rounded-full"></div>
              
              <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-6 text-left">
                <h4 className="font-display font-bold text-lg text-white">Share Your Detailing Experience</h4>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {reviewSubmitSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500 text-green-500 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-white">Review Posted!</h5>
                  <p className="text-xs text-zinc-400">Thank you for supporting small business. Your review is populated live.</p>
                </div>
              ) : (
                <form onSubmit={handleCreateReview} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="e.g. Mike S."
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Vehicle Model</label>
                    <input
                      type="text"
                      required
                      value={newReviewVehicle}
                      onChange={(e) => setNewReviewVehicle(e.target.value)}
                      placeholder="e.g. Ford Raptor"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setNewReviewRating(stars)}
                          className="p-1 focus:outline-none transition-transform active:scale-90"
                        >
                          <Star className={`w-5 h-5 ${stars <= newReviewRating ? 'text-amber-500 fill-current' : 'text-zinc-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Your Review</label>
                    <textarea
                      required
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Describe the detailing experience..."
                      rows={3}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ea2b2b] hover:bg-[#c81d1d] text-white text-xs font-bold uppercase py-3 rounded-lg tracking-wider"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. INTERACTIVE ESTIMATOR & SCHEDULING SECTION */}
      <section id="estimator" className="py-24 relative overflow-hidden bg-zinc-950/20 border-t border-white/5">
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-[#ea2b2b]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ea2b2b] bg-[#ea2b2b]/10 px-3 py-1 rounded-full mb-3 inline-block">
              Tailored Detailing Solutions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1">
              Select, Budget, and Pre-Fill
            </h2>
            <p className="text-zinc-400 text-sm mt-3.5 max-w-xl mx-auto">
              Ready to restore your cabin? Use our premium Interactive Cost Estimator tool to select options, configure additions, and load estimates instantly into the scheduler below.
            </p>
          </div>

          <InteractiveEstimator onEstimateConfirmed={handleEstimateConfirmed} />

          {/* Form Anchor */}
          <div id="contact" className="pt-8">
            <ContactForm
              prefilledSize={prefilledSize}
              prefilledAddons={prefilledAddons}
              prefilledTotal={prefilledTotal}
              onResetPrefills={handleResetPrefills}
            />
          </div>

        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/15 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/5">
            {/* Column 1 Logo */}
            <div className="md:col-span-2 space-y-4 text-left">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#ea2b2b] to-black border border-white/10">
                  <Car className="w-4 h-4 text-white" />
                </div>
                <span className="font-display text-lg font-extrabold tracking-wider text-white">
                  ES<span className="text-[#ea2b2b]"> DETAILING</span>
                </span>
              </div>
              <p className="text-zinc-400 text-xs max-w-sm leading-relaxed">
                Meticulous interior car detailing services designed for luxury styling, deep organic scent cleaning, and pure automotive sanitization. Direct focus on long-lasting customer happiness.
              </p>
              
              <div className="flex space-x-4 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#ea2b2b] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="mailto:esdetailing.il@gmail.com" className="text-zinc-400 hover:text-[#ea2b2b] transition-colors">
                  <MailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2 Services */}
            <div className="text-left space-y-3">
              <h5 className="font-mono text-xs uppercase tracking-widest text-[#ea2b2b] font-bold">Solutions</h5>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><button onClick={() => scrollToId('services')} className="hover:text-white transition-colors">Coupe & Sedan Interior Detail</button></li>
                <li><button onClick={() => scrollToId('services')} className="hover:text-white transition-colors">Midsize SUV & Pickup Treatment</button></li>
                <li><button onClick={() => scrollToId('services')} className="hover:text-white transition-colors">Large Van & multi-row Extraction</button></li>
                <li><button onClick={() => scrollToId('estimator')} className="hover:text-white transition-colors">Leather Coating Addons</button></li>
              </ul>
            </div>

            {/* Column 3 Company */}
            <div className="text-left space-y-3">
              <h5 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">Legal</h5>
              <p className="text-xs text-zinc-500 leading-relaxed leading-relaxed">
                ES Detailing is a locally licensed and fully insured private service provider operating in local zones. All rights reserved.
              </p>
              <div className="pt-2">
                <span className="inline-block text-[10px] font-mono font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded">
                  Insured Up To $1M
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 font-mono space-y-3 sm:space-y-0 text-center sm:text-left">
            <p>© {new Date().getFullYear()} ES Detailing. All individual brand rights reserved.</p>
            <p>Designed for premium automotive preservation.</p>
          </div>

        </div>
      </footer>
    </div>
  );
}

// Help sub icons
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
