import { Trip, User, UserCredentials } from "../lib/types";

// API adresi
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Bir şeyler ters gitti.");
  }
  return response.json();
}

/**
 * Belirtilen kriterlere göre seferleri arar.
 * @param from Kalkış yeri
 * @param to Varış yeri
 * @param date Sefer tarihi
 * @returns {Promise<Trip[]>} Bulunan seferlerin bir dizisi.
 */
export async function getTrips(
  from: string,
  to: string,
  date: string
): Promise<Trip[]> {
  // MockAPI'nin filtreleme özelliğini kullanıyoruz.
  // Örn: /api/v1/trips?kalkisYeri=İstanbul&varisYeri=Ankara&tarih=2025-09-15
  const response = await fetch(
    `${API_BASE_URL}/trips?kalkisYeri=${from}&varisYeri=${to}&tarih=${date}`
  );
  return handleResponse<Trip[]>(response);
}

/**
 * Belirli bir ID'ye sahip seferin detaylarını getirir.
 * @param id Sefer ID'si
 * @returns {Promise<Trip>} Seferin detayları.
 */
export async function getTripById(id: string): Promise<Trip> {
  const response = await fetch(`${API_BASE_URL}/trips/${id}`);
  return handleResponse<Trip>(response);
}

/**
 * Yeni bir kullanıcı oluşturur (kayıt işlemi).
 * @param userData Kullanıcı bilgileri
 * @returns {Promise<User>} Oluşturulan kullanıcı.
 */
export async function createUser(
  userData: Omit<User, "id" | "createdAt">
): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse<User>(response);
}

/**
 * E-posta ve parola ile kullanıcı girişi yapar.
 * MockAPI'de gerçek bir login endpoint'i olmadığı için,
 * tüm kullanıcıları çekip eşleşme var mı diye kontrol edeceğiz.
 * @param credentials E-posta ve Parola
 * @returns {Promise<User | null>} Eşleşen kullanıcı veya null.
 */
export async function loginUser(
  credentials: UserCredentials
): Promise<User | null> {
  const response = await fetch(
    `${API_BASE_URL}/users?email=${credentials.email}`
  );
  const users = await handleResponse<User[]>(response);

  // E-posta ile eşleşen kullanıcı bulunduysa ve parolası doğruysa kullanıcıyı döndür
  if (users.length > 0 && users[0].password === credentials.password) {
    return users[0];
  }

  return null;
}

/**
 * Bir seferin koltuk bilgilerini günceller.
 * @param tripId Güncellenecek seferin ID'si
 * @param updatedSeats Güncel koltuk dizisi
 * @returns {Promise<Trip>} Güncellenmiş sefer bilgisi.
 */
export async function updateTripSeats(
  tripId: string,
  updatedSeats: Trip["seats"]
): Promise<Trip> {
  const response = await fetch(`${API_BASE_URL}/trips/${tripId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seats: updatedSeats }),
  });
  return handleResponse<Trip>(response);
}

/**
 * Bir kullanıcının bilgilerini günceller (kart eklemek için kullanılacak).
 * @param userId Güncellenecek kullanıcının ID'si
 * @param userData Güncellenecek veri (örn: { savedCards: [...] })
 * @returns {Promise<User>} Güncellenmiş kullanıcı bilgisi.
 */
export async function updateUser(
  userId: string,
  userData: Partial<User>
): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse<User>(response);
}
