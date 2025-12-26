/**
 * Theme configuration for the app.
 * Colors are defined for both light and dark modes.
 * This file is automatically updated when importing designs from Figma.
 */

import { Platform } from 'react-native';

/**
 * Brand Colors - Primary brand identity colors from Figma
 * Update these when importing new Figma designs
 */
export const BrandColors = {
  primary: '#0a7ea4',
  primaryDark: '#0a6d8f',
  primaryLight: '#3d9db8',
  secondary: '#6366F1',
  secondaryDark: '#4F46E5',
  secondaryLight: '#818CF8',
  accent: '#EC4899',
  accentDark: '#DB2777',
  accentLight: '#F472B6',
  // Header colors from Figma (node: 60:65827)
  headerOverlay: '#A63000',      // Dark orange/red overlay
  headerGradient: '#411700',      // Dark brown gradient end
};

/**
 * Semantic Colors - Status and feedback colors
 */
export const SemanticColors = {
  success: '#10B981',
  successDark: '#059669',
  successLight: '#34D399',
  warning: '#F97316',      // From Figma: Warning/warning.500
  warning50: '#FFF7ED',    // From Figma: Warning/warning.50
  warningDark: '#D97706',
  warningLight: '#FBBF24',
  error: '#EF4444',        // From Figma: Error/error.500
  errorDark: '#DC2626',
  errorLight: '#F87171',
  info: '#3B82F6',
  infoDark: '#2563EB',
  infoLight: '#60A5FA',
};

/**
 * Neutral Colors - Grays and neutral tones
 */
export const NeutralColors = {
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#737373',      // From Figma: Text/text.500
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#171717',      // From Figma: Text/text.900
  gray950: '#030712',
  // Muted colors from Figma
  muted400: '#A3A3A3',     // From Figma: Muted/muted.400 (tab bar inactive)
  // Border colors from Figma
  borderGray: '#D8DEE9',   // From Figma: Tab bar border
};

/**
 * Theme Colors - Applied to light and dark modes
 */
const tintColorLight = BrandColors.primary;
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // Text colors
    text: '#11181C',
    textSecondary: '#687076',
    textTertiary: '#9CA3AF',
    textInverse: '#FFFFFF',
    text50: '#FAFAFA',        // From Figma: Text/text.50 (light text on dark bg)

    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    backgroundTertiary: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',

    // Border colors
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
    borderDark: '#D0D0D0',

    // UI colors
    tint: tintColorLight,
    icon: '#687076',
    iconSecondary: '#9CA3AF',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // Brand colors
    primary: BrandColors.primary,
    primaryDark: BrandColors.primaryDark,
    primaryLight: BrandColors.primaryLight,
    secondary: BrandColors.secondary,
    accent: BrandColors.accent,

    // Semantic colors
    success: SemanticColors.success,
    warning: SemanticColors.warning,
    error: SemanticColors.error,
    info: SemanticColors.info,

    // Interactive states
    hover: 'rgba(0, 0, 0, 0.05)',
    pressed: 'rgba(0, 0, 0, 0.1)',
    disabled: '#E0E0E0',
    disabledText: '#9CA3AF',

    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.3)',
  },
  dark: {
    // Text colors
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    textTertiary: '#6B7280',
    textInverse: '#11181C',
    text50: '#FAFAFA',        // From Figma: Text/text.50 (light text on dark bg)

    // Background colors
    background: '#151718',
    backgroundSecondary: '#1E1E1E',
    backgroundTertiary: '#252525',
    surface: '#1E1E1E',
    surfaceElevated: '#2A2A2A',

    // Border colors
    border: '#2A2A2A',
    borderLight: '#353535',
    borderDark: '#1F1F1F',

    // UI colors
    tint: tintColorDark,
    icon: '#9BA1A6',
    iconSecondary: '#6B7280',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // Brand colors (adjusted for dark mode)
    primary: BrandColors.primaryLight,
    primaryDark: BrandColors.primary,
    primaryLight: '#5DB3CC',
    secondary: BrandColors.secondaryLight,
    accent: BrandColors.accentLight,

    // Semantic colors (adjusted for dark mode)
    success: SemanticColors.successLight,
    warning: SemanticColors.warningLight,
    warning50: SemanticColors.warning50,
    error: SemanticColors.errorLight,
    info: SemanticColors.infoLight,

    // Interactive states
    hover: 'rgba(255, 255, 255, 0.05)',
    pressed: 'rgba(255, 255, 255, 0.1)',
    disabled: '#2A2A2A',
    disabledText: '#6B7280',

    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.7)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
};

/**
 * Typography - Font sizes, weights, and line heights from Figma
 */
export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  weights: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },
  lineHeights: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
};

/**
 * Spacing - Consistent spacing scale from Figma
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
  '5xl': 96,
};

/**
 * Border Radius - Corner radius values from Figma
 */
export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

/**
 * Shadows - Elevation and shadow styles
 */
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
};

/**
 * Fonts - Platform-specific font families
 */
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

/**
 * Animation - Timing and easing values
 */
export const Animation = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

/**
 * Breakpoints - Responsive design breakpoints
 */
export const Breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
};
