import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';

interface FloatingTopBarProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  onNotificationClick?: () => void;
  unreadCount?: number;
  avatarUrl?: string;
  roleBadge?: string;
  rightAction?: React.ReactNode;
}

export const FloatingTopBar: React.FC<FloatingTopBarProps> = ({
  title,
  subtitle,
  onBack,
  showBack = false,
  onNotificationClick,
  unreadCount = 0,
  avatarUrl,
  roleBadge,
  rightAction,
}) => {
  return (
    <header className="liquid-island rounded-3xl p-3 mb-4 shadow-lg shadow-slate-200/50 flex items-center justify-between sticky top-0 z-40 transition-all">
      {/* Left side */}
      <div className="flex items-center gap-3 pl-1">
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all"
            aria-label="Orqaga"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-10 h-10 rounded-2xl object-cover border-2 border-white shadow-sm"
          />
        )}

        <div className="text-left">
          {subtitle && (
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
              {subtitle}
            </p>
          )}
          {title && (
            <h1 className="text-sm font-extrabold text-slate-800 tracking-tight leading-snug">
              {title}
            </h1>
          )}
          {roleBadge && (
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
              {roleBadge}
            </p>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {rightAction}

        {onNotificationClick && (
          <button
            onClick={onNotificationClick}
            className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 relative active:scale-95 transition-all"
            aria-label="Bildirishnomalar"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </button>
        )}
      </div>
    </header>
  );
};
