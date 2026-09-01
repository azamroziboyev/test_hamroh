/**
 * Centralized API Endpoints for Hamroh Taxi
 * 
 * Configured for future Python + FastAPI backend integration.
 * Base URL defaults to `/api` or environment variable `VITE_API_BASE_URL`.
 */

export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

export const ENDPOINTS = {
  // Routes & Stops
  ROUTES: `${API_BASE_URL}/routes`,
  STOPS: `${API_BASE_URL}/stops`,
  ROUTE_DETAILS: (id: string) => `${API_BASE_URL}/routes/${id}`,

  // Passenger Endpoints
  PASSENGER_SEARCH_MATCHES: `${API_BASE_URL}/passenger/matches`, // GET with query params: origin, destination, seats, date
  PASSENGER_CREATE_REQUEST: `${API_BASE_URL}/passenger/requests`, // POST { driverRideId, fromStopId, toStopId, seatsCount }
  PASSENGER_MY_REQUESTS: `${API_BASE_URL}/passenger/requests/me`, // GET
  PASSENGER_CANCEL_REQUEST: (id: string) => `${API_BASE_URL}/passenger/requests/${id}/cancel`, // PATCH

  // Driver Endpoints
  DRIVER_CREATE_RIDE: `${API_BASE_URL}/driver/rides`, // POST { routeId, fromStopId, toStopId, departureTime, totalSeats, farePerSeatUzs }
  DRIVER_MATCHING_PASSENGERS: `${API_BASE_URL}/driver/matches`, // GET matching pending passengers along route
  DRIVER_MY_RIDES: `${API_BASE_URL}/driver/rides/me`, // GET active / past rides
  DRIVER_RIDE_DETAILS: (id: string) => `${API_BASE_URL}/driver/rides/${id}`, // GET
  DRIVER_ACCEPT_PASSENGER: (rideId: string, requestId: string) => `${API_BASE_URL}/driver/rides/${rideId}/passengers/${requestId}/accept`, // POST
  DRIVER_DECLINE_PASSENGER: (rideId: string, requestId: string) => `${API_BASE_URL}/driver/rides/${rideId}/passengers/${requestId}/decline`, // POST
  DRIVER_FINISH_RIDE: (rideId: string) => `${API_BASE_URL}/driver/rides/${rideId}/finish`, // PATCH
  DRIVER_CANCEL_RIDE: (rideId: string) => `${API_BASE_URL}/driver/rides/${rideId}/cancel`, // PATCH

  // Profile & Auth
  AUTH_TELEGRAM_LOGIN: `${API_BASE_URL}/auth/telegram`, // POST { initData }
  PROFILE: `${API_BASE_URL}/profile`, // GET, PATCH
  PROFILE_SWITCH_ROLE: `${API_BASE_URL}/profile/role`, // PATCH { role: 'passenger' | 'driver' }
  DRIVER_VEHICLE: `${API_BASE_URL}/profile/vehicle`, // GET, PATCH

  // Notifications
  NOTIFICATIONS: `${API_BASE_URL}/notifications`, // GET
  MARK_NOTIFICATION_READ: (id: string) => `${API_BASE_URL}/notifications/${id}/read`, // PATCH
};
