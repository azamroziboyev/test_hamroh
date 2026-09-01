import React, { useState } from 'react';
import { Globe, Bell, Shield, Info, Database, Check } from 'lucide-react';
import { FloatingTopBar } from '../components/common/FloatingTopBar';

interface SettingsPageProps {
  unreadCount: number;
  onBack: () => void;
  onNotificationClick: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  unreadCount,
  onBack,
  onNotificationClick,
}) => {
  const [language, setLanguage] = useState<'uz' | 'ru'>('uz');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="bg-gradient-mesh-blue min-h-screen w-full flex flex-col p-4 pb-28 max-w-md mx-auto">
      {/* Floating Top Bar */}
      <FloatingTopBar
        showBack
        onBack={onBack}
        title="Sozlamalar"
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      <div className="flex-1 space-y-4 overflow-y-auto hide-scroll">
        {/* Language Selection */}
        <div className="liquid-island rounded-3xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-slate-800">
            <Globe className="w-4 h-4 text-sky-500" />
            <h3 className="text-xs font-bold uppercase tracking-widest">Dastur tili</h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLanguage('uz')}
              className={`p-3 rounded-2xl border text-xs font-extrabold flex items-center justify-between transition-all ${
                language === 'uz'
                  ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-100'
              }`}
            >
              <span>O'zbekcha</span>
              {language === 'uz' && <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setLanguage('ru')}
              className={`p-3 rounded-2xl border text-xs font-extrabold flex items-center justify-between transition-all ${
                language === 'ru'
                  ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-100'
              }`}
            >
              <span>Русский</span>
              {language === 'ru' && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="liquid-island rounded-3xl p-5 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Bildirishnomalar</p>
              <p className="text-[10px] text-slate-400">Yangi so'rovlar va yangilanishlar</p>
            </div>
          </div>

          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-12 h-7 rounded-full transition-colors p-1 flex items-center ${
              notificationsEnabled ? 'bg-sky-500 justify-end' : 'bg-slate-200 justify-start'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md" />
          </button>
        </div>

        {/* Backend FastAPI info */}
        <div className="liquid-island rounded-3xl p-5 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-slate-800">
            <Database className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-widest">Backend Integratsiyasi</h3>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Frontend FastAPI REST API arxitekturasiga to'liq moslangan. Barcha so'rovlar /api
            servisi orqali boshqariladi.
          </p>
        </div>

        {/* About & Version */}
        <div className="liquid-island rounded-3xl p-5 shadow-lg text-center space-y-1">
          <p className="text-xs font-extrabold text-slate-800">Hamroh Taxi WebApp</p>
          <p className="text-[10px] text-slate-400">Versiya 1.0.0 (FastAPI-ready frontend)</p>
        </div>
      </div>
    </div>
  );
};
