import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, Typography, BrandColors } from '@/constants/theme';
import { CustomHeader } from '@/components/custom-header';
import { SettingsIcon, NotificationIcon, PlusIcon, CloseIcon } from '@/components/icons';

/**
 * HeaderExamplesScreen - Demonstrates various CustomHeader configurations
 * 
 * This screen showcases different ways to use the CustomHeader component:
 * - Basic header with back button
 * - Header with subtitle
 * - Header with right icon
 * - Header without back button
 * - Header with custom colors
 * - Header with custom right component
 */
export default function HeaderExamplesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleIconPress = (iconName: string) => {
    Alert.alert('Icon Pressed', `You pressed the ${iconName} icon`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      {/* Example 1: Basic Header with Back Button */}
      <View style={styles.exampleContainer}>
        <Text style={[styles.exampleTitle, { color: colors.text }]}>
          1. Basic Header with Back Button
        </Text>
        <View style={[styles.headerPreview, { backgroundColor: colors.background }]}>
          <CustomHeader title="Basic Header" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Example 2: Header with Subtitle */}
        <View style={styles.exampleContainer}>
          <Text style={[styles.exampleTitle, { color: colors.text }]}>
            2. Header with Subtitle
          </Text>
          <View style={[styles.headerPreview, { backgroundColor: colors.background }]}>
            <CustomHeader 
              title="Main Title" 
              subtitle="This is a subtitle"
            />
          </View>
        </View>

        {/* Example 3: Header with Right Icon */}
        <View style={styles.exampleContainer}>
          <Text style={[styles.exampleTitle, { color: colors.text }]}>
            3. Header with Right Icon
          </Text>
          <View style={[styles.headerPreview, { backgroundColor: colors.background }]}>
            <CustomHeader 
              title="Settings" 
              rightIcon={<SettingsIcon width={24} height={24} color={colors.icon} />}
              onRightPress={() => handleIconPress('settings')}
            />
          </View>
        </View>

        {/* Example 4: Header without Back Button */}
        <View style={styles.exampleContainer}>
          <Text style={[styles.exampleTitle, { color: colors.text }]}>
            4. Header without Back Button
          </Text>
          <View style={[styles.headerPreview, { backgroundColor: colors.background }]}>
            <CustomHeader 
              title="Home Screen" 
              showBackButton={false}
              rightIcon={<NotificationIcon width={24} height={24} color={colors.icon} />}
              onRightPress={() => handleIconPress('notification')}
            />
          </View>
        </View>

        {/* Example 5: Header with Custom Colors */}
        <View style={styles.exampleContainer}>
          <Text style={[styles.exampleTitle, { color: colors.text }]}>
            5. Header with Custom Colors
          </Text>
          <View style={[styles.headerPreview, { backgroundColor: BrandColors.primary }]}>
            <CustomHeader 
              title="Custom Colors" 
              backgroundColor={BrandColors.primary}
              textColor="#FFFFFF"
              iconColor="#FFFFFF"
              rightIcon={<CloseIcon width={24} height={24} color="#FFFFFF" />}
              onRightPress={() => handleIconPress('close')}
            />
          </View>
        </View>

        {/* Example 6: Header with Custom Right Component */}
        <View style={styles.exampleContainer}>
          <Text style={[styles.exampleTitle, { color: colors.text }]}>
            6. Header with Custom Right Component
          </Text>
          <View style={[styles.headerPreview, { backgroundColor: colors.background }]}>
            <CustomHeader 
              title="Custom Action" 
              rightComponent={
                <TouchableOpacity 
                  onPress={() => handleIconPress('custom')}
                  style={styles.customButton}
                >
                  <Text style={[styles.customButtonText, { color: BrandColors.primary }]}>
                    Done
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>
        </View>

        {/* Example 7: Header without Border */}
        <View style={styles.exampleContainer}>
          <Text style={[styles.exampleTitle, { color: colors.text }]}>
            7. Header without Border
          </Text>
          <View style={[styles.headerPreview, { backgroundColor: colors.background }]}>
            <CustomHeader 
              title="No Border" 
              showBorder={false}
            />
          </View>
        </View>

        {/* Example 8: Multiple Icons */}
        <View style={styles.exampleContainer}>
          <Text style={[styles.exampleTitle, { color: colors.text }]}>
            8. Header with Multiple Right Actions
          </Text>
          <View style={[styles.headerPreview, { backgroundColor: colors.background }]}>
            <CustomHeader 
              title="Multiple Actions" 
              rightComponent={
                <View style={styles.multipleIcons}>
                  <TouchableOpacity 
                    onPress={() => handleIconPress('plus')}
                    style={styles.iconButton}
                  >
                    <PlusIcon width={24} height={24} color={colors.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleIconPress('settings')}
                    style={styles.iconButton}
                  >
                    <SettingsIcon width={24} height={24} color={colors.icon} />
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>

        {/* Usage Instructions */}
        <View style={[styles.usageContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.usageTitle, { color: colors.text }]}>
            Usage Instructions
          </Text>
          <Text style={[styles.usageText, { color: colors.textSecondary }]}>
            Import the CustomHeader component:{'\n\n'}
            <Text style={styles.code}>
              import {'{ CustomHeader }'} from '@/components/custom-header';
            </Text>
            {'\n\n'}
            Then use it in your screen components with various props to customize appearance and behavior.
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
  scrollContent: {
    padding: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  exampleContainer: {
    gap: Spacing.sm,
  },
  exampleTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    marginTop: Spacing.sm,
  },
  headerPreview: {
    borderRadius: 8,
    overflow: 'hidden',
    // Shadow for better visual separation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  customButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  multipleIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usageContainer: {
    padding: Spacing.md,
    borderRadius: 8,
    marginTop: Spacing.lg,
  },
  usageTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    marginBottom: Spacing.sm,
  },
  usageText: {
    fontSize: Typography.sizes.sm,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.relaxed,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: Typography.sizes.xs,
  },
});

