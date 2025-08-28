import LoginForm from "@/src/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg border border-white/10 bg-gray-900/80 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Giriş Yap</h1>
          <p className="mt-2 text-sm text-white/60">
            Hesabınıza erişim sağlayarak biletinizi alın.
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-white/60">
          Hesabın yok mu?{" "}
          <Link href="/register" className="font-medium text-rose-500 hover:text-rose-400">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}