import { Trip } from "@/src/lib/types";
import Link from "next/link";

type TripCardProps = {
  trip: Trip;
};

export default function TripCard({ trip }: TripCardProps) {
  const availableSeats = trip.seats.filter(seat => !seat.taken).length;

  return (
    <div className="rounded-lg border border-white/10 bg-gray-900/80 backdrop-blur-sm overflow-hidden transition-all hover:border-white/20">
      <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        
        <div className="md:col-span-2">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-lg font-bold text-white">{trip.kalkisYeri}</p>
              <p className="text-sm text-white/60">Kalkış</p>
            </div>
            <div className="text-2xl text-white/30">→</div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{trip.varisYeri}</p>
              <p className="text-sm text-white/60">Varış</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold text-white/90">{trip.tarih}</p>
          <p className="text-sm text-white/60">Tarih</p>
        </div>

        <div className="text-center">
          <p className="font-semibold text-white/90">{availableSeats}</p>
          <p className="text-sm text-white/60">Boş Koltuk</p>
        </div>

        <div className="md:col-span-1 flex flex-col items-center md:items-end space-y-2">
          <p className="text-2xl font-bold text-rose-500">
            {trip.fiyat.toLocaleString("tr-TR")} ₺
          </p>
          <Link 
            href={`/trip-details/${trip.id}`} 
            className="w-full md:w-auto text-center bg-rose-600 text-white font-bold py-2 px-4 rounded-md hover:bg-rose-500 transition-colors"
          >
            Koltuk Seç
          </Link>
        </div>

      </div>
    </div>
  );
}