"use client";

import { useState, useEffect } from "react";
import { Trip } from "@/src/lib/types";
import { useAuthStore } from "@/src/store/authStore";
import SeatMap from "./SeatMap";
import { useRouter } from "next/navigation";

// 1. ADIM: Doğru prop tipini burada tanımlıyoruz.
type SeatSelectorProps = {
  initialTrip: Trip;
};

// 2. ADIM: Tanımladığımız doğru prop tipini burada kullanıyoruz.
export default function SeatSelector({ initialTrip }: SeatSelectorProps) {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const { user, isAuthenticated } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSelectSeat = (seatNumber: number) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      } else {
        if (prev.length >= 5) {
          alert("En fazla 5 adet koltuk seçebilirsiniz.");
          return prev;
        }
        return [...prev, seatNumber];
      }
    });
  };

  const totalPrice = selectedSeats.length * initialTrip.fiyat;

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Lütfen en az bir koltuk seçin.");
      return;
    }
    router.push("/payment");
  };

  if (!isClient || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-96 text-white">
        Yükleniyor...
      </div>
    );
  }

  // Sayfanın geri kalanı...
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
      {/* Sol Taraf: Koltuk Haritası */}
      <div className="lg:col-span-2 p-6 rounded-lg border border-white/10 bg-gray-900/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6">Koltuk Seçimi</h2>
        <SeatMap
          seats={initialTrip.seats}
          selected={selectedSeats}
          onSelect={handleSelectSeat}
          currentGender={user?.cinsiyet || "other"}
        />
      </div>

      {/* Sağ Taraf: Sefer Özeti ve Fiyat */}
      <div className="lg:col-span-1">
        <div className="p-6 rounded-lg border border-white/10 bg-gray-900/80 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">
            Sefer Özeti
          </h2>
          <div className="space-y-2 text-white/80">
            <p>
              <strong>Nereden:</strong> {initialTrip.kalkisYeri}
            </p>
            <p>
              <strong>Nereye:</strong> {initialTrip.varisYeri}
            </p>
            <p>
              <strong>Tarih:</strong> {initialTrip.tarih}
            </p>
          </div>
          <div className="mt-6 border-t border-white/10 pt-4">
            <h3 className="font-semibold">Seçili Koltuklar</h3>
            <p className="text-white/70 font-mono min-h-[2.5rem]">
              {selectedSeats.sort((a, b) => a - b).join(", ") ||
                "Henüz koltuk seçmediniz."}
            </p>
          </div>
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Toplam Tutar:</span>
              <span className="text-2xl font-bold text-rose-500">
                {totalPrice.toLocaleString("tr-TR")} ₺
              </span>
            </div>
            <button
              onClick={handleContinue}
              className="mt-4 w-full bg-rose-600 text-white font-bold py-2 px-4 rounded-md hover:bg-rose-500 transition-colors"
            >
              Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
