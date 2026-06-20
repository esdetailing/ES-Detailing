import React, { useState, useEffect } from 'react';
import { Menu, X, Car, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section on scroll
      const sections = ['hero', 'about', 'services', 'before-after', 'features', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Services', target: 'services' },
    { label: 'Before & After', target: 'before-after' },
    { label: 'Why Us', target: 'features' },
    { label: 'Reviews', target: 'testimonials' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/10 py-4 shadow-lg shadow-black/40'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleScrollTo('hero')}
            className="flex items-center space-x-3 cursor-pointer group animate-fade-in"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg accent-red border border-white/10 group-hover:scale-105 transition-transform duration-300 shadow-md">
              <span className="font-display font-black text-lg italic text-white text-glow">ES</span>
              <div className="absolute -inset-0.5 bg-[#dc2626]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <span className="font-display text-2xl font-black tracking-tighter uppercase text-white">
                ES<span className="text-zinc-400 group-hover:text-white transition-colors"> DETAILING</span>
              </span>
              <p className="text-[9px] font-mono tracking-widest text-[#dc2626] uppercase -mt-1 font-bold">
                Premium Auto Care
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleScrollTo(item.target)}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-200 relative ${
                  activeSection === item.target
                    ? 'text-white font-extrabold border-b border-[#dc2626] pb-1'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="mailto:esdetailing.il@gmail.com" 
              className="flex items-center text-zinc-300 hover:text-white text-xs font-mono transition-colors duration-300"
            >
              <Phone className="w-4 h-4 text-[#dc2626] mr-2" />
              esdetailing.il@gmail.com
            </a>
            <button
              id="nav-book-cta"
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-white accent-red hover:scale-105 transition-transform cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 focus:outline-none transition-colors duration-200"
              aria-label="Toggle navigation drawer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/5 py-4 px-4 overflow-hidden"
          >
            <div className="space-y-1 pb-3 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleScrollTo(item.target)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium uppercase tracking-wider rounded-md transition-all duration-150 ${
                    activeSection === item.target
                      ? 'bg-zinc-800 text-white border-l-2 border-[#ea2b2b] pl-3'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t border-white/5 pt-4 pb-2 space-y-3">
              <a 
                href="mailto:esdetailing.il@gmail.com"
                className="flex items-center px-4 py-2 text-zinc-300 hover:text-white text-sm"
              >
                <Phone className="w-4 h-4 text-[#dc2626] mr-3" />
                esdetailing.il@gmail.com
              </a>
              <button
                id="mobile-nav-book-cta"
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center space-x-2 text-white text-sm uppercase font-bold tracking-wider py-3 rounded-full transition-all duration-300 accent-red hover:scale-102"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
