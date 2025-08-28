"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/store/authStore";


function clsx(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

const NAV = [
  { href: "/", label: "Ana Sayfa" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuthStore();


  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gray-900/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="inline-block h-2 w-2 rounded-sm bg-rose-500" />
          <span className="text-lg font-semibold tracking-tight text-white">Bubilet</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm transition-colors hover:text-white/90",
                  active ? "text-white" : "text-white/65"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          {isClient && !isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="rounded-md bg-rose-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-500/90"
              >
                Giriş
              </Link>
              <Link
                href="/register"
                className="rounded-md border border-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10"
              >
                Kayıt Ol
              </Link>
            </>
          ) : isClient ? (
            <>
                <span className="text-sm text-white/90">Hoş geldin, {user?.ad}</span>
                <button
                    onClick={handleLogout}
                    className="rounded-md bg-rose-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-500/90"
                    >
                    Çıkış
                </button>
            </>
          ) : null}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:bg-white/10 md:hidden"
          aria-label="Menüyü aç/kapat"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/10 bg-gray-900 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "rounded-md px-2 py-2 text-sm hover:bg-white/5",
                    active ? "text-white" : "text-white/70"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-2 border-t border-white/10 pt-2">
                {isClient && !isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="mt-1 block rounded-md bg-rose-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-rose-500/90"
                  >
                    Giriş
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="mt-2 block rounded-md border border-white/10 px-3 py-2 text-center text-sm font-medium text-white hover:bg-white/10"
                  >
                    Kayıt Ol
                  </Link>
                </>
              ) : isClient ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="mt-1 w-full rounded-md bg-rose-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-rose-500/90"
                >
                  Çıkış
                </button>
              ) : null }
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}