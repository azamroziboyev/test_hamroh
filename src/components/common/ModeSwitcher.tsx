import React from 'react';
import { User, Disc } from 'lucide-react';
import { UserRole } from '../../types';

interface ModeSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentRole, onRoleChange }) => {
  const isPassenger = currentRole === 'passenger';

  return (
    <div className="liquid-island rounded-2xl p-1 mb-4 shadow-md flex items-center transition-all">
      {/* Yo'lovchi */}
      <button
        onClick={() => onRoleChange('passenger')}
        className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 ${
          isPassenger
            ? 'bg-white shadow-sm text-sky-500 font-extrabold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <User className="w-4 h-4" />
        Yo'lovchi
      </button>

      {/* Haydovchi */}
      <button
        onClick={() => onRoleChange('driver')}
        className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 ${
          !isPassenger
            ? 'bg-white shadow-sm text-emerald-600 font-extrabold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Disc className="w-4 h-4" />
        Haydovchi
      </button>
    </div>
  );
};
