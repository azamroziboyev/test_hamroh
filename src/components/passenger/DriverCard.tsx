import React from 'react';
import { Star, Clock } from 'lucide-react';
import { DriverRide } from '../../types';

interface DriverCardProps {
  ride: DriverRide;
  onSelect: (ride: DriverRide) => void;
}

export const DriverCard: React.FC<DriverCardProps> = ({ ride, onSelect }) => {
  return (
    <div className="liquid-island rounded-4xl p-5 shadow-xl shadow-slate-200/40 space-y-4 transition-all hover:shadow-2xl hover:shadow-slate-300/40 active:scale-[0.99]">
      {/* Top row: Avatar, Name, Rating, Price, Seats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              ride.driverAvatar ||
              'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
            }
            alt={ride.driverName}
            className="w-12 h-12 rounded-2xl object-cover border border-white shadow-sm"
          />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
              {ride.driverName}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-bold text-slate-400">
                {ride.driverRating} • {ride.car.model}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs font-extrabold text-slate-900">
            {ride.farePerSeatUzs.toLocaleString('uz-UZ')}{' '}
            <span className="text-[8px] font-normal text-slate-500">sum</span>
          </p>
          <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-tight">
            {ride.availableSeats} ta joy bo'sh
          </p>
        </div>
      </div>

      {/* Bottom row: Departure time pill and Action CTA */}
      <div className="bg-slate-50/60 rounded-2xl p-3.5 flex items-center justify-between border border-slate-100/50">
        <div className="flex items-center gap-2 text-slate-700">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold">{ride.departureTime} da yo'lga chiqadi</span>
        </div>

        <button
          onClick={() => onSelect(ride)}
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-xl text-[10px] font-extrabold uppercase shadow-md shadow-sky-200 active:scale-95 transition-all"
        >
          Tanlash
        </button>
      </div>
    </div>
  );
};
