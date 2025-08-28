import React from "react";
import Navbar from "@/src/components/core/Navbar";
import Footer from "@/src/components/core/Footer"; // 1. Footer'ı import et

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">{children}</main>
      <Footer /> {/* 2. Footer'ı en alta ekle */}
    </div>
  );
}
