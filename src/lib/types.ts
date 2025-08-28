// Dosya Yolu: src/lib/types.ts

// Bir koltuğun yapısını tanımlar.
export type Seat = {
  number: number;
  taken: boolean;
  gender: "male" | "female" | null;
};

// Bir seferin (trip) yapısını tanımlar.
export type Trip = {
  id: string;
  kalkisYeri: string;
  varisYeri: string;
  tarih: string;
  fiyat: number;
  koltukSayisi: number;
  seats: Seat[];
};

// YENİ: Kayıtlı bir kartın yapısını tanımlar.
export type SavedCard = {
  cardNumber: string;
  expiryDate: string;
};

// Bir kullanıcının yapısını tanımlar.
export type User = {
  id: string;
  createdAt: string;
  ad: string;
  soyad: string;
  email: string;
  password: string;
  cinsiyet: "male" | "female";
  dogumTarihi: string;
  savedCards?: SavedCard[]; // GÜNCELLEME: Kayıtlı kartlar alanı eklendi.
  // Soru işareti (?) bu alanın zorunlu olmadığını belirtir.
};

// Kullanıcı girişi için kullanılacak veri yapısı.
export type UserCredentials = Pick<User, "email" | "password">;
