import { User } from '@/hooks/use-auth-api';
import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';

// Define subject types that can be checked for permissions
export type Subjects = 
  | 'Ticket'
  | 'TicketSection'
  | 'StoreQuality'
  | 'StoreQualitySection'
  | 'StoreSelector'
  | 'RadarChart'
  | 'TrendChart'
  | 'QualityAction'
  | 'all';

// Define actions that can be performed
export type Actions = 
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'manage'
  | 'read';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

// Define user roles
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  SUPERVISOR = 'supervisor',
  STAFF = 'staff',
  STORE_MANAGER = 'store_manager',
  AREA_MANAGER = 'area_manager',
}

/**
 * Define abilities based on user role and properties
 */
export function defineAbilityFor(user: User | null): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  // If no user, no permissions
  if (!user || !user.isActive) {
    return build();
  }

  const role = user.role.toLowerCase();
  const hasStoreId = !!user.storeId;
  const hasAreaIds = user.areaIds && user.areaIds.length > 0;

  // ADMIN: Full access to everything
  if (role === UserRole.ADMIN) {
    can('manage', 'all');
    return build();
  }

  // AREA_MANAGER: Can view tickets and store quality for assigned areas
  if (role === UserRole.AREA_MANAGER) {
    if (hasAreaIds) {
      can('view', 'TicketSection');
      can('view', 'Ticket');
      can('view', 'StoreQualitySection');
      can('view', 'StoreSelector');
      can('view', 'RadarChart');
      can('view', 'TrendChart');
      can('view', 'QualityAction');
      can('read', 'StoreQuality');
    }
    return build();
  }

  // STORE_MANAGER: Can view tickets and store quality for their store
  if (role === UserRole.STORE_MANAGER) {
    if (hasStoreId) {
      can('view', 'TicketSection');
      can('view', 'Ticket');
      can('view', 'StoreQualitySection');
      can('view', 'StoreSelector');
      can('view', 'RadarChart');
      can('view', 'TrendChart');
      can('view', 'QualityAction');
      can('read', 'StoreQuality');
    }
    return build();
  }

  // MANAGER: Similar to area manager but with additional permissions
  if (role === UserRole.MANAGER) {
    can('view', 'TicketSection');
    can('view', 'Ticket');
    can('view', 'StoreQualitySection');
    can('view', 'StoreSelector');
    can('view', 'RadarChart');
    can('view', 'TrendChart');
    can('view', 'QualityAction');
    can('read', 'StoreQuality');
    can('create', 'Ticket');
    can('update', 'Ticket');
    return build();
  }

  // SUPERVISOR: Can view tickets and limited store quality info
  if (role === UserRole.SUPERVISOR) {
    can('view', 'TicketSection');
    can('view', 'Ticket');
    can('view', 'StoreQualitySection');
    can('view', 'StoreSelector');
    can('view', 'RadarChart');
    // Cannot view trend chart details
    cannot('view', 'TrendChart');
    cannot('view', 'QualityAction');
    can('read', 'StoreQuality');
    return build();
  }

  // STAFF: Limited view access
  if (role === UserRole.STAFF) {
    can('view', 'TicketSection');
    can('view', 'Ticket');
    // Cannot view store quality section
    cannot('view', 'StoreQualitySection');
    cannot('view', 'StoreSelector');
    cannot('view', 'RadarChart');
    cannot('view', 'TrendChart');
    cannot('view', 'QualityAction');
    return build();
  }

  // Default: No permissions for unknown roles
  return build();
}

/**
 * Create an empty ability (no permissions)
 */
export function createEmptyAbility(): AppAbility {
  return createMongoAbility<[Actions, Subjects]>();
}
