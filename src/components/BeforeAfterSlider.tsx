import React, { useState, useRef, useEffect } from 'react';
import { Eye, ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
  subtitle?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title = "Interactive Results",
  subtitle = "Drag the slider to wipe away the grime and reveal our high-gloss finish"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div id="before-after-cmp" className="w-full">
      <div className="text-center mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-[#dc2626] bg-[#dc2626]/10 px-3 py-1 rounded-full mb-3 inline-block">
          Meticulous Transformations
        </span>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2">
          {subtitle}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-4xl mx-auto aspect-4/3 rounded-xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize group"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="After detailed finish"
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
          draggable="false"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-semibold px-3 py-1 rounded uppercase tracking-wider z-20">
          After Detail
        </div>

        {/* Before Image (Foreground, clipped) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before detailed finish"
            className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
            style={{ 
              width: containerRef.current ? containerRef.current.offsetWidth : '100%',
              height: containerRef.current ? containerRef.current.offsetHeight : '100%'
            }}
            draggable="false"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 bg-[#dc2626]/90 text-white font-mono text-xs font-base px-3 py-1 rounded uppercase tracking-wider z-20 font-bold">
            Before Detail
          </div>
        </div>

        {/* Slider Handlebar line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize z-30"
          style={{ left: `${sliderPosition}%`, filter: 'drop-shadow(0 0 4px rgba(220, 38, 38, 0.5))' }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/95 border-2 border-[#dc2626] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-200">
            <ArrowLeftRight className="w-4 h-4 text-white hover:text-[#dc2626] transition-colors" />
          </div>
          {/* Subtle indicator beacon */}
          <div className="absolute top-1/3 -translate-x-1/2 w-3 h-3 rounded-full bg-[#dc2626] animate-ping opacity-60 animate-pulse"></div>
          <div className="absolute bottom-1/3 -translate-x-1/2 w-3 h-3 rounded-full bg-[#dc2626] animate-ping opacity-60 animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-6 mt-4 font-mono text-xs text-zinc-500">
        <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1.5 text-zinc-400" /> Swipe / drag left or right</span>
      </div>
    </div>
  );
}
