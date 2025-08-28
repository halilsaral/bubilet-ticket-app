// Dosya Yolu: src/app/(main)/payment/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import CardForm from "@/src/components/trips/CardForm";
import { updateUser } from "@/src/services/apiClient";
import { SavedCard } from "@/src/lib/types";
import clsx from "clsx";

const Spinner = () => (
  <div className="border-4 border-t-4 border-gray-200 border-t-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
);

// Kart numarasını formatlamak için bir yardımcı fonksiyon
const formatCardNumber = (cardNumber: string) => {
  const cleaned = cardNumber.replace(/\s/g, "");
  return `**** **** **** ${cleaned.slice(-4)}`;
};

export default function PaymentPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { user, setUser } = useAuthStore();
  const [selectedCard, setSelectedCard] = useState<SavedCard | null>(null);

  const handlePayment = async (
    cardData: { cardNumber: string; expiryDate: string; cvv: string },
    saveCard: boolean
  ) => {
    setStatus("loading");

    if (saveCard && user) {
      const newCard: SavedCard = {
        cardNumber: cardData.cardNumber.replace(/\s/g, ""), // Boşlukları temizleyerek kaydet
        expiryDate: cardData.expiryDate,
      };

      const existingCards = user.savedCards || [];
      const isAlreadySaved = existingCards.some(
        (c) => c.cardNumber === newCard.cardNumber
      );

      if (!isAlreadySaved) {
        const updatedCards = [...existingCards, newCard];
        try {
          const updatedUser = await updateUser(user.id, {
            savedCards: updatedCards,
          });
          setUser(updatedUser);
        } catch (error) {
          console.error("Kart kaydedilirken hata oluştu:", error);
        }
      }
    }

    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const isFormLoading = status === "loading";

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {status === "idle" && (
          <>
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Güvenli Ödeme
            </h1>

            {/* --- KAYITLI KARTLARI GÖSTERME BÖLÜMÜ --- */}
            {user?.savedCards && user.savedCards.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">
                  Kayıtlı Kartlarım
                </h3>
                {user.savedCards.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCard(card)}
                    className={clsx(
                      "p-3 border rounded-md cursor-pointer flex justify-between items-center transition-all",
                      selectedCard?.cardNumber === card.cardNumber
                        ? "border-indigo-500 ring-2 ring-indigo-200"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <div>
                      <p className="font-mono font-semibold">
                        {formatCardNumber(card.cardNumber)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Son Kullanma: {card.expiryDate}
                      </p>
                    </div>
                    {selectedCard?.cardNumber === card.cardNumber && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCard(null);
                        }}
                        className="text-xs text-indigo-600 hover:underline"
                      >
                        Yeni Kart Gir
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* --- YENİ KART GİRİŞ FORMU --- */}
            {/* Eğer kayıtlı kart seçilmemişse, yeni kart formu gösterilir */}
            {!selectedCard && (
              <CardForm isLoading={isFormLoading} onSubmit={handlePayment} />
            )}

            {/* Eğer kayıtlı kart seçilmişse, sadece CVV ve ödeme butonu gösterilir */}
            {selectedCard && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Seçili kart ve girilen CVV ile ödeme fonksiyonunu çağır
                  const cvv = (
                    e.currentTarget.elements.namedItem(
                      "cvv"
                    ) as HTMLInputElement
                  ).value;
                  handlePayment({ ...selectedCard, cvv }, false); // Kayıtlı kartı tekrar kaydetme
                }}
                className="space-y-4 pt-4 border-t"
              >
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    name="cvv"
                    type="password"
                    required
                    maxLength={3}
                    placeholder="***"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isFormLoading}
                  className="w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isFormLoading
                    ? "İşleniyor..."
                    : `Ödemeyi Onayla (${formatCardNumber(
                        selectedCard.cardNumber
                      )})`}
                </button>
              </form>
            )}
          </>
        )}

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center space-y-4 h-64">
            <Spinner />
            <p className="text-gray-600">
              Ödemeniz işleniyor, lütfen bekleyin...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center space-y-4 h-64 flex flex-col justify-center items-center">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900">
              Ödeme Başarılı!
            </h2>
            <p className="text-gray-600">
              Biletiniz başarıyla oluşturuldu. İyi yolculuklar dileriz!
            </p>
            <button
              onClick={() => router.push("/")}
              className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
