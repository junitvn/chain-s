import { useAbility } from '@/contexts/ability-context';
import { Subjects, Actions } from '@/lib/ability';

/**
 * Hook for easier permission checks
 * Provides convenient methods for checking permissions
 */
export function usePermissions() {
  const ability = useAbility();

  return {
    ability,
    /**
     * Check if user can perform an action on a subject
     */
    can: (action: Actions, subject: Subjects) => {
      return ability.can(action, subject);
    },
    /**
     * Check if user cannot perform an action on a subject
     */
    cannot: (action: Actions, subject: Subjects) => {
      return ability.cannot(action, subject);
    },
    /**
     * Convenience method to check view permission
     */
    canView: (subject: Subjects) => {
      return ability.can('view', subject);
    },
    /**
     * Convenience method to check create permission
     */
    canCreate: (subject: Subjects) => {
      return ability.can('create', subject);
    },
    /**
     * Convenience method to check update permission
     */
    canUpdate: (subject: Subjects) => {
      return ability.can('update', subject);
    },
    /**
     * Convenience method to check delete permission
     */
    canDelete: (subject: Subjects) => {
      return ability.can('delete', subject);
    },
  };
}
