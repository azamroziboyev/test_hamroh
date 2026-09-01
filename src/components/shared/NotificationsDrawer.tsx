import React from 'react';
import { Bell, CheckCheck, Sparkles } from 'lucide-react';
import { NotificationItem } from '../../types';
import { ModalSheet } from '../common/ModalSheet';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification?: (notif: NotificationItem) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification,
}) => {
  return (
    <ModalSheet isOpen={isOpen} onClose={onClose} title="Bildirishnomalar">
      <div className="space-y-4">
        {/* Header action */}
        {notifications.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={onMarkAllRead}
              className="text-[10px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 uppercase"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Barchasini o'qilgan qilish
            </button>
          </div>
        )}

        {/* Notifications list */}
        {notifications.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-500">Yangi xabarlar yo'q</p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto hide-scroll">
            {notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => onSelectNotification && onSelectNotification(notif)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  !notif.read
                    ? 'bg-sky-50/50 border-sky-100 shadow-sm'
                    : 'bg-white border-slate-100 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <h4 className="text-xs font-extrabold text-slate-900">{notif.title}</h4>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold">{notif.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pl-4">{notif.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalSheet>
  );
};
