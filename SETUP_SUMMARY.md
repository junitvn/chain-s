# Figma MCP Setup Summary

This document summarizes the Figma MCP integration setup for the ChainS React Native/Expo project.

## ✅ What Was Set Up

### 1. Cursor Rules (`.cursorrules`)
A comprehensive rules file that instructs Cursor AI on how to generate React Native code from Figma designs:
- Component generation guidelines
- Icon handling (SVG conversion with customizable width/height)
- Image management (download to `mcp_images` folder)
- Color palette extraction and theme generation
- Best practices and naming conventions
- Figma node type to React Native component mapping
- Complete workflow examples

### 2. Enhanced Theme System (`/constants/theme.ts`)
Updated theme file with comprehensive design tokens:
- **BrandColors**: Primary, secondary, accent colors with variants
- **SemanticColors**: Success, warning, error, info states
- **NeutralColors**: Gray scale (50-950)
- **Colors**: Light and dark mode themes with extensive color palette
- **Typography**: Sizes, weights, line heights, letter spacing
- **Spacing**: Consistent spacing scale (xs to 5xl)
- **BorderRadius**: Corner radius values (none to 3xl, full)
- **Shadows**: Elevation styles (none to 2xl)
- **Fonts**: Platform-specific font families
- **Animation**: Duration and easing values
- **Breakpoints**: Responsive design breakpoints

### 3. Icon Components (`/components/icons/`)
Created icon component infrastructure:
- `example-icon.tsx`: Template and examples for SVG icons
  - Stroke icons
  - Fill icons
  - Complex icons with multiple elements
- `index.ts`: Central export file for all icons
- `README.md`: Comprehensive guide for creating and using icon components

### 4. Image Assets (`/assets/mcp_images/`)
Created folder structure for Figma-downloaded images:
- Organized directory for all images from Figma
- `README.md`: Guidelines for image organization, naming, and usage

### 5. Helper Utilities (`/utils/figma-helpers.ts`)
Utility functions for Figma to React Native conversions:
- Color conversion (Figma RGBA to hex, rgba strings)
- Design token mapping (spacing, border radius, font size)
- Font weight conversion
- Text alignment conversion
- Constraints to flex properties
- Shadow conversion
- URL parsing (file key, node ID)
- Filename and component name generation
- Layout to style conversion
- Contrast ratio calculation for accessibility
- Validation helpers

### 6. Documentation

#### Main Guides
- **FIGMA_MCP_GUIDE.md**: Complete workflow documentation (29KB)
  - Overview and setup
  - Step-by-step workflow
  - Icon conversion process
  - Image handling
  - Color palette extraction
  - Component generation
  - Best practices
  - Complete examples
  - Troubleshooting

- **FIGMA_QUICK_REFERENCE.md**: Quick lookup reference
  - Color extraction
  - Image download
  - Icon template
  - Component template
  - Layout conversion table
  - Theme values
  - Helper functions
  - Workflow checklist

#### Component Documentation
- **components/icons/README.md**: Icon component guidelines
  - Standards and conventions
  - Icon types (stroke, fill, complex)
  - Usage examples
  - Conversion process
  - Testing guidelines
  - Accessibility

- **assets/mcp_images/README.md**: Image organization guide
  - Folder structure
  - Naming conventions
  - Format recommendations
  - Resolution guidelines
  - Usage examples

#### Updated Files
- **README.md**: Updated main README with Figma MCP section

### 7. Dependencies
Installed required packages:
- `react-native-svg` (^15.0.0): For SVG icon rendering

## 📁 File Structure

```
ChainS/
├── .cursorrules                    # Cursor AI rules for Figma code generation
├── README.md                       # Updated with Figma MCP info
├── FIGMA_MCP_GUIDE.md             # Complete guide
├── FIGMA_QUICK_REFERENCE.md       # Quick reference
├── SETUP_SUMMARY.md               # This file
│
├── components/
│   └── icons/
│       ├── example-icon.tsx       # Icon templates and examples
│       ├── index.ts               # Icon exports
│       └── README.md              # Icon documentation
│
├── constants/
│   └── theme.ts                   # Enhanced theme system
│
├── assets/
│   └── mcp_images/                # Figma images folder
│       └── README.md              # Image documentation
│
└── utils/
    └── figma-helpers.ts           # Helper utilities
```

## 🎯 Key Features

### 1. Icon Handling
- ✅ Convert Figma vectors to React Native SVG components
- ✅ Customizable width and height props
- ✅ Dynamic color support
- ✅ Template with examples
- ✅ Comprehensive documentation

### 2. Image Management
- ✅ Download images to dedicated folder (`mcp_images`)
- ✅ Organized structure with subdirectories
- ✅ Guidelines for naming and optimization
- ✅ Support for multiple resolutions (@2x, @3x)

### 3. Theme Generation
- ✅ Extract color palettes from Figma
- ✅ Save to centralized theme file
- ✅ Light and dark mode support
- ✅ Comprehensive design tokens
- ✅ Easy to use with hooks

### 4. Component Generation
- ✅ Guidelines for converting Figma frames to components
- ✅ Use theme values for consistency
- ✅ TypeScript support
- ✅ Accessibility best practices
- ✅ Responsive design patterns

## 🚀 How to Use

### Basic Workflow

1. **Get Figma File Info**
   ```
   File Key: From URL - figma.com/file/[FILE_KEY]/...
   Node ID: From URL - ?node-id=[NODE_ID]
   ```

