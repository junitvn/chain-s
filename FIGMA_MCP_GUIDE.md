# Figma MCP Integration Guide

This guide explains how to use Figma MCP (Model Context Protocol) to generate React Native/Expo code from Figma designs.

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Workflow](#workflow)
4. [Icon Conversion](#icon-conversion)
5. [Image Handling](#image-handling)
6. [Color Palette Extraction](#color-palette-extraction)
7. [Component Generation](#component-generation)
8. [Best Practices](#best-practices)

## Overview

The Figma MCP integration allows you to:
- Extract design tokens (colors, typography, spacing) from Figma
- Convert vector icons to React Native SVG components
- Download raster images to the project
- Generate React Native components from Figma frames
- Maintain design consistency between Figma and code

## Setup

### Prerequisites

1. **Figma File Access**: You need the Figma file key from the URL
   ```
   https://www.figma.com/file/[FILE_KEY]/[FILE_NAME]
   ```

2. **Node ID (Optional)**: For specific nodes, get the node ID from the URL
   ```
   https://www.figma.com/file/[FILE_KEY]/[FILE_NAME]?node-id=[NODE_ID]
   ```

### Required Packages

The following packages are already installed:
- `react-native-svg` - For SVG icon rendering
- `expo-image` - For optimized image loading

## Workflow

### Step 1: Fetch Figma Design Data

Use the Figma MCP tool to fetch design information:

```typescript
// In Cursor AI, use the Figma MCP tool
mcp_Framelink_Figma_MCP_get_figma_data({
  fileKey: "YOUR_FIGMA_FILE_KEY",
  nodeId: "1234:5678" // Optional: specific node
})
```

This will return:
- Layout information (position, size, constraints)
- Style information (colors, typography, effects)
- Component structure
- Asset references

### Step 2: Extract Color Palette

From the Figma data, identify all colors used in the design:

1. Look for fill colors, stroke colors, and effect colors
2. Map them to semantic names (primary, secondary, success, etc.)
3. Update `/constants/theme.ts` with the extracted colors

**Example:**

```typescript
// Update BrandColors in /constants/theme.ts
export const BrandColors = {
  primary: '#6366F1',      // From Figma "Primary" style
  primaryDark: '#4F46E5',  // Darker variant
  primaryLight: '#818CF8', // Lighter variant
  secondary: '#8B5CF6',
  accent: '#EC4899',
};
```

### Step 3: Download Images

Use the Figma MCP tool to download raster images:

```typescript
mcp_Framelink_Figma_MCP_download_figma_images({
  fileKey: "YOUR_FIGMA_FILE_KEY",
  localPath: "/Users/lamnguyen/code/ChainS/assets/mcp_images",
  nodes: [
    {
      nodeId: "123:456",
      fileName: "hero-banner.png",
      imageRef: "..." // Required for raster images
    },
    {
      nodeId: "789:012",
      fileName: "product-image.png",
      imageRef: "..."
    }
  ],
  pngScale: 2 // For retina displays (2x or 3x)
})
```

**Image Organization:**
- All images go to `/assets/mcp_images/`
- Use descriptive kebab-case names
- Organize in subdirectories if needed:
  - `mcp_images/screens/`
  - `mcp_images/components/`
  - `mcp_images/icons/` (for raster icons)

## Icon Conversion

### When to Convert to SVG

Convert Figma vectors to SVG components when:
- Icon/graphic is less than 100x100px
- It's a UI element (buttons, navigation, status indicators)
- It needs to scale or change color dynamically
- It's used multiple times throughout the app

### SVG Conversion Process

1. **Extract SVG Path from Figma**
   - Select the vector in Figma
   - Copy as SVG or use MCP to get the vector data

2. **Create Icon Component**

```typescript
// /components/icons/search-icon.tsx
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SearchIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function SearchIcon({ 
  width = 24, 
  height = 24, 
  color = '#000000' 
}: SearchIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
```

3. **Export from Index**

```typescript
// /components/icons/index.ts
export { SearchIcon } from './search-icon';
```

4. **Use in Components**

```typescript
import { SearchIcon } from '@/components/icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function MyComponent() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <SearchIcon 
      width={32} 
      height={32} 
      color={colors.icon} 
    />
  );
}
```

### SVG Element Types

Common SVG elements you'll use:

```typescript
import Svg, { 
  Path,      // For complex paths
  Circle,    // For circles
  Rect,      // For rectangles
  Line,      // For lines
  Polygon,   // For polygons
  Polyline,  // For polylines
  Ellipse,   // For ellipses
  G,         // For grouping elements
  Defs,      // For definitions (gradients, etc.)
  LinearGradient, // For gradients
  Stop,      // For gradient stops
} from 'react-native-svg';
```

## Image Handling

### When to Use Images

Use raster images (PNG/JPG) for:
- Photos and complex graphics
- Large illustrations
- Background images
- Images that don't need to scale or change color

### Image Usage

```typescript
import { Image } from 'expo-image';

// Basic usage
<Image
  source={require('@/assets/mcp_images/hero-banner.png')}
  style={{ width: 300, height: 200 }}
  contentFit="cover"
/>

// With placeholder and transition
<Image
  source={require('@/assets/mcp_images/product.png')}
  placeholder={require('@/assets/mcp_images/placeholder.png')}
  contentFit="contain"
  transition={200}
  style={styles.image}
/>

// Responsive image
<Image
  source={require('@/assets/mcp_images/banner.png')}
  style={{ width: '100%', height: 200 }}
  contentFit="cover"
  priority="high"
/>
```

### Image Optimization Tips

1. **Use appropriate formats:**
   - PNG for transparency
   - JPG for photos
   - WebP for web (when supported)

2. **Provide multiple resolutions:**
   - `image.png` (1x)
   - `image@2x.png` (2x)
   - `image@3x.png` (3x)

3. **Optimize file sizes:**
   - Compress images before adding to project
   - Use appropriate dimensions (don't use 4K images for thumbnails)

## Color Palette Extraction

### Process

1. **Identify Color Roles in Figma**
   - Primary brand colors
   - Secondary/accent colors
   - Semantic colors (success, warning, error, info)
   - Neutral grays
   - Text colors
   - Background colors

2. **Extract Hex Values**
   - Select elements in Figma
   - Copy color values as hex
   - Note both light and dark mode variants

3. **Update Theme File**

```typescript
// /constants/theme.ts

// Brand Colors
export const BrandColors = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  // ... more colors
};

// Update Colors object
export const Colors = {
  light: {
    primary: BrandColors.primary,
    background: '#FFFFFF',
    text: '#11181C',
    // ... more colors
  },
  dark: {
    primary: BrandColors.primaryLight, // Often use lighter variant in dark mode
    background: '#151718',
    text: '#ECEDEE',
    // ... more colors
  },
};
```

### Color Usage in Components

```typescript
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

function MyComponent() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Method 1: Direct access
  const backgroundColor = colors.background;
  
  // Method 2: Using hook (recommended)
  const textColor = useThemeColor({}, 'text');
  
  return (
    <View style={{ backgroundColor }}>
      <Text style={{ color: textColor }}>Hello</Text>
    </View>
  );
}
```

## Component Generation

### Figma Frame to React Native Component

1. **Analyze Figma Frame Structure**
   - Identify layout (flex, absolute positioning)
   - Note spacing and sizing
   - Identify reusable patterns

2. **Create Component File**

```typescript
// /components/ui/card.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.surface },
      Shadows.md
    ]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      {description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
```

### Layout Conversion

| Figma Layout | React Native Equivalent |
|-------------|------------------------|
| Auto Layout (Horizontal) | `flexDirection: 'row'` |
| Auto Layout (Vertical) | `flexDirection: 'column'` |
| Fixed Width/Height | `width: X, height: Y` |
| Fill Container | `flex: 1` |
| Hug Contents | `alignSelf: 'flex-start'` |
| Space Between | `justifyContent: 'space-between'` |
| Padding | `padding: X` or `paddingHorizontal/Vertical` |
| Gap | `gap: X` (React Native 0.71+) |

## Best Practices

### 1. Naming Conventions

- **Components**: PascalCase (`UserCard`, `ProfileHeader`)
- **Files**: kebab-case (`user-card.tsx`, `profile-header.tsx`)
- **Icons**: PascalCase with "Icon" suffix (`SearchIcon`, `MenuIcon`)
- **Images**: kebab-case (`hero-banner.png`, `product-image.jpg`)

### 2. File Organization

```
/components
  /icons          - SVG icons from Figma
  /ui             - Reusable UI components
  /screens        - Screen-specific components
  /form           - Form components
  
/assets
  /mcp_images     - Images downloaded from Figma
    /screens      - Screen-specific images
    /components   - Component images
    /icons        - Raster icons (if any)
```

### 3. Theme Consistency

- Always use colors from `/constants/theme.ts`
- Use spacing values from `Spacing` object
- Use border radius from `BorderRadius` object
- Use shadows from `Shadows` object
- Use typography values from `Typography` object

### 4. Responsive Design

```typescript
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // Use percentages for responsive width
    width: '90%',
    maxWidth: 600,
    
    // Use flex for responsive layout
    flex: 1,
    
    // Platform-specific styles
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
```

### 5. Accessibility

```typescript
<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel="Search"
  accessibilityHint="Tap to search for items"
>
  <SearchIcon width={24} height={24} />
</TouchableOpacity>
```

### 6. Performance

- Use `React.memo()` for components that don't change often
- Optimize images (compress, appropriate size)
- Use `StyleSheet.create()` instead of inline styles
- Lazy load heavy components

```typescript
import { memo } from 'react';

export const Card = memo(function Card({ title, description }: CardProps) {
  // Component implementation
});
```

## Example: Complete Workflow

Here's a complete example of converting a Figma design to React Native:

### 1. Fetch Figma Data

```typescript
// Use Figma MCP in Cursor
const figmaData = await mcp_Framelink_Figma_MCP_get_figma_data({
  fileKey: "abc123xyz",
  nodeId: "1234:5678"
});
```

### 2. Extract Colors

```typescript
// Update /constants/theme.ts
export const BrandColors = {
  primary: '#6366F1',    // Extracted from Figma
  secondary: '#8B5CF6',
  accent: '#EC4899',
};
```

### 3. Download Images

```typescript
await mcp_Framelink_Figma_MCP_download_figma_images({
  fileKey: "abc123xyz",
  localPath: "/Users/lamnguyen/code/ChainS/assets/mcp_images",
  nodes: [
    {
      nodeId: "1234:5678",
      fileName: "hero-background.png",
      imageRef: "imageRef123"
    }
  ],
  pngScale: 2
});
```

### 4. Create Icon Component

```typescript
// /components/icons/heart-icon.tsx
import Svg, { Path } from 'react-native-svg';

export function HeartIcon({ width = 24, height = 24, color = '#000' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={color}
      />
    </Svg>
  );
}
```

### 5. Create Component

```typescript
// /components/ui/hero-section.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { HeartIcon } from '@/components/icons';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function HeroSection() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/mcp_images/hero-background.png')}
        style={styles.background}
        contentFit="cover"
      />
      <View style={styles.content}>
        <HeartIcon width={48} height={48} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to ChainS
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your journey starts here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    marginTop: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.sizes.lg,
    marginTop: Spacing.sm,
  },
});
```

## Troubleshooting

### Common Issues

1. **SVG not rendering**
   - Check viewBox dimensions match your paths
   - Ensure `react-native-svg` is installed
   - Verify paths are valid SVG syntax

2. **Images not loading**
   - Check file path is correct
   - Ensure image exists in `/assets/mcp_images/`
   - Try using absolute path for debugging

3. **Colors not matching Figma**
   - Verify hex values are correct
   - Check if opacity/alpha is applied
   - Ensure light/dark mode is handled

4. **Layout differences**
   - Check flex direction and alignment
   - Verify spacing values
   - Test on both iOS and Android

## Resources

- [React Native SVG Documentation](https://github.com/software-mansion/react-native-svg)
- [Expo Image Documentation](https://docs.expo.dev/versions/latest/sdk/image/)
- [React Native Styling](https://reactnative.dev/docs/style)
- [Figma API Documentation](https://www.figma.com/developers/api)

## Support

For issues or questions:
1. Check this guide first
2. Review the `.cursorrules` file
3. Check existing components for examples
4. Consult the React Native documentation

