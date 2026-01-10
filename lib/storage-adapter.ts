import * as SecureStore from 'expo-secure-store';
import { StateStorage } from 'zustand/middleware';

/**
 * Custom storage adapter for Zustand that uses Expo SecureStore
 * This provides secure storage for sensitive data like auth tokens
 */
export const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch (error) {
      console.error(`Error getting item ${name} from SecureStore:`, error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.error(`Error setting item ${name} in SecureStore:`, error);
      throw error;
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.error(`Error removing item ${name} from SecureStore:`, error);
      throw error;
    }
  },
};