/**
 * Predefined routes and stops for Hamroh Taxi.
 * Matches local travel patterns in regions (Xorazm, Jizzax, Toshkent).
 */

import { Route, Stop } from '../types';

export const PREDEFINED_STOPS: Stop[] = [
  // Xorazm Route stops
  { id: 'stop_hazorasp', name: 'Hazorasp', region: 'Xorazm', district: 'Hazorasp tumani', orderIndex: 1, isPopular: true },
  { id: 'stop_kirop', name: 'Kirop', region: 'Xorazm', district: 'Hazorasp tumani', orderIndex: 2 },
  { id: 'stop_oq_maktab', name: 'Oq Maktab', region: 'Xorazm', district: 'Bog\'ot tumani', orderIndex: 3 },
  { id: 'stop_navoiy', name: 'Navoiy', region: 'Xorazm', district: 'Bog\'ot tumani', orderIndex: 4 },
  { id: 'stop_bogot', name: 'Bog\'ot', region: 'Xorazm', district: 'Bog\'ot tumani', orderIndex: 5, isPopular: true },
  { id: 'stop_yangariq', name: 'Yangariq', region: 'Xorazm', district: 'Yangariq tumani', orderIndex: 6 },
  { id: 'stop_xonqa', name: 'Xonqa', region: 'Xorazm', district: 'Xonqa tumani', orderIndex: 6, isPopular: true },
  { id: 'stop_urganch', name: 'Urganch', region: 'Xorazm', district: 'Urganch shahri', orderIndex: 7, isPopular: true },
  { id: 'stop_xiva', name: 'Xiva', region: 'Xorazm', district: 'Xiva shahri', orderIndex: 7, isPopular: true },

  // Toshkent / Jizzax Route stops
  { id: 'stop_toshkent', name: 'Toshkent shahri (Olmazor)', region: 'Toshkent', district: 'Olmazor', orderIndex: 1, isPopular: true },
  { id: 'stop_guliston', name: 'Guliston shahri', region: 'Sirdaryo', district: 'Guliston', orderIndex: 2 },
  { id: 'stop_jizzax', name: 'Jizzax shahri', region: 'Jizzax', district: 'Jizzax', orderIndex: 3, isPopular: true },
  { id: 'stop_zomin', name: 'Zomin tumani', region: 'Jizzax', district: 'Markaziy bozor', orderIndex: 4, isPopular: true },
  { id: 'stop_baxmal', name: 'Baxmal tumani', region: 'Jizzax', district: 'Baxmal markaz', orderIndex: 4, isPopular: true }
];

export const PREDEFINED_ROUTES: Route[] = [
  {
    id: 'route_hazorasp_xiva',
    name: 'Hazorasp → Bog\'ot → Xiva',
    originStopId: 'stop_hazorasp',
    destinationStopId: 'stop_xiva',
    stops: [
      PREDEFINED_STOPS[0], // Hazorasp
      PREDEFINED_STOPS[1], // Kirop
      PREDEFINED_STOPS[2], // Oq Maktab
      PREDEFINED_STOPS[3], // Navoiy
      PREDEFINED_STOPS[4], // Bog'ot
      PREDEFINED_STOPS[5], // Yangariq
      PREDEFINED_STOPS[8]  // Xiva
    ],
    estimatedDurationMin: 65,
    standardFareUzs: 25000
  },
  {
    id: 'route_hazorasp_urganch',
    name: 'Hazorasp → Bog\'ot → Urganch',
    originStopId: 'stop_hazorasp',
    destinationStopId: 'stop_urganch',
    stops: [
      PREDEFINED_STOPS[0], // Hazorasp
      PREDEFINED_STOPS[1], // Kirop
      PREDEFINED_STOPS[2], // Oq Maktab
      PREDEFINED_STOPS[3], // Navoiy
      PREDEFINED_STOPS[4], // Bog'ot
      PREDEFINED_STOPS[6], // Xonqa
      PREDEFINED_STOPS[7]  // Urganch
    ],
    estimatedDurationMin: 55,
    standardFareUzs: 20000
  },
  {
    id: 'route_toshkent_zomin',
    name: 'Toshkent → Zomin',
    originStopId: 'stop_toshkent',
    destinationStopId: 'stop_zomin',
    stops: [
      PREDEFINED_STOPS[9],  // Toshkent
      PREDEFINED_STOPS[10], // Guliston
      PREDEFINED_STOPS[11], // Jizzax
      PREDEFINED_STOPS[12]  // Zomin
    ],
    estimatedDurationMin: 135,
    standardFareUzs: 35000
  },
  {
    id: 'route_toshkent_baxmal',
    name: 'Toshkent → Baxmal',
    originStopId: 'stop_toshkent',
    destinationStopId: 'stop_baxmal',
    stops: [
      PREDEFINED_STOPS[9],  // Toshkent
      PREDEFINED_STOPS[10], // Guliston
      PREDEFINED_STOPS[11], // Jizzax
      PREDEFINED_STOPS[13]  // Baxmal
    ],
    estimatedDurationMin: 150,
    standardFareUzs: 40000
  }
];

export const POPULAR_DESTINATIONS = [
  { name: 'Zomin', region: 'Jizzax vil.', stopId: 'stop_zomin', count: '12 ta haydovchi' },
  { name: 'Baxmal', region: 'Jizzax vil.', stopId: 'stop_baxmal', count: '8 ta haydovchi' },
  { name: 'Xiva', region: 'Xorazm vil.', stopId: 'stop_xiva', count: '15 ta haydovchi' },
  { name: 'Urganch', region: 'Xorazm vil.', stopId: 'stop_urganch', count: '19 ta haydovchi' }
];
