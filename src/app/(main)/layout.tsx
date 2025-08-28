import React from "react";
import Navbar from "@/src/components/core/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar /> {/* Navbar'ı en üste ekliyoruz */}
      <main className="p-4">
        {" "}
        {/* Sayfa içeriğine biraz boşluk verelim */}
        {children}
      </main>
    </div>
  );
}
