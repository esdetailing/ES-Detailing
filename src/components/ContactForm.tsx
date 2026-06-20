import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { SERVICES_LIST, ADDONS_LIST } from '../data';

interface ContactFormProps {
  prefilledSize: 'small' | 'midsize' | 'large' | null;
  prefilledAddons: string[];
  prefilledTotal: number;
  onResetPrefills: () => void;
}

export default function ContactForm({
  prefilledSize,
  prefilledAddons,
  prefilledTotal,
  onResetPrefills
}: ContactFormProps) {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [vehicleSize, setVehicleSize] = useState<'small' | 'midsize' | 'large'>('midsize');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [comments, setComments] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Handle prefill updates
  useEffect(() => {
    if (prefilledSize) {
      setVehicleSize(prefilledSize);
      setSelectedAddons(prefilledAddons);
    }
  }, [prefilledSize, prefilledAddons]);

  // Handle live estimated price
  const basePrice = SERVICES_LIST.find(s => s.category === vehicleSize)?.price || 55;
  const addonsPrice = selectedAddons.reduce((sum, addonId) => {
    const addon = ADDONS_LIST.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const liveTotal = basePrice + addonsPrice;

  const handleAddonCheckbox = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setVehicleDetails('');
    setComments('');
    setSelectedAddons([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim()) return setValidationError('Please provide your name.');
    if (!email.trim() || !email.includes('@')) return setValidationError('Please provide a valid email address.');
    if (!phone.trim()) return setValidationError('Please provide a contact phone number.');
    if (!vehicleDetails.trim()) return setValidationError('Please specify your vehicle make & model (e.g. 2021 Honda Accord).');
    if (!preferredDate) return setValidationError('Please select a preferred date for your detailing.');

    setIsSubmitting(true);

    // Simulate sending a service email/booking record
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onResetPrefills();
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Contact Information Sidebar */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/5 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#dc2626]/10 blur-2xl rounded-full"></div>
          
          <h4 className="font-display text-xl font-bold text-white mb-6 uppercase tracking-tight">
            Get in Touch Directly
          </h4>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[#dc2626] shrink-0 mr-4">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider">Contact Email / Client Care</p>
                <a href="mailto:esdetailing.il@gmail.com" className="text-white hover:text-[#dc2626] font-display font-bold text-base transition-colors duration-200">
                  esdetailing.il@gmail.com
                </a>
                <p className="text-xs text-zinc-400 mt-1">Prompt responses for all scheduling queries.</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[#dc2626] shrink-0 mr-4">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider">Email Inquiry</p>
                <a href="mailto:esdetailing.il@gmail.com" className="text-white hover:text-[#dc2626] font-display font-bold text-base transition-colors duration-200">
                  esdetailing.il@gmail.com
                </a>
                <p className="text-xs text-zinc-400 mt-1">Send us photos of your interior for an instant quote advice.</p>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[#dc2626] shrink-0 mr-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </div>
              <div>
                <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider">Instagram Portfolio</p>
                <a 
                  href="https://instagram.com" 
                  target="_blank"  
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#dc2626] font-display font-medium text-sm transition-colors duration-200 block mt-1"
                >
                  @esdetailing
                </a>
                <p className="text-xs text-zinc-400 mt-0.5">Follow us to view live stream detailings and current giveaways.</p>
              </div>
            </div>

            {/* Service Area */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[#dc2626] shrink-0 mr-4">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider">Service Location</p>
                <p className="text-white font-display font-bold text-sm mt-0.5">
                  Local Automotive detailing & surrounding areas
                </p>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  We specialize in dropping off, clean-ups at our location, or mobile detailing requests upon agreement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-zinc-950/40 border border-white/5 rounded-xl p-5 text-left">
          <h5 className="font-mono text-xs uppercase tracking-widest text-[#dc2626] mb-3 font-bold">Scheduling Slots</h5>
          <ul className="space-y-2 text-xs text-zinc-400 font-mono">
            <li className="flex justify-between"><span>Monday - Friday</span> <span className="text-white">8:00 AM - 6:00 PM</span></li>
            <li className="flex justify-between"><span>Saturday</span> <span className="text-white">9:00 AM - 5:00 PM</span></li>
            <li className="flex justify-between"><span>Sunday</span> <span className="text-zinc-500">By Special Request Only</span></li>
          </ul>
        </div>
      </div>

      {/* Booking Form Layout */}
      <div className="lg:col-span-7">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 text-left">
          {isSubmitted ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center text-green-500 mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display text-2xl font-extrabold text-white">
                Booking Inquiry Received!
              </h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{name}</span>. An interior detailing specialist from **ES Detailing** will review your request for **{preferredDate}** and get back to you via phone or email within the next 1-2 hours to confirm your booking.
              </p>
              <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl max-w-sm mx-auto text-left space-y-2.5">
                <p className="text-xs font-mono text-zinc-500 uppercase pb-1.5 border-b border-white/5">Appointment Details:</p>
                <p className="text-xs text-zinc-400"><strong className="text-white">Vehicle:</strong> {vehicleDetails}</p>
                <p className="text-xs text-zinc-400"><strong className="text-white">Package:</strong> {SERVICES_LIST.find(s => s.category === vehicleSize)?.name}</p>
                <p className="text-xs text-zinc-400"><strong className="text-white">Est. Price:</strong> ${liveTotal}</p>
                <p className="text-xs text-zinc-400"><strong className="text-white">Preferred slot:</strong> {preferredDate} ({preferredTime})</p>
              </div>
              <button
                onClick={handleResetForm}
                className="mt-6 text-zinc-400 hover:text-white text-xs uppercase font-mono underline tracking-wide cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-white/5 pb-4 mb-4">
                <h4 className="font-display text-lg sm:text-lg font-black text-white flex items-center uppercase tracking-tight">
                  <Sparkles className="w-5 h-5 text-[#dc2626] mr-2" />
                  Schedule Your Detail
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Prefill the details below; no upfront credit card required.
                </p>
              </div>

              {validationError && (
                <div className="bg-[#dc2626]/10 border border-[#dc2626]/30 rounded-lg p-3 text-[#dc2626] text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Step 1: Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dc2626] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dc2626] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dc2626] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                    Vehicle Make / Model *
                  </label>
                  <input
                    type="text"
                    required
                    value={vehicleDetails}
                    onChange={(e) => setVehicleDetails(e.target.value)}
                    placeholder="e.g. 21 Tesla Model 3 (Black)"
                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dc2626] transition-colors"
                  />
                </div>
              </div>

              {/* Form Options Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                    Vehicle Size Selection
                  </label>
                  <select
                    value={vehicleSize}
                    onChange={(e) => setVehicleSize(e.target.value as 'small' | 'midsize' | 'large')}
                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-[#dc2626] transition-colors"
                  >
                    <option value="small">Small Car (Starting at $55)</option>
                    <option value="midsize">Midsize Car & SUV (Starting at $75)</option>
                    <option value="large">Large SUV & Minivan (Starting at $95)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/5 rounded-lg px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dc2626] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                      Preference
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value as 'morning' | 'afternoon' | 'evening')}
                      className="w-full bg-zinc-900 border border-white/5 rounded-lg px-2 py-3 text-xs text-white focus:outline-none focus:border-[#dc2626] transition-colors"
                    >
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Custom Addons inside contact form */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold">
                  Select Desired Add-ons:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADDONS_LIST.map((addon) => (
                    <label
                      key={addon.id}
                      className="flex items-center space-x-3 p-2.5 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-white/5 cursor-pointer select-none text-xs transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => handleAddonCheckbox(addon.id)}
                        className="rounded border-zinc-700 text-[#dc2626] focus:ring-[#dc2626] focus:ring-opacity-20 cursor-pointer"
                      />
                      <span className="text-zinc-200 flex-1">{addon.name}</span>
                      <span className="text-[#dc2626] font-bold font-mono">+${addon.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                  Comments / Special Requests
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="e.g. Stubborn stains on front passenger seat, pet hair in the trunk block, or mobile cleaning requests..."
                  rows={3}
                  className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dc2626] transition-colors resize-none"
                />
              </div>

              {/* Pricing breakdown summary */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Preloaded Estimated Quote
                  </p>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    {SERVICES_LIST.find(s => s.category === vehicleSize)?.name} package + addons
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-black text-[#dc2626] ml-2">
                    ${liveTotal}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full accent-red disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-display text-sm font-extrabold uppercase py-4 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer select-none text-glow"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Transmitting Booking Request...</span>
                  </>
                ) : (
                  <span>Schedule Your Detail</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
