/**
 * Separated Mock Data for Hamroh Taxi
 * 
 * IMPORTANT ARCHITECTURE NOTE:
 * This data is solely used to preview and test the UI states without requiring
 * a live FastAPI backend. It is completely isolated from the API service layer.
 */

import { DriverRide, PassengerRideRequest, UserProfile, NotificationItem } from '../types';
import { PREDEFINED_ROUTES, PREDEFINED_STOPS } from '../constants/routes';

export const MOCK_PASSENGER_USER: UserProfile = {
  id: 'usr_pass_1',
  name: "O'ktam Ahmedov",
  phone: '+998 90 123 45 67',
  avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
  role: 'passenger',
  rating: 4.8,
  totalTrips: 18,
  createdAt: '2026-01-15'
};

export const MOCK_DRIVER_USER: UserProfile = {
  id: 'usr_drv_1',
  name: 'Dilshod Ergashev',
  phone: '+998 90 987 65 43',
  avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
  role: 'driver',
  rating: 4.9,
  totalTrips: 142,
  car: {
    model: 'Chevrolet Gentra',
    plateNumber: '01 A 777 AA',
    color: 'Qora metallik',
    hasAirConditioner: true,
    hasBaggageSpace: true,
    isNonSmoking: true,
    totalSeats: 4
  },
  createdAt: '2025-11-10'
};

export const INITIAL_MOCK_RIDES: DriverRide[] = [
  {
    id: 'ride_1',
    driverId: 'usr_drv_1',
    driverName: 'Dilshod aka',
    driverPhone: '+998 90 987 65 43',
    driverAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
    driverRating: 4.9,
    car: {
      model: 'Chevrolet Gentra',
      plateNumber: '01 A 777 AA',
      color: 'Qora metallik',
      hasAirConditioner: true,
      hasBaggageSpace: true,
      isNonSmoking: true,
      totalSeats: 4
    },
    routeId: 'route_toshkent_zomin',
    routeName: 'Toshkent → Zomin',
    fromStopId: 'stop_toshkent',
    fromStopName: 'Toshkent shahri (Olmazor)',
    toStopId: 'stop_zomin',
    toStopName: 'Zomin tumani (Bozor)',
    departureDate: 'Bugun',
    departureTime: '14:30',
    farePerSeatUzs: 35000,
    totalSeats: 4,
    occupiedSeats: 2, // 2 seats occupied by Passenger A (1) & B (1)
    availableSeats: 2, // 2 remaining
    status: 'active',
    passengers: [
      {
        requestId: 'req_sub_1',
        passengerId: 'p_101',
        passengerName: 'Anvar Qodirov',
        passengerPhone: '+998 93 111 22 33',
        passengerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
        requestedSeats: 1,
        fromStopId: 'stop_toshkent',
        fromStopName: 'Toshkent shahri',
        toStopId: 'stop_zomin',
        toStopName: 'Zomin tumani',
        status: 'accepted',
        farePerSeatUzs: 35000,
        totalFareUzs: 35000,
        bookingTime: '11:45'
      },
      {
        requestId: 'req_sub_2',
        passengerId: 'p_102',
        passengerName: 'Zulayho opa',
        passengerPhone: '+998 94 444 55 66',
        passengerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
        requestedSeats: 1,
        fromStopId: 'stop_guliston',
        fromStopName: 'Guliston shahri',
        toStopId: 'stop_zomin',
        toStopName: 'Zomin tumani',
        status: 'accepted',
        farePerSeatUzs: 25000,
        totalFareUzs: 25000,
        bookingTime: '12:10'
      }
    ],
    createdAt: '2026-08-21T10:00:00Z'
  },
  {
    id: 'ride_2',
    driverId: 'usr_drv_2',
    driverName: 'Sardor',
    driverPhone: '+998 91 333 44 55',
    driverAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    driverRating: 4.7,
    car: {
      model: 'Nexia 3',
      plateNumber: '01 B 456 BB',
      color: 'Oq',
      hasAirConditioner: true,
      hasBaggageSpace: true,
      isNonSmoking: false,
      totalSeats: 4
    },
    routeId: 'route_toshkent_zomin',
    routeName: 'Toshkent → Zomin',
    fromStopId: 'stop_toshkent',
    fromStopName: 'Toshkent shahri',
    toStopId: 'stop_zomin',
    toStopName: 'Zomin tumani',
    departureDate: 'Bugun',
    departureTime: '15:00',
    farePerSeatUzs: 30000,
    totalSeats: 4,
    occupiedSeats: 0,
    availableSeats: 4,
    status: 'scheduled',
    passengers: [],
    createdAt: '2026-08-21T11:15:00Z'
  },
  {
    id: 'ride_3',
    driverId: 'usr_drv_3',
    driverName: 'Jasurbek Rahimov',
    driverPhone: '+998 97 777 88 99',
    driverAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
    driverRating: 4.9,
    car: {
      model: 'Chevrolet Cobalt',
      plateNumber: '90 C 888 CC',
      color: 'Delfin',
      hasAirConditioner: true,
      hasBaggageSpace: true,
      isNonSmoking: true,
      totalSeats: 4
    },
    routeId: 'route_hazorasp_xiva',
    routeName: 'Hazorasp → Bog\'ot → Xiva',
    fromStopId: 'stop_hazorasp',
    fromStopName: 'Hazorasp markaz',
    toStopId: 'stop_xiva',
    toStopName: 'Xiva Ichan Qal\'a',
    departureDate: 'Bugun',
    departureTime: '15:30',
    farePerSeatUzs: 25000,
    totalSeats: 4,
    occupiedSeats: 3, // Multi-passenger: 2 seats + 1 seat
    availableSeats: 1, // 1 remaining
    status: 'active',
    passengers: [
      {
        requestId: 'req_hz_1',
        passengerId: 'p_201',
        passengerName: 'Bobur Mirzo',
        passengerPhone: '+998 90 555 66 77',
        passengerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg',
        requestedSeats: 2, // Passenger booked 2 seats for family
        fromStopId: 'stop_hazorasp',
        fromStopName: 'Hazorasp',
        toStopId: 'stop_xiva',
        toStopName: 'Xiva',
        status: 'accepted',
        farePerSeatUzs: 25000,
        totalFareUzs: 50000,
        bookingTime: '13:00'
      },
      {
        requestId: 'req_hz_2',
        passengerId: 'p_202',
        passengerName: 'Madina Karimova',
        passengerPhone: '+998 99 222 33 44',
        passengerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        requestedSeats: 1,
        fromStopId: 'stop_bogot',
        fromStopName: 'Bog\'ot',
        toStopId: 'stop_xiva',
        toStopName: 'Xiva',
        status: 'accepted',
        farePerSeatUzs: 20000,
        totalFareUzs: 20000,
        bookingTime: '13:40'
      }
    ],
    createdAt: '2026-08-21T09:30:00Z'
  },
  {
    id: 'ride_4',
    driverId: 'usr_drv_4',
    driverName: 'Bekzod Karimov',
    driverPhone: '+998 93 505 12 34',
    driverAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg',
    driverRating: 4.6,
    car: {
      model: 'Lacetti',
      plateNumber: '01 K 321 AA',
      color: 'Qora',
      hasAirConditioner: false,
      hasBaggageSpace: true,
      isNonSmoking: false,
      totalSeats: 4
    },
    routeId: 'route_toshkent_baxmal',
    routeName: 'Toshkent → Baxmal',
    fromStopId: 'stop_toshkent',
    fromStopName: 'Toshkent shahri',
    toStopId: 'stop_baxmal',
    toStopName: 'Baxmal tumani',
    departureDate: 'Bugun',
    departureTime: '16:00',
    farePerSeatUzs: 38000,
    totalSeats: 4,
    occupiedSeats: 1,
    availableSeats: 3,
    status: 'scheduled',
    passengers: [],
    createdAt: '2026-08-21T12:00:00Z'
  }
];

