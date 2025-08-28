"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { TR_CITIES } from "@/src/lib/cities";

export default function TripSearchForm() {
  const router = useRouter();

  const sortedCities = useMemo(
    () => [...TR_CITIES].sort((a, b) => a.localeCompare(b, "tr")),
    []
  );

  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [date, setDate] = useState<string>(todayIso);

  const canSearch: boolean = !!from && !!to && !!date;
  const sameCity: boolean = !!from && !!to && from === to;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSearch || sameCity) return;
    
    router.push(`/inquiry?from=${from}&to=${to}&date=${date}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-white/10 bg-gray-900/80 p-4 backdrop-blur-sm md:flex-row md:items-end md:gap-6"
    >
      {/* Nereden */}
      <div className="flex-1">
        <label className="mb-1.5 block text-xs font-medium text-white/60">Nereden?</label>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none appearance-none focus:ring-2 focus:ring-rose-500"
          aria-label="Kalkış ili"
          required
        >
          <option value="" disabled hidden>Şehir seçin</option>
          {sortedCities.map((c) => (
            <option key={c} value={c} className="bg-gray-800 text-white">
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Nereye */}
      <div className="flex-1">
        <label className="mb-1.5 block text-xs font-medium text-white/60">Nereye?</label>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none appearance-none focus:ring-2 focus:ring-rose-500"
          aria-label="Varış ili"
          required
        >
          <option value="" disabled hidden>Şehir seçin</option>
          {sortedCities.map((c) => (
            <option key={c} value={c} className="bg-gray-800 text-white">
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Tarih */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/60">Tarih</label>
        <input
          type="date"
          min={todayIso}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-md bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500"
          required
        />
      </div>

      {/* Ara butonu */}
      <div className="flex items-end">
        <button
          type="submit"
          disabled={!canSearch || sameCity}
          className={
            "w-full rounded-md px-6 py-2 font-medium transition-colors md:w-auto " +
            (sameCity
              ? "bg-white/5 text-amber-400 cursor-not-allowed"
              : canSearch
              ? "bg-rose-600 text-white hover:bg-rose-500"
              : "bg-white/5 text-white/40 cursor-not-allowed")
          }
          title={sameCity ? "Kalkış ve varış ili farklı olmalı" : ""}
        >
          Ara
        </button>
      </div>
    </form>
  );
}