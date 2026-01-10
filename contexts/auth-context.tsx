import { User, useSignIn as useSignInMutation, useSignOut as useSignOutMutation } from '@/hooks/use-auth-api';
import { useAuthStore } from '@/stores/auth-store';
import React, { createContext, useContext } from 'react';

interface Session {
  user: User;
  token: string;
  redirect: boolean;
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuthStore();
  const signInMutation = useSignInMutation();
  const signOutMutation = useSignOutMutation();

  const signIn = async (email: string, password: string) => {
    try {
      await signInMutation.mutateAsync({ email, password });
    } catch (error) {
      // Error is already handled in the mutation
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await signOutMutation.mutateAsync();
    } catch (error) {
      // Error is already handled in the mutation
      throw error;
    }
  };

  // Only show loading state for sign in/sign out mutations, not for session loading
  const isLoading = signInMutation.isPending || signOutMutation.isPending;

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

