import { Session, useAuthStore } from '@/stores/auth-store';
import { getApiBaseUrl } from '@/utils/api-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = getApiBaseUrl();
const ORIGIN = process.env.EXPO_PUBLIC_ORIGIN || 'https://qaqc-frontend.vercel.app';

interface SignInRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  role: string;
  language: string;
  storeId: string | null;
  areaIds: string[];
  isActive: boolean;
}

type SignInResponse = Session;

// Sign in mutation
export function useSignIn() {
  const { setToken, setSession } = useAuthStore();

  console.log("🚀 ~ useSignIn ~ API_BASE_URL:", API_BASE_URL)
  return useMutation({
    mutationFn: async (credentials: SignInRequest): Promise<SignInResponse> => {
      const response = await fetch(`${API_BASE_URL}/api/auth/sign-in/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': ORIGIN,
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Sign in failed: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: (data: SignInResponse) => {
      // Extract token from response
      if (data.token) {
        setToken(data.token);
      }

      // Store session with user data
      if (data.user) {
        setSession({
          user: data.user,
          token: data.token,
          redirect: data.redirect,
        });
      }
    },
    onError: (error) => {
      console.error('Sign in error:', error);
    },
  });
}

// Sign out mutation
export function useSignOut() {
  const queryClient = useQueryClient();
  const { clearAuth, token } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': ORIGIN,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          // Even if sign out fails on server, clear local auth
          throw new Error('Failed to sign out');
        }

        return response.json();
      } catch (error) {
        // Clear auth even if API call fails
        console.error('Sign out error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Clear auth state (token and session from Zustand persist)
      clearAuth();
      // Clear all queries
      queryClient.clear();
    },
    onError: () => {
      // Clear auth state even on error (token and session from Zustand persist)
      clearAuth();
      queryClient.clear();
    },
  });
}