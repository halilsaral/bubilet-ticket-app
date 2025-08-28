"use client"; // Global state'i okumak için bu bir client component olmalı.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  
  // Önemli Not: Zustand'ın `persist` özelliği localStorage kullandığı için,
  // sayfa ilk render edildiğinde (server-side) kullanıcı bilgisi hemen mevcut olmaz.
  // Bu state'i bir useEffect içinde senkronize ederek "hydration" hatasını önleriz.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleLogout = () => {
    logout(); // Zustand store'undaki logout fonksiyonunu çağırır.
    router.push("/login"); // Kullanıcıyı login sayfasına yönlendirir.
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo veya Ana Sayfa Linki */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              ProjeSoft Bilet
            </Link>
          </div>

          {/* Sağ Taraftaki Linkler ve Butonlar */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isClient && isAuthenticated ? (
                // Kullanıcı Giriş Yaptıysa
                <>
                  <span className="text-gray-700">Hoş geldin, {user?.ad}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                // Kullanıcı Giriş Yapmadıysa
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/register"
                    className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}