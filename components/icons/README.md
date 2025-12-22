# Icon Components

This folder contains SVG icon components converted from Figma vector graphics.

## 📐 Icon Standards

All icon components should follow these standards:

### Props Interface
```typescript
interface IconProps {
  width?: number;    // Default: 24
  height?: number;   // Default: 24
  color?: string;    // Default: '#000000'
  opacity?: number;  // Default: 1 (optional)
}
```

### Component Structure
```typescript
export function IconName({ 
  width = 24, 
  height = 24, 
  color = '#000000',
  opacity = 1,
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      {/* SVG paths */}
    </Svg>
  );
}
```

## 📝 Naming Convention

- **Component Name**: PascalCase with "Icon" suffix
  - ✅ `SearchIcon`, `MenuIcon`, `CloseIcon`
  - ❌ `search`, `menuicon`, `Icon_Close`

- **File Name**: kebab-case with `.tsx` extension
  - ✅ `search-icon.tsx`, `menu-icon.tsx`
  - ❌ `SearchIcon.tsx`, `search_icon.tsx`

## 🎨 Icon Types

### Stroke Icons
Icons with outlined paths (most common):

```typescript
<Path
  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
  stroke={color}
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
/>
```

### Fill Icons
Icons with filled shapes:

```typescript
<Path
  d="M12 2L2 7L12 12L22 7L12 2Z"
  fill={color}
/>
```

### Complex Icons
Icons with multiple elements:

```typescript
<G>
  <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
  <Path d="M9 12L11 14L15 10" stroke={color} strokeWidth={2} />
</G>
```

## 📦 Exporting Icons

Always export icons from `index.ts`:

```typescript
// /components/icons/index.ts
export { SearchIcon } from './search-icon';
export { MenuIcon } from './menu-icon';
export { CloseIcon } from './close-icon';
```

## 🎯 Usage

Import and use icons in components:

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

## 🎨 Color Guidelines

Use theme colors for icons:

```typescript
// Good - Uses theme colors
<SearchIcon color={colors.icon} />
<MenuIcon color={colors.primary} />
<CloseIcon color={colors.error} />

// Avoid - Hardcoded colors
<SearchIcon color="#000000" />
<MenuIcon color="blue" />
```

## 📏 Size Guidelines

Standard icon sizes:
- **Small**: 16x16 (compact UI)
- **Default**: 24x24 (most common)
- **Medium**: 32x32 (prominent actions)
- **Large**: 48x48 (hero sections)

```typescript
<SearchIcon width={16} height={16} /> // Small
<SearchIcon width={24} height={24} /> // Default
<SearchIcon width={32} height={32} /> // Medium
<SearchIcon width={48} height={48} /> // Large
```

## 🔄 Converting from Figma

### Step 1: Extract SVG from Figma
1. Select the vector in Figma
2. Copy as SVG or use Figma MCP
3. Note the viewBox dimensions

### Step 2: Create Component File
```bash
# Create new icon file
touch components/icons/icon-name.tsx
```

### Step 3: Add Component Code
```typescript
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconNameProps {
  width?: number;
  height?: number;
  color?: string;
}

export function IconName({ 
  width = 24, 
  height = 24, 
  color = '#000000' 
}: IconNameProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {/* Paste SVG paths here */}
    </Svg>
  );
}
```

### Step 4: Export from Index
```typescript
// Add to /components/icons/index.ts
export { IconName } from './icon-name';
```

## 🧪 Testing Icons

Test icons on:
- ✅ iOS simulator
- ✅ Android emulator
- ✅ Web browser
- ✅ Light mode
- ✅ Dark mode
- ✅ Different sizes (16, 24, 32, 48)
- ✅ Different colors

## ♿ Accessibility

When using icons in interactive elements:

```typescript
import { TouchableOpacity } from 'react-native';
import { SearchIcon } from '@/components/icons';

<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel="Search"
  accessibilityHint="Tap to search for items"
>
  <SearchIcon width={24} height={24} />
</TouchableOpacity>
```

## 🎨 SVG Elements Reference

Common SVG elements from `react-native-svg`:

```typescript
import Svg, { 
  Path,           // Complex paths
  Circle,         // Circles
  Rect,           // Rectangles
  Line,           // Lines
  Polygon,        // Polygons
  Polyline,       // Polylines
  Ellipse,        // Ellipses
  G,              // Groups
  Defs,           // Definitions
  LinearGradient, // Gradients
  Stop,           // Gradient stops
} from 'react-native-svg';
```

## 📚 Examples

See `example-icon.tsx` for complete examples of:
- Stroke icons
- Fill icons
- Complex icons with multiple elements

## 🔗 Related Documentation

- [Figma MCP Guide](../../FIGMA_MCP_GUIDE.md)
- [Quick Reference](../../FIGMA_QUICK_REFERENCE.md)
- [react-native-svg Docs](https://github.com/software-mansion/react-native-svg)
- [SVG Path Reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)

## 💡 Tips

1. **Keep viewBox consistent** - Usually "0 0 24 24" for icons
2. **Simplify paths** - Remove unnecessary complexity from Figma exports
3. **Use theme colors** - Never hardcode colors
4. **Test all sizes** - Ensure icons scale properly
5. **Document source** - Note Figma file and node ID in comments
6. **Optimize paths** - Remove redundant points and commands
7. **Group related elements** - Use `<G>` for organization
8. **Support color prop** - Allow dynamic color changes

