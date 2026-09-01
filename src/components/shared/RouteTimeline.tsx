import React from 'react';
import { MapPin } from 'lucide-react';
import { Stop } from '../../types';

interface RouteTimelineProps {
  originName: string;
  originDetail?: string;
  originTime?: string;
  destinationName: string;
  destinationDetail?: string;
  destinationTime?: string;
  intermediateStops?: Stop[];
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({
  originName,
  originDetail = 'Bekat / Markaz',
  originTime = '14:30',
  destinationName,
  destinationDetail = 'Tushish joyi / Markaz',
  destinationTime = '16:45',
  intermediateStops = [],
}) => {
  return (
    <div className="liquid-island rounded-3xl p-6 shadow-lg space-y-6">
      <div className="relative pl-7">
        {/* Continuous timeline vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-slate-200 border-l border-dashed border-slate-300" />

        {/* Origin Pickup */}
        <div className="relative mb-7">
          <div className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-white border-4 border-sky-500 shadow-sm" />
          <p className="text-[10px] font-extrabold text-sky-500 uppercase tracking-wider mb-0.5">
            Ketish • {originTime}
          </p>
          <h3 className="text-sm font-extrabold text-slate-900 leading-tight">{originName}</h3>
          <p className="text-[10px] text-slate-400 font-medium">{originDetail}</p>
        </div>

        {/* Optional intermediate stops */}
        {intermediateStops.length > 0 && (
          <div className="space-y-4 my-4 pl-1">
            {intermediateStops.map((stop, i) => (
              <div key={stop.id || i} className="relative flex items-center gap-2 text-slate-500">
                <div className="absolute -left-[24px] w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white" />
                <span className="text-[11px] font-bold">{stop.name}</span>
                {stop.district && (
                  <span className="text-[9px] text-slate-400">({stop.district})</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Destination Arrival */}
        <div className="relative">
          <div className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 shadow-sm" />
          <p className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider mb-0.5">
            Yetib borish • {destinationTime}
          </p>
          <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
            {destinationName}
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">{destinationDetail}</p>
        </div>
      </div>
    </div>
  );
};
