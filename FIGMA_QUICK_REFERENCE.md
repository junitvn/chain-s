# Figma MCP Quick Reference

Quick reference guide for common Figma to React Native conversions.

## 🎨 Color Extraction

```typescript
// Update /constants/theme.ts
export const BrandColors = {
  primary: '#6366F1',      // Your primary brand color
  primaryDark: '#4F46E5',  // Darker variant
  primaryLight: '#818CF8', // Lighter variant
};
```

## 🖼️ Download Images

```typescript
// In Cursor AI with Figma MCP
mcp_Framelink_Figma_MCP_download_figma_images({
  fileKey: "YOUR_FILE_KEY",
  localPath: "/Users/lamnguyen/code/ChainS/assets/mcp_images",
  nodes: [
    {
      nodeId: "123:456",
      fileName: "image-name.png",
      imageRef: "..." // For raster images
    }
  ],
  pngScale: 2
})
```

## 🎯 Icon Component Template

```typescript
// /components/icons/icon-name.tsx
import Svg, { Path } from 'react-native-svg';

interface IconNameProps {
  width?: number;
  height?: number;
  color?: string;
}

export function IconName({ 
  width = 24, 
  height = 24, 
  color = '#000' 
}: IconNameProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="..." stroke={color} strokeWidth={2} />
    </Svg>
  );
}
```

## 📦 Component Template

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ComponentProps {
  // props
}

export function ComponentName({ ...props }: ComponentProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
```

## 🎨 Using Theme Colors

```typescript
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const colorScheme = useColorScheme();
const colors = Colors[colorScheme ?? 'light'];

// Access colors
colors.primary
colors.background
colors.text
colors.success
```

## 📐 Layout Conversion

| Figma | React Native |
|-------|--------------|
| Auto Layout (Horizontal) | `flexDirection: 'row'` |
| Auto Layout (Vertical) | `flexDirection: 'column'` |
| Fill Container | `flex: 1` |
| Space Between | `justifyContent: 'space-between'` |
| Center | `alignItems: 'center'` |
| Gap | `gap: 16` |

## 🖼️ Image Usage

```typescript
import { Image } from 'expo-image';

<Image
  source={require('@/assets/mcp_images/image-name.png')}
  style={{ width: 200, height: 150 }}
  contentFit="cover"
  transition={200}
/>
```

## 🎯 Icon Usage

```typescript
import { IconName } from '@/components/icons';

<IconName 
  width={32} 
  height={32} 
  color={colors.primary} 
/>
```

## 📏 Theme Values

### Spacing
```typescript
Spacing.xs   // 4
Spacing.sm   // 8
Spacing.md   // 16
Spacing.lg   // 24
Spacing.xl   // 32
```

### Border Radius
```typescript
BorderRadius.sm   // 4
BorderRadius.md   // 8
BorderRadius.lg   // 12
BorderRadius.xl   // 16
BorderRadius.full // 9999
```

### Typography
```typescript
Typography.sizes.sm      // 14
Typography.sizes.base    // 16
Typography.sizes.lg      // 18
Typography.sizes.xl      // 20
Typography.sizes['2xl']  // 24

Typography.weights.normal    // '400'
Typography.weights.medium    // '500'
Typography.weights.semibold  // '600'
Typography.weights.bold      // '700'
```

### Shadows
```typescript
import { Shadows } from '@/constants/theme';

const styles = StyleSheet.create({
  card: {
    ...Shadows.md,
  },
});
```

## 🔧 Helper Functions

```typescript
import {
  figmaColorToHex,
  getClosestSpacing,
  getClosestBorderRadius,
  generateFileName,
  generateComponentName,
} from '@/utils/figma-helpers';

// Convert Figma color to hex
const hex = figmaColorToHex({ r: 0.4, g: 0.5, b: 0.6, a: 1 });

// Get closest spacing value
const spacing = getClosestSpacing(18); // Returns 16

// Generate filename
const filename = generateFileName('Hero Banner'); // 'hero-banner.png'

// Generate component name
const name = generateComponentName('user profile card'); // 'UserProfileCard'
```

## 📁 File Structure

```
/components
  /icons/              - SVG icons from Figma
    icon-name.tsx
    index.ts
  /ui/                 - Reusable UI components
    card.tsx
    button.tsx

/assets
  /mcp_images/         - Images from Figma
    hero-banner.png
    product-image.png

/constants
  theme.ts            - Color palette & design tokens

/utils
  figma-helpers.ts    - Helper functions
```

## 🎯 Workflow Checklist

- [ ] Fetch Figma data using MCP
- [ ] Extract colors → Update `/constants/theme.ts`
- [ ] Download images → Save to `/assets/mcp_images/`
- [ ] Convert icons → Create in `/components/icons/`
- [ ] Create components → Use theme values
- [ ] Test light/dark mode
- [ ] Add accessibility labels
- [ ] Test on iOS and Android

## 🔗 Quick Links

- Full Guide: `FIGMA_MCP_GUIDE.md`
- Theme File: `/constants/theme.ts`
- Helper Utils: `/utils/figma-helpers.ts`
- Cursor Rules: `.cursorrules`

## 💡 Tips

1. **Always use theme colors** - Don't hardcode colors
2. **Use spacing constants** - Maintain consistency
3. **Support both modes** - Test light and dark themes
4. **Optimize images** - Compress before adding
5. **Add accessibility** - Include labels and roles
6. **Use TypeScript** - Type all props and components
7. **Follow naming** - kebab-case files, PascalCase components
8. **Test responsive** - Check multiple screen sizes

