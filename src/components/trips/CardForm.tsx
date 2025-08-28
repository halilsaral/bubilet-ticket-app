"use client";

import { useState } from "react";
import { IMaskInput } from "react-imask";

type CardFormData = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

type CardFormProps = {
  isLoading: boolean;
  onSubmit: (data: CardFormData, saveCard: boolean) => void;
};

export default function CardForm({ isLoading, onSubmit }: CardFormProps) {
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [saveCard, setSaveCard] = useState(true);

  // DEĞİŞİKLİK: react-imask handle metodu farklı çalışır.
  // Değişikliği doğrudan 'unmaskedValue' (maskesiz değer) üzerinden alabiliriz.
  const handleMaskedChange = (value: string, fieldName: keyof CardFormData) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData, saveCard);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Kart Numarası
        </label>
        <IMaskInput
          mask="0000 0000 0000 0000"
          value={formData.cardNumber}
          onAccept={(value) => handleMaskedChange(String(value), "cardNumber")}
          id="cardNumber"
          name="cardNumber"
          placeholder="0000 0000 0000 0000"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700"
          >
            Son Kullanma Tarihi
          </label>
          <IMaskInput
            mask="00/00"
            value={formData.expiryDate}
            onAccept={(value) =>
              handleMaskedChange(String(value), "expiryDate")
            }
            id="expiryDate"
            name="expiryDate"
            placeholder="AA/YY"
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
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
            onChange={handleChange}
            value={formData.cvv}
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          id="saveCard"
          name="saveCard"
          type="checkbox"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-900">
          Kartımı sonraki alışverişler için kaydet
        </label>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? "İşleniyor..." : "Ödemeyi Onayla"}
      </button>
    </form>
  );
}
