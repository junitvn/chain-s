import { SettingsIcon } from '@/components/icons/settings-icon';
import { BorderRadius, Colors, NeutralColors, SemanticColors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface TicketComponentProps {
  /**
   * Location or venue name (displayed in gray)
   */
  location: string;

  /**
   * Main title of the ticket (displayed in black)
   */
  title: string;

  /**
   * Category label for the badge
   */
  category: string;

  /**
   * Priority level (e.g., "Cao", "Trung bình", "Thấp")
   */
  priority: 'Cao' | 'Trung bình' | 'Thấp';

  /**
   * Time indicator (e.g., "5p", "10p", "1h")
   */
  time: string;

  /**
   * Optional press handler
   */
  onPress?: () => void;

  /**
   * Icon color override
   */
  iconColor?: string;
}

export function TicketComponent({
  location,
  title,
  category,
  priority,
  time,
  onPress,
  iconColor,
}: TicketComponentProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const priorityColors = {
    'Cao': {
      backgroundColor: SemanticColors.error,
      textColor: '#FFFFFF',
    },
    'Trung bình': {
      backgroundColor: SemanticColors.warning,
      textColor: '#FFFFFF',
    },
    'Thấp': {
      backgroundColor: NeutralColors.gray400,
      textColor: '#FFFFFF',
    },
  };

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colorScheme === 'light' ? '#E5E5E5' : colors.border,
        }
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      accessibilityRole={onPress ? 'button' : 'none'}
      accessibilityLabel={`${title} ticket at ${location}, priority ${priority}`}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <SettingsIcon
          width={24}
          height={24}
          color={iconColor || SemanticColors.warning}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Location */}
        <Text
          style={[
            styles.location,
            { color: NeutralColors.gray500 }
          ]}
          numberOfLines={1}
        >
          {location}
        </Text>

        {/* Title */}
        <Text
          style={[
            styles.title,
            { color: NeutralColors.gray900 }
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Badges */}
        <View style={styles.metaContainer}>
          {/* Category Badge */}
          <View style={[
            styles.categoryBadge,
            {
              backgroundColor: SemanticColors.warning50,
              borderColor: SemanticColors.warning,
            }
          ]}>
            <Text style={[
              styles.categoryText,
              { color: SemanticColors.warning }
            ]}>
              {category}
            </Text>
          </View>

          {/* Priority Badge */}
          <View style={[
            styles.priorityBadge,
            {
              backgroundColor: priorityColors[priority].backgroundColor,
            }
          ]}>
            <Text style={[
              styles.priorityText,
              { color: priorityColors[priority].textColor }
            ]}>
              {priority}
            </Text>
          </View>
        </View>

        {/* Time */}
        <Text
          style={[
            styles.time,
            { color: NeutralColors.gray500 }
          ]}
        >
          {time}
        </Text>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: Spacing.sm,
    padding: Spacing.sm,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    ...Shadows.xs,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  location: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.xs * Typography.lineHeights.normal,
  },
  title: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
    lineHeight: Typography.sizes.xs * Typography.lineHeights.normal,
  },
  priorityBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  priorityText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.xs * Typography.lineHeights.normal,
    letterSpacing: 0.5,
  },
  time: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.xs * Typography.lineHeights.normal,
  },
});

