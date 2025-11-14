// User and Driver Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  rating: number;
  totalRides: number;
  role: 'driver' | 'delivery';
  userType: 'driver' | 'delivery';
  isOnline: boolean;
  isAvailable: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  driverDetails?: DriverDetails;
}

export interface DriverDetails {
  licenseNumber: string;
  licenseExpiry: Date;
  vehicleInfo: VehicleInfo;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
}

// Ride Types
export interface Location {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Passenger {
  _id: string;
  name: string;
  phone: string;
  rating: number;
  profilePicture?: string;
}

export interface RideRequest {
  _id: string;
  passenger: Passenger;
  pickup: Location;
  dropoff: Location;
  distance: number; // in km
  duration: number; // in minutes
  estimatedFare: number;
  status: 'pending' | 'accepted' | 'arrived' | 'started' | 'completed' | 'cancelled';
  requestTime: number; // timestamp
  expiryTime: number; // timestamp
  paymentMethod: 'cash' | 'card' | 'wallet';
}

export interface ActiveTrip {
  _id: string;
  rideId: string;
  passenger: Passenger;
  pickup: Location;
  dropoff: Location;
  status: 'accepted' | 'arrived' | 'pickedUp' | 'started' | 'completed';
  startTime?: number;
  arrivalTime?: number;
  completionTime?: number;
  actualDistance?: number;
  actualDuration?: number;
  finalFare: number;
  route?: {
    polyline: string;
    steps: any[];
  };
}

// Delivery Types
export interface DeliveryRequest {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  restaurant: {
    name: string;
    address: string;
    phone: string;
  };
  items: DeliveryItem[];
  orderValue: number;
  deliveryFee: number;
  status: 'pending' | 'accepted' | 'picked_up' | 'delivered';
  pickupLocation: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  dropoffLocation: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  deliveryPin: string;
}

export interface DeliveryItem {
  name: string;
  quantity: number;
  specialInstructions?: string;
}

// Earnings Types
export interface DailyEarnings {
  day: string;
  amount: number;
  rides: number;
}

export interface Earnings {
  today: {
    total: number;
    rides: number;
    hours: number;
    averageFare: number;
  };
  week: {
    total: number;
    rides: number;
    dailyBreakdown: DailyEarnings[];
  };
  month: {
    total: number;
    rides: number;
    weeklyBreakdown: any[];
  };
  allTime: {
    totalEarnings: number;
    totalRides: number;
    totalHours: number;
  };
}

// Trip History
export interface TripHistoryItem {
  _id: string;
  date: number;
  passenger: {
    name: string;
  };
  pickup: Location;
  dropoff: Location;
  fare: number;
  rating?: number;
  status: 'completed' | 'cancelled';
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'ride' | 'earning' | 'system' | 'promotion';
  timestamp: number;
  read: boolean;
}

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'driver' | 'delivery';
}
