"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/src/services/apiClient";
import { User } from "@/src/lib/types";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    password: "",
    cinsiyet: "male",
    dogumTarihi: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (Object.values(formData).some(value => value === "")) {
      setError("Lütfen tüm alanları doldurun.");
      setIsLoading(false);
      return;
    }

    try {
      const userData = formData as Omit<User, 'id' | 'createdAt' | 'savedCards'>;
      await createUser(userData);
      alert("Kayıt başarılı! Lütfen giriş yapın.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Kayıt sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500 border border-transparent";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="ad" className="block text-xs font-medium text-white/60 mb-1.5">Ad</label>
          <input id="ad" name="ad" type="text" required className={inputClasses} onChange={handleChange} value={formData.ad} />
        </div>
        <div>
          <label htmlFor="soyad" className="block text-xs font-medium text-white/60 mb-1.5">Soyad</label>
          <input id="soyad" name="soyad" type="text" required className={inputClasses} onChange={handleChange} value={formData.soyad} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-1.5">E-posta</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClasses} onChange={handleChange} value={formData.email} />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs font-medium text-white/60 mb-1.5">Parola</label>
        <input id="password" name="password" type="password" required className={inputClasses} onChange={handleChange} value={formData.password} />
      </div>
       <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cinsiyet" className="block text-xs font-medium text-white/60 mb-1.5">Cinsiyet</label>
            <select id="cinsiyet" name="cinsiyet" required className={inputClasses} onChange={handleChange} value={formData.cinsiyet}>
              <option value="male" className="bg-gray-800">Erkek</option>
              <option value="female" className="bg-gray-800">Kadın</option>
            </select>
          </div>
          <div>
            <label htmlFor="dogumTarihi" className="block text-xs font-medium text-white/60 mb-1.5">Doğum Tarihi</label>
            <input id="dogumTarihi" name="dogumTarihi" type="date" required className={inputClasses} onChange={handleChange} value={formData.dogumTarihi} />
          </div>
       </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50"
        >
          {isLoading ? "Kaydediliyor..." : "Kayıt Ol"}
        </button>
      </div>
    </form>
  );
}