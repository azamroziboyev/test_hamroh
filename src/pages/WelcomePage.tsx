import React from 'react';
import { Navigation, User, Disc } from 'lucide-react';
import { UserRole } from '../types';

interface WelcomePageProps {
  onSelectRole: (role: UserRole) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onSelectRole }) => {
  return (
    <div className="bg-gradient-mesh-welcome min-h-screen w-full flex flex-col justify-between p-6 max-w-md mx-auto">
      {/* Top Info Island (Floating) */}
      <div className="liquid-island rounded-4xl p-6 mt-4 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center animate-in fade-in slide-in-from-top duration-700">
        <div className="w-20 h-20 bg-sky-500/10 rounded-3xl flex items-center justify-center mb-4">
          <Navigation className="w-10 h-10 text-sky-500" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Hamroh Taxi</h1>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          Qishloq va tumanlararo qulay, arzon va ishonchli hamrohlik xizmati.
        </p>
      </div>

      {/* Center Illustration Area */}
      <div className="flex-1 flex items-center justify-center py-6">
        <div className="relative w-full aspect-square max-w-[280px]">
          <div className="absolute inset-0 bg-sky-500/10 blur-3xl rounded-full" />
          <img
            className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_ff09b4c150_2cb553e546734c1e.png"
            alt="Hamroh Taxi Illustration"
          />
        </div>
      </div>

      {/* Action Island (Floating) */}
      <div className="liquid-island rounded-5xl p-5 mb-4 shadow-2xl shadow-slate-300/50 space-y-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-2">
          Kim sifatida davom etasiz?
        </p>

        <div className="grid grid-cols-2 gap-3">
          {/* Yo'lovchi */}
          <button
            onClick={() => onSelectRole('passenger')}
            className="flex flex-col items-center gap-3 p-5 rounded-4xl bg-white shadow-sm border border-slate-100 active:scale-95 transition-all group hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-sky-500 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
              <User className="w-6 h-6" />
            </div>
            <span className="text-sm font-extrabold text-slate-800">Yo'lovchi</span>
          </button>

          {/* Haydovchi */}
          <button
            onClick={() => onSelectRole('driver')}
            className="flex flex-col items-center gap-3 p-5 rounded-4xl bg-white shadow-sm border border-slate-100 active:scale-95 transition-all group hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Disc className="w-6 h-6" />
            </div>
            <span className="text-sm font-extrabold text-slate-800">Haydovchi</span>
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-400 font-medium pt-2">
          Davom etish orqali siz{' '}
          <a href="#" className="text-sky-500 underline hover:text-sky-600">
            shartlarga
          </a>{' '}
          rozilik bildirasiz
        </p>
      </div>
    </div>
  );
};
