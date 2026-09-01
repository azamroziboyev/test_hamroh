/**
 * Hamroh Taxi - Frontend Application Entry Point
 * 
 * Architecture:
 * - Pure Frontend React 19 + Tailwind CSS + Telegram WebApp SDK ready
 * - Role-based flow: Passenger / Driver with seamless role switching
 * - Multi-passenger seat matching with dynamic capacity tracking
 * - Predefined routes & stops selection
 * - Modular API service layer ready for Python + FastAPI backend integration
 */

import React, { useState, useEffect } from 'react';
import { UserRole, DriverRide, PassengerRideRequest, Stop, UserProfile, NotificationItem } from './types';
import { mockStore } from './mock/mockStore';
import { PREDEFINED_STOPS } from './constants/routes';
import { TelegramProvider } from './telegram/TelegramContext';
import { TelegramService } from './telegram/telegramService';
import { FloatingBottomNav, NavTab } from './components/common/FloatingBottomNav';
import { NotificationsDrawer } from './components/shared/NotificationsDrawer';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { PassengerDashboard } from './pages/PassengerDashboard';
import { DriverDashboard } from './pages/DriverDashboard';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { TripDetailsPage } from './pages/TripDetailsPage';
import { CreateTripPage } from './pages/CreateTripPage';
import { RouteSelectPage } from './pages/RouteSelectPage';
import { PassengerRegisterPage } from './pages/PassengerRegisterPage';
import { DriverRegisterPage } from './pages/DriverRegisterPage';
import { ActiveRidePage } from './pages/ActiveRidePage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export type Screen =
  | 'welcome'
  | 'passenger_register'
  | 'driver_register'
  | 'dashboard'
  | 'route_select'
  | 'search_results'
  | 'trip_details'
  | 'create_trip'
  | 'active_ride'
  | 'profile'
  | 'settings';

export default function App() {
  return (
    <TelegramProvider>
      <HamrohApp />
    </TelegramProvider>
  );
}

