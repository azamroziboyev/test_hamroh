import React, { useState } from 'react';
import { DriverRide, Stop } from '../types';
import { FloatingTopBar } from '../components/common/FloatingTopBar';
import { DriverCard } from '../components/passenger/DriverCard';

type SortFilter = 'cheap' | 'near' | 'rating';

interface SearchResultsPageProps {
  originStop: Stop;
  destinationStop: Stop;
  drivers: DriverRide[];
  unreadCount: number;
  onBack: () => void;
  onSelectDriver: (driver: DriverRide) => void;
  onNotificationClick: () => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  originStop,
  destinationStop,
  drivers,
  unreadCount,
  onBack,
  onSelectDriver,
  onNotificationClick,
}) => {
  const [filter, setFilter] = useState<SortFilter>('cheap');

  // Filter & sort driver list
  const sortedDrivers = [...drivers].sort((a, b) => {
    if (filter === 'cheap') {
      return a.farePerSeatUzs - b.farePerSeatUzs;
    }
    if (filter === 'rating') {
      return b.driverRating - a.driverRating;
    }
    // 'near' sorts by earliest departure time
    return a.departureTime.localeCompare(b.departureTime);
  });

  return (
    <div className="bg-gradient-mesh-blue min-h-screen w-full flex flex-col p-4 max-w-md mx-auto">
      {/* Floating Top Bar */}
      <FloatingTopBar
        showBack
        onBack={onBack}
        subtitle={`${originStop.name.split(' ')[0]} → ${destinationStop.name.split(' ')[0]}`}
        title={`${sortedDrivers.length} ta haydovchi`}
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Filter Island */}
      <div className="liquid-island rounded-2xl p-1 mb-4 flex gap-1 shadow-sm">
        <button
          onClick={() => setFilter('cheap')}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
            filter === 'cheap'
              ? 'bg-white shadow-sm text-sky-500 font-extrabold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Arzon
        </button>
        <button
          onClick={() => setFilter('near')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            filter === 'near'
              ? 'bg-white shadow-sm text-sky-500 font-extrabold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Vaqti
        </button>
        <button
          onClick={() => setFilter('rating')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            filter === 'rating'
              ? 'bg-white shadow-sm text-sky-500 font-extrabold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Reyting
        </button>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto hide-scroll space-y-4 pb-10">
        {sortedDrivers.length === 0 ? (
          <div className="liquid-island rounded-4xl p-8 text-center space-y-3">
            <p className="text-sm font-extrabold text-slate-800">Haydovchilar topilmadi</p>
            <p className="text-xs text-slate-400">
              Ushbu yo'nalish bo'yicha hozircha bo'sh joyli haydovchilar yo'q. Keyinroq urinib ko'ring yoki boshqa bekatni tanlang.
            </p>
            <button
              onClick={onBack}
              className="bg-sky-500 text-white text-xs font-bold px-6 py-2.5 rounded-2xl shadow-md uppercase"
            >
              Bekatni o'zgartirish
            </button>
          </div>
        ) : (
          sortedDrivers.map(ride => (
            <DriverCard key={ride.id} ride={ride} onSelect={onSelectDriver} />
          ))
        )}
      </div>
    </div>
  );
};
