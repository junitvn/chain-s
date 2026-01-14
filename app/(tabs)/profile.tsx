import { CustomHeader } from '@/components/custom-header';
import { SettingsIcon } from '@/components/icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSettingsPress = () => {
    router.push('/role-switcher');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader
        title="Profile"
        subtitle="Manage your account"
        showBackButton={false}
        rightIcon={<SettingsIcon width={24} height={24} color={colors.icon} />}
        onRightPress={handleSettingsPress}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          This is an example of the CustomHeader component with a settings icon.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