export const INITIAL_PASSENGER_REQUESTS: PassengerRideRequest[] = [
  {
    id: 'req_pending_1',
    passengerId: 'p_301',
    passengerName: 'Farhod Olimov',
    passengerPhone: '+998 90 888 77 66',
    passengerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-10.jpg',
    fromStopId: 'stop_toshkent',
    fromStopName: 'Toshkent (Olmazor)',
    toStopId: 'stop_zomin',
    toStopName: 'Zomin tumani',
    seatsCount: 1,
    driverRideId: 'ride_1',
    driverName: 'Dilshod aka',
    carModel: 'Chevrolet Gentra',
    departureTime: '14:30',
    farePerSeatUzs: 35000,
    totalFareUzs: 35000,
    status: 'pending',
    createdAt: '10 daqiqa oldin'
  },
  {
    id: 'req_pending_2',
    passengerId: 'p_302',
    passengerName: 'Nodira & Gulbahor (2 kishi)',
    passengerPhone: '+998 99 765 43 21',
    passengerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
    fromStopId: 'stop_toshkent',
    fromStopName: 'Toshkent (Olmazor)',
    toStopId: 'stop_zomin',
    toStopName: 'Zomin tumani',
    seatsCount: 2, // Requesting 2 seats
    driverRideId: 'ride_1',
    driverName: 'Dilshod aka',
    carModel: 'Chevrolet Gentra',
    departureTime: '14:30',
    farePerSeatUzs: 35000,
    totalFareUzs: 70000,
    status: 'pending',
    createdAt: '5 daqiqa oldin'
  },
  {
    id: 'req_accepted_active',
    passengerId: 'usr_pass_1',
    passengerName: "O'ktam Ahmedov",
    passengerPhone: '+998 90 123 45 67',
    passengerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
    fromStopId: 'stop_toshkent',
    fromStopName: 'Toshkent shahri (Olmazor)',
    toStopId: 'stop_zomin',
    toStopName: 'Zomin tumani',
    seatsCount: 1,
    driverRideId: 'ride_1',
    driverName: 'Dilshod Ergashev',
    carModel: 'Chevrolet Gentra • 01 A 777 AA',
    departureTime: '14:30',
    farePerSeatUzs: 35000,
    totalFareUzs: 35000,
    status: 'accepted',
    createdAt: '1 soat oldin'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Safar tasdiqlandi!',
    message: 'Dilshod aka Toshkent → Zomin yo\'nalishidagi buyurtmangizni qabul qildi. 14:30 da tayyor bo\'ling.',
    type: 'booking',
    timestamp: '10 daqiqa oldin',
    read: false,
    relatedRideId: 'ride_1'
  },
  {
    id: 'notif_2',
    title: 'Yangi yo\'lovchi so\'rovi',
    message: 'Nodira (2 kishi) sizning Toshkent → Zomin safaringizga qo\'shilmoqchi.',
    type: 'booking',
    timestamp: '25 daqiqa oldin',
    read: false,
    relatedRideId: 'ride_1'
  },
  {
    id: 'notif_3',
    title: 'Hamroh xush kelibsiz!',
    message: 'Qishloq va tumanlararo qulay safarlarni biz bilan boshlang.',
    type: 'system',
    timestamp: 'Bugun, 09:00',
    read: true
  }
];
