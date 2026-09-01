import React from 'react';
import { User, Users, CheckCircle2 } from 'lucide-react';
import { RidePassenger } from '../../types';

interface SeatVisualizerProps {
  totalSeats?: number;
  occupiedSeats?: number;
  availableSeats?: number;
  passengers?: RidePassenger[];
  selectedSeats?: number;
  onSelectSeats?: (seats: number) => void;
  interactive?: boolean;
}

export const SeatVisualizer: React.FC<SeatVisualizerProps> = ({
  totalSeats = 4,
  occupiedSeats = 0,
  availableSeats = 4,
  passengers = [],
  selectedSeats = 1,
  onSelectSeats,
  interactive = false,
}) => {
  return (
    <div className="bg-slate-50/80 rounded-3xl p-4 border border-slate-100/80 space-y-3">
      {/* Header Stat row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-800">Mashina sig'imi</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-bold">
          <span className="text-slate-400">
            Jami: <b className="text-slate-700">{totalSeats}</b>
          </span>
          <span className="text-amber-600">
            Band: <b>{occupiedSeats}</b>
          </span>
          <span className="text-emerald-600">
            Bo'sh: <b>{availableSeats}</b>
          </span>
        </div>
      </div>

      {/* Visual Car Blueprint Grid */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col items-center">
        <div className="w-full max-w-[240px] space-y-2.5">
          {/* Front Row: Driver Seat (left) | Front Passenger (right) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Driver */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 text-slate-500 border border-slate-200/60">
              <div className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center text-[10px] font-extrabold">
                🚗
              </div>
              <span className="text-[10px] font-bold">Haydovchi</span>
            </div>

            {/* Front Passenger Seat 1 */}
            {renderSeatPill(1, occupiedSeats, selectedSeats, interactive, onSelectSeats, passengers)}
          </div>

          {/* Rear Row: Passenger Seats 2, 3, 4 */}
          <div className="grid grid-cols-3 gap-2">
            {renderSeatPill(2, occupiedSeats, selectedSeats, interactive, onSelectSeats, passengers)}
            {renderSeatPill(3, occupiedSeats, selectedSeats, interactive, onSelectSeats, passengers)}
            {renderSeatPill(4, occupiedSeats, selectedSeats, interactive, onSelectSeats, passengers)}
          </div>
        </div>
      </div>

      {/* Interactive Seats count selector if applicable */}
      {interactive && onSelectSeats && (
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-bold text-slate-500">Nechta joy kerak?</span>
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
            {[1, 2, 3, 4].map(num => {
              const disabled = num > availableSeats;
              const active = selectedSeats === num;
              return (
                <button
                  key={num}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelectSeats(num)}
                  className={`w-7 h-7 rounded-lg text-xs font-extrabold transition-all ${
                    disabled
                      ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                      : active
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Passenger occupancy breakdown list */}
      {passengers.length > 0 && (
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            Qabul qilingan yo'lovchilar ({occupiedSeats} ta joy)
          </p>
          <div className="space-y-1">
            {passengers.map((p, idx) => (
              <div
                key={p.requestId || idx}
                className="flex items-center justify-between text-[11px] bg-white p-2 rounded-xl border border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <span className="font-bold text-slate-800">{p.passengerName}</span>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
                  {p.requestedSeats} ta joy
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function renderSeatPill(
  seatIndex: number,
  occupiedCount: number,
  selectedSeats: number,
  interactive: boolean,
  onSelectSeats?: (seats: number) => void,
  passengers: RidePassenger[] = []
) {
  const isOccupied = seatIndex <= occupiedCount;
  // If not occupied, check if within selected seats range
  const isSelected = !isOccupied && seatIndex <= occupiedCount + selectedSeats;

  if (isOccupied) {
    return (
      <div className="flex items-center justify-center p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-bold gap-1">
        <User className="w-3.5 h-3.5" />
        <span>Band</span>
      </div>
    );
  }

  if (isSelected && interactive) {
    return (
      <button
        type="button"
        onClick={() => onSelectSeats && onSelectSeats(Math.max(1, seatIndex - occupiedCount))}
        className="flex items-center justify-center p-2 rounded-xl bg-sky-500 text-white border border-sky-400 text-[10px] font-extrabold gap-1 shadow-sm"
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Tanlandi</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={() => onSelectSeats && onSelectSeats(Math.max(1, seatIndex - occupiedCount))}
      className="flex items-center justify-center p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold gap-1 hover:bg-emerald-100/60 transition-colors"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-500" />
      <span>Bo'sh</span>
    </button>
  );
}
