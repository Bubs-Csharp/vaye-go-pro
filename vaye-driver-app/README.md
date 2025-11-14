# Vaye Driver App - React Native + Expo

A complete professional driver application for ride-sharing and delivery services built with React Native and Expo.

## 🎯 Features

### Core Features
- ✅ **Authentication System** - Login, Signup with JWT token management
- ✅ **Real-time Dashboard** - Google Maps integration with live location tracking
- ✅ **Online/Offline Toggle** - Control availability status
- ✅ **Ride Request System** - Real-time ride requests with 20-second countdown timer
- ✅ **Trip Management** - Accept, decline, track, and complete trips
- ✅ **Earnings Dashboard** - Track earnings (Today/Week/Month) with detailed breakdowns
- ✅ **Profile Management** - Driver profile, vehicle information, and documents
- ✅ **Bottom Tab Navigation** - Smooth navigation between Dashboard, Earnings, and Profile

### Advanced Features
- 🔄 **Background Polling** - Automatic polling for nearby ride requests (4-second intervals)
- 📍 **Location Services** - Real-time location tracking and updates
- 🔔 **Push Notifications** - Ride requests and trip updates (configured)
- 💰 **Payment Integration** - Tribaal wallet integration ready
- 📊 **Analytics** - Performance metrics, ratings, and statistics
- 🚗 **Delivery Mode** - Support for delivery drivers (structure in place)

## 🛠️ Technology Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Maps**: React Native Maps (Google Maps)
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **UI Components**: Custom components with Linear Gradients
- **Icons**: Expo Vector Icons (Ionicons)

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app on your physical device (optional)

### Setup Steps

1. **Clone the repository**
   ```bash
   cd vaye-driver-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Google Maps API Key**

   Add your Google Maps API key in `app.json`:
   ```json
   {
     "expo": {
       "ios": {
         "config": {
           "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY_HERE"
         }
       },
       "android": {
         "config": {
           "googleMaps": {
             "apiKey": "YOUR_GOOGLE_MAPS_API_KEY_HERE"
           }
         }
       }
     }
   }
   ```

4. **Configure API Base URL** (if needed)

   Edit `src/constants/config.ts`:
   ```typescript
   export const API_CONFIG = {
     BASE_URL: 'https://vayebac.onrender.com/api',
     // ... other configs
   };
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Run on specific platform**
   ```bash
   # iOS (Mac only)
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 📱 Running on Device

### Using Expo Go
1. Install Expo Go app from App Store (iOS) or Play Store (Android)
2. Run `npm start`
3. Scan the QR code with your device
4. App will open in Expo Go

### Development Build
For features requiring native code (like background location):
```bash
# Create development build
npx expo run:ios
# or
npx expo run:android
```

## 🏗️ Project Structure

```
vaye-driver-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Header.tsx
│   ├── screens/             # App screens
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── EarningsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── BottomTabNavigator.tsx
│   ├── contexts/            # React Context for state management
│   │   ├── AuthContext.tsx
│   │   └── DriverContext.tsx
│   ├── services/            # API services
│   │   └── api.ts
│   ├── constants/           # App constants and configuration
│   │   ├── theme.ts
│   │   └── config.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── utils/               # Utility functions
├── assets/                  # Images, fonts, etc.
├── App.tsx                  # Root component
├── app.json                 # Expo configuration
├── package.json
└── tsconfig.json
```

## 🎨 Design System

### Color Palette
- **Primary Yellow**: `#ffd93d` - Main brand color
- **Secondary Navy**: `#1e2761` - Secondary brand color
- **Success Green**: `#4caf50` - Success states
- **Danger Red**: `#ef4444` - Errors/alerts
- **Warning Orange**: `#f59e0b` - Pending states

### Typography
- Font Family: System default (Inter on iOS, Roboto on Android)
- Font Weights: 400, 500, 600, 700, 800

## 🔑 Key Components

### AuthContext
Manages authentication state, login, signup, and logout functionality.

```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

### DriverContext
Manages driver operations, ride requests, and active trips.

```typescript
const {
  isOnline,
  setIsOnline,
  currentRequest,
  activeTrip,
  acceptRide,
  declineRide,
  earnings
} = useDriver();
```

## 🔄 API Integration

The app connects to the backend API at `https://vayebac.onrender.com/api`

### Main Endpoints
- **Auth**: `/auth/login`, `/auth/register`
- **Driver**: `/drivers/availability`, `/drivers/location`
- **Rides**: `/rides/nearby-requests`, `/rides/accept/:id`
- **Earnings**: `/trips/earnings?period=today|week|month`
- **Wallet**: `/wallet/balance-enquiry`, `/account-linking/link-account`

## 📍 Location Permissions

The app requires location permissions for:
- Finding nearby ride requests
- Tracking driver location
- Navigation to pickup/dropoff points

Permissions are configured in `app.json` with appropriate usage descriptions.

## 🔔 Push Notifications

Configured with expo-notifications plugin. To test push notifications:
1. Get device push token
2. Send test notification via Expo push notification tool
3. Handle notification in app

## 🚀 Building for Production

### Create Production Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Submit to App Stores

```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

## 🧪 Testing

### Run on Simulator/Emulator
```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android
```

### Test Features
1. **Authentication**: Test login/signup flows
2. **Dashboard**: Verify map loads and location tracking works
3. **Ride Requests**: Test accept/decline with mock data
4. **Earnings**: Check earnings calculations and display
5. **Profile**: Test profile updates and vehicle info

## 🐛 Troubleshooting

### Maps not showing
- Ensure Google Maps API key is configured in `app.json`
- Check that API key has Maps SDK for iOS/Android enabled
- Verify billing is enabled on Google Cloud Console

### Location not working
- Check location permissions in device settings
- Ensure location services are enabled
- Review permission descriptions in `app.json`

### Build errors
- Clear cache: `expo start -c`
- Delete node_modules: `rm -rf node_modules && npm install`
- Clear Metro bundler cache: `npx expo start --clear`

## 📝 Environment Variables

Create a `.env` file in the root directory (optional):
```
EXPO_PUBLIC_API_BASE_URL=https://vayebac.onrender.com/api
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Access in code:
```typescript
const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
```

## 🎯 Next Steps / Roadmap

- [ ] Implement active trip view with navigation
- [ ] Add trip completion modal with rating system
- [ ] Create trip history screen with filters
- [ ] Implement settings screen
- [ ] Add delivery mode for delivery drivers
- [ ] Integrate Tribaal wallet payment system
- [ ] Add in-app chat with passengers
- [ ] Implement push notifications for ride requests
- [ ] Add offline mode support
- [ ] Create driver onboarding flow
- [ ] Add document upload functionality
- [ ] Implement emergency assistance button

## 📄 License

Proprietary - Vaye © 2024

## 👥 Support

For support and questions:
- Email: support@vaye.com
- Website: https://vaye.com

---

**Built with ❤️ using React Native + Expo**
