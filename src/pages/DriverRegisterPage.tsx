import React, { useState } from 'react';
import { Disc, Phone, Car, ArrowRight, UserCheck, Palette, Hash } from 'lucide-react';
import { FloatingTopBar } from '../components/common/FloatingTopBar';
import { DriverCar } from '../types';

interface DriverRegisterPageProps {
  initialName?: string;
  initialPhone?: string;
  unreadCount: number;
  onBack: () => void;
  onSubmit: (data: {
    name: string;
    phone: string;
    avatarUrl?: string;
    car: DriverCar;
  }) => void;
  onNotificationClick: () => void;
}

export const DriverRegisterPage: React.FC<DriverRegisterPageProps> = ({
  initialName = 'Dilshod Ergashev',
  initialPhone = '+998 90 987 65 43',
  unreadCount,
  onBack,
  onSubmit,
  onNotificationClick,
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [carModel, setCarModel] = useState('Chevrolet Gentra');
  const [carColor, setCarColor] = useState('Qora metallik');
  const [plateNumber, setPlateNumber] = useState('01 A 777 AA');
  const [avatarUrl] = useState(
    'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !carModel.trim() || !plateNumber.trim()) {
      alert("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    onSubmit({
      name,
      phone,
      avatarUrl,
      car: {
        model: carModel,
        color: carColor,
        plateNumber: plateNumber,
        hasAirConditioner: true,
        hasBaggageSpace: true,
        isNonSmoking: true,
        totalSeats: 4,
      },
    });
  };

  return (
    <div className="bg-gradient-mesh-green min-h-screen w-full flex flex-col p-6 max-w-md mx-auto justify-between pb-10">
      {/* Floating Top Bar */}
      <FloatingTopBar
        showBack
        onBack={onBack}
        title="Haydovchi bo'lish"
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Registration Form Island */}
      <div className="flex-1 liquid-island rounded-4xl p-6 shadow-2xl shadow-slate-300/40 space-y-6 overflow-y-auto hide-scroll my-auto">
        <div className="text-center mb-2">
          <h2 className="text-xl font-extrabold text-slate-900">Ma'lumotlarni to'ldiring</h2>
          <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest mt-1">
            Haydovchi sifatida
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Info */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
                Ism familiya
              </label>
              <div className="bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Masalan: Dilshod Ergashev"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 placeholder:text-slate-300 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
                Telefon raqam
              </label>
              <div className="bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="tel"
                  placeholder="+998 90 987 65 43"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 placeholder:text-slate-300 bg-transparent outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Car Info */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
                Avtomobil rusumi
              </label>
              <div className="bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <Car className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Masalan: Chevrolet Gentra"
                  value={carModel}
                  onChange={e => setCarModel(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 placeholder:text-slate-300 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Rangi</label>
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center gap-2 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                  <Palette className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Qora metallik"
                    value={carColor}
                    onChange={e => setCarColor(e.target.value)}
                    className="w-full text-xs font-bold text-slate-800 placeholder:text-slate-300 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
                  Davlat raqami
                </label>
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center gap-2 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                  <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="01 A 777 AA"
                    value={plateNumber}
                    onChange={e => setPlateNumber(e.target.value)}
                    className="w-full text-xs font-bold text-slate-800 placeholder:text-slate-300 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Fixed Bottom Action */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-3xl font-extrabold shadow-xl shadow-emerald-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Boshlash</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
