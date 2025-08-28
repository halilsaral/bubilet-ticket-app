import RegisterForm from "@/src/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg border border-white/10 bg-gray-900/80 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Hesap Oluştur</h1>
          <p className="mt-2 text-sm text-white/60">
            Otobüs biletlerini keşfetmek için bize katılın!
          </p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-white/60">
          Zaten bir hesabın var mı?{" "}
          <Link
            href="/login"
            className="font-medium text-rose-500 hover:text-rose-400"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
