import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CustomHeader } from '@/components/custom-header';
import { UserRole } from '@/lib/ability';
import { BorderRadius, NeutralColors, SemanticColors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

// Role display information
const ROLE_INFO: Record<string, { label: string; description: string; color: string }> = {
  [UserRole.ADMIN]: {
    label: 'Admin',
    description: 'Full access to everything',
    color: SemanticColors.error,
  },
  [UserRole.MANAGER]: {
    label: 'Manager',
    description: 'View tickets & quality, create/update tickets',
    color: SemanticColors.warning,
  },
  [UserRole.AREA_MANAGER]: {
    label: 'Area Manager',
    description: 'View tickets & quality for assigned areas',
    color: SemanticColors.info,
  },
  [UserRole.STORE_MANAGER]: {
    label: 'Store Manager',
    description: 'View tickets & quality for their store',
    color: SemanticColors.info,
  },
  [UserRole.SUPERVISOR]: {
    label: 'Supervisor',
    description: 'View tickets, limited quality (no trend chart)',
    color: SemanticColors.warning,
  },
  [UserRole.STAFF]: {
    label: 'Staff',
    description: 'View tickets only, no quality section',
    color: NeutralColors.gray500,
  },
};

export default function RoleSwitcherScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { session, testRoleOverride, setTestRoleOverride, getEffectiveUser } = useAuthStore();
  
  // Sync selected role with store
  const effectiveUser = getEffectiveUser();
  const currentRole = effectiveUser?.role || 'none';
  const selectedRole = testRoleOverride || session?.user?.role || null;

  const handleRoleSelect = (role: string) => {
    // Only set override if it's different from the original role
    if (role === session?.user?.role) {
      setTestRoleOverride(null);
    } else {
      setTestRoleOverride(role);
    }
  };

  const handleReset = () => {
    setTestRoleOverride(null);
  };

  const handleBack = () => {
    router.back();
  };

  const allRoles = Object.values(UserRole);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader
        title="Role Switcher"
        subtitle="Test different user roles"
        showBackButton={true}
        onBackPress={handleBack}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>
            Current Role
          </Text>
          <Text style={[styles.currentRole, { color: colors.text }]}>
            {currentRole}
          </Text>
          {testRoleOverride && (
            <View style={styles.overrideBadge}>
              <Text style={styles.overrideText}>Test Override Active</Text>
            </View>
          )}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Select Role to Test
        </Text>

        {allRoles.map((role) => {
          const roleInfo = ROLE_INFO[role];
          const isCurrent = currentRole === role;
          const isSelected = isCurrent || (testRoleOverride === role);

          return (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: isSelected ? roleInfo.color : NeutralColors.gray300,
                  borderWidth: isSelected ? 2 : 1,
                },
                isCurrent && styles.currentRoleCard,
              ]}
              onPress={() => handleRoleSelect(role)}
            >
              <View style={styles.roleHeader}>
                <View style={styles.roleTitleRow}>
                  <Text style={[styles.roleLabel, { color: colors.text }]}>
                    {roleInfo.label}
                  </Text>
                  {isCurrent && (
                    <View style={[styles.badge, { backgroundColor: roleInfo.color }]}>
                      <Text style={styles.badgeText}>Current</Text>
                    </View>
                  )}
                  {isSelected && !isCurrent && (
                    <View style={[styles.badge, { backgroundColor: SemanticColors.success }]}>
                      <Text style={styles.badgeText}>Selected</Text>
                    </View>
                  )}
                </View>
                <View style={[styles.roleIndicator, { backgroundColor: roleInfo.color }]} />
              </View>
              <Text style={[styles.roleDescription, { color: colors.textSecondary }]}>
                {roleInfo.description}
              </Text>
              <Text style={[styles.roleValue, { color: colors.textSecondary }]}>
                Role: {role}
              </Text>
            </TouchableOpacity>
          );
        })}

        {testRoleOverride && (
          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: NeutralColors.gray200 }]}
            onPress={handleReset}
          >
            <Text style={[styles.resetButtonText, { color: NeutralColors.gray900 }]}>
              Reset to Original Role
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.noteCard}>
          <Text style={[styles.noteTitle, { color: colors.text }]}>
            Note
          </Text>
          <Text style={[styles.noteText, { color: colors.textSecondary }]}>
            This is a testing feature. Role changes only affect UI visibility and permissions in this session. The original user role is preserved and will be restored when you reset.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  infoCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: NeutralColors.gray50,
    alignItems: 'center',
    gap: Spacing.xs,
    ...Shadows.sm,
  },
  infoTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  currentRole: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    textTransform: 'capitalize',
  },
  overrideBadge: {
    marginTop: Spacing.xs,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.sm,
    backgroundColor: SemanticColors.warning,
  },
  overrideText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  roleCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  currentRoleCard: {
    ...Shadows.md,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  roleLabel: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  roleIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  roleDescription: {
    fontSize: Typography.sizes.sm,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
  },
  roleValue: {
    fontSize: Typography.sizes.xs,
    fontFamily: 'monospace',
    marginTop: Spacing.xs,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: '#FFFFFF',
  },
  resetButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.sm,
    ...Shadows.sm,
  },
  resetButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  noteCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: NeutralColors.gray50,
    marginTop: Spacing.sm,
    gap: Spacing.xs,
  },
  noteTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
  },
  noteText: {
    fontSize: Typography.sizes.sm,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.relaxed,
  },
});
