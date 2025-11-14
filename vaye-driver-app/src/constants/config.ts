// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://vayebac.onrender.com/api',
  TIMEOUT: 30000,
  POLLING_INTERVAL: 4000, // 4 seconds for ride requests
  LOCATION_UPDATE_INTERVAL: 10000, // 10 seconds
  REQUEST_TIMEOUT: 20, // 20 seconds for ride request countdown
};

// Google Maps Configuration
export const MAPS_CONFIG = {
  INITIAL_REGION: {
    latitude: -26.2041,
    longitude: 28.0473,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  // Add your Google Maps API key here
  GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Vaye Driver',
  TAGLINE: 'Your Ride Partner',
  MINIMUM_TOUCH_TARGET: 44,
};
