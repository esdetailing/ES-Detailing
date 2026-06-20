import { Service, Feature, Testimonial, AddonOption } from './types';

export const IMAGES = {
  heroBg: '/src/assets/images/detail_hero_1781985149393.jpg',
  beforeConsole: '/src/assets/images/detail_dirty_console_1781985163341.jpg',
  afterConsole: '/src/assets/images/detail_clean_console_1781985177328.jpg',
  detailingWork: '/src/assets/images/detail_work_1781985190331.jpg'
};

export const SERVICES_LIST: Service[] = [
  {
    id: 's1',
    name: 'Small Cars',
    category: 'small',
    price: 55,
    timeEstimate: '1.5 - 2 Hours',
    vehicleExamples: 'Coupes, Hatchbacks, Small Sedans (e.g. Civic, Mustang, Mazda 3)',
    description: 'A comprehensive interior clean customized for smaller compact vehicles. Meticulous dust extraction and surface sanitization.',
    iconName: 'Car',
    features: [
      'Deep Vacuuming (Seats, Carpets, trunk)',
      'Steam Cleaned Floor Mats',
      'Dashboard & Console Cleaning',
      'Cup Holder & Storage Cubby Cleaning',
      'Door Panel Sanitization',
      'Streak-free Interior Windows',
      'Scent treatment of choice'
    ]
  },
  {
    id: 's2',
    name: 'Midsize Cars & SUVs',
    category: 'midsize',
    price: 75,
    timeEstimate: '2 - 2.5 Hours',
    vehicleExamples: 'Standard Sedans, Crossovers, 2-Row SUVs (e.g. Camry, RAV4, Grand Cherokee)',
    description: 'Our most popular tier. Detailed vacuum extraction, heavy upholstery conditioning, and deep cleaning for daily-driven midsize vehicles.',
    iconName: 'Sparkles',
    features: [
      'Deep Vacuuming (Seats, Carpets, trunk/cargo)',
      'Upholstery/Leather Cleaning & Wipe Down',
      'Carpet & Floor Mat Deep Cleaning',
      'Dashboard, Console & Air Vent Detailed Dusting',
      'Cup Holder Sanitization (Steam treatment)',
      'Meticulous Door Panel & Jam Cleaning',
      'Streak-free Interior Windows & Instrument Clusters',
      'Premium long-lasting fresh scent'
    ]
  },
  {
    id: 's3',
    name: 'Large SUVs & Minivans',
    category: 'large',
    price: 95,
    timeEstimate: '3 - 3.5 Hours',
    vehicleExamples: '3-Row SUVs, Large Trucks, Minivans (e.g. Tahoe, Escalade, Sienna, F-150)',
    description: 'Specialized deep detailing for family haulers and larger cabin spaces. Eliminates embedded grime, dust, and targets every corner.',
    iconName: 'Truck',
    features: [
      'Maximum Upholstery & Multi-row Carpet Extraction',
      'Steam Scrubbing of Cargo & Under-seat areas',
      'Deep Floor Mat Extraction & Scrubbing',
      'Detailed Steering Column, Vents, & Infotainment systems',
      'Multiple Cup Holders & Cubbies Steam Cleaned',
      'Door Trims & Map Pockets Thoroughly Cleaned',
      'Multi-window Streak-free Cleaning',
      'Premium scent treatment + Leather hydration upgrade'
    ]
  }
];

export const ADDONS_LIST: AddonOption[] = [
  {
    id: 'a1',
    name: 'Pet Hair Blowout & Extraction',
    price: 25,
    description: 'Using high-pressure air and specialized latex brushes to extract embedded pet hair.'
  },
  {
    id: 'a2',
    name: 'Leather Deep Conditioning Treatment',
    price: 15,
    description: 'Premium pH-balanced moisturizers to prevent leather fading, cracking, and restore softness.'
  },
  {
    id: 'a3',
    name: 'Odor Eliminator & Ozone Bomb',
    price: 20,
    description: 'Active smoke/spill neutralizing treatment targeting deep bacterial or mold odors.'
  },
  {
    id: 'a4',
    name: 'Vinyl & Plastic UV Coating Protection',
    price: 15,
    description: 'Applies a non-greasy matte shield to protect dashboard parts from intense sun rays.'
  }
];

export const FEATURES_LIST: Feature[] = [
  {
    id: 'f1',
    title: 'Affordable Pricing',
    description: 'High-end interior care without the high-end markups. Meticulous, direct pricing tailored to your exact vehicle size.',
    iconName: 'DollarSign'
  },
  {
    id: 'f2',
    title: 'Attention to Detail',
    description: 'We do not overlook the small stuff. Air vents, seat tracks, cup holder seams, and buttons are all thoroughly cleaned and refreshed.',
    iconName: 'Search'
  },
  {
    id: 'f3',
    title: 'Reliable Service',
    description: 'Punctual, fully insured, and highly trained. Your vehicle gets the care it deserves right on schedule.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'f4',
    title: 'Customer Satisfaction',
    description: 'Our customer is our absolute priority. We do not stop detailing until your vehicle meets our premium quality standards.',
    iconName: 'Heart'
  },
  {
    id: 'f5',
    title: 'Professional Equipment',
    description: 'We operate with commercial-grade vapor steam extractors, non-toxic eco-cleaners, and premium automotive microfiber tools.',
    iconName: 'Wrench'
  },
  {
    id: 'f6',
    title: 'Flexible Scheduling',
    description: 'Simple online booking form, prompt response times, and customizable slots that fit perfectly around your busy week.',
    iconName: 'Calendar'
  }
];

export const TESTIMONIALS_LIST: Testimonial[] = [
  {
    id: 't1',
    name: 'Michael R.',
    vehicle: 'Tesla Model Y Owner',
    rating: 5,
    text: 'ES Detailing is incredible. My kids spilled syrup and ground cookies into the backseats. When they were finished, the seats looked and smelled premium. They literally looked brand new. Absolute perfectionist mindset!',
    date: '2 weeks ago',
    isVerifiedGoogle: true
  },
  {
    id: 't2',
    name: 'Sophia K.',
    vehicle: 'Jeep Grand Cherokee Owner',
    rating: 5,
    text: 'The leather conditioning and screen polishing were immaculate. Absolutely zero greasy residue on the dashboard, just a beautiful clean matte look. A refreshing experience with a young professional who truly cares.',
    date: '1 month ago',
    isVerifiedGoogle: true
  },
  {
    id: 't3',
    name: 'David L.',
    vehicle: 'Honda Civic Si Owner',
    rating: 5,
    text: 'I struggle with stubborn golden retriever hair embedding itself in my cloth mats and trunk space. Other detailers charge high fees or miss spots, but ES Detailing took care of everything for a stellar price. Clean and fresh!',
    date: '3 weeks ago',
    isVerifiedGoogle: true
  }
];
