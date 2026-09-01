import React, { useState } from 'react';
import { User, Phone, Star, ShieldCheck, Car, Settings as SettingsIcon, LogOut, Check } from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { FloatingTopBar } from '../components/common/FloatingTopBar';
import { ModeSwitcher } from '../components/common/ModeSwitcher';
import { useTelegram } from '../telegram/TelegramContext';

interface ProfilePageProps {
  user: UserProfile;
  unreadCount: number;
  onRoleSwitch: (role: UserRole) => void;
  onOpenSettings: () => void;
  onNotificationClick: () => void;
  onUpdateProfile: (data: Partial<UserProfile>) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  unreadCount,
  onRoleSwitch,
  onOpenSettings,
  onNotificationClick,
  onUpdateProfile,
}) => {
  const { isTelegram, telegramUser } = useTelegram();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = () => {
    onUpdateProfile({ name, phone });
    setIsEditing(false);
  };

  return (
    <div
      className={`${
        user.role === 'driver' ? 'bg-gradient-mesh-green' : 'bg-gradient-mesh-blue'
      } min-h-screen w-full flex flex-col p-4 pb-28 max-w-md mx-auto`}
    >
      {/* Floating Top Bar */}
      <FloatingTopBar
        title="Foydalanuvchi Profili"
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
        rightAction={
          <button
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all"
            aria-label="Sozlamalar"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        }
      />

      {/* Mode Switcher */}
      <ModeSwitcher currentRole={user.role} onRoleChange={onRoleSwitch} />

      <div className="flex-1 space-y-4 overflow-y-auto hide-scroll">
        {/* Profile Card */}
        <div className="liquid-island rounded-4xl p-6 shadow-xl shadow-slate-200/40 text-center space-y-4">
          <div className="relative inline-block mx-auto">
            <img
              src={
                user.avatarUrl ||
                'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
              }
              alt={user.name}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-white shadow-md mx-auto"
            />
            <span
              className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase text-white ${
                user.role === 'driver' ? 'bg-emerald-600' : 'bg-sky-500'
              }`}
            >
              {user.role === 'driver' ? 'Haydovchi' : 'Yo\'lovchi'}
            </span>
          </div>

          <div>
            {isEditing ? (
              <div className="space-y-2 max-w-xs mx-auto">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-center text-sm font-extrabold text-slate-900 bg-white border border-slate-200 rounded-xl p-2 outline-none"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-center text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl p-2 outline-none"
                />
                <button
                  onClick={handleSave}
                  className="w-full bg-emerald-600 text-white text-xs font-extrabold py-2 rounded-xl flex items-center justify-center gap-1 shadow-md"
                >
                  <Check className="w-3.5 h-3.5" /> Saqlash
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-base font-extrabold text-slate-900 leading-tight">{user.name}</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{user.phone}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[10px] font-extrabold text-sky-600 mt-2 underline"
                >
                  Tahrirlash
                </button>
              </>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
            <div className="bg-white/80 p-3 rounded-2xl border border-slate-50">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Reyting</p>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <span className="text-sm font-extrabold text-slate-900">{user.rating || 4.9}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
            </div>
            <div className="bg-white/80 p-3 rounded-2xl border border-slate-50">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Safarlar soni</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                {user.totalTrips || 18} ta
              </p>
            </div>
          </div>
        </div>

        {/* Driver Vehicle Card if Driver */}
        {user.role === 'driver' && user.car && (
          <div className="liquid-island rounded-3xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                  Avtomobil ma'lumotlari
                </h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Model:</span>
                <span className="font-bold text-slate-800">{user.car.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rangi:</span>
                <span className="font-bold text-slate-800">{user.car.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Davlat raqami:</span>
                <span className="font-bold text-slate-800">{user.car.plateNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Joylar soni:</span>
                <span className="font-bold text-slate-800">{user.car.totalSeats} ta joy</span>
              </div>
            </div>
          </div>
        )}

        {/* Telegram WebApp Integration Status Card */}
        <div className="liquid-island rounded-3xl p-4 shadow-sm text-left space-y-2">
          <div className="flex items-center gap-2 text-sky-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-extrabold">Telegram WebApp Integratsiyasi</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {isTelegram
              ? `Ulangan: @${telegramUser?.username || telegramUser?.first_name || 'telegram_user'}`
              : 'Telegram WebApp rejimiga tayyor (FastAPI initData avtorizatsiyasi)'}
          </p>
        </div>
      </div>
    </div>
  );
};
