import React, { useState } from 'react';
import { Circle, MapPin, Building2, Mountain, ArrowRight } from 'lucide-react';
import { Stop } from '../types';
import { FloatingTopBar } from '../components/common/FloatingTopBar';
import { PREDEFINED_STOPS } from '../constants/routes';
import { StopPickerModal } from '../components/shared/StopPickerModal';

interface RouteSelectPageProps {
  originStop: Stop;
  destinationStop: Stop | null;
  unreadCount: number;
  onBack: () => void;
  onSelectRoute: (origin: Stop, destination: Stop) => void;
  onNotificationClick: () => void;
}

export const RouteSelectPage: React.FC<RouteSelectPageProps> = ({
  originStop,
  destinationStop,
  unreadCount,
  onBack,
  onSelectRoute,
  onNotificationClick,
}) => {
  const [currentOrigin, setCurrentOrigin] = useState<Stop>(originStop);
  const [currentDest, setCurrentDest] = useState<Stop | null>(destinationStop);
  const [pickerType, setPickerType] = useState<'origin' | 'dest' | null>(null);

  const handleDestinationClick = (stop: Stop) => {
    setCurrentDest(stop);
    onSelectRoute(currentOrigin, stop);
  };

  return (
    <div className="bg-gradient-mesh-blue min-h-screen w-full flex flex-col p-4 pb-28 max-w-md mx-auto">
      {/* Floating Top Bar */}
      <FloatingTopBar
        showBack
        onBack={onBack}
        title="Manzilni tanlang"
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Main Content Area */}
      <div className="flex-1 space-y-4 overflow-y-auto hide-scroll">
        {/* Search Island */}
        <div className="liquid-island rounded-4xl p-6 shadow-xl shadow-slate-200/40 space-y-4">
          <div className="space-y-4">
            {/* Qayerdan */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">
                Qayerdan
              </label>
              <button
                onClick={() => setPickerType('origin')}
                className="w-full bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 text-left shadow-sm active:scale-[0.99] transition-all"
              >
                <Circle className="w-3.5 h-3.5 fill-sky-500 text-sky-500 shrink-0" />
                <span className="text-sm font-extrabold text-slate-800 truncate">
                  {currentOrigin.name}
                </span>
              </button>
            </div>

            {/* Qayerga */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Qayerga</label>
              <button
                onClick={() => setPickerType('dest')}
                className="w-full bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 text-left shadow-sm active:scale-[0.99] transition-all focus:ring-2 focus:ring-sky-500/20"
              >
                <MapPin className="w-4 h-4 text-emerald-500 fill-emerald-500 shrink-0" />
                <span
                  className={`text-sm font-extrabold truncate ${
                    currentDest ? 'text-slate-800' : 'text-slate-300'
                  }`}
                >
                  {currentDest ? currentDest.name : 'Borish manzilini tanlang...'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Popular Recommendations Island */}
        <div className="liquid-island rounded-3xl p-5 shadow-lg">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Mashhur bekatlar
          </h3>
          <div className="space-y-3">
            {PREDEFINED_STOPS.filter(s => s.id !== currentOrigin.id).map(stop => (
              <button
                key={stop.id}
                onClick={() => handleDestinationClick(stop)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-50 shadow-sm active:scale-[0.98] transition-all hover:shadow-md text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">{stop.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {stop.region} {stop.district ? `• ${stop.district}` : ''}
                    </p>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stop picker modals */}
      <StopPickerModal
        isOpen={pickerType === 'origin'}
        onClose={() => setPickerType(null)}
        title="Qayerdan bekatini tanlang"
        selectedStopId={currentOrigin.id}
        onSelectStop={setCurrentOrigin}
      />

      <StopPickerModal
        isOpen={pickerType === 'dest'}
        onClose={() => setPickerType(null)}
        title="Qayerga bekatini tanlang"
        selectedStopId={currentDest?.id}
        onSelectStop={stop => {
          handleDestinationClick(stop);
          setPickerType(null);
        }}
      />
    </div>
  );
};
