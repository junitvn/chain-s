/**
 * Figma Helper Utilities
 * 
 * Helper functions for working with Figma MCP data and converting
 * Figma design tokens to React Native styles.
 */

import { Colors, Spacing, BorderRadius, Typography, Shadows } from '@/constants/theme';

/**
 * Convert Figma color object to hex string
 * Figma colors are in RGBA format with values 0-1
 */
export function figmaColorToHex(color: { r: number; g: number; b: number; a?: number }): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  
  if (color.a !== undefined && color.a < 1) {
    const a = Math.round(color.a * 255);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
  }
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert Figma color to rgba string
 */
export function figmaColorToRgba(color: { r: number; g: number; b: number; a?: number }): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a ?? 1;
  
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Convert hex color to RGBA
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Get the closest spacing value from the theme
 */
export function getClosestSpacing(value: number): number {
  const spacingValues = Object.values(Spacing).filter((v): v is number => typeof v === 'number');
  return spacingValues.reduce((prev, curr) => 
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Get the closest border radius from the theme
 */
export function getClosestBorderRadius(value: number): number {
  const radiusValues = Object.values(BorderRadius).filter((v): v is number => typeof v === 'number');
  return radiusValues.reduce((prev, curr) => 
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Get the closest font size from the theme
 */
export function getClosestFontSize(value: number): number {
  const fontSizes = Object.values(Typography.sizes);
  return fontSizes.reduce((prev, curr) => 
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Convert Figma font weight to React Native font weight
 */
export function figmaFontWeightToRN(weight: number): string {
  if (weight <= 300) return Typography.weights.light;
  if (weight <= 400) return Typography.weights.normal;
  if (weight <= 500) return Typography.weights.medium;
  if (weight <= 600) return Typography.weights.semibold;
  if (weight <= 700) return Typography.weights.bold;
  if (weight <= 800) return Typography.weights.extrabold;
  return Typography.weights.black;
}

/**
 * Convert Figma text alignment to React Native text align
 */
export function figmaTextAlignToRN(align: string): 'left' | 'center' | 'right' | 'justify' {
  switch (align.toLowerCase()) {
    case 'left':
      return 'left';
    case 'center':
      return 'center';
    case 'right':
      return 'right';
    case 'justified':
      return 'justify';
    default:
      return 'left';
  }
}

/**
 * Convert Figma constraints to React Native flex properties
 */
export function figmaConstraintsToFlex(constraints: {
  horizontal?: string;
  vertical?: string;
}) {
  const style: any = {};
  
  if (constraints.horizontal === 'STRETCH') {
    style.alignSelf = 'stretch';
  }
  
  if (constraints.vertical === 'STRETCH') {
    style.flex = 1;
  }
  
  return style;
}

/**
 * Convert Figma shadow to React Native shadow style
 */
export function figmaShadowToRN(shadow: {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: { r: number; g: number; b: number; a: number };
}) {
  return {
    shadowColor: figmaColorToHex(shadow.color),
    shadowOffset: {
      width: shadow.x,
      height: shadow.y,
    },
    shadowOpacity: shadow.color.a,
    shadowRadius: shadow.blur / 2,
    elevation: Math.round(shadow.blur / 2), // Android elevation
  };
}

/**
 * Get shadow style from theme by name
 */
export function getShadowStyle(size: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md') {
  return Shadows[size];
}

/**
 * Parse Figma node ID from URL
 */
export function parseNodeIdFromUrl(url: string): string | null {
  const match = url.match(/node-id=([^&]+)/);
  return match ? match[1].replace(/-/g, ':') : null;
}

/**
 * Parse Figma file key from URL
 */
export function parseFileKeyFromUrl(url: string): string | null {
  const match = url.match(/file\/([^/]+)/);
  return match ? match[1] : null;
}

/**
 * Generate kebab-case filename from Figma node name
 */
export function generateFileName(nodeName: string, extension: string = 'png'): string {
  return nodeName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') + '.' + extension;
}

/**
 * Generate PascalCase component name from Figma node name
 */
export function generateComponentName(nodeName: string): string {
  return nodeName
    .split(/[^a-zA-Z0-9]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Check if a node should be converted to an icon (SVG)
 */
export function shouldConvertToIcon(node: {
  type: string;
  width: number;
  height: number;
}): boolean {
  const isVector = ['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'POLYGON'].includes(node.type);
  const isSmall = node.width <= 100 && node.height <= 100;
  
  return isVector && isSmall;
}

/**
 * Check if a node should be downloaded as an image
 */
export function shouldDownloadAsImage(node: {
  type: string;
  fills?: any[];
}): boolean {
  if (node.type === 'RECTANGLE' && node.fills) {
    return node.fills.some((fill: any) => fill.type === 'IMAGE');
  }
  
  return false;
}

/**
 * Get color scheme colors based on theme
 */
export function getThemedColors(colorScheme: 'light' | 'dark' = 'light') {
  return Colors[colorScheme];
}

/**
 * Create a style object from Figma layout properties
 */
export function figmaLayoutToStyle(layout: {
  width?: number | string;
  height?: number | string;
  x?: number;
  y?: number;
  layoutMode?: string;
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
}) {
  const style: any = {};
  
  // Size
  if (layout.width) style.width = layout.width;
  if (layout.height) style.height = layout.height;
  
  // Position (for absolute positioning)
  if (layout.x !== undefined) style.left = layout.x;
  if (layout.y !== undefined) style.top = layout.y;
  
  // Flex layout
  if (layout.layoutMode === 'HORIZONTAL') {
    style.flexDirection = 'row';
  } else if (layout.layoutMode === 'VERTICAL') {
    style.flexDirection = 'column';
  }
  
  // Alignment
  if (layout.primaryAxisAlignItems === 'CENTER') {
    style.justifyContent = 'center';
  } else if (layout.primaryAxisAlignItems === 'SPACE_BETWEEN') {
    style.justifyContent = 'space-between';
  }
  
  if (layout.counterAxisAlignItems === 'CENTER') {
    style.alignItems = 'center';
  }
  
  // Padding
  if (layout.paddingLeft !== undefined || layout.paddingRight !== undefined ||
      layout.paddingTop !== undefined || layout.paddingBottom !== undefined) {
    style.paddingLeft = layout.paddingLeft ?? 0;
    style.paddingRight = layout.paddingRight ?? 0;
    style.paddingTop = layout.paddingTop ?? 0;
    style.paddingBottom = layout.paddingBottom ?? 0;
  }
  
  // Gap (item spacing)
  if (layout.itemSpacing !== undefined) {
    style.gap = layout.itemSpacing;
  }
  
  return style;
}

/**
 * Format color palette for documentation
 */
export function formatColorPalette(colors: Record<string, string>): string {
  return Object.entries(colors)
    .map(([name, value]) => `  ${name}: '${value}',`)
    .join('\n');
}

/**
 * Validate hex color
 */
export function isValidHexColor(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex);
}

/**
 * Get contrast ratio between two colors (for accessibility)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ].map(val => {
      val /= 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if text color has sufficient contrast with background (WCAG AA)
 */
export function hasGoodContrast(textColor: string, backgroundColor: string): boolean {
  const ratio = getContrastRatio(textColor, backgroundColor);
  return ratio >= 4.5; // WCAG AA standard for normal text
}

