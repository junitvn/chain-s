import { User } from '@/hooks/use-auth-api';
import { secureStorage } from '@/lib/storage-adapter';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Session {
  user: User;
  token: string;
  redirect: boolean;
}

interface AuthState {
  token: string | null;
  session: Session | null;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      session: null,
      isLoading: false,
      setToken: (token) => set({ token }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      clearAuth: () => set({ token: null, session: null, isLoading: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      // Only persist token and session, not isLoading
      partialize: (state) => ({
        token: state.token,
        session: state.session,
      }),
    }
  )
);