import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { LogoutIcon, SettingsIcon } from '@/components/icons';
import { ThemedView } from '@/components/themed-view';
import { TicketComponent } from '@/components/ticket-component';
import FEATURE_FLAGS from '@/constants/flag';
import { BorderRadius, BrandColors, Colors, NeutralColors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAbility } from '@/contexts/ability-context';
import { useAuth } from '@/contexts/auth-context';
import { useAuthStore } from '@/stores/auth-store';
import SelectStoreComponent from '../select-store/select-store';

const HEADER_HEIGHT = 250;

interface HomeScreenProps {
  showHeader?: boolean;
}

export default function HomeScreen({ showHeader = false }: HomeScreenProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const { session } = useAuthStore();
  const { signOut } = useAuth();
  const ability = useAbility();

  // Parallax animation for header (with scale)
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  // Greeting animation (only translate, no scale)
  const greetingAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
      ],
    };
  });

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSettingsPress = () => {
    router.push('/role-switcher');
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        style={{ backgroundColor: 'transparent', flex: 1 }}
        scrollEventThrottle={16}
      >
        {/* Header with parallax (scales) */}
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: BrandColors.headerGradient },
            headerAnimatedStyle,
          ]}
        >
          <View style={styles.headerWrapper}>
            <Image
              source={require('@/assets/images/header.png')}
              style={styles.headerImage}
              contentFit="cover"
            />
            <View style={[styles.colorOverlay, { backgroundColor: BrandColors.headerOverlay }]} />
            <LinearGradient
              colors={[`${BrandColors.headerGradient}00`, BrandColors.headerGradient]}
              start={[0, 1]}
              end={[0, 0]}
              locations={[0.36, 1]}
              style={styles.gradientOverlay}
            />
          </View>
        </Animated.View>

        {/* Greeting Section - only translates, no scale */}
        <Animated.View
          style={[styles.greetingContainerAnimated, greetingAnimatedStyle]}
          pointerEvents="none"
        >
          <Text style={styles.greetingText}>Xin chào</Text>
          <Text style={styles.userName}>{session?.user.name}</Text>
        </Animated.View>

        {/* Header Icons - Settings and Logout (only for staff) */}
        {showHeader && (
          <Animated.View
            style={[styles.headerIconsContainer, greetingAnimatedStyle]}
          >
            <TouchableOpacity
              onPress={handleSettingsPress}
              style={styles.headerIconButton}
              accessibilityLabel="Settings"
              accessibilityRole="button"
            >
              <SettingsIcon width={24} height={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.headerIconButton}
              accessibilityLabel="Logout"
              accessibilityRole="button"
            >
              <LogoutIcon width={24} height={24} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Content Body */}
        <ThemedView style={styles.content}>
          {/* Section 1: Vấn đề chờ xử lý - Protected by CASL */}
          {FEATURE_FLAGS.ENABLE_TICKETS && ability.can('view', 'TicketSection') && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: NeutralColors.gray900 }]}>
                  Vấn đề chờ xử lý
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.viewAllText, { color: NeutralColors.gray900 }]}>
                    View all
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Ticket List */}
              <View style={styles.ticketList}>
                <TicketComponent
                  location="Sắn Cafe Tô Ngọc Vân"
                  title="Báo sửa chữa"
                  category="Kỹ thuật & Bảo trì Thiết bị"
                  priority="Cao"
                  time="5p"
                />
                <TicketComponent
                  location="Sắn Cafe Tô Ngọc Vân"
                  title="Báo sửa chữa"
                  category="Kỹ thuật & Bảo trì Thiết bị"
                  priority="Cao"
                  time="5p"
                />
                <TicketComponent
                  location="Sắn Cafe Tô Ngọc Vân"
                  title="Báo sửa chữa"
                  category="Kỹ thuật & Bảo trì Thiết bị"
                  priority="Cao"
                  time="5p"
                />
              </View>
            </View>
          )}

          <SelectStoreComponent />
        </ThemedView>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  // Header styles
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  colorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  greetingContainerAnimated: {
    position: 'absolute',
    top: HEADER_HEIGHT - 150,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  greetingText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.normal,
    color: '#FFFFFF',
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
    marginBottom: 4,
  },
  userName: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    lineHeight: Typography.sizes['2xl'] * Typography.lineHeights.snug,
  },

  // Content styles
  content: {
    flex: 1,
    gap: 26,
    overflow: 'hidden',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -32,
  },

  // Section styles
  section: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    lineHeight: Typography.sizes.xl * Typography.lineHeights.tight,
  },
  viewAllText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
    letterSpacing: Typography.letterSpacing.wide,
  },

  // Ticket list styles
  ticketList: {
    gap: Spacing.md,
  },

  // Store selector styles
  storeSelector: {
    gap: Spacing.xs,
  },
  storeLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
  },
  storeDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  storeDropdownText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.base * Typography.lineHeights.normal,
    flex: 1,
  },
  dropdownIcon: {
    fontSize: 12,
    color: NeutralColors.gray500,
    marginLeft: Spacing.xs,
  },

  // Chart card styles
  chartCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.lg,
  },
  chartTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    lineHeight: Typography.sizes.base * Typography.lineHeights.tight,
  },

  // Radar chart placeholder
  radarChartPlaceholder: {
    height: 268,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  placeholderText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.normal,
  },
  radarLabel: {
    fontSize: 10,
    fontWeight: Typography.weights.normal,
    textAlign: 'center',
    lineHeight: 15,
  },

  // Trend chart styles
  trendHeader: {
    gap: Spacing.xs,
    alignItems: 'flex-start',
  },
  trendSubtitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.xs * 1.33,
  },
  trendChartPlaceholder: {
    height: 206,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scoreLabel: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.xl,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.sm,
    ...Shadows.md,
  },
  scoreText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.tight,
    textAlign: 'center',
  },

  // Action button
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
  },

  // Header icons styles
  headerIconsContainer: {
    position: 'absolute',
    top: HEADER_HEIGHT - 150,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    zIndex: 10,
  },
  headerIconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
