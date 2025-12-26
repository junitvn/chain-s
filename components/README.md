# Components Directory

## Overview
This directory contains reusable React Native components for the ChainS application.

## Key Components

### 🎯 CustomHeader
A flexible, reusable header component for navigation screens.

**Location**: `custom-header.tsx`

**Quick Start**:
```tsx
import { CustomHeader } from '@/components/custom-header';

<CustomHeader title="My Screen" />
```

**Documentation**:
- 📖 [Complete Guide](./CUSTOM_HEADER_GUIDE.md)
- ⚡ [Quick Reference](./HEADER_QUICK_REF.md)
- 🎨 Live Examples: `/header-examples` screen

**Features**:
- ✅ Back navigation with customizable handler
- ✅ Centered title with optional subtitle
- ✅ Right action buttons/icons
- ✅ Light/Dark theme support
- ✅ Safe area handling
- ✅ Fully typed with TypeScript
- ✅ Accessibility support

---

### 🎨 Icon Components
SVG icon components converted from Figma designs.

**Location**: `icons/` directory

**Available Icons**:
- ChevronLeftIcon, ChevronRightIcon
- SettingsIcon, CloseIcon
- HomeIcon, UserIcon, NotificationIcon
- ClipboardIcon, ClipboardCheckIcon
- LightbulbIcon, PlusIcon
- And more...

**Usage**:
```tsx
import { SettingsIcon } from '@/components/icons';

<SettingsIcon width={24} height={24} color="#000" />
```

---

### 🎫 Other Components

- **TicketComponent**: Ticket card component from Figma
- **ThemedText**: Theme-aware text component
- **ThemedView**: Theme-aware view component
- **ActionBottomSheet**: Bottom sheet for actions
- **CustomTabBar**: Custom tab bar component
- **Form Components**: Dynamic form fields

---

## Directory Structure

```
components/
├── custom-header.tsx          # ⭐ Main header component
├── CUSTOM_HEADER_GUIDE.md     # Complete documentation
├── HEADER_QUICK_REF.md        # Quick reference
├── README.md                  # This file
│
├── icons/                     # Icon components
│   ├── index.ts              # Icon exports
│   ├── chevron-left-icon.tsx
│   ├── chevron-right-icon.tsx
│   ├── settings-icon.tsx
│   └── ...
│
├── form/                      # Form components
│   ├── dynamic-form.tsx
│   ├── text-field.tsx
│   └── ...
│
├── ui/                        # UI primitives
│   ├── collapsible.tsx
│   └── icon-symbol.tsx
│
└── figma/                     # Figma-imported components
```

## Development Guidelines

### Creating New Components

1. **Use TypeScript**: All components should be `.tsx` with proper type definitions
2. **Theme Integration**: Use `useColorScheme()` and `Colors` from `@/constants/theme`
3. **Export Pattern**: Export named components, not default exports (except screens)
4. **Props Interface**: Define and export props interfaces
5. **Documentation**: Add JSDoc comments for complex components
6. **Accessibility**: Include accessibility props (labels, roles)

### Component Template

```tsx
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface MyComponentProps {
  // Define props
  title: string;
  onPress?: () => void;
}

/**
 * MyComponent - Brief description
 * 
 * @example
 * ```tsx
 * <MyComponent title="Hello" onPress={handlePress} />
 * ```
 */
export function MyComponent({ title, onPress }: MyComponentProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Component content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Styles
  },
});
```

## Figma Integration

Components can be generated from Figma designs using the Figma MCP tools. See the project's Figma integration rules for details.

## Testing

Test components in isolation:
- Create example screens in `/app/` (like `header-examples.tsx`)
- Use different theme modes (light/dark)
- Test on iOS and Android
- Verify accessibility with screen readers

## Related Files

- **Theme**: `/constants/theme.ts`
- **Hooks**: `/hooks/`
- **Screens**: `/app/`
- **Assets**: `/assets/`

---

**Last Updated**: December 2025

