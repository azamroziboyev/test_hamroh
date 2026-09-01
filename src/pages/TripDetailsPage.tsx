import React, { useState } from 'react';
import { MessageCircle, Snowflake, Luggage, Ban, PhoneCall, Check } from 'lucide-react';
import { DriverRide } from '../types';
import { FloatingTopBar } from '../components/common/FloatingTopBar';
import { RouteTimeline } from '../components/shared/RouteTimeline';
import { SeatVisualizer } from '../components/common/SeatVisualizer';

interface TripDetailsPageProps {
  ride: DriverRide;
  unreadCount: number;
  onBack: () => void;
  onBook: (ride: DriverRide, seatsCount: number) => void;
  onNotificationClick: () => void;
}

export const TripDetailsPage: React.FC<TripDetailsPageProps> = ({
  ride,
  unreadCount,
  onBack,
  onBook,
  onNotificationClick,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<number>(1);
  const totalCost = ride.farePerSeatUzs * selectedSeats;

  return (
    <div className="bg-gradient-mesh-blue min-h-screen w-full flex flex-col p-4 pb-32 max-w-md mx-auto">
      {/* Floating Top Bar */}
      <FloatingTopBar
        showBack
        onBack={onBack}
        title="Safar tafsilotlari"
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Main Content Area */}
      <div className="flex-1 space-y-4 overflow-y-auto hide-scroll">
        {/* Driver Island */}
        <div className="liquid-island rounded-4xl p-6 shadow-xl shadow-slate-200/40">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={
                ride.driverAvatar ||
                'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
              }
              alt={ride.driverName}
              className="w-16 h-16 rounded-3xl object-cover border-4 border-white shadow-sm"
            />
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                {ride.driverName}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg text-[10px] font-extrabold">
                  {ride.driverRating} ★
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  A'lo darajada
                </span>
              </div>
            </div>
            <a
              href={`tel:${ride.driverPhone}`}
              className="ml-auto w-10 h-10 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-200 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                Avtomobil
              </p>
              <p className="text-xs font-bold text-slate-800">
                {ride.car.model} • {ride.car.plateNumber}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Rangi</p>
              <p className="text-xs font-bold text-slate-800">{ride.car.color}</p>
            </div>
          </div>
        </div>

        {/* Seat Availability & Selection Visualizer */}
        <div className="liquid-island rounded-4xl p-5 shadow-lg space-y-3">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Joylar bandligi va tanlash
          </p>
          <SeatVisualizer
            totalSeats={ride.totalSeats}
            occupiedSeats={ride.occupiedSeats}
            availableSeats={ride.availableSeats}
            passengers={ride.passengers}
            selectedSeats={selectedSeats}
            onSelectSeats={setSelectedSeats}
            interactive={true}
          />
        </div>

        {/* Route Timeline Island */}
        <RouteTimeline
          originName={ride.fromStopName}
          originTime={ride.departureTime}
          destinationName={ride.toStopName}
          destinationTime="16:45"
        />

        {/* Booking Features Island */}
        <div className="liquid-island rounded-3xl p-5 shadow-lg grid grid-cols-3 gap-3 text-center">
          <div className="space-y-2">
            <div
              className={`w-10 h-10 rounded-2xl mx-auto flex items-center justify-center ${
                ride.car.hasAirConditioner
                  ? 'bg-sky-50 text-sky-600'
                  : 'bg-slate-50 text-slate-400'
              }`}
            >
              <Snowflake className="w-5 h-5" />
            </div>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Konditsioner</p>
          </div>
          <div className="space-y-2">
            <div
              className={`w-10 h-10 rounded-2xl mx-auto flex items-center justify-center ${
                ride.car.hasBaggageSpace
                  ? 'bg-sky-50 text-sky-600'
                  : 'bg-slate-50 text-slate-400'
              }`}
            >
              <Luggage className="w-5 h-5" />
            </div>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Yukxona</p>
          </div>
          <div className="space-y-2">
            <div
              className={`w-10 h-10 rounded-2xl mx-auto flex items-center justify-center ${
                ride.car.isNonSmoking ? 'bg-sky-50 text-sky-600' : 'bg-slate-50 text-slate-400'
              }`}
            >
              <Ban className="w-5 h-5" />
            </div>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Chekmaslik</p>
          </div>
        </div>
      </div>

      {/* Bottom Action Island */}
      <div className="fixed bottom-5 left-5 right-5 z-40 max-w-md mx-auto">
        <div className="liquid-island rounded-4xl p-4 shadow-2xl shadow-slate-400/30 flex items-center justify-between border border-white/80">
          <div>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
              Narxi ({selectedSeats} kishi)
            </p>
            <p className="text-xl font-extrabold text-slate-900">
              {totalCost.toLocaleString('uz-UZ')}{' '}
              <span className="text-[10px] font-normal uppercase text-slate-500">uzs</span>
            </p>
          </div>
          <button
            onClick={() => onBook(ride, selectedSeats)}
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-3xl font-extrabold shadow-xl shadow-sky-200 active:scale-[0.98] transition-all"
          >
            Band qilish
          </button>
        </div>
      </div>
    </div>
  );
};
