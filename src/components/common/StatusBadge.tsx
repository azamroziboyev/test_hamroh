import React from 'react';
import { RequestStatus, RideStatus } from '../../types';

interface StatusBadgeProps {
  status: RequestStatus | RideStatus;
  labelOverride?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, labelOverride }) => {
  let colorStyles = 'bg-slate-100 text-slate-600 border-slate-200';
  let label = labelOverride || status;

  switch (status) {
    case 'pending':
      colorStyles = 'bg-amber-50 text-amber-600 border-amber-200/60';
      label = labelOverride || 'Kutilmoqda';
      break;
    case 'accepted':
      colorStyles = 'bg-emerald-50 text-emerald-600 border-emerald-200/60';
      label = labelOverride || 'Qabul qilindi';
      break;
    case 'active':
      colorStyles = 'bg-sky-50 text-sky-600 border-sky-200/60';
      label = labelOverride || 'Faol safar';
      break;
    case 'completed':
      colorStyles = 'bg-slate-100 text-slate-700 border-slate-200';
      label = labelOverride || 'Yakunlandi';
      break;
    case 'declined':
      colorStyles = 'bg-rose-50 text-rose-600 border-rose-200/60';
      label = labelOverride || 'Rad etildi';
      break;
    case 'cancelled':
      colorStyles = 'bg-rose-50 text-rose-500 border-rose-200/60';
      label = labelOverride || 'Bekor qilindi';
      break;
    case 'scheduled':
      colorStyles = 'bg-indigo-50 text-indigo-600 border-indigo-200/60';
      label = labelOverride || 'Rejalashtirilgan';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-extrabold border ${colorStyles}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
};
