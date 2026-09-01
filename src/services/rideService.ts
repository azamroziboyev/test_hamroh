/**
 * Ride Service Layer
 * 
 * Central business logic bridge between React UI and Backend API.
 * 
 * FASTAPI INTEGRATION INSTRUCTIONS:
 * 1. Currently uses `mockStore` to allow full interactivity in the AI Studio preview.
 * 2. When FastAPI backend is ready, switch the implementations below from `mockStore`
 *    to `apiClient.get(ENDPOINTS.PASSENGER_SEARCH_MATCHES, ...)` etc.
 * 3. All input/output types directly match the FastAPI Pydantic schema representations.
 */

import { DriverRide, PassengerRideRequest, Stop, Route } from '../types';
import { mockStore } from '../mock/mockStore';
import { PREDEFINED_ROUTES, PREDEFINED_STOPS } from '../constants/routes';
import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export class RideService {
  /**
   * Fetches all supported predefined routes and stops.
   * Expected FastAPI Endpoint: `GET /api/routes` & `GET /api/stops`
   */
  public static async getRoutes(): Promise<Route[]> {
    // Future FastAPI call:
    // const res = await apiClient.get<Route[]>(ENDPOINTS.ROUTES);
    // return res.data || PREDEFINED_ROUTES;
    return PREDEFINED_ROUTES;
  }

  public static async getStops(): Promise<Stop[]> {
    // Future FastAPI call:
    // const res = await apiClient.get<Stop[]>(ENDPOINTS.STOPS);
    // return res.data || PREDEFINED_STOPS;
    return PREDEFINED_STOPS;
  }

  /**
   * Searches matching drivers for a passenger query.
   * Key Matching Logic: Filters drivers who have >= requested seats available.
   * Expected FastAPI Endpoint: `GET /api/passenger/matches?origin={from}&destination={to}&seats={count}`
   */
  public static async searchDrivers(
    fromStopId?: string,
    toStopId?: string,
    requiredSeats: number = 1
  ): Promise<DriverRide[]> {
    // Future FastAPI call:
    // const res = await apiClient.get<DriverRide[]>(ENDPOINTS.PASSENGER_SEARCH_MATCHES, {
    //   fromStopId,
    //   toStopId,
    //   requiredSeats
    // });
    // if (res.data) return res.data;

    return mockStore.searchDrivers(fromStopId, toStopId, requiredSeats);
  }

  /**
   * Driver creates a new scheduled ride.
   * Expected FastAPI Endpoint: `POST /api/driver/rides`
   */
  public static async createDriverRide(payload: {
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
  }): Promise<DriverRide> {
    // Future FastAPI call:
    // const res = await apiClient.post<DriverRide>(ENDPOINTS.DRIVER_CREATE_RIDE, payload);
    // if (res.data) return res.data;

    return mockStore.createDriverRide(payload);
  }

  /**
   * Passenger sends a booking request to a specific driver.
   * Expected FastAPI Endpoint: `POST /api/passenger/requests`
   */
  public static async requestRide(rideId: string, seatsCount: number = 1): Promise<PassengerRideRequest> {
    // Future FastAPI call:
    // const res = await apiClient.post<PassengerRideRequest>(ENDPOINTS.PASSENGER_CREATE_REQUEST, {
    //   driverRideId: rideId,
    //   seatsCount
    // });
    // if (res.data) return res.data;

    return mockStore.createPassengerBooking(rideId, seatsCount);
  }

  /**
   * Driver accepts a passenger booking request.
   * Updates occupied seats and reduces available seats dynamically.
   * Expected FastAPI Endpoint: `POST /api/driver/rides/{rideId}/passengers/{requestId}/accept`
   */
  public static async acceptPassenger(rideId: string, requestId: string): Promise<void> {
    // Future FastAPI call:
    // await apiClient.post(ENDPOINTS.DRIVER_ACCEPT_PASSENGER(rideId, requestId));

    mockStore.acceptPassengerRequest(rideId, requestId);
  }

  /**
   * Driver declines a passenger request.
   * Expected FastAPI Endpoint: `POST /api/driver/rides/{rideId}/passengers/{requestId}/decline`
   */
  public static async declinePassenger(rideId: string, requestId: string): Promise<void> {
    // Future FastAPI call:
    // await apiClient.post(ENDPOINTS.DRIVER_DECLINE_PASSENGER(rideId, requestId));

    mockStore.declinePassengerRequest(requestId);
  }

  /**
   * Passenger cancels their pending or accepted booking.
   * Expected FastAPI Endpoint: `PATCH /api/passenger/requests/{id}/cancel`
   */
  public static async cancelPassengerRequest(requestId: string): Promise<void> {
    // Future FastAPI call:
    // await apiClient.patch(ENDPOINTS.PASSENGER_CANCEL_REQUEST(requestId));

    mockStore.cancelPassengerRequest(requestId);
  }

  /**
   * Driver marks the ride as completed upon reaching final stop.
   * Expected FastAPI Endpoint: `PATCH /api/driver/rides/{rideId}/finish`
   */
  public static async finishRide(rideId: string): Promise<void> {
    // Future FastAPI call:
    // await apiClient.patch(ENDPOINTS.DRIVER_FINISH_RIDE(rideId));

    mockStore.finishRide(rideId);
  }
}