function HamrohApp() {
  // Navigation & Screen State
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Core Data from store
  const [role, setRole] = useState<UserRole>(mockStore.getRole());
  const [user, setUser] = useState<UserProfile>(mockStore.getCurrentUser());
  const [rides, setRides] = useState<DriverRide[]>(mockStore.getRides());
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockStore.getNotifications());

  // Search & Selection State
  const [originStop, setOriginStop] = useState<Stop>(PREDEFINED_STOPS[9]); // Toshkent
  const [destinationStop, setDestinationStop] = useState<Stop | null>(PREDEFINED_STOPS[12]); // Zomin
  const [selectedDriverRide, setSelectedDriverRide] = useState<DriverRide | null>(null);

  // Subscribe to store updates for reactive preview
  useEffect(() => {
    const unsubscribe = mockStore.subscribe(() => {
      setRole(mockStore.getRole());
      setUser(mockStore.getCurrentUser());
      setRides([...mockStore.getRides()]);
      setNotifications([...mockStore.getNotifications()]);
    });
    return unsubscribe;
  }, []);

  // Telegram Native BackButton sync
  useEffect(() => {
    const canGoBack = currentScreen !== 'dashboard' && currentScreen !== 'welcome';
    TelegramService.setBackButton(canGoBack, () => {
      handleGoBack();
    });
  }, [currentScreen]);

  // Derived state
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const myPassengerActiveRide = mockStore.getMyPassengerActiveRide();
  const myDriverActiveRide = mockStore.getMyDriverActiveRide();
  const pendingRequestsForDriver = mockStore
    .getMyPassengerRequests()
    .filter(r => r.status === 'pending');

  // Navigation handlers
  const handleGoBack = () => {
    TelegramService.haptic('light');
    if (currentScreen === 'search_results' || currentScreen === 'route_select') {
      setCurrentScreen('dashboard');
    } else if (currentScreen === 'trip_details') {
      setCurrentScreen('search_results');
    } else if (currentScreen === 'create_trip' || currentScreen === 'active_ride' || currentScreen === 'settings') {
      setCurrentScreen('dashboard');
    } else if (currentScreen === 'passenger_register' || currentScreen === 'driver_register') {
      setCurrentScreen('welcome');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    TelegramService.haptic('medium');
    mockStore.setRole(newRole);
    setRole(newRole);
  };

  const handleSelectRoleFromWelcome = (chosenRole: UserRole) => {
    TelegramService.haptic('medium');
    mockStore.setRole(chosenRole);
    setRole(chosenRole);
    if (chosenRole === 'driver') {
      setCurrentScreen('driver_register');
    } else {
      setCurrentScreen('passenger_register');
    }
  };

  const handleTabChange = (tab: NavTab) => {
    TelegramService.haptic('selection');
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('dashboard');
    } else if (tab === 'rides') {
      setCurrentScreen('active_ride');
    } else if (tab === 'chat') {
      // Open notifications or chat drawer
      setIsNotificationsOpen(true);
    } else if (tab === 'profile') {
      setCurrentScreen('profile');
    }
  };

  // Search flow
  const handleStartSearch = (origin: Stop, destination: Stop) => {
    TelegramService.haptic('medium');
    setOriginStop(origin);
    setDestinationStop(destination);
    setCurrentScreen('search_results');
  };

  // Booking action
  const handleBookRide = (ride: DriverRide, seatsCount: number) => {
    TelegramService.haptic('success');
    mockStore.createPassengerBooking(ride.id, seatsCount);
    setCurrentScreen('active_ride');
  };

  // Create Ride action (Driver)
  const handleCreateTrip = (data: {
    fromStop: Stop;
    toStop: Stop;
    departureDate: string;
    departureTime: string;
    totalSeats: number;
    farePerSeatUzs: number;
  }) => {
    TelegramService.haptic('success');
    mockStore.createDriverRide({
      fromStopId: data.fromStop.id,
      fromStopName: data.fromStop.name,
      toStopId: data.toStop.id,
      toStopName: data.toStop.name,
      departureDate: data.departureDate,
      departureTime: data.departureTime,
      totalSeats: data.totalSeats,
      farePerSeatUzs: data.farePerSeatUzs,
      routeName: `${data.fromStop.name.split(' ')[0]} → ${data.toStop.name.split(' ')[0]}`,
    });
    setCurrentScreen('active_ride');
  };

  // Determine whether to show bottom navigation dock
  const showBottomNav =
    currentScreen === 'dashboard' ||
    currentScreen === 'active_ride' ||
    currentScreen === 'profile';

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center text-slate-800">
      <main className="w-full max-w-md min-h-screen relative flex flex-col">
        {/* Screen Switcher */}
        {currentScreen === 'welcome' && (
          <WelcomePage onSelectRole={handleSelectRoleFromWelcome} />
        )}

        {currentScreen === 'passenger_register' && (
          <PassengerRegisterPage
            unreadCount={unreadNotificationsCount}
            onBack={() => setCurrentScreen('welcome')}
            onSubmit={data => {
              TelegramService.haptic('success');
              mockStore.updateProfile({ name: data.name, phone: data.phone, avatarUrl: data.avatarUrl });
              setCurrentScreen('dashboard');
            }}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {currentScreen === 'driver_register' && (
          <DriverRegisterPage
            unreadCount={unreadNotificationsCount}
            onBack={() => setCurrentScreen('welcome')}
            onSubmit={data => {
              TelegramService.haptic('success');
              mockStore.updateProfile({
                name: data.name,
                phone: data.phone,
                avatarUrl: data.avatarUrl,
                car: data.car,
              });
              setCurrentScreen('dashboard');
            }}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {currentScreen === 'dashboard' && role === 'passenger' && (
          <PassengerDashboard
            user={user}
            activeRequest={myPassengerActiveRide}
            originStop={originStop}
            destinationStop={destinationStop}
            unreadCount={unreadNotificationsCount}
            onOpenSearch={() => setCurrentScreen('route_select')}
            onSelectDestination={stopId => {
              const target = PREDEFINED_STOPS.find(s => s.id === stopId) || PREDEFINED_STOPS[12];
              handleStartSearch(originStop, target);
            }}
            onViewActiveRide={() => setCurrentScreen('active_ride')}
            onRoleSwitch={handleRoleSwitch}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {currentScreen === 'dashboard' && role === 'driver' && (
          <DriverDashboard
            user={user}
            activeRide={myDriverActiveRide}
            pendingRequestsCount={pendingRequestsForDriver.length}
            unreadCount={unreadNotificationsCount}
            onCreateTrip={() => setCurrentScreen('create_trip')}
            onViewActiveTrip={() => setCurrentScreen('active_ride')}
            onViewRequests={() => setCurrentScreen('active_ride')}
            onRoleSwitch={handleRoleSwitch}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {currentScreen === 'route_select' && (
          <RouteSelectPage
            originStop={originStop}
            destinationStop={destinationStop}
            unreadCount={unreadNotificationsCount}
            onBack={handleGoBack}
            onSelectRoute={handleStartSearch}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {currentScreen === 'search_results' && destinationStop && (
          <SearchResultsPage
            originStop={originStop}
            destinationStop={destinationStop}
            drivers={rides}
            unreadCount={unreadNotificationsCount}
            onBack={handleGoBack}
            onSelectDriver={driver => {
              setSelectedDriverRide(driver);
              setCurrentScreen('trip_details');
            }}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {currentScreen === 'trip_details' && selectedDriverRide && (
          <TripDetailsPage
            ride={selectedDriverRide}
            unreadCount={unreadNotificationsCount}
            onBack={handleGoBack}
            onBook={handleBookRide}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {currentScreen === 'create_trip' && (
          <CreateTripPage
            unreadCount={unreadNotificationsCount}
            onBack={handleGoBack}
            onSubmit={handleCreateTrip}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {currentScreen === 'active_ride' && (
          <ActiveRidePage
            role={role}
            passengerRequest={myPassengerActiveRide}
            driverRide={myDriverActiveRide}
            pendingRequests={pendingRequestsForDriver}
            unreadCount={unreadNotificationsCount}
            onBack={handleGoBack}
            onCancelPassengerRequest={reqId => {
              TelegramService.haptic('warning');
              mockStore.cancelPassengerRequest(reqId);
            }}
            onAcceptPassenger={req => {
              TelegramService.haptic('success');
              if (myDriverActiveRide) {
                mockStore.acceptPassengerRequest(myDriverActiveRide.id, req.id);
              }
            }}
            onDeclinePassenger={req => {
              TelegramService.haptic('light');
              mockStore.declinePassengerRequest(req.id);
            }}
            onFinishRide={rideId => {
              TelegramService.haptic('success');
              mockStore.finishRide(rideId);
            }}
            onCancelDriverRide={rideId => {
              TelegramService.haptic('warning');
              mockStore.cancelDriverRide(rideId);
            }}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfilePage
            user={user}
            unreadCount={unreadNotificationsCount}
            onRoleSwitch={handleRoleSwitch}
            onOpenSettings={() => setCurrentScreen('settings')}
            onNotificationClick={() => setIsNotificationsOpen(true)}
            onUpdateProfile={updates => {
              TelegramService.haptic('success');
              mockStore.updateProfile(updates);
            }}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsPage
            unreadCount={unreadNotificationsCount}
            onBack={handleGoBack}
            onNotificationClick={() => setIsNotificationsOpen(true)}
          />
        )}

        {/* Global Floating Bottom Navigation */}
        {showBottomNav && (
          <FloatingBottomNav
            activeTab={activeTab}
            onTabChange={handleTabChange}
            role={role}
          />
        )}

        {/* Notification Drawer Sheet */}
        <NotificationsDrawer
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllRead={() => mockStore.markAllNotificationsRead()}
          onSelectNotification={notif => {
            if (notif.relatedRideId) {
              setCurrentScreen('active_ride');
              setIsNotificationsOpen(false);
            }
          }}
        />
      </main>
    </div>
  );
}
