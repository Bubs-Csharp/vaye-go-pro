import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { RideRequest, ActiveTrip, Earnings } from '../types';
import apiService from '../services/api';
import { API_CONFIG } from '../constants/config';
import { useAuth } from './AuthContext';

interface DriverContextType {
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;
  currentRequest: RideRequest | null;
  activeTrip: ActiveTrip | null;
  earnings: Earnings | null;
  requestTimer: number;
  acceptRide: (rideId: string) => Promise<void>;
  declineRide: (rideId: string) => Promise<void>;
  arriveAtPickup: () => Promise<void>;
  startTrip: () => Promise<void>;
  completeTrip: (rating?: number, comment?: string) => Promise<void>;
  cancelTrip: (reason?: string) => Promise<void>;
  refreshEarnings: () => Promise<void>;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useAuth();
  const [isOnline, setIsOnlineState] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<RideRequest | null>(null);
  const [activeTrip, setActiveTrip] = useState<ActiveTrip | null>(null);
  const [earnings, setEarnings] = useState<Earnings | null>(null);
  const [requestTimer, setRequestTimer] = useState(API_CONFIG.REQUEST_TIMEOUT);
  const [declinedRequests, setDeclinedRequests] = useState<Set<string>>(new Set());

  // Poll for nearby ride requests
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOnline && !activeTrip && !currentRequest) {
      interval = setInterval(async () => {
        try {
          const response = await apiService.getNearbyRequests();
          if (response.data && response.data.length > 0) {
            const request = response.data[0];
            // Don't show already declined requests
            if (!declinedRequests.has(request._id)) {
              setCurrentRequest(request);
              setRequestTimer(API_CONFIG.REQUEST_TIMEOUT);
            }
          }
        } catch (error) {
          console.error('Failed to fetch nearby requests:', error);
        }
      }, API_CONFIG.POLLING_INTERVAL);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOnline, activeTrip, currentRequest, declinedRequests]);

  // Request countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentRequest && requestTimer > 0) {
      timer = setTimeout(() => {
        setRequestTimer((prev) => prev - 1);
      }, 1000);
    } else if (currentRequest && requestTimer === 0) {
      // Auto-decline after timeout
      handleDeclineRide(currentRequest._id);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentRequest, requestTimer]);

  // Fetch active trip on mount
  useEffect(() => {
    if (user?.isOnline) {
      fetchActiveTrip();
    }
  }, [user]);

  const fetchActiveTrip = async () => {
    try {
      const response = await apiService.getActiveRide();
      if (response.data) {
        setActiveTrip(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch active trip:', error);
    }
  };

  const setIsOnline = useCallback(async (value: boolean) => {
    try {
      await apiService.setAvailability(value);
      setIsOnlineState(value);
      updateUser({ isOnline: value });

      if (value) {
        // When going online, fetch active trip
        await fetchActiveTrip();
        // Refresh earnings
        await refreshEarnings();
      } else {
        // Clear current request when going offline
        setCurrentRequest(null);
      }
    } catch (error) {
      console.error('Failed to update availability:', error);
      throw error;
    }
  }, [updateUser]);

  const acceptRide = async (rideId: string) => {
    try {
      const response = await apiService.acceptRide(rideId);
      setActiveTrip(response.data);
      setCurrentRequest(null);
      setRequestTimer(API_CONFIG.REQUEST_TIMEOUT);
    } catch (error) {
      console.error('Failed to accept ride:', error);
      throw error;
    }
  };

  const handleDeclineRide = async (rideId: string) => {
    try {
      await apiService.declineRide(rideId);
      setDeclinedRequests((prev) => new Set(prev).add(rideId));
      setCurrentRequest(null);
      setRequestTimer(API_CONFIG.REQUEST_TIMEOUT);
    } catch (error) {
      console.error('Failed to decline ride:', error);
    }
  };

  const declineRide = async (rideId: string) => {
    await handleDeclineRide(rideId);
  };

  const arriveAtPickup = async () => {
    if (!activeTrip) return;

    try {
      const response = await apiService.arriveAtPickup(activeTrip._id);
      setActiveTrip(response.data);
    } catch (error) {
      console.error('Failed to mark arrival:', error);
      throw error;
    }
  };

  const startTrip = async () => {
    if (!activeTrip) return;

    try {
      const response = await apiService.startTrip(activeTrip._id);
      setActiveTrip(response.data);
    } catch (error) {
      console.error('Failed to start trip:', error);
      throw error;
    }
  };

  const completeTrip = async (rating?: number, comment?: string) => {
    if (!activeTrip) return;

    try {
      await apiService.completeTrip(activeTrip._id, { rating, comment });
      setActiveTrip(null);
      // Refresh earnings after completing a trip
      await refreshEarnings();
    } catch (error) {
      console.error('Failed to complete trip:', error);
      throw error;
    }
  };

  const cancelTrip = async (reason?: string) => {
    if (!activeTrip) return;

    try {
      await apiService.cancelTrip(activeTrip._id, reason);
      setActiveTrip(null);
    } catch (error) {
      console.error('Failed to cancel trip:', error);
      throw error;
    }
  };

  const refreshEarnings = async () => {
    try {
      const [today, week, month] = await Promise.all([
        apiService.getEarnings('today'),
        apiService.getEarnings('week'),
        apiService.getEarnings('month'),
      ]);

      setEarnings({
        today: today.data,
        week: week.data,
        month: month.data,
        allTime: {
          totalEarnings: 0,
          totalRides: 0,
          totalHours: 0,
        },
      });
    } catch (error) {
      console.error('Failed to fetch earnings:', error);
    }
  };

  return (
    <DriverContext.Provider
      value={{
        isOnline,
        setIsOnline,
        currentRequest,
        activeTrip,
        earnings,
        requestTimer,
        acceptRide,
        declineRide,
        arriveAtPickup,
        startTrip,
        completeTrip,
        cancelTrip,
        refreshEarnings,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export const useDriver = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error('useDriver must be used within DriverProvider');
  }
  return context;
};
