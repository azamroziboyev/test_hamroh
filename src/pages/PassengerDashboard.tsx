import React from 'react';
import { Circle, MapPin, Gift, ChevronRight, Sparkles } from 'lucide-react';
import { UserProfile, PassengerRideRequest, Stop } from '../types';
import { FloatingTopBar } from '../components/common/FloatingTopBar';
import { ModeSwitcher } from '../components/common/ModeSwitcher';
import { POPULAR_DESTINATIONS } from '../constants/routes';

interface PassengerDashboardProps {
  user: UserProfile;
  activeRequest?: PassengerRideRequest;
  originStop: Stop;
  destinationStop: Stop | null;
  unreadCount: number;
  onOpenSearch: () => void;
  onSelectDestination: (stopId: string) => void;
  onViewActiveRide: () => void;
  onRoleSwitch: (role: 'passenger' | 'driver') => void;
  onNotificationClick: () => void;
}

export const PassengerDashboard: React.FC<PassengerDashboardProps> = ({
  user,
  activeRequest,
  originStop,
  destinationStop,
  unreadCount,
  onOpenSearch,
  onSelectDestination,
  onViewActiveRide,
  onRoleSwitch,
  onNotificationClick,
}) => {
  return (
    <div className="bg-gradient-mesh-blue min-h-screen w-full flex flex-col p-4 pb-28 max-w-md mx-auto">
      {/* Floating Header Island */}
      <FloatingTopBar
        title={`Salom, ${user.name.split(' ')[0]}!`}
        subtitle="Yo'lovchi"
        avatarUrl={
          user.avatarUrl ||
          'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
        }
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Mode Switcher Island */}
      <ModeSwitcher currentRole="passenger" onRoleChange={onRoleSwitch} />

      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 space-y-4">
        {/* Active Ride Banner if user has active/pending booking */}
        {activeRequest && (
          <div
            onClick={onViewActiveRide}
            className="liquid-island rounded-3xl p-4 shadow-lg border border-sky-200/60 bg-gradient-to-r from-sky-500/10 to-emerald-500/10 cursor-pointer active:scale-[0.99] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg bg-sky-500 text-white">
                {activeRequest.status === 'pending' ? 'Kutilmoqda...' : 'Faol safar'}
              </span>
              <span className="text-xs font-extrabold text-slate-700">
                {activeRequest.departureTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-900">
                  {activeRequest.fromStopName} → {activeRequest.toStopName}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {activeRequest.driverName} • {activeRequest.seatsCount} ta joy
                </p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-sky-600">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Search Island */}
        <div className="liquid-island rounded-4xl p-6 shadow-xl shadow-slate-200/40">
          <h2 className="text-lg font-extrabold text-slate-900 mb-4">Qayerga boramiz?</h2>
          <div className="space-y-3">
            {/* Qayerdan */}
            <button
              onClick={onOpenSearch}
              className="w-full bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 text-left shadow-sm active:scale-[0.98] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                <Circle className="w-3.5 h-3.5 fill-current" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Qayerdan
                </p>
                <p className="text-sm font-bold text-slate-800">{originStop.name}</p>
              </div>
            </button>

            {/* Qayerga */}
            <button
              onClick={onOpenSearch}
              className="w-full bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 text-left shadow-sm active:scale-[0.98] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Qayerga
                </p>
                <p className={`text-sm font-bold ${destinationStop ? 'text-slate-800' : 'text-slate-300'}`}>
                  {destinationStop ? destinationStop.name : 'Manzilni tanlang...'}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent / Popular Destinations Island */}
        <div className="liquid-island rounded-3xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
              Mashhur yo'nalishlar
            </h3>
            <button
              onClick={onOpenSearch}
              className="text-[10px] font-bold text-sky-500 uppercase tracking-wider"
            >
              Hammasi
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {POPULAR_DESTINATIONS.map(dest => (
              <button
                key={dest.stopId}
                onClick={() => onSelectDestination(dest.stopId)}
                className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm text-left active:bg-slate-50 transition-all hover:shadow-md"
              >
                <p className="text-sm font-bold text-slate-800">{dest.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{dest.region}</p>
                <p className="text-[9px] text-sky-600 font-bold mt-1">{dest.count}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Promo / Banner Island */}
        <div className="bg-sky-500 rounded-3xl p-5 text-white shadow-xl shadow-sky-200/50 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">
              Yangi imkoniyat
            </p>
            <h4 className="text-lg font-extrabold mb-2">Do'stlaringizni taklif qiling!</h4>
            <p className="text-xs opacity-90 leading-relaxed mb-4">
              Har bir taklif uchun maxsus bonuslarga ega bo'ling.
            </p>
            <button className="bg-white text-sky-500 hover:bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase shadow-sm active:scale-95 transition-all">
              Taklif qilish
            </button>
          </div>
          <Gift className="w-24 h-24 absolute -right-3 -bottom-3 opacity-15" />
        </div>
      </div>
    </div>
  );
};
