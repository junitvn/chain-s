import { ClipboardIcon, HomeIcon, NotificationIcon, PlusIcon, UserIcon } from '@/components/icons';
import { Colors, NeutralColors, SemanticColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BadgeProps {
  count?: number;
}

const Badge = ({ count }: BadgeProps) => {
  if (!count || count === 0) return null;

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{displayCount}</Text>
    </View>
  );
};

interface CustomTabBarProps extends BottomTabBarProps {
  bottomSheetRef?: React.RefObject<BottomSheet | null>;
}

export function CustomTabBar({ state, descriptors, navigation, bottomSheetRef }: CustomTabBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleOpenBottomSheet = () => {
    bottomSheetRef?.current?.snapToIndex(0);
  };

  // Icon mapping for each tab
  const getIcon = (routeName: string, color: string) => {
    const iconSize = 20;

    switch (routeName) {
      case 'index':
        return <HomeIcon width={iconSize} height={iconSize} color={color} />;
      case 'tickets':
        return <ClipboardIcon width={iconSize} height={iconSize} color={color} />;
      case 'notifications':
        return <NotificationIcon width={iconSize} height={iconSize} color={color} />;
      case 'profile':
        return <UserIcon width={iconSize} height={iconSize} color={color} />;
      default:
        return <HomeIcon width={iconSize} height={iconSize} color={color} />;
    }
  };

  // Badge counts (can be passed as props or from a store)
  const getBadgeCount = (routeName: string) => {
    if (routeName === 'notifications') return 9;
    return undefined;
  };

  // Split routes into two halves to place middle button in center
  const middleIndex = Math.floor(state.routes.length / 2);
  const firstHalf = state.routes.slice(0, middleIndex);
  const secondHalf = state.routes.slice(middleIndex);

  const renderTabItem = (route: any, index: number) => {
    const { options } = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
          ? options.title
          : route.name;

    const isFocused = state.index === index;

    // Inactive color (muted gray from Figma)
    const inactiveColor = NeutralColors.muted400;
    // Active color (orange from Figma)
    const activeColor = SemanticColors.warning;

    const color = isFocused ? activeColor : inactiveColor;
    const fontWeight = isFocused ? '510' : '400';

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <TouchableOpacity
        key={route.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tabItem}
      >
        <View style={styles.iconContainer}>
          {getIcon(route.name, color)}
          <Badge count={getBadgeCount(route.name)} />
        </View>
        <Text style={[styles.label, { color, fontWeight: fontWeight as any }]}>
          {typeof label === 'string' ? label : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {
      backgroundColor: colors.background,
      borderTopColor: NeutralColors.borderGray,
    }]}>
      {/* First half of tabs */}
      {firstHalf.map((route, index) => renderTabItem(route, index))}

      {/* Middle Plus Button */}
      <TouchableOpacity
        key="middle-button"
        accessibilityRole="button"
        accessibilityLabel="Add"
        style={styles.middleButton}
        onPress={handleOpenBottomSheet}
      >
        <View style={styles.plusButtonContainer}>
          <PlusIcon width={34} height={34} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      {/* Second half of tabs */}
      {secondHalf.map((route, index) => renderTabItem(route, index + middleIndex))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  label: {
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'SF Pro',
      default: 'System',
    }),
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -12,
    backgroundColor: SemanticColors.error,
    borderRadius: 999,
    paddingHorizontal: 4,
    paddingVertical: 0,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.text50,
  },
  badgeText: {
    color: Colors.light.text50,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    textAlign: 'center',
  },
  middleButton: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  plusButtonContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: SemanticColors.warning,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

