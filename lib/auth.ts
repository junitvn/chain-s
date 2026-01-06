import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000",
});
