import React from 'react';
import { Plus, Star, ChevronRight, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile, DriverRide, PassengerRideRequest } from '../types';
import { FloatingTopBar } from '../components/common/FloatingTopBar';
import { ModeSwitcher } from '../components/common/ModeSwitcher';

interface DriverDashboardProps {
  user: UserProfile;
  activeRide?: DriverRide;
  pendingRequestsCount: number;
  unreadCount: number;
  onCreateTrip: () => void;
  onViewActiveTrip: () => void;
  onViewRequests: () => void;
  onRoleSwitch: (role: 'passenger' | 'driver') => void;
  onNotificationClick: () => void;
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({
  user,
  activeRide,
  pendingRequestsCount,
  unreadCount,
  onCreateTrip,
  onViewActiveTrip,
  onViewRequests,
  onRoleSwitch,
  onNotificationClick,
}) => {
  return (
    <div className="bg-gradient-mesh-green min-h-screen w-full flex flex-col p-4 pb-28 max-w-md mx-auto">
      {/* Floating Header Island */}
      <FloatingTopBar
        title={user.name}
        subtitle="Haydovchi"
        avatarUrl={
          user.avatarUrl ||
          'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
        }
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Mode Switcher Island */}
      <ModeSwitcher currentRole="driver" onRoleChange={onRoleSwitch} />

      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 space-y-4">
        {/* Status & Stats Island */}
        <div className="liquid-island rounded-4xl p-6 shadow-xl shadow-slate-200/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Xizmat holati</p>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-lg font-extrabold text-slate-900">Faol</span>
              </div>
            </div>
            <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-xs font-extrabold">
              Online
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-50 p-4 rounded-3xl shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                Bugungi daromad
              </p>
              <p className="text-lg font-extrabold text-slate-900">
                245,000 <span className="text-[10px] font-normal text-slate-500">sum</span>
              </p>
            </div>
            <div className="bg-white border border-slate-50 p-4 rounded-3xl shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Reyting</p>
              <div className="flex items-center gap-1">
                <p className="text-lg font-extrabold text-slate-900">{user.rating || 4.9}</p>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Island (Create Trip) */}
        <button
          onClick={onCreateTrip}
          className="w-full bg-emerald-600 hover:bg-emerald-700 p-5 rounded-4xl text-white shadow-xl shadow-emerald-200/50 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-extrabold">Yangi safar yaratish</h3>
              <p className="text-[10px] opacity-85 font-medium">Yo'lovchilarni qabul qiling</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Pending Requests Alert if any */}
        {pendingRequestsCount > 0 && (
          <div
            onClick={onViewRequests}
            className="liquid-island rounded-3xl p-4 shadow-lg border border-amber-200/60 bg-amber-50/50 flex items-center justify-between cursor-pointer active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-extrabold text-sm">
                {pendingRequestsCount}
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Yangi yo'lovchi so'rovlari</p>
                <p className="text-[10px] text-amber-700 font-bold">
                  {pendingRequestsCount} ta yo'lovchi safarga qo'shilmoqchi
                </p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold bg-amber-500 text-white px-3 py-1.5 rounded-xl uppercase">
              Ko'rish
            </span>
          </div>
        )}

        {/* Active Trips Island */}
        <div className="liquid-island rounded-3xl p-5 shadow-lg">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">
            Mening rejam
          </h3>
          {activeRide ? (
            <div
              onClick={onViewActiveTrip}
              className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm cursor-pointer active:scale-[0.99] transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {activeRide.departureDate}, {activeRide.departureTime}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                  {activeRide.occupiedSeats}/{activeRide.totalSeats} Joy band
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-extrabold text-slate-800">{activeRide.routeName}</p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {activeRide.availableSeats} ta bo'sh joy qoldi
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 bg-white/60 rounded-2xl border border-slate-50">
              <p className="text-xs font-bold text-slate-500 mb-2">Hozircha rejalashtirilgan safar yo'q</p>
              <button
                onClick={onCreateTrip}
                className="text-[10px] font-extrabold text-emerald-600 uppercase bg-emerald-50 px-3 py-1.5 rounded-xl hover:bg-emerald-100 transition-colors"
              >
                + Safar qo'shish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
