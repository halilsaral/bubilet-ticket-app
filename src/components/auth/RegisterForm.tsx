// Dosya Yolu: src/components/auth/RegisterForm.tsx

"use client"; // Bu ifadenin en üstte olması ÇOK ÖNEMLİ!

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
    cinsiyet: "male", // Varsayılan değer
    dogumTarihi: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basit bir kontrol: tüm alanlar dolu mu?
    if (Object.values(formData).some((value) => value === "")) {
      setError("Lütfen tüm alanları doldurun.");
      setIsLoading(false);
      return;
    }

    try {
      // TypeScript'e formData'nın beklediğimiz tiple uyumlu olduğunu "as" ile belirtiyoruz.
      // Bu, hatayı güvenli bir şekilde çözer.
      const userData = formData as Omit<User, "id" | "createdAt">;

      await createUser(userData);

      // Kayıt başarılı olduğunda kullanıcıyı login sayfasına yönlendir.
      alert("Kayıt başarılı! Lütfen giriş yapın.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Kayıt sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="ad"
            className="block text-sm font-medium text-gray-700"
          >
            Ad
          </label>
          <input
            id="ad"
            name="ad"
            type="text"
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
            value={formData.ad}
          />
        </div>
        <div>
          <label
            htmlFor="soyad"
            className="block text-sm font-medium text-gray-700"
          >
            Soyad
          </label>
          <input
            id="soyad"
            name="soyad"
            type="text"
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
            value={formData.soyad}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-posta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Parola
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="cinsiyet"
            className="block text-sm font-medium text-gray-700"
          >
            Cinsiyet
          </label>
          <select
            id="cinsiyet"
            name="cinsiyet"
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
            value={formData.cinsiyet}
          >
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="dogumTarihi"
            className="block text-sm font-medium text-gray-700"
          >
            Doğum Tarihi
          </label>
          <input
            id="dogumTarihi"
            name="dogumTarihi"
            type="date"
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
            value={formData.dogumTarihi}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? "Kaydediliyor..." : "Kayıt Ol"}
        </button>
      </div>
    </form>
  );
}
