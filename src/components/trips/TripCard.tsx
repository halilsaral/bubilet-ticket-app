import { Trip } from "@/src/lib/types";
import Link from "next/link";

type TripCardProps = {
  trip: Trip;
};

export default function TripCard({ trip }: TripCardProps) {
  // Boş koltuk sayısını `seats` dizisindeki `taken: false` olan elemanları sayarak bulalım.
  const availableSeats = trip.seats.filter(seat => !seat.taken).length;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        
        {/* Güzergah Bilgisi */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">{trip.kalkisYeri}</p>
              <p className="text-sm text-gray-500">Kalkış</p>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">{trip.varisYeri}</p>
              <p className="text-sm text-gray-500">Varış</p>
            </div>
          </div>
        </div>

        {/* Tarih */}
        <div className="text-center">
          <p className="font-semibold text-gray-700">{trip.tarih}</p>
          <p className="text-sm text-gray-500">Tarih</p>
        </div>

        {/* Boş Koltuk */}
        <div className="text-center">
          <p className="font-semibold text-gray-700">{availableSeats}</p>
          <p className="text-sm text-gray-500">Boş Koltuk</p>
        </div>

        {/* Fiyat ve Buton */}
        <div className="md:col-span-1 flex flex-col items-center md:items-end space-y-2">
          <p className="text-2xl font-bold text-indigo-600">
            {trip.fiyat.toLocaleString("tr-TR")} ₺
          </p>
          <Link 
            href={`/trip-details/${trip.id}`} 
            className="w-full text-center bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
          >
            Koltuk Seç
          </Link>
        </div>

      </div>
    </div>
  );
}