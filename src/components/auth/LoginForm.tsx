"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/src/services/apiClient";
import { useAuthStore } from "@/src/store/authStore";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Lütfen tüm alanları doldurun.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await loginUser(formData);
      if (user) {
        setUser(user);
        router.push("/");
      } else {
        setError("E-posta veya parola hatalı.");
      }
    } catch (err: any) {
      setError(err.message || "Giriş sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const inputClasses = "w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500 border border-transparent";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-1.5">E-posta</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClasses} onChange={handleChange} value={formData.email} />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs font-medium text-white/60 mb-1.5">Parola</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClasses} onChange={handleChange} value={formData.password} />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50"
        >
          {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </div>
    </form>
  );
}