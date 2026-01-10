import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Get authorization headers with token from Zustand store
 */
export function getAuthHeaders(): Record<string, string> {
  const { token } = useAuthStore.getState();
  return {
    'Content-Type': 'application/json',
    'Origin': 'chains://',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * Generic hook for authenticated GET requests
 */
export function useAuthenticatedQuery<TData = unknown>(
  queryKey: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Clear auth on 401
          useAuthStore.getState().clearAuth();
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed: ${response.statusText}`);
      }

      return response.json();
    },
    ...options,
  });
}

/**
 * Generic hook for authenticated mutations (POST, PUT, DELETE, etc.)
 */
export function useAuthenticatedMutation<TData = unknown, TVariables = unknown>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Clear auth on 401
          useAuthStore.getState().clearAuth();
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed: ${response.statusText}`);
      }

      // Handle empty responses
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    },
    ...options,
  });
}