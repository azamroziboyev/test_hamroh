import React, { useState } from 'react';
import { Circle, MapPin, Minus, Plus, Send } from 'lucide-react';
import { Stop } from '../types';
import { FloatingTopBar } from '../components/common/FloatingTopBar';
import { PREDEFINED_STOPS } from '../constants/routes';
import { StopPickerModal } from '../components/shared/StopPickerModal';

interface CreateTripPageProps {
  unreadCount: number;
  onBack: () => void;
  onSubmit: (data: {
    fromStop: Stop;
    toStop: Stop;
    departureDate: string;
    departureTime: string;
    totalSeats: number;
    farePerSeatUzs: number;
  }) => void;
  onNotificationClick: () => void;
}

export const CreateTripPage: React.FC<CreateTripPageProps> = ({
  unreadCount,
  onBack,
  onSubmit,
  onNotificationClick,
}) => {
  const [fromStop, setFromStop] = useState<Stop>(PREDEFINED_STOPS[0]); // Hazorasp / Toshkent
  const [toStop, setToStop] = useState<Stop>(PREDEFINED_STOPS[8]); // Xiva / Zomin
  const [departureDate, setDepartureDate] = useState('Bugun');
  const [departureTime, setDepartureTime] = useState('14:30');
  const [totalSeats, setTotalSeats] = useState(4);
  const [farePerSeatUzs, setFarePerSeatUzs] = useState(35000);

  // Modal pickers
  const [pickerMode, setPickerMode] = useState<'from' | 'to' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fromStop,
      toStop,
      departureDate,
      departureTime,
      totalSeats,
      farePerSeatUzs,
    });
  };

  return (
    <div className="bg-gradient-mesh-green min-h-screen w-full flex flex-col p-4 pb-32 max-w-md mx-auto">
      {/* Floating Top Bar */}
      <FloatingTopBar
        showBack
        onBack={onBack}
        title="Safar yaratish"
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Form Content Area */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-4 overflow-y-auto hide-scroll">
        {/* Route Island */}
        <div className="liquid-island rounded-4xl p-6 shadow-xl shadow-slate-200/40 space-y-4">
          <div className="space-y-4">
            {/* Qayerdan */}
            <div
              onClick={() => setPickerMode('from')}
              className="flex items-center gap-4 cursor-pointer active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
                <Circle className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="flex-1 border-b border-slate-100 pb-2">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                  Qayerdan
                </p>
                <p className="text-sm font-extrabold text-slate-800">{fromStop.name}</p>
              </div>
            </div>

            {/* Qayerga */}
            <div
              onClick={() => setPickerMode('to')}
              className="flex items-center gap-4 cursor-pointer active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-5 h-5 fill-current" />
              </div>
              <div className="flex-1">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                  Qayerga
                </p>
                <p className="text-sm font-extrabold text-slate-800">{toStop.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Time & Date Island */}
        <div className="grid grid-cols-2 gap-4">
          <div className="liquid-island rounded-3xl p-4 shadow-lg text-center">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Sana
            </p>
            <select
              value={departureDate}
              onChange={e => setDepartureDate(e.target.value)}
              className="text-sm font-extrabold text-slate-800 bg-transparent outline-none text-center cursor-pointer"
            >
              <option value="Bugun">Bugun</option>
              <option value="Ertaga">Ertaga</option>
              <option value="24-Oktabr">24-Oktabr</option>
              <option value="25-Oktabr">25-Oktabr</option>
            </select>
          </div>
          <div className="liquid-island rounded-3xl p-4 shadow-lg text-center">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Vaqt
            </p>
            <input
              type="time"
              value={departureTime}
              onChange={e => setDepartureTime(e.target.value)}
              className="text-sm font-extrabold text-slate-800 bg-transparent outline-none text-center cursor-pointer"
            />
          </div>
        </div>

        {/* Seats & Price Island */}
        <div className="liquid-island rounded-4xl p-6 shadow-xl space-y-6">
          {/* Seats counter */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-slate-900">Bo'sh joylar</p>
              <p className="text-[10px] text-slate-400">Mavjud yo'lovchi o'rinlari</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setTotalSeats(Math.max(1, totalSeats - 1))}
                className="w-10 h-10 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-extrabold text-slate-900 w-4 text-center">
                {totalSeats}
              </span>
              <button
                type="button"
                onClick={() => setTotalSeats(Math.min(6, totalSeats + 1))}
                className="w-10 h-10 rounded-2xl border border-emerald-200 bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Price input */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-slate-900">Narx (joy boshiga)</p>
              <p className="text-[10px] text-slate-400">O'rtacha 30,000 - 45,000 uzs</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl flex items-center gap-1">
              <input
                type="number"
                step="5000"
                value={farePerSeatUzs}
                onChange={e => setFarePerSeatUzs(Number(e.target.value))}
                className="w-24 text-right font-extrabold text-slate-900 bg-transparent outline-none text-sm"
              />
              <span className="text-[10px] font-bold text-slate-400">uzs</span>
            </div>
          </div>
        </div>
      </form>

      {/* Bottom Action Island */}
      <div className="fixed bottom-5 left-5 right-5 z-40 max-w-md mx-auto">
        <button
          onClick={handleSubmit}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-4xl font-extrabold shadow-xl shadow-emerald-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Safarni e'lon qilish</span>
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Stop picker modal sheets */}
      <StopPickerModal
        isOpen={pickerMode === 'from'}
        onClose={() => setPickerMode(null)}
        title="Ketish bekatini tanlang"
        selectedStopId={fromStop.id}
        onSelectStop={setFromStop}
      />
      <StopPickerModal
        isOpen={pickerMode === 'to'}
        onClose={() => setPickerMode(null)}
        title="Borish bekatini tanlang"
        selectedStopId={toStop.id}
        onSelectStop={setToStop}
      />
    </div>
  );
};
