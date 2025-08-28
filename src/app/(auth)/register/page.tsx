import RegisterForm from "@/src/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Hesap Oluştur</h1>
          <p className="mt-2 text-sm text-gray-600">
            Otobüs biletlerini keşfetmek için bize katılın!
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
