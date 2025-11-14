import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { MockMapView } from '../components/MockMapView';
import { useAuth } from '../contexts/AuthContext';
import { useDriver } from '../contexts/DriverContext';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../constants/theme';
import { MAPS_CONFIG } from '../constants/config';

const { height } = Dimensions.get('window');

// Dynamically import MapView only if not in Expo Go
let MapView: any;
let Marker: any;
let PROVIDER_GOOGLE: any;

try {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
  PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
} catch (e) {
  // Maps not available in Expo Go
  console.log('React Native Maps not available, using mock map');
}

export const DashboardScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const {
    isOnline,
    setIsOnline,
    currentRequest,
    activeTrip,
    requestTimer,
    acceptRide,
    declineRide,
    earnings,
  } = useDriver();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const mapRef = useRef<any>(null);

  // Check if MapView is available
  const isMapAvailable = !!MapView;

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    }
  };

  const handleGoOnline = async () => {
    try {
      await setIsOnline(!isOnline);
    } catch (error) {
      console.error('Failed to change status:', error);
    }
  };

  const handleAcceptRide = async () => {
    if (!currentRequest) return;

    try {
      await acceptRide(currentRequest._id);
    } catch (error) {
      console.error('Failed to accept ride:', error);
    }
  };

  const handleDeclineRide = async () => {
    if (!currentRequest) return;

    try {
      await declineRide(currentRequest._id);
    } catch (error) {
      console.error('Failed to decline ride:', error);
    }
  };

  const region = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : MAPS_CONFIG.INITIAL_REGION;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        showNotification
        onNotificationPress={() => navigation.navigate('Notifications')}
        notificationCount={3}
      />

      {/* Map */}
      <View style={styles.mapContainer}>
        {isMapAvailable ? (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={region}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Your Location"
              />
            )}

            {activeTrip && (
              <>
                <Marker
                  coordinate={activeTrip.pickup.coordinates}
                  title="Pickup"
                  pinColor={COLORS.success}
                />
                <Marker
                  coordinate={activeTrip.dropoff.coordinates}
                  title="Dropoff"
                  pinColor={COLORS.danger}
                />
              </>
            )}
          </MapView>
        ) : (
          <MockMapView style={styles.map} />
        )}

        {/* Current Location Button */}
        {isMapAvailable && (
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => {
              if (location && mapRef.current) {
                mapRef.current.animateToRegion(region, 1000);
              }
            }}
          >
            <Ionicons name="locate" size={24} color={COLORS.secondary} />
          </TouchableOpacity>
        )}

        {/* Earnings Island (when online) */}
        {isOnline && (
          <TouchableOpacity
            style={styles.earningsIsland}
            onPress={() => setShowEarningsModal(true)}
          >
            <Text style={styles.earningsLabel}>Today's Earnings</Text>
            <Text style={styles.earningsAmount}>
              R{earnings?.today.total.toFixed(2) || '0.00'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Online/Offline Toggle */}
      {!activeTrip && (
        <View style={styles.statusContainer}>
          <Button
            title={isOnline ? 'Go Offline' : 'Go Online'}
            onPress={handleGoOnline}
            variant={isOnline ? 'danger' : 'success'}
            size="large"
            fullWidth
          />
        </View>
      )}

      {/* Ride Request Modal */}
      <Modal
        visible={!!currentRequest}
        transparent
        animationType="slide"
        onRequestClose={handleDeclineRide}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.requestModal}>
            {/* Timer */}
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{requestTimer}s</Text>
              <Text style={styles.timerLabel}>Time to accept</Text>
            </View>

            {/* Passenger Info */}
            <View style={styles.passengerInfo}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={32} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.passengerName}>
                  {currentRequest?.passenger.name}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color={COLORS.primary} />
                  <Text style={styles.ratingText}>
                    {currentRequest?.passenger.rating.toFixed(1)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Trip Details */}
            <View style={styles.tripDetails}>
              <View style={styles.locationRow}>
                <Ionicons name="radio-button-on" size={20} color={COLORS.success} />
                <Text style={styles.locationText} numberOfLines={1}>
                  {currentRequest?.pickup.address}
                </Text>
              </View>

              <View style={styles.locationRow}>
                <Ionicons name="location" size={20} color={COLORS.danger} />
                <Text style={styles.locationText} numberOfLines={1}>
                  {currentRequest?.dropoff.address}
                </Text>
              </View>

              <View style={styles.statsRow}>
                <Text style={styles.statText}>
                  {currentRequest?.distance.toFixed(1)} km
                </Text>
                <Text style={styles.statText}>•</Text>
                <Text style={styles.statText}>
                  {currentRequest?.duration} min
                </Text>
                <Text style={styles.statText}>•</Text>
                <Text style={styles.fareText}>
                  R{currentRequest?.estimatedFare.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Button
                title="Accept Ride"
                onPress={handleAcceptRide}
                variant="success"
                size="large"
                fullWidth
              />
              <Button
                title="Decline"
                onPress={handleDeclineRide}
                variant="outline"
                size="large"
                fullWidth
                style={{ marginTop: SPACING.md }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  earningsIsland: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.glass,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  earningsLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  earningsAmount: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  statusContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  requestModal: {
    backgroundColor: COLORS.backgroundCard,
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
    padding: SPACING.xl,
    maxHeight: height * 0.75,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  timerText: {
    fontSize: FONT_SIZE.huge,
    fontWeight: FONT_WEIGHT.extrabold,
    color: COLORS.danger,
  },
  timerLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  passengerName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  tripDetails: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  locationText: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  statText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  fareText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.success,
  },
  actionButtons: {
    marginTop: SPACING.md,
  },
});
