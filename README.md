# ChainS - Expo React Native App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 🚀 Get Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## 🎨 Figma to Code Integration

This project is configured to generate React Native code from Figma designs using Figma MCP (Model Context Protocol).

### Quick Start

1. **Read the guides:**
   - 📖 [Figma MCP Guide](FIGMA_MCP_GUIDE.md) - Complete workflow documentation
   - ⚡ [Quick Reference](FIGMA_QUICK_REFERENCE.md) - Quick lookup for common tasks

2. **Key features:**
   - 🎨 Extract color palettes from Figma → `/constants/theme.ts`
   - 🖼️ Download images → `/assets/mcp_images/`
   - 🎯 Convert vector icons to SVG → `/components/icons/`
   - 📦 Generate components with theme support
   - 🌓 Built-in light/dark mode support

3. **Project structure:**
   ```
   /components
     /icons/          - SVG icons from Figma
     /ui/             - Reusable UI components
     /form/           - Form components
   
   /assets
     /mcp_images/     - Images from Figma
   
   /constants
     theme.ts         - Color palette & design tokens
   
   /utils
     figma-helpers.ts - Helper functions for Figma conversions
   ```

### Cursor AI Rules

The project includes `.cursorrules` with guidelines for:
- Converting Figma designs to React Native components
- Icon handling (SVG conversion with customizable width/height)
- Image management (download to `mcp_images` folder)
- Theme generation (color palette extraction)
- Component structure and best practices

## 📚 Documentation

- [Figma MCP Guide](FIGMA_MCP_GUIDE.md) - Complete Figma integration guide
- [Quick Reference](FIGMA_QUICK_REFERENCE.md) - Quick reference card
- [Icons README](components/icons/README.md) - Icon component guidelines
- [Images README](assets/mcp_images/README.md) - Image organization guide

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev) ~54.0
- **React**: 19.1.0
- **React Native**: 0.81.5
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) ~6.0
- **SVG**: [react-native-svg](https://github.com/software-mansion/react-native-svg) ^15.0
- **Images**: [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) ~3.0
- **TypeScript**: ~5.9.2

## 📁 Project Structure

```
/app                    - Application screens (file-based routing)
  /(tabs)/             - Tab navigation screens
  _layout.tsx          - Root layout
  modal.tsx            - Modal screen

/components            - Reusable components
  /icons/             - SVG icon components
  /ui/                - UI components
  /form/              - Form components

/constants            - Constants and theme
  theme.ts           - Design tokens (colors, typography, spacing)

/hooks                - Custom React hooks
  use-color-scheme.ts
  use-theme-color.ts

/assets               - Static assets
  /images/           - App images
  /mcp_images/       - Figma-downloaded images

/utils                - Utility functions
  figma-helpers.ts   - Figma conversion helpers
```

## 🎨 Theme System

The app uses a comprehensive theme system defined in `/constants/theme.ts`:

- **Colors**: Brand, semantic, and neutral colors with light/dark mode support
- **Typography**: Font sizes, weights, line heights, letter spacing
- **Spacing**: Consistent spacing scale (xs to 5xl)
- **Border Radius**: Corner radius values (none to full)
- **Shadows**: Elevation and shadow styles (none to 2xl)
- **Fonts**: Platform-specific font families

### Using Theme

```typescript
import { Colors, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function MyComponent() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={{ 
      backgroundColor: colors.background,
      padding: Spacing.md 
    }}>
      <Text style={{ 
        color: colors.text,
        fontSize: Typography.sizes.lg 
      }}>
        Hello World
      </Text>
    </View>
  );
}
```

## 🧩 Components

### Icons
SVG icon components with customizable size and color:

```typescript
import { SearchIcon } from '@/components/icons';

<SearchIcon width={24} height={24} color={colors.icon} />
```

### Forms
Dynamic form components based on JSON schema:

```typescript
import { DynamicForm } from '@/components/form';

<DynamicForm 
  schema={formSchema} 
  onSubmit={handleSubmit} 
/>
```

## 🔧 Development

### Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
```

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [React Native SVG](https://github.com/software-mansion/react-native-svg): Learn about SVG in React Native

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
