import LoginForm from "@/src/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Giriş Yap</h1>
          <p className="mt-2 text-sm text-gray-600">
            Hesabınıza erişim sağlayarak biletinizi alın.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
