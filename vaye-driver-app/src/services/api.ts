import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../constants/config';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired, logout user
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password });
    return response.data;
  }

  async register(data: any) {
    const response = await this.api.post('/auth/register', data);
    return response.data;
  }

  async verifyOTP(data: any) {
    const response = await this.api.post('/auth/verify-otp', data);
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await this.api.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(data: any) {
    const response = await this.api.post('/auth/reset-password', data);
    return response.data;
  }

  async getProfile() {
    const response = await this.api.get('/auth/profile');
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await this.api.put('/auth/profile', data);
    return response.data;
  }

  // Driver
  async setAvailability(isOnline: boolean) {
    const response = await this.api.put('/drivers/availability', { isOnline });
    return response.data;
  }

  async updateLocation(latitude: number, longitude: number) {
    const response = await this.api.post('/drivers/location', {
      latitude,
      longitude,
    });
    return response.data;
  }

  async getDriverStats() {
    const response = await this.api.get('/drivers/stats');
    return response.data;
  }

  async getDriverProfile() {
    const response = await this.api.get('/drivers/profile');
    return response.data;
  }

  async updateDriverProfile(data: any) {
    const response = await this.api.put('/drivers/profile', data);
    return response.data;
  }

  // Rides
  async getNearbyRequests() {
    const response = await this.api.get('/rides/nearby-requests');
    return response.data;
  }

  async acceptRide(rideId: string) {
    const response = await this.api.post(`/rides/accept/${rideId}`);
    return response.data;
  }

  async declineRide(rideId: string) {
    const response = await this.api.post(`/rides/decline/${rideId}`);
    return response.data;
  }

  async arriveAtPickup(rideId: string) {
    const response = await this.api.post(`/rides/arrive/${rideId}`);
    return response.data;
  }

  async startTrip(rideId: string) {
    const response = await this.api.post(`/rides/start/${rideId}`);
    return response.data;
  }

  async completeTrip(rideId: string, data?: any) {
    const response = await this.api.post(`/rides/complete/${rideId}`, data);
    return response.data;
  }

  async cancelTrip(rideId: string, reason?: string) {
    const response = await this.api.post(`/rides/cancel/${rideId}`, { reason });
    return response.data;
  }

  async getActiveRide() {
    const response = await this.api.get('/rides/active');
    return response.data;
  }

  async getRideHistory(page: number = 1, limit: number = 20) {
    const response = await this.api.get('/rides/history', {
      params: { page, limit },
    });
    return response.data;
  }

  async getRideStats() {
    const response = await this.api.get('/rides/history/stats');
    return response.data;
  }

  // Deliveries
  async getAvailableDeliveries() {
    const response = await this.api.get('/deliveries/available-jobs');
    return response.data;
  }

  async acceptDelivery(deliveryId: string) {
    const response = await this.api.post(`/deliveries/accept-job/${deliveryId}`);
    return response.data;
  }

  async getMyRoute() {
    const response = await this.api.get('/deliveries/my-route');
    return response.data;
  }

  async confirmDelivery(deliveryId: string, pin: string) {
    const response = await this.api.post(`/deliveries/confirm-delivery/${deliveryId}`, { pin });
    return response.data;
  }

  async updateDeliveryStatus(deliveryId: string, status: string) {
    const response = await this.api.post(`/deliveries/status/${deliveryId}`, { status });
    return response.data;
  }

  // Earnings
  async getEarnings(period: 'today' | 'week' | 'month') {
    const response = await this.api.get('/trips/earnings', {
      params: { period },
    });
    return response.data;
  }

  async getTripStats() {
    const response = await this.api.get('/trips/stats');
    return response.data;
  }

  async getTripHistory(page: number = 1, limit: number = 20) {
    const response = await this.api.get('/trips/history', {
      params: { page, limit },
    });
    return response.data;
  }

  // Wallet/Payment
  async linkAccount(accountData: any) {
    const response = await this.api.post('/account-linking/link-account', accountData);
    return response.data;
  }

  async getLinkStatus() {
    const response = await this.api.get('/account-linking/link-status');
    return response.data;
  }

  async getWalletBalance() {
    const response = await this.api.get('/wallet/balance-enquiry');
    return response.data;
  }

  async processPayment(paymentData: any) {
    const response = await this.api.post('/wallet/payment', paymentData);
    return response.data;
  }

  async syncWallet() {
    const response = await this.api.post('/wallet/sync');
    return response.data;
  }

  async disconnectAccount() {
    const response = await this.api.post('/account-linking/disconnect');
    return response.data;
  }

  // Notifications
  async getNotifications() {
    const response = await this.api.get('/notifications');
    return response.data;
  }

  async markNotificationRead(notificationId: string) {
    const response = await this.api.put(`/notifications/${notificationId}/read`);
    return response.data;
  }

  async deleteNotification(notificationId: string) {
    const response = await this.api.delete(`/notifications/${notificationId}`);
    return response.data;
  }
}

export default new ApiService();
