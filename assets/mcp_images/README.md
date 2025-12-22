# MCP Images

This folder contains images downloaded from Figma using the Figma MCP (Model Context Protocol).

## 📁 Organization

Organize images in subdirectories by purpose:

```
/mcp_images
  /screens        - Screen-specific images
  /components     - Component images
  /icons          - Raster icons (if any)
  /backgrounds    - Background images
  /illustrations  - Illustrations and graphics
```

## 📝 Naming Convention

Use underscore-case for all image filenames:
- ❌ `hero-banner.png`
- ❌ `user-avatar-placeholder.png`
- ❌ `product-thumbnail.jpg`
- ❌ `HeroBanner.png`
- ✅ `user_avatar_placeholder.png`

## 🖼️ Image Formats

- **PNG**: Use for images with transparency, icons, graphics
- **JPG**: Use for photos and images without transparency
- **WebP**: Use for web when supported (smaller file size)

## 📐 Resolution

Provide multiple resolutions for different screen densities:
- `image.png` - 1x (standard)
- `image@2x.png` - 2x (retina)
- `image@3x.png` - 3x (high-res)

React Native will automatically select the appropriate resolution.

## 💾 File Size

Keep image file sizes reasonable:
- Thumbnails: < 50KB
- Standard images: < 200KB
- Hero/banner images: < 500KB
- Full-screen backgrounds: < 1MB

Use image compression tools before adding to the project.

## 🎨 Usage

Import and use images with `expo-image`:

```typescript
import { Image } from 'expo-image';

<Image
  source={require('@/assets/mcp_images/hero-banner.png')}
  style={{ width: 300, height: 200 }}
  contentFit="cover"
  transition={200}
/>
```

## 📚 Documentation

When adding images from Figma, document:
1. Figma file key
2. Node ID
3. Original Figma node name
4. Date downloaded
5. Purpose/usage

Example:
```
hero-banner.png
- Figma File: abc123xyz
- Node ID: 1234:5678
- Original Name: "Hero / Banner / Desktop"
- Downloaded: 2025-12-22
- Usage: Home screen hero section
```

## 🔄 Updates

When updating images from Figma:
1. Keep the same filename
2. Update the documentation
3. Test on all platforms (iOS, Android, Web)
4. Verify image quality and file size

## 🚫 .gitignore

This folder is NOT ignored by git. All images are committed to the repository.

If you want to ignore certain images (e.g., temporary test images), add them to `.gitignore`:

```
# In .gitignore
assets/mcp_images/temp-*
assets/mcp_images/test-*
```

## 📖 Related Documentation

- [Figma MCP Guide](../../FIGMA_MCP_GUIDE.md)
- [Quick Reference](../../FIGMA_QUICK_REFERENCE.md)
- [Expo Image Docs](https://docs.expo.dev/versions/latest/sdk/image/)

