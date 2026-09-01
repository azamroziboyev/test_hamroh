import React from 'react';
import { User, Check, X, Phone, MapPin } from 'lucide-react';
import { PassengerRideRequest } from '../../types';

interface PassengerRequestCardProps {
  request: PassengerRideRequest;
  onAccept?: (request: PassengerRideRequest) => void;
  onDecline?: (request: PassengerRideRequest) => void;
}

export const PassengerRequestCard: React.FC<PassengerRequestCardProps> = ({
  request,
  onAccept,
  onDecline,
}) => {
  const isPending = request.status === 'pending';

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3 transition-all">
      {/* Top info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              request.passengerAvatar ||
              'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
            }
            alt={request.passengerName}
            className="w-10 h-10 rounded-2xl object-cover border border-slate-100"
          />
          <div>
            <h4 className="text-xs font-extrabold text-slate-900">{request.passengerName}</h4>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{request.passengerPhone}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-block bg-sky-50 text-sky-600 text-[10px] font-extrabold px-2.5 py-1 rounded-xl">
            {request.seatsCount} ta joy
          </span>
          <p className="text-[10px] font-bold text-slate-700 mt-0.5">
            {(request.totalFareUzs || 0).toLocaleString('uz-UZ')} sum
          </p>
        </div>
      </div>

      {/* Stops route indicator */}
      <div className="bg-slate-50/70 p-2.5 rounded-2xl flex items-center justify-between text-[11px] text-slate-700">
        <div className="flex items-center gap-1.5 truncate">
          <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
          <span className="font-bold truncate">{request.fromStopName}</span>
        </div>
        <span className="text-slate-400 px-1">→</span>
        <div className="flex items-center gap-1.5 truncate">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="font-bold truncate">{request.toStopName}</span>
        </div>
      </div>

      {/* Action buttons if pending */}
      {isPending && onAccept && onDecline && (
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onDecline(request)}
            className="py-2 px-3 rounded-xl border border-rose-100 text-rose-600 bg-rose-50/50 text-[10px] font-extrabold uppercase hover:bg-rose-50 active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Rad etish
          </button>
          <button
            onClick={() => onAccept(request)}
            className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold uppercase shadow-md shadow-emerald-100 active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            Qabul qilish
          </button>
        </div>
      )}
    </div>
  );
};
