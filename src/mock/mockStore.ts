/**
 * In-memory Mock State Store
 * 
 * Simulates real reactive interactions for the frontend preview
 * without touching backend code.
 * 
 * FUTURE FASTAPI INTEGRATION:
 * The frontend service layer will swap these internal state mutations
 * for async calls to `apiClient.post()`, `apiClient.get()`, and `apiClient.patch()`.
 */

import { DriverRide, PassengerRideRequest, UserProfile, UserRole, NotificationItem, RidePassenger } from '../types';
import { INITIAL_MOCK_RIDES, INITIAL_PASSENGER_REQUESTS, INITIAL_NOTIFICATIONS, MOCK_PASSENGER_USER, MOCK_DRIVER_USER } from './mockData';
import { PREDEFINED_ROUTES, PREDEFINED_STOPS } from '../constants/routes';

type Listener = () => void;

class MockStore {
  private currentRole: UserRole = 'passenger';
  private passengerProfile: UserProfile = { ...MOCK_PASSENGER_USER };
  private driverProfile: UserProfile = { ...MOCK_DRIVER_USER };
  private rides: DriverRide[] = [...INITIAL_MOCK_RIDES];
  private passengerRequests: PassengerRideRequest[] = [...INITIAL_PASSENGER_REQUESTS];
  private notifications: NotificationItem[] = [...INITIAL_NOTIFICATIONS];
  private listeners: Set<Listener> = new Set();

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(l => l());
  }

  // Role management
  public getRole(): UserRole {
    return this.currentRole;
  }

  public setRole(role: UserRole): void {
    this.currentRole = role;
    this.notify();
  }

  // Profile
  public getCurrentUser(): UserProfile {
    return this.currentRole === 'driver' ? this.driverProfile : this.passengerProfile;
  }

  public updateProfile(updates: Partial<UserProfile>): void {
    if (this.currentRole === 'driver') {
      this.driverProfile = { ...this.driverProfile, ...updates };
    } else {
      this.passengerProfile = { ...this.passengerProfile, ...updates };
    }
    this.notify();
  }

  // Driver Rides
  public getRides(): DriverRide[] {
    return this.rides;
  }

  public getRideById(id: string): DriverRide | undefined {
    return this.rides.find(r => r.id === id);
  }

  public getMyDriverActiveRide(): DriverRide | undefined {
    return this.rides.find(r => r.driverId === this.driverProfile.id && r.status === 'active') ||
           this.rides.find(r => r.driverId === this.driverProfile.id && r.status === 'scheduled');
  }

  public createDriverRide(data: {
    fromStopId: string;
    fromStopName: string;
    toStopId: string;
    toStopName: string;
    departureDate: string;
    departureTime: string;
    totalSeats: number;
    farePerSeatUzs: number;
    routeId?: string;
    routeName?: string;
  }): DriverRide {
    const newRide: DriverRide = {
      id: `ride_${Date.now()}`,
      driverId: this.driverProfile.id,
      driverName: this.driverProfile.name,
      driverPhone: this.driverProfile.phone,
      driverAvatar: this.driverProfile.avatarUrl,
      driverRating: this.driverProfile.rating,
      car: this.driverProfile.car || {
        model: 'Chevrolet Gentra',
        plateNumber: '01 A 777 AA',
        color: 'Qora',
        hasAirConditioner: true,
        hasBaggageSpace: true,
        isNonSmoking: true,
        totalSeats: data.totalSeats
      },
      routeId: data.routeId || 'custom_route',
      routeName: data.routeName || `${data.fromStopName} → ${data.toStopName}`,
      fromStopId: data.fromStopId,
      fromStopName: data.fromStopName,
      toStopId: data.toStopId,
      toStopName: data.toStopName,
      departureDate: data.departureDate,
      departureTime: data.departureTime,
      farePerSeatUzs: data.farePerSeatUzs,
      totalSeats: data.totalSeats,
      occupiedSeats: 0,
      availableSeats: data.totalSeats,
      status: 'active',
      passengers: [],
      createdAt: new Date().toISOString()
    };

    this.rides.unshift(newRide);
    this.addNotification({
      title: 'Yangi safar yaratildi!',
      message: `${newRide.fromStopName} → ${newRide.toStopName} safaringiz e'lon qilindi. Yo'lovchilar so'rov yuborishi mumkin.`,
      type: 'trip_update'
    });
    this.notify();
    return newRide;
  }

  // Passenger Matching & Requests
  public searchDrivers(fromStopId?: string, toStopId?: string, requiredSeats: number = 1): DriverRide[] {
    return this.rides.filter(ride => {
      if (ride.status === 'completed' || ride.status === 'cancelled') return false;
      // Key matching check: Driver must have enough remaining available seats
      if (ride.availableSeats < requiredSeats) return false;

      // In real backend: route path checks. For frontend preview: matches or default
      if (fromStopId && toStopId) {
        return (ride.fromStopId === fromStopId || ride.routeName.includes(fromStopId)) &&
               (ride.toStopId === toStopId || ride.routeName.includes(toStopId));
      }
      return true;
    });
  }

  public createPassengerBooking(rideId: string, seatsCount: number = 1): PassengerRideRequest {
    const ride = this.getRideById(rideId);
    if (!ride) throw new Error('Safar topilmadi');

    const newRequest: PassengerRideRequest = {
      id: `req_${Date.now()}`,
      passengerId: this.passengerProfile.id,
      passengerName: this.passengerProfile.name,
      passengerPhone: this.passengerProfile.phone,
      passengerAvatar: this.passengerProfile.avatarUrl,
      fromStopId: ride.fromStopId,
      fromStopName: ride.fromStopName,
      toStopId: ride.toStopId,
      toStopName: ride.toStopName,
      seatsCount,
      driverRideId: ride.id,
      driverName: ride.driverName,
      carModel: `${ride.car.model} • ${ride.car.plateNumber}`,
      departureTime: ride.departureTime,
      farePerSeatUzs: ride.farePerSeatUzs,
      totalFareUzs: ride.farePerSeatUzs * seatsCount,
      status: 'pending',
      createdAt: 'Hozirgina'
    };

    this.passengerRequests.unshift(newRequest);

    this.addNotification({
      title: 'So\'rov yuborildi',
      message: `${ride.driverName} haydovchiga ${seatsCount} ta joy uchun so'rov yuborildi. Tasdiqlanishini kuting.`,
      type: 'booking',
      relatedRideId: ride.id
    });

    this.notify();
    return newRequest;
  }

  public getMyPassengerRequests(): PassengerRideRequest[] {
    return this.passengerRequests.filter(r => r.passengerId === this.passengerProfile.id);
  }

  public getMyPassengerActiveRide(): PassengerRideRequest | undefined {
    return this.passengerRequests.find(r => 
      r.passengerId === this.passengerProfile.id && (r.status === 'accepted' || r.status === 'pending')
    );
  }

  // Driver Accept / Decline Passenger
  public acceptPassengerRequest(rideId: string, requestId: string): void {
    const ride = this.getRideById(rideId);
    const request = this.passengerRequests.find(r => r.id === requestId);
    if (!ride || !request) return;

    if (ride.availableSeats < request.seatsCount) {
      alert("Mashinada yetarli bo'sh joy qolmagan!");
      return;
    }

    request.status = 'accepted';

    // Add to ride passengers list
    const newPassenger: RidePassenger = {
      requestId: request.id,
      passengerId: request.passengerId,
      passengerName: request.passengerName,
      passengerPhone: request.passengerPhone,
      passengerAvatar: request.passengerAvatar,
      requestedSeats: request.seatsCount,
      fromStopId: request.fromStopId,
      fromStopName: request.fromStopName,
      toStopId: request.toStopId,
      toStopName: request.toStopName,
      status: 'accepted',
      farePerSeatUzs: request.farePerSeatUzs || ride.farePerSeatUzs,
      totalFareUzs: request.totalFareUzs || (ride.farePerSeatUzs * request.seatsCount),
      bookingTime: 'Hozir'
    };

    ride.passengers.push(newPassenger);
    ride.occupiedSeats += request.seatsCount;
    ride.availableSeats = Math.max(0, ride.totalSeats - ride.occupiedSeats);

    this.addNotification({
      title: 'Yo\'lovchi qabul qilindi',
      message: `${request.passengerName} (${request.seatsCount} joy) safaringizga qo'shildi.`,
      type: 'trip_update',
      relatedRideId: ride.id
    });

    this.notify();
  }

  public declinePassengerRequest(requestId: string): void {
    const request = this.passengerRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'declined';
      this.notify();
    }
  }

  public cancelPassengerRequest(requestId: string): void {
    const request = this.passengerRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'cancelled';
      if (request.driverRideId) {
        const ride = this.getRideById(request.driverRideId);
        if (ride) {
          ride.passengers = ride.passengers.filter(p => p.requestId !== requestId);
          ride.occupiedSeats = Math.max(0, ride.occupiedSeats - request.seatsCount);
          ride.availableSeats = ride.totalSeats - ride.occupiedSeats;
        }
      }
      this.notify();
    }
  }

  public finishRide(rideId: string): void {
    const ride = this.getRideById(rideId);
    if (ride) {
      ride.status = 'completed';
      this.addNotification({
        title: 'Safar yakunlandi',
        message: `${ride.fromStopName} → ${ride.toStopName} muvaffaqiyatli yakunlandi.`,
        type: 'trip_update'
      });
      this.notify();
    }
  }

  public cancelDriverRide(rideId: string): void {
    const ride = this.getRideById(rideId);
    if (ride) {
      ride.status = 'cancelled';
      this.notify();
    }
  }

  // Notifications
  public getNotifications(): NotificationItem[] {
    return this.notifications;
  }

  public getUnreadNotificationCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  public markNotificationAsRead(id: string): void {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      this.notify();
    }
  }

  public markAllNotificationsRead(): void {
    this.notifications.forEach(n => (n.read = true));
    this.notify();
  }

  private addNotification(item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>): void {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: item.title,
      message: item.message,
      type: item.type,
      timestamp: 'Hozirgina',
      read: false,
      relatedRideId: item.relatedRideId
    };
    this.notifications.unshift(newNotif);
  }
}

export const mockStore = new MockStore();
