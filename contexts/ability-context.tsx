import React, { createContext, useContext, useMemo } from 'react';
import { AppAbility, defineAbilityFor } from '@/lib/ability';
import { useAuthStore } from '@/stores/auth-store';

interface AbilityContextType {
  ability: AppAbility;
}

const AbilityContext = createContext<AbilityContextType | undefined>(undefined);

/**
 * AbilityProvider: Provides CASL ability instance based on current user
 */
export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuthStore();

  // Create ability instance based on current user
  const ability = useMemo(() => {
    const user = session?.user || null;
    return defineAbilityFor(user);
  }, [session?.user]);

  return (
    <AbilityContext.Provider value={{ ability }}>
      {children}
    </AbilityContext.Provider>
  );
}

/**
 * Hook to access CASL ability instance
 */
export function useAbility() {
  const context = useContext(AbilityContext);
  if (context === undefined) {
    throw new Error('useAbility must be used within an AbilityProvider');
  }
  return context.ability;
}
