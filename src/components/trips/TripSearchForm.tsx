"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];

export default function TripSearchForm() {
  const router = useRouter();
  const [from, setFrom] = useState("İstanbul");
  const [to, setTo] = useState("Ankara");
  
  // Bugünün tarihini YYYY-MM-DD formatında alarak varsayılan değer yapalım
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (from === to) {
      alert("Kalkış ve varış yeri aynı olamaz!");
      return;
    }

    // Kullanıcıyı, arama parametreleriyle birlikte sonuçlar sayfasına yönlendir.
    // Örn: /inquiry?from=İstanbul&to=Ankara&date=2025-09-15
    router.push(`/inquiry?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="p-8 bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
    >
      {/* Kalkış Yeri */}
      <div className="col-span-1">
        <label htmlFor="from" className="block text-sm font-medium text-gray-700">
          Nereden
        </label>
        <select
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Varış Yeri */}
      <div className="col-span-1">
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          Nereye
        </label>
        <select
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Tarih */}
      <div className="col-span-1">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Gidiş Tarihi
        </label>
        <input
          type="date"
          id="date"
          value={date}
          min={today} // Geçmiş bir tarihi seçmeyi engeller
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full pl-3 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>

      {/* Arama Butonu */}
      <div className="col-span-1">
        <button
          type="submit"
          className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sefer Ara
        </button>
      </div>
    </form>
  );
}