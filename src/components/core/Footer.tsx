import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-gray-900/80">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Bubilet
          </p>
          <nav className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="#" className="text-white/70 hover:text-white">
              KVKK
            </Link>
            <Link href="#" className="text-white/70 hover:text-white">
              Gizlilik
            </Link>
            <Link href="#" className="text-white/70 hover:text-white">
              İletişim
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}