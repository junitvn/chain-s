/**
 * Example Icon Component
 * 
 * This is a template for creating icon components from Figma vector graphics.
 * Replace the SVG paths with actual paths from your Figma design.
 * 
 * Usage:
 * import { ExampleIcon } from '@/components/icons/example-icon';
 * 
 * <ExampleIcon width={24} height={24} color="#000000" />
 */

import * as React from 'react';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

interface IconProps {
  /**
   * Width of the icon in pixels
   * @default 24
   */
  width?: number;
  
  /**
   * Height of the icon in pixels
   * @default 24
   */
  height?: number;
  
  /**
   * Color of the icon (hex, rgb, or named color)
   * @default '#000000'
   */
  color?: string;
  
  /**
   * Optional opacity value
   * @default 1
   */
  opacity?: number;
}

/**
 * Example icon component demonstrating SVG conversion from Figma
 */
export function ExampleIcon({ 
  width = 24, 
  height = 24, 
  color = '#000000',
  opacity = 1,
}: IconProps) {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none"
      opacity={opacity}
    >
      {/* Replace these paths with actual SVG paths from Figma */}
      <Path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 17L12 22L22 17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 12L12 17L22 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * Example of a filled icon (using fill instead of stroke)
 */
export function ExampleFilledIcon({ 
  width = 24, 
  height = 24, 
  color = '#000000',
  opacity = 1,
}: IconProps) {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      opacity={opacity}
    >
      <Circle cx="12" cy="12" r="10" fill={color} />
      <Path
        d="M9 12L11 14L15 10"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * Example of a complex icon with multiple elements
 */
export function ExampleComplexIcon({ 
  width = 24, 
  height = 24, 
  color = '#000000',
  opacity = 1,
}: IconProps) {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      opacity={opacity}
    >
      <G>
        <Rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
        <Path
          d="M9 9L15 15M15 9L9 15"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}

