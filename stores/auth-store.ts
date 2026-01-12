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
  testRoleOverride: string | null; // For testing: override user role
  setToken: (token: string | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  setTestRoleOverride: (role: string | null) => void;
  clearAuth: () => void;
  getEffectiveUser: () => User | null; // Returns user with test role override applied
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      session: null,
      isLoading: false,
      testRoleOverride: null,
      setToken: (token) => set({ token }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      setTestRoleOverride: (role) => set({ testRoleOverride: role }),
      clearAuth: () => set({ token: null, session: null, isLoading: false, testRoleOverride: null }),
      getEffectiveUser: () => {
        const state = get();
        if (!state.session?.user) return null;
        
        // If test role override is set, return user with overridden role
        if (state.testRoleOverride) {
          return {
            ...state.session.user,
            role: state.testRoleOverride,
          };
        }
        
        return state.session.user;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      // Only persist token and session, not isLoading or testRoleOverride
      partialize: (state) => ({
        token: state.token,
        session: state.session,
      }),
    }
  )
);