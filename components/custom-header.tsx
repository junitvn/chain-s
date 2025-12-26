import { ChevronLeftIcon } from '@/components/icons';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface CustomHeaderProps {
  /**
   * The title text to display in the header
   */
  title: string;

  /**
   * Whether to show the back button on the left
   * @default true
   */
  showBackButton?: boolean;

  /**
   * Custom handler for back button press
   * If not provided, will use router.back()
   */
  onBackPress?: () => void;

  /**
   * Custom component to render on the right side
   * Takes precedence over rightIcon
   */
  rightComponent?: React.ReactNode;

  /**
   * Icon component to render on the right side
   * Only used if rightComponent is not provided
   */
  rightIcon?: React.ReactNode;

  /**
   * Handler for right button/icon press
   */
  onRightPress?: () => void;

  /**
   * Custom background color for the header
   * If not provided, uses theme background color
   */
  backgroundColor?: string;

  /**
   * Custom text color for the title
   * If not provided, uses theme text color
   */
  textColor?: string;

  /**
   * Custom icon color for the back button
   * If not provided, uses theme icon color
   */
  iconColor?: string;

  /**
   * Whether to show a bottom border/shadow
   * @default true
   */
  showBorder?: boolean;

  /**
   * Subtitle text to display below the title
   */
  subtitle?: string;

  /**
   * Progress value (0-100) to display a progress bar under the title
   * Set to a number between 0-100 to show progress bar
   */
  progress?: number;

  /**
   * Custom color for the progress bar fill
   * If not provided, uses theme primary color
   */
  progressColor?: string;

  /**
   * Custom background color for the progress bar track
   * If not provided, uses a semi-transparent version of border color
   */
  progressBackgroundColor?: string;

  /**
   * Total number of steps
   */
  totalSteps?: number;

  /**
   * Current step number
   */
  currentStep?: number;
}

/**
 * CustomHeader - Reusable header component for navigation screens
 * 
 * Features:
 * - Back button with navigation
 * - Centered title with optional subtitle
 * - Optional right action button/icon
 * - Theme-aware with light/dark mode support
 * - Safe area handling for iOS notch
 * - Flexible styling options
 * 
 * @example
 * ```tsx
 * <CustomHeader 
 *   title="Profile" 
 *   rightIcon={<SettingsIcon />}
 *   onRightPress={() => console.log('Settings pressed')}
 * />
 * ```
 */
export function CustomHeader({
  title,
  showBackButton = true,
  onBackPress,
  rightComponent,
  rightIcon,
  onRightPress,
  backgroundColor,
  textColor,
  iconColor,
  showBorder = true,
  subtitle,
  progress,
  progressColor,
  progressBackgroundColor,
  totalSteps,
  currentStep,
}: CustomHeaderProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Use custom colors or fall back to theme colors
  const headerBg = backgroundColor ?? colors.background;
  const titleColor = textColor ?? colors.text;
  const subtitleColor = textColor ?? colors.textSecondary;
  const backIconColor = iconColor ?? colors.icon;
  const progressFillColor = progressColor ?? colors.primary;
  const progressTrackColor = progressBackgroundColor ?? colors.border;

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.safeArea,
        { backgroundColor: headerBg },
        showBorder && styles.borderBottom,
        showBorder && Shadows.sm,
      ]}
    >
      <View style={styles.container}>
        {/* Left Section - Back Button */}
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backButton}
              activeOpacity={0.7}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <ChevronLeftIcon width={24} height={24} color={backIconColor} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Section - Title */}
        <View style={styles.centerSection}>
          <Text
            style={[styles.title, { color: titleColor }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.subtitle, { color: subtitleColor }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right Section - Action Button/Icon */}
        <View style={styles.rightSection}>
          {rightComponent ? (
            rightComponent
          ) : rightIcon ? (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.rightButton}
              activeOpacity={0.7}
              disabled={!onRightPress}
              accessibilityRole="button"
            >
              {rightIcon}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {totalSteps !== undefined && totalSteps !== null && currentStep !== undefined && currentStep !== null && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{currentStep} / {totalSteps} hoàn thành</Text>
          <View
            style={[
              styles.progressTrack,
              { backgroundColor: progressTrackColor }
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: progressFillColor,
                  width: `${Math.min(Math.max(currentStep / totalSteps * 100, 0), 100)}%`
                }
              ]}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    // SafeAreaView handles top padding for notch/status bar
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56, // Standard header height
    paddingHorizontal: Spacing.sm,
  },
  leftSection: {
    width: 44, // Minimum touch target size (44x44)
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8, // Optical alignment
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    lineHeight: Typography.sizes.lg * Typography.lineHeights.tight,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
    textAlign: 'center',
    marginTop: 2,
  },
  rightSection: {
    width: 44, // Minimum touch target size (44x44)
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -8, // Optical alignment
  },
  progressContainer: {
    width: '70%',
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  progressTrack: {
    width: '100%',
    height: Spacing.sm,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    minWidth: 4, // Ensures progress is visible even at very low values
  },
  progressText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
    textAlign: 'center',
    marginBottom: 4,
  },
});

