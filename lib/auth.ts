import { betterAuth } from 'better-auth';
import { expoClient } from '@better-auth/expo/client';

// Server-side auth configuration
export const auth = betterAuth({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  // You can add more plugins and configuration here
  // For example: email/password, social logins, etc.
});

// Export the auth client for use in your app
export const authClient = expoClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  // The scheme must match what's in app.json
  scheme: 'chains',
});

// Type exports for TypeScript
export type Session = typeof auth.$Infer.Session;

