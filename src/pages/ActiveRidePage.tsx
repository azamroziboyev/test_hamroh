import React from 'react';
import { PhoneCall, CheckCircle2, AlertCircle, Ban, Users, Clock, Navigation } from 'lucide-react';
import { DriverRide, PassengerRideRequest, UserRole } from '../types';
import { FloatingTopBar } from '../components/common/FloatingTopBar';
import { StatusBadge } from '../components/common/StatusBadge';
import { SeatVisualizer } from '../components/common/SeatVisualizer';
import { PassengerRequestCard } from '../components/driver/PassengerRequestCard';
import { RouteTimeline } from '../components/shared/RouteTimeline';

interface ActiveRidePageProps {
  role: UserRole;
  passengerRequest?: PassengerRideRequest;
  driverRide?: DriverRide;
  pendingRequests?: PassengerRideRequest[];
  unreadCount: number;
  onBack: () => void;
  onCancelPassengerRequest?: (requestId: string) => void;
  onAcceptPassenger?: (request: PassengerRideRequest) => void;
  onDeclinePassenger?: (request: PassengerRideRequest) => void;
  onFinishRide?: (rideId: string) => void;
  onCancelDriverRide?: (rideId: string) => void;
  onNotificationClick: () => void;
}

export const ActiveRidePage: React.FC<ActiveRidePageProps> = ({
  role,
  passengerRequest,
  driverRide,
  pendingRequests = [],
  unreadCount,
  onBack,
  onCancelPassengerRequest,
  onAcceptPassenger,
  onDeclinePassenger,
  onFinishRide,
  onCancelDriverRide,
  onNotificationClick,
}) => {
  const isDriver = role === 'driver';

  return (
    <div
      className={`${
        isDriver ? 'bg-gradient-mesh-green' : 'bg-gradient-mesh-blue'
      } min-h-screen w-full flex flex-col p-4 pb-28 max-w-md mx-auto`}
    >
      {/* Floating Top Bar */}
      <FloatingTopBar
        showBack
        onBack={onBack}
        title={isDriver ? 'Faol Safar Boshqaruvi' : 'Mening Safarim'}
        unreadCount={unreadCount}
        onNotificationClick={onNotificationClick}
      />

      {/* Driver View */}
      {isDriver && driverRide && (
        <div className="flex-1 space-y-4 overflow-y-auto hide-scroll">
          {/* Main Trip Status Card */}
          <div className="liquid-island rounded-4xl p-6 shadow-xl shadow-slate-200/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Yo'nalish
                </p>
                <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                  {driverRide.routeName}
                </h2>
              </div>
              <StatusBadge status={driverRide.status} />
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span className="font-extrabold text-slate-800">
                  {driverRide.departureDate}, {driverRide.departureTime}
                </span>
              </div>
              <span className="font-extrabold text-emerald-600">
                {driverRide.farePerSeatUzs.toLocaleString('uz-UZ')} sum / joy
              </span>
            </div>
          </div>

          {/* Seat Occupancy Visualizer */}
          <div className="liquid-island rounded-4xl p-5 shadow-lg space-y-3">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              Mashina holati va bandlik
            </p>
            <SeatVisualizer
              totalSeats={driverRide.totalSeats}
              occupiedSeats={driverRide.occupiedSeats}
              availableSeats={driverRide.availableSeats}
              passengers={driverRide.passengers}
            />
          </div>

          {/* Pending Passenger Requests to Accept/Reject */}
          {pendingRequests.length > 0 && (
            <div className="liquid-island rounded-3xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                  Yangi so'rovlar ({pendingRequests.length})
                </h3>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">
                  Kutilmoqda
                </span>
              </div>

              <div className="space-y-2.5">
                {pendingRequests.map(req => (
                  <PassengerRequestCard
                    key={req.id}
                    request={req}
                    onAccept={onAcceptPassenger}
                    onDecline={onDeclinePassenger}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Confirmed Passengers List */}
          {driverRide.passengers.length > 0 && (
            <div className="liquid-island rounded-3xl p-5 shadow-lg space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                Qabul qilingan yo'lovchilar ({driverRide.passengers.length})
              </h3>
              <div className="space-y-2">
                {driverRide.passengers.map((p, idx) => (
                  <div
                    key={p.requestId || idx}
                    className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          p.passengerAvatar ||
                          'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
                        }
                        alt={p.passengerName}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-xs font-extrabold text-slate-900">{p.passengerName}</p>
                        <p className="text-[10px] text-slate-400">
                          {p.requestedSeats} ta joy • {p.totalFareUzs.toLocaleString('uz-UZ')} sum
                        </p>
                      </div>
                    </div>

                    <a
                      href={`tel:${p.passengerPhone}`}
                      className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 active:scale-95 transition-all"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trip Finish / Cancel actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {onCancelDriverRide && (
              <button
                onClick={() => onCancelDriverRide(driverRide.id)}
                className="py-4 px-4 rounded-3xl border border-rose-200 bg-rose-50 text-rose-600 text-xs font-extrabold active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Ban className="w-4 h-4" />
                Safarni bekor qilish
              </button>
            )}
            {onFinishRide && (
              <button
                onClick={() => onFinishRide(driverRide.id)}
                className="py-4 px-4 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Safarni yakunlash
              </button>
            )}
          </div>
        </div>
      )}

      {/* Passenger View */}
      {!isDriver && passengerRequest && (
        <div className="flex-1 space-y-4 overflow-y-auto hide-scroll">
          {/* Status Island */}
          <div className="liquid-island rounded-4xl p-6 shadow-xl shadow-slate-200/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  So'rov holati
                </p>
                <h3 className="text-base font-extrabold text-slate-900">
                  {passengerRequest.status === 'accepted'
                    ? 'Safar tasdiqlangan'
                    : 'Haydovchi javobi kutilmoqda'}
                </h3>
              </div>
              <StatusBadge status={passengerRequest.status} />
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-4 space-y-2 border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Haydovchi:</span>
                <span className="font-extrabold text-slate-900">{passengerRequest.driverName}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Avtomobil:</span>
                <span className="font-extrabold text-slate-900">{passengerRequest.carModel}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Band qilingan joy:</span>
                <span className="font-extrabold text-sky-600">
                  {passengerRequest.seatsCount} ta joy
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 font-medium">Jami to'lov:</span>
                <span className="font-extrabold text-slate-900">
                  {(passengerRequest.totalFareUzs || 35000).toLocaleString('uz-UZ')} sum
                </span>
              </div>
            </div>
          </div>

          {/* Route Timeline */}
          <RouteTimeline
            originName={passengerRequest.fromStopName}
            originTime={passengerRequest.departureTime || '14:30'}
            destinationName={passengerRequest.toStopName}
            destinationTime="16:45"
          />

          {/* Passenger action buttons */}
          <div className="space-y-3 pt-2">
            <a
              href="tel:+998909876543"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-3xl font-extrabold shadow-lg shadow-sky-200 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Haydovchiga qo'ng'iroq qilish
            </a>

            {onCancelPassengerRequest && (
              <button
                onClick={() => onCancelPassengerRequest(passengerRequest.id)}
                className="w-full py-4 rounded-3xl bg-white border border-rose-200 text-rose-600 text-xs font-extrabold active:scale-95 transition-all"
              >
                Buyurtmani bekor qilish
              </button>
            )}
          </div>
        </div>
      )}

      {/* Fallback empty view if no active ride */}
      {((isDriver && !driverRide) || (!isDriver && !passengerRequest)) && (
        <div className="flex-1 liquid-island rounded-4xl p-8 flex flex-col items-center justify-center text-center space-y-4 my-auto">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
            <Navigation className="w-8 h-8" />
          </div>
          <h3 className="text-base font-extrabold text-slate-800">Faol safar mavjud emas</h3>
          <p className="text-xs text-slate-400 max-w-xs">
            Sizda hozircha davom etayotgan yoki kutilayotgan safar yo'q. Asosiy ekrandan yangi safar
            tanlang yoki e'lon qiling.
          </p>
          <button
            onClick={onBack}
            className="bg-sky-500 text-white px-6 py-3 rounded-2xl text-xs font-extrabold uppercase shadow-md"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      )}
    </div>
  );
};
