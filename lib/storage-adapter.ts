import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

/**
 * Custom storage adapter for Zustand that uses AsyncStorage (React Native)
 * or localStorage (Web)
 * This provides storage for auth tokens and session data
 */
export const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        // Use localStorage for web platform
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(name);
        }
        return null;
      }
      // Use AsyncStorage for React Native platforms
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.error(`Error getting item ${name} from storage:`, error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        // Use localStorage for web platform
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(name, value);
          return;
        }
        throw new Error('localStorage is not available');
      }
      // Use AsyncStorage for React Native platforms
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.error(`Error setting item ${name} in storage:`, error);
      throw error;
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        // Use localStorage for web platform
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(name);
          return;
        }
        return;
      }
      // Use AsyncStorage for React Native platforms
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.error(`Error removing item ${name} from storage:`, error);
      throw error;
    }
  },
};