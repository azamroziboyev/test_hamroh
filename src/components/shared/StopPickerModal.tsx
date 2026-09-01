import React, { useState } from 'react';
import { Search, MapPin, Check } from 'lucide-react';
import { Stop } from '../../types';
import { PREDEFINED_STOPS } from '../../constants/routes';
import { ModalSheet } from '../common/ModalSheet';

interface StopPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  selectedStopId?: string;
  onSelectStop: (stop: Stop) => void;
}

export const StopPickerModal: React.FC<StopPickerModalProps> = ({
  isOpen,
  onClose,
  title,
  selectedStopId,
  onSelectStop,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStops = PREDEFINED_STOPS.filter(
    stop =>
      stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stop.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (stop.district && stop.district.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        {/* Search input */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Bekat yoki tuman nomini yozing..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs font-bold text-slate-800 placeholder:text-slate-400 bg-transparent outline-none"
            autoFocus
          />
        </div>

        {/* Popular stops tags */}
        {!searchQuery && (
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Ko'p tanlanadigan bekatlar
            </p>
            <div className="flex flex-wrap gap-2">
              {PREDEFINED_STOPS.filter(s => s.isPopular).map(stop => (
                <button
                  key={stop.id}
                  onClick={() => {
                    onSelectStop(stop);
                    onClose();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedStopId === stop.id
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {stop.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stops list */}
        <div className="space-y-2 max-h-64 overflow-y-auto hide-scroll pt-2">
          {filteredStops.map(stop => {
            const isSelected = selectedStopId === stop.id;
            return (
              <button
                key={stop.id}
                onClick={() => {
                  onSelectStop(stop);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? 'bg-sky-50/80 border-sky-300 text-sky-800'
                    : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold">{stop.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {stop.region} {stop.district ? `• ${stop.district}` : ''}
                    </p>
                  </div>
                </div>

                {isSelected && <Check className="w-4 h-4 text-sky-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </ModalSheet>
  );
};
