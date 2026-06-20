import React, { useState } from 'react';
import { SERVICES_LIST, ADDONS_LIST } from '../data';
import { Check, Info, Sparkles, ChevronRight } from 'lucide-react';

interface InteractiveEstimatorProps {
  onEstimateConfirmed: (vehicleSize: 'small' | 'midsize' | 'large', addons: string[], total: number) => void;
}

export default function InteractiveEstimator({ onEstimateConfirmed }: InteractiveEstimatorProps) {
  const [selectedSize, setSelectedSize] = useState<'small' | 'midsize' | 'large'>('midsize');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Get base price
  const baseService = SERVICES_LIST.find(s => s.category === selectedSize);
  const basePrice = baseService ? baseService.price : 55;

  // Toggle addon
  const handleAddonToggle = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Calculate total
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = ADDONS_LIST.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const estimatedTotal = basePrice + addonsTotal;

  const handleSubmit = () => {
    onEstimateConfirmed(selectedSize, selectedAddons, estimatedTotal);
    // Scroll smoothly to contact/booking section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="estimator-panel" className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#dc2626]/10 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#dc2626]/10 border border-[#dc2626]/20 flex items-center justify-center text-[#dc2626]">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
            Instant Estimate Builder
          </h4>
          <p className="text-xs text-zinc-400">
            Build a custom treatment plan and see pricing immediately
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step 1: Select Size */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 font-bold">
              Step 1: Choose Vehicle Size
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SERVICES_LIST.map((service) => {
                const isSelected = selectedSize === service.category;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedSize(service.category as 'small' | 'midsize' | 'large')}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#dc2626]/15 to-black border-[#dc2626] shadow-[0_4px_20px_rgba(220,38,38,0.15)]Scale'
                        : 'bg-zinc-900/50 hover:bg-zinc-900 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-display font-black text-sm text-white">{service.name}</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#dc2626] flex items-center justify-center text-white">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                      {service.vehicleExamples}
                    </p>
                    <div className="text-lg font-display font-black text-[#dc2626]">
                      ${service.price}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Add-ons */}
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 font-bold">
              Step 2: select premium add-ons (optional)
            </label>
            <div className="space-y-2.5">
              {ADDONS_LIST.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => handleAddonToggle(addon.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-200 ${
                      isChecked
                        ? 'bg-white/[0.04] border-[#dc2626]/40 shadow-inner'
                        : 'bg-zinc-900/30 hover:bg-zinc-900/60 border-white/5'
                    }`}
                  >
                    <div className="flex items-start space-x-3 pr-4">
                      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-[#dc2626] text-white' : 'bg-zinc-800 border border-zinc-700'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-white">{addon.name}</h5>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                          {addon.description}
                        </p>
                      </div>
                    </div>
                    <div className="font-display font-black text-[#dc2626] text-sm shrink-0 whitespace-nowrap">
                      +${addon.price}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Estimated Quote Summary */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-950/70 border border-white/5 rounded-xl p-5 sm:p-6 flex flex-col justify-between h-full relative">
            <span className="absolute top-3 right-3 font-mono text-[9px] tracking-widest text-[#dc2626] uppercase bg-[#dc2626]/10 px-2 py-0.5 rounded font-black">
              ESTIMATE
            </span>
            
            <div>
              <h5 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-4 pb-2 border-b border-white/5 font-bold">
                Treatment Breakdown
              </h5>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-300">
                    Interior detailing — {baseService?.name}
                  </span>
                  <span className="text-white font-semibold">${basePrice}</span>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Selected Add-ons:</span>
                    {selectedAddons.map(addonId => {
                      const ad = ADDONS_LIST.find(a => a.id === addonId);
                      return ad ? (
                        <div key={ad.id} className="flex justify-between text-xs text-zinc-400 pl-2 border-l border-[#dc2626]">
                          <span>{ad.name}</span>
                          <span className="text-white font-bold">+${ad.price}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-zinc-400 text-xs uppercase font-mono">Estimated total:</span>
                <span className="font-display text-4xl font-extrabold text-[#dc2626] tracking-tight">
                  ${estimatedTotal}
                </span>
              </div>

              <p className="text-[10px] text-zinc-500 mb-5 flex items-start leading-relaxed">
                <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0 mr-1.5 mt-0.5" />
                <span>Estimate pre-fills the booking scheduler below. Prices may vary based on excessive mud, mold, or heavy pet hair.</span>
              </p>

              <button
                onClick={handleSubmit}
                className="w-full accent-red text-white text-xs uppercase font-extrabold py-4 px-4 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 shadow-md hover:scale-102 active:scale-98 select-none cursor-pointer text-glow"
              >
                <span>Select & Pre-fill Schedule</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
