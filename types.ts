export type TabType = 'explore' | 'stays' | 'activities' | 'packages' | 'my-bookings' | 'about';

export interface Stay {
  id: string;
  title: string;
  subtitle: string;
  category: 'Luxury Resorts' | 'Riverside Camps' | 'Cozy Homestays' | 'Jungle Cottages' | 'Budget Hotels';
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  badges: string[];
  features: string[];
  amenities: string[];
  scarcityText?: string;
  policyText?: string;
  originalPrice?: number;
  price: number;
  priceUnit: string;
  taxesText: string;
  description: string;
  location: string;
  roomsLeft?: number;
}

export interface Activity {
  id: string;
  title: string;
  category: 'Water Sports' | 'Wildlife Safari' | 'Trekking' | 'Camping';
  image: string;
  rating: number;
  reviewCount: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Intense';
  price: number;
  description: string;
  highlights: string[];
}

export interface PackageItem {
  id: string;
  title: string;
  duration: string;
  image: string;
  rating: number;
  reviewCount: number;
  inclusions: string[];
  price: number;
  originalPrice?: number;
  description: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  itemName: string;
  itemType: 'stay' | 'activity' | 'package';
  image: string;
  dates: string;
  guests: string;
  totalPrice: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  location: string;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}