2. **Fetch Figma Data** (in Cursor AI)
   ```typescript
   mcp_Framelink_Figma_MCP_get_figma_data({
     fileKey: "YOUR_FILE_KEY",
     nodeId: "1234:5678"
   })
   ```

3. **Extract Colors**
   - Identify colors from Figma data
   - Update `/constants/theme.ts` with hex values
   - Map to semantic names (primary, secondary, etc.)

4. **Download Images**
   ```typescript
   mcp_Framelink_Figma_MCP_download_figma_images({
     fileKey: "YOUR_FILE_KEY",
     localPath: "/Users/lamnguyen/code/ChainS/assets/mcp_images",
     nodes: [
       { nodeId: "123:456", fileName: "image.png", imageRef: "..." }
     ],
     pngScale: 2
   })
   ```

5. **Create Icon Components**
   - Extract SVG paths from Figma vectors
   - Create component in `/components/icons/`
   - Use template from `example-icon.tsx`
   - Export from `index.ts`

6. **Generate Components**
   - Create React Native components from Figma frames
   - Use theme values for colors, spacing, etc.
   - Follow component template
   - Add TypeScript types

### Example: Complete Flow

```typescript
// 1. Fetch design
const figmaData = await mcp_Framelink_Figma_MCP_get_figma_data({
  fileKey: "abc123",
  nodeId: "1234:5678"
});

// 2. Update theme
// In /constants/theme.ts
export const BrandColors = {
  primary: '#6366F1',    // From Figma
  secondary: '#8B5CF6',
  accent: '#EC4899',
};

// 3. Download images
await mcp_Framelink_Figma_MCP_download_figma_images({
  fileKey: "abc123",
  localPath: "/Users/lamnguyen/code/ChainS/assets/mcp_images",
  nodes: [
    { nodeId: "1234:5678", fileName: "hero.png", imageRef: "ref123" }
  ],
  pngScale: 2
});

// 4. Create icon
// /components/icons/search-icon.tsx
export function SearchIcon({ width = 24, height = 24, color = '#000' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path d="..." stroke={color} strokeWidth={2} />
    </Svg>
  );
}

// 5. Use in component
import { SearchIcon } from '@/components/icons';
import { Image } from 'expo-image';
import { Colors } from '@/constants/theme';

function MyComponent() {
  const colors = Colors.light;
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <SearchIcon width={24} height={24} color={colors.icon} />
      <Image source={require('@/assets/mcp_images/hero.png')} />
    </View>
  );
}
```

## 📖 Documentation Quick Links

- **Complete Guide**: [FIGMA_MCP_GUIDE.md](FIGMA_MCP_GUIDE.md)
- **Quick Reference**: [FIGMA_QUICK_REFERENCE.md](FIGMA_QUICK_REFERENCE.md)
- **Icons Guide**: [components/icons/README.md](components/icons/README.md)
- **Images Guide**: [assets/mcp_images/README.md](assets/mcp_images/README.md)
- **Cursor Rules**: [.cursorrules](.cursorrules)

## 🔧 Helper Functions

The `figma-helpers.ts` utility provides:
- `figmaColorToHex()` - Convert Figma color to hex
- `getClosestSpacing()` - Map to theme spacing
- `getClosestBorderRadius()` - Map to theme radius
- `figmaFontWeightToRN()` - Convert font weights
- `figmaShadowToRN()` - Convert shadows
- `parseNodeIdFromUrl()` - Extract node ID from URL
- `parseFileKeyFromUrl()` - Extract file key from URL
- `generateFileName()` - Generate kebab-case filename
- `generateComponentName()` - Generate PascalCase component name
- `shouldConvertToIcon()` - Check if node should be SVG
- `figmaLayoutToStyle()` - Convert layout to RN style
- `getContrastRatio()` - Check color contrast
- And more...

## ✨ Best Practices

1. **Always use theme colors** - Never hardcode colors
2. **Use spacing constants** - Maintain consistency
3. **Support both modes** - Test light and dark themes
4. **Optimize images** - Compress before adding
5. **Add accessibility** - Include labels and roles
6. **Use TypeScript** - Type all props and components
7. **Follow naming** - kebab-case files, PascalCase components
8. **Test responsive** - Check multiple screen sizes
9. **Document source** - Note Figma file and node ID
10. **Keep organized** - Use subdirectories for images and icons

## 🎓 Learning Resources

- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)
- [React Native Styling](https://reactnative.dev/docs/style)
- [Figma API](https://www.figma.com/developers/api)
- [SVG Path Reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)

## 🐛 Troubleshooting

### SVG not rendering
- Check viewBox dimensions
- Verify `react-native-svg` is installed
- Validate SVG path syntax

### Images not loading
- Check file path is correct
- Ensure image exists in `/assets/mcp_images/`
- Try absolute path for debugging

### Colors not matching
- Verify hex values
- Check opacity/alpha
- Ensure light/dark mode handling

### Layout differences
- Check flex direction and alignment
- Verify spacing values
- Test on both iOS and Android

## 📝 Notes

- All images are committed to git (not ignored)
- Icons should be < 100x100 for SVG conversion
- Larger graphics should be downloaded as images
- Theme file can be updated anytime with new Figma colors
- Helper functions are available for common conversions
- Documentation is comprehensive and includes examples

## 🎉 Ready to Use!

The project is now fully configured for Figma MCP integration. You can:
1. Start converting Figma designs to React Native code
2. Use Cursor AI with the configured rules
3. Follow the guides and examples
4. Leverage the helper utilities
5. Maintain design consistency with the theme system

For questions or issues, refer to the documentation files or the troubleshooting section in the main guide.

