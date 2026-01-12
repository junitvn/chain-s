import { AppAbility, defineAbilityFor } from '@/lib/ability';
import { useAuthStore } from '@/stores/auth-store';
import React, { createContext, useContext, useMemo } from 'react';

interface AbilityContextType {
  ability: AppAbility;
}

const AbilityContext = createContext<AbilityContextType | undefined>(undefined);

/**
 * AbilityProvider: Provides CASL ability instance based on current user
 */
export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { session, testRoleOverride } = useAuthStore();

  // Compute effective user directly (with test role override if set)
  // Use specific dependencies to ensure proper re-calculation
  const effectiveUser = React.useMemo(() => {
    if (!session?.user) return null;
    
    // If test role override is set, return user with overridden role
    if (testRoleOverride) {
      return {
        ...session.user,
        role: testRoleOverride,
      };
    }
    
    return session.user;
  }, [session?.user?.id, session?.user?.role, testRoleOverride]);

  // Create ability instance based on effective user
  const ability = useMemo(() => {
    return defineAbilityFor(effectiveUser);
  }, [effectiveUser]);

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
