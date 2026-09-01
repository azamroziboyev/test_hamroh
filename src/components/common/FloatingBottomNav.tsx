import React from 'react';
import { Home, Calendar, Wallet, User as UserIcon, MessageSquare } from 'lucide-react';
import { UserRole } from '../../types';

export type NavTab = 'home' | 'rides' | 'chat' | 'profile';

interface FloatingBottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  role: UserRole;
}

export const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({
  activeTab,
  onTabChange,
  role,
}) => {
  const isDriver = role === 'driver';
  const activeColor = isDriver ? 'text-emerald-600' : 'text-sky-500';

  return (
    <nav className="fixed bottom-5 left-5 right-5 z-40 max-w-lg mx-auto pointer-events-auto">
      <div className="liquid-island rounded-4xl p-1.5 shadow-2xl shadow-slate-400/25 flex items-center justify-between border border-white/70">
        {/* Asosiy */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition-all ${
            activeTab === 'home' ? `${activeColor} font-bold` : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-tight">Asosiy</span>
        </button>

        {/* Safarlar / Reja */}
        <button
          onClick={() => onTabChange('rides')}
          className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition-all ${
            activeTab === 'rides' ? `${activeColor} font-bold` : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-tight">
            {isDriver ? 'Reja' : 'Safarlar'}
          </span>
        </button>

        {/* Xabarlar / Hamyon */}
        <button
          onClick={() => onTabChange('chat')}
          className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition-all ${
            activeTab === 'chat' ? `${activeColor} font-bold` : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {isDriver ? <Wallet className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          <span className="text-[9px] font-bold uppercase tracking-tight">
            {isDriver ? 'Hamyon' : 'Chat'}
          </span>
        </button>

        {/* Profil */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition-all ${
            activeTab === 'profile' ? `${activeColor} font-bold` : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-tight">Profil</span>
        </button>
      </div>
    </nav>
  );
};
