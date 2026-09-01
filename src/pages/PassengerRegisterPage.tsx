import React, { useState } from 'react';
import { User, Phone, Camera, ArrowRight, UserCheck } from 'lucide-react';
import { FloatingTopBar } from '../components/common/FloatingTopBar';

interface PassengerRegisterPageProps {
  initialName?: string;
  initialPhone?: string;
  unreadCount: number;
  onBack: () => void;
  onSubmit: (data: { name: string; phone: string; avatarUrl?: string }) => void;
  onNotificationClick: () => void;
}

export const PassengerRegisterPage: React.FC<PassengerRegisterPageProps> = ({
  initialName = "O'ktam Ahmedov",
  initialPhone = '+998 90 123 45 67',
  unreadCount,
  onBack,
  onSubmit,
  onNotificationClick,
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [avatarUrl, setAvatarUrl] = useState(
    'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Iltimos, ism va telefon raqamingizni to'liq kiriting");
      return;
    }
    onSubmit({ name, phone, avatarUrl });
  };

  return (
    <div className="bg-gradient-mesh-blue min-h-screen w-full flex flex-col p-6 max-w-md mx-auto justify-between">
      {/* Floating Top Bar */}
      <FloatingTopBar
        showBack
        onBack={onBack}
        title="Ro'yxatdan o'tish"
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Registration Form Island */}
      <div className="flex-1 liquid-island rounded-4xl p-6 shadow-2xl shadow-slate-300/40 space-y-6 overflow-y-auto hide-scroll my-auto">
        <div className="text-center mb-2">
          <h2 className="text-xl font-extrabold text-slate-900">Ma'lumotlarni to'ldiring</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            Yo'lovchi sifatida
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
              Ism familiya
            </label>
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
              <UserCheck className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Masalan: O'ktam Ahmedov"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full text-sm font-bold text-slate-800 placeholder:text-slate-300 bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
              Telefon raqam
            </label>
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
              <Phone className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full text-sm font-bold text-slate-800 placeholder:text-slate-300 bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-20 h-20 rounded-3xl object-cover border-2 border-white shadow-md mb-2"
              />
              <div className="absolute inset-0 bg-black/30 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Telegram profil rasmi</p>
          </div>
        </form>
      </div>

      {/* Fixed Bottom Action */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white py-5 rounded-3xl font-extrabold shadow-xl shadow-sky-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Boshlash</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
