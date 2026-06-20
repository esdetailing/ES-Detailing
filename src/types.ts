export interface Service {
  id: string;
  name: string;
  category: 'small' | 'midsize' | 'large';
  price: number;
  timeEstimate: string;
  description: string;
  features: string[];
  vehicleExamples: string;
  iconName: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  text: string;
  date: string;
  isVerifiedGoogle: boolean;
}

export interface BookingInquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  vehicleSize: 'small' | 'midsize' | 'large';
  addons: string[];
  vehicleDetails: string;
  preferredDate: string;
  preferredTime: 'morning' | 'afternoon' | 'evening';
  message?: string;
  totalEstimatedPrice: number;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
}
