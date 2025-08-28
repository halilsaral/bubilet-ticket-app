import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/src/lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(

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