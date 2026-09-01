/**
 * Domain types and models for Hamroh Taxi platform.
 * Structured to map directly to future FastAPI Pydantic schemas.
 */

export type UserRole = 'passenger' | 'driver';

export type RequestStatus = 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed';

export type RideStatus = 'scheduled' | 'active' | 'completed' | 'cancelled';

export interface TelegramUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface UserProfile {
  id: string;
  telegramId?: number;
  name: string;
  phone: string;
  avatarUrl?: string;
  role: UserRole;
  rating: number;
  totalTrips: number;
  car?: DriverCar;
  createdAt: string;
}

export interface DriverCar {
  model: string;       // e.g. "Chevrolet Gentra", "Cobalt", "Nexia 3"
  plateNumber: string; // e.g. "01 A 777 AA"
  color: string;       // e.g. "Qora metallik", "Oq"
  hasAirConditioner: boolean;
  hasBaggageSpace: boolean;
  isNonSmoking: boolean;
  totalSeats: number;  // Standard 4 seats
}

export interface Stop {
  id: string;
  name: string;
  region: string;      // e.g. "Xorazm", "Jizzax", "Toshkent"
  district?: string;   // e.g. "Hazorasp", "Bog'ot", "Zomin"
  orderIndex: number;  // Relative order on the route
  isPopular?: boolean;
}

export interface Route {
  id: string;
  name: string;        // e.g. "Hazorasp → Xiva", "Toshkent → Zomin"
  originStopId: string;
  destinationStopId: string;
  stops: Stop[];
  estimatedDurationMin: number;
  standardFareUzs: number;
}

/**
 * Represents a passenger booked inside a driver's ride.
 * Key matching requirement: One driver carries multiple passengers up to car capacity.
 */
export interface RidePassenger {
  requestId: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  passengerAvatar?: string;
  requestedSeats: number;
  fromStopId: string;
  fromStopName: string;
  toStopId: string;
  toStopName: string;
  status: RequestStatus;
  farePerSeatUzs: number;
  totalFareUzs: number;
  bookingTime: string;
}

/**
 * Driver's created trip.
 * Tracks total seats, occupied seats, and remaining seats dynamically.
 */
export interface DriverRide {
  id: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  driverAvatar?: string;
  driverRating: number;
  car: DriverCar;
  routeId: string;
  routeName: string;
  fromStopId: string;
  fromStopName: string;
  toStopId: string;
  toStopName: string;
  departureDate: string;    // e.g. "2026-08-21" or "Bugun"
  departureTime: string;    // e.g. "14:30"
  farePerSeatUzs: number;
  totalSeats: number;       // e.g. 4
  occupiedSeats: number;    // Calculated from accepted passengers (e.g. 3)
  availableSeats: number;   // totalSeats - occupiedSeats (e.g. 1)
  status: RideStatus;
  passengers: RidePassenger[];
  createdAt: string;
}

/**
 * Passenger's ride request / search query.
 */
export interface PassengerRideRequest {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  passengerAvatar?: string;
  fromStopId: string;
  fromStopName: string;
  toStopId: string;
  toStopName: string;
  seatsCount: number;       // Number of seats requested (e.g. 1, 2, 3)
  driverRideId?: string;    // Target driver ride if directly requested
  driverName?: string;
  carModel?: string;
  departureTime?: string;
  farePerSeatUzs?: number;
  totalFareUzs?: number;
  status: RequestStatus;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'system' | 'trip_update';
  timestamp: string;
  read: boolean;
  relatedRideId?: string;
}
