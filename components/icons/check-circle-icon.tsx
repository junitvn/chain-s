import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface CheckCircleIconProps {
  width?: number;
  height?: number;
  color?: string;
  filled?: boolean;
}

/**
 * CheckCircleIcon - Checkmark in a circle
 * Used for selection indicators
 */
export function CheckCircleIcon({ 
  width = 24, 
  height = 24, 
  color = '#10B981',
  filled = true 
}: CheckCircleIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {filled ? (
        <>
          <Circle cx="12" cy="12" r="10" fill={color} />
          <Path 
            d="M8 12L11 15L16 9" 
            stroke="#FFFFFF" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <Path 
            d="M8 12L11 15L16 9" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </>
      )}
    </Svg>
  );
}

