"use client";

import { useState, useEffect } from "react"; // useEffect eklendi
import { Trip } from "@/src/lib/types";
import { useAuthStore } from "@/src/store/authStore";
import SeatMap from "./SeatMap";
import { useRouter } from "next/navigation";

type SeatSelectorProps = {
  initialTrip: Trip;
};

export default function SeatSelector({ initialTrip }: SeatSelectorProps) {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // isAuthenticated ve user state'lerini store'dan alıyoruz
  const { user, isAuthenticated } = useAuthStore();

  // Client-side render olduğunu anlamak için bir state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Eğer bu bileşen tarayıcıda yüklendiğinde kullanıcı giriş yapmamışsa,
    // onu login sayfasına yönlendir.
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSelectSeat = (seatNumber: number) => {
    // ... (bu fonksiyon aynı kalıyor) ...
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

  // Henüz client-side render olmadıysa veya kullanıcı yönlendiriliyorsa, bir yükleme ekranı göster
  if (!isClient || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Kullanıcı giriş yapmışsa, sayfanın geri kalanını render et
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sol Taraf: Koltuk Haritası */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Koltuk Seçimi</h2>
        <SeatMap
          seats={initialTrip.seats}
          selected={selectedSeats}
          onSelect={handleSelectSeat}
          currentGender={user?.cinsiyet || "other"}
        />
      </div>

      {/* Sağ Taraf: Sefer Özeti ve Fiyat */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Sefer Özeti</h2>
          <div className="space-y-2 text-gray-700">
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
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold">Seçili Koltuklar</h3>
            <p className="text-gray-600 font-mono min-h-[2.5rem]">
              {selectedSeats.sort((a, b) => a - b).join(", ") ||
                "Henüz koltuk seçmediniz."}
            </p>
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Toplam Tutar:</span>
              <span className="text-2xl font-bold text-indigo-600">
                {totalPrice.toLocaleString("tr-TR")} ₺
              </span>
            </div>
            <button
              onClick={handleContinue}
              className="mt-4 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
            >
              Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
