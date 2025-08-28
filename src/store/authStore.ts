import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/src/lib/types';

// State'in yapısını tanımlıyoruz
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Store'umuzu oluşturuyoruz
export const useAuthStore = create<AuthState>()(
  // `persist` middleware'i, state'in `localStorage`'a kaydedilmesini sağlar.
  // Böylece sayfa yenilense bile kullanıcı oturumu açık kalır.
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      // Kullanıcıyı state'e kaydeden ve isAuthenticated durumunu güncelleyen action
      setUser: (user) => set({
        user: user,
        isAuthenticated: !!user,
      }),
      
      // Kullanıcıyı state'ten silen ve oturumu kapatan action
      logout: () => set({
        user: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'auth-storage', // localStorage'daki anahtarın adı
    }
  )
);