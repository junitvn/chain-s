import { CustomHeader } from '@/components/custom-header';
import { SettingsIcon, UserIcon } from '@/components/icons';
import { BrandColors, Colors, NeutralColors, SemanticColors, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/stores/auth-store';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { getEffectiveUser } = useAuthStore();
  const { signOut, isLoading } = useAuth();
  const user = getEffectiveUser();

  const handleSettingsPress = () => {
    router.push('/role-switcher');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CustomHeader
          title="Profile"
          showBackButton={false}
          rightIcon={<SettingsIcon width={24} height={24} color={'transparent'} />}
          onRightPress={handleSettingsPress}
        />
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading profile...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader
        title="Profile"
        showBackButton={false}
        rightIcon={<SettingsIcon width={24} height={24} color={'transparent'} />}
        onRightPress={handleSettingsPress}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          {user.image ? (
            <Image
              source={{ uri: user.image }}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.border }]}>
              <UserIcon width={64} height={64} color={colors.icon} />
            </View>
          )}
        </View>

        {/* User Info Section */}
        <View style={styles.infoSection}>
          {/* First Name */}
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>First Name</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{user.firstName || 'N/A'}</Text>
          </View>

          {/* Last Name */}
          <View style={[styles.infoRow, styles.infoRowBorder, { borderColor: colors.border }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Last Name</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{user.lastName || 'N/A'}</Text>
          </View>

          {/* Email */}
          <View style={[styles.infoRow, styles.infoRowBorder, { borderColor: colors.border }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{user.email || 'N/A'}</Text>
          </View>

          {/* Email Verified */}
          <View style={[styles.infoRow, styles.infoRowBorder, { borderColor: colors.border }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email Verified</Text>
            <View style={styles.verifiedContainer}>
              <View
                style={[
                  styles.verifiedBadge,
                  {
                    backgroundColor: user.emailVerified
                      ? SemanticColors.successLight
                      : NeutralColors.gray300,
                  },
                ]}
              />
              <Text
                style={[
                  styles.verifiedText,
                  {
                    color: user.emailVerified ? SemanticColors.success : colors.textSecondary,
                  },
                ]}
              >
                {user.emailVerified ? 'Verified' : 'Not Verified'}
              </Text>
            </View>
          </View>

          {/* Role */}
          <View style={[styles.infoRow, styles.infoRowBorder, { borderColor: colors.border }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Role</Text>
            <View style={[styles.roleBadge, { backgroundColor: BrandColors.primaryLight }]}>
              <Text style={[styles.roleText, { color: '#FFFFFF' }]}>{user.role || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={[styles.signOutButton, { backgroundColor: SemanticColors.error }]}
          onPress={handleSignOut}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    fontSize: Typography.sizes.base,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    marginBottom: Spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  infoRowBorder: {
    borderTopWidth: 1,
  },
  infoLabel: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  infoValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.normal,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  verifiedBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  verifiedText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  roleBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  roleText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    textTransform: 'uppercase',
  },
  signOutButton: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
});

