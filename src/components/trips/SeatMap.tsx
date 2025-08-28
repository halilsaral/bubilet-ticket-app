"use client";

import { memo, useCallback, useMemo } from "react";
import clsx from "clsx";
import { Seat } from "@/src/lib/types";

// Prop tipleri
type SeatMapProps = {
  seats: Seat[];
  selected: number[];
  onSelect: (n: number) => void;
  currentGender: "male" | "female" | "other";
};

type Gender = Seat['gender'] | "other";

function neighborOf(n: number) {
  return n % 2 === 0 ? n - 1 : n + 1;
}

function canSit(
  n: number,
  seats: Seat[],
  currentGender: "male" | "female" | "other"
): { ok: boolean; reason?: string } {
  const seatToSelect = seats.find((x) => x.number === n);
  if (!seatToSelect) return { ok: false };

  if (seatToSelect.taken) {
    return { ok: false, reason: "Bu koltuk zaten dolu." };
  }

  const neighborSeatNumber = neighborOf(n);
  const neighborSeat = seats.find((x) => x.number === neighborSeatNumber);

  if (
    neighborSeat &&
    neighborSeat.taken &&
    neighborSeat.gender
  ) {
    if (currentGender !== "other" && neighborSeat.gender !== currentGender) {
      return {
        ok: false,
        reason:
          "Yan koltuk farklı cinsiyetten bir yolcuya aittir. Bu koltuğu seçemezsiniz.",
      };
    }
  }
  return { ok: true };
}

const SeatButton = memo(function SeatButton({
  n,
  disabled,
  active,
  classNameExtra,
  onClick,
}: {
  n: number;
  disabled: boolean;
  active: boolean;
  classNameExtra?: string;
  onClick: (n: number) => void;
}) {
  const handle = useCallback(() => !disabled && onClick(n), [disabled, onClick, n]);
  return (
    <button
      type="button"
      onClick={handle}
      disabled={disabled}
      className={clsx(
        "w-12 h-12 rounded-md text-sm font-medium transition",
        active && "ring-2 ring-offset-2 ring-indigo-500",
        disabled ? "cursor-not-allowed opacity-80" : "hover:bg-gray-200",
        classNameExtra || "bg-gray-300 text-gray-800"
      )}
    >
      {n}
    </button>
  );
});

export default function SeatMap({ seats, selected, onSelect, currentGender }: SeatMapProps) {
  const rows = useMemo(() => {
    const r: Seat[][] = [];
    for (let i = 0; i < seats.length; i += 4) r.push(seats.slice(i, i + 4));
    return r;
  }, [seats]);

  const handleSelect = useCallback(
    (n: number) => {
      const chk = canSit(n, seats, currentGender);
      if (!chk.ok) {
        if (chk.reason) alert(chk.reason);
        return;
      }
      onSelect?.(n);
    },
    [onSelect, seats, currentGender]
  );

  const takenColor = (g: Gender) =>
    g === "male"
      ? "bg-blue-600 text-white"
      : g === "female"
      ? "bg-pink-600 text-white"
      : "bg-gray-500 text-white/80";

  const renderRow = (row: Seat[]) => {
    return row.map((seat) => {
      const isDisabled = seat.taken;
      const isActive = selected.includes(seat.number);

      const classNameExtra = isDisabled
        ? takenColor(seat.gender)
        : isActive
        ? "bg-green-500 text-white"
        : undefined;

      return (
        <SeatButton
          key={seat.number}
          n={seat.number}
          disabled={isDisabled}
          active={isActive}
          classNameExtra={classNameExtra}
          onClick={handleSelect}
        />
      );
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center justify-center gap-4 md:gap-8">
          <div className="flex gap-2 md:gap-4">{renderRow(row.slice(0, 2))}</div>
          <div className="w-8 text-center text-gray-400 font-mono">{i + 1}</div>
          <div className="flex gap-2 md:gap-4">{renderRow(row.slice(2))}</div>
        </div>
      ))}
    </div>
  );
}