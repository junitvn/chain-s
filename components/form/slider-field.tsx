import { useState } from 'react';
import { StyleSheet, View, GestureResponderEvent } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '@/components/themed-text';
import type { FormFieldProps, SliderField } from './types';

export function SliderFieldComponent({
  field,
  value,
  onChange,
  error,
}: FormFieldProps<SliderField>) {
  const trackBg = useThemeColor(
    { light: '#E0E0E0', dark: '#404040' },
    'background'
  );
  const trackFillColor = '#2196F3';
  const thumbColor = '#2196F3';

  const [sliderWidth, setSliderWidth] = useState(0);
  
  const numValue = typeof value === 'number' ? value : field.min;
  const step = field.step ?? 1;
  const range = field.max - field.min;
  const percentage = ((numValue - field.min) / range) * 100;

  const calculateValue = (pageX: number, layoutX: number) => {
    const position = pageX - layoutX;
    const ratio = Math.max(0, Math.min(1, position / sliderWidth));
    let newValue = field.min + ratio * range;
    
    // Snap to step
    newValue = Math.round(newValue / step) * step;
    newValue = Math.max(field.min, Math.min(field.max, newValue));
    
    return newValue;
  };

  const handlePress = (event: GestureResponderEvent) => {
    const { pageX, locationX } = event.nativeEvent;
    const layoutX = pageX - locationX;
    const newValue = calculateValue(pageX, layoutX);
    onChange(newValue);
  };

  // Generate tick marks
  const ticks = [];
  if (field.showTicks) {
    const tickCount = Math.min(10, Math.floor(range / step) + 1);
    for (let i = 0; i < tickCount; i++) {
      const tickValue = field.min + (range / (tickCount - 1)) * i;
      const tickPosition = ((tickValue - field.min) / range) * 100;
      ticks.push({ value: tickValue, position: tickPosition });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.label}>
            {field.label}
            {field.required && <ThemedText style={styles.required}> *</ThemedText>}
          </ThemedText>
          {field.helpText && (
            <ThemedText style={styles.helpText}>{field.helpText}</ThemedText>
          )}
        </View>
        <View style={styles.valueContainer}>
          <ThemedText style={styles.value}>{numValue}</ThemedText>
        </View>
      </View>
      
      <View
        style={styles.sliderContainer}
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handlePress}
        onResponderMove={handlePress}
      >
        <View style={[styles.track, { backgroundColor: trackBg }]}>
          <View
            style={[
              styles.trackFill,
              { width: `${percentage}%`, backgroundColor: trackFillColor },
            ]}
          />
        </View>
        
        <View
          style={[
            styles.thumb,
            {
              left: `${percentage}%`,
              backgroundColor: thumbColor,
            },
          ]}
        />

        {field.showTicks && (
          <View style={styles.ticksContainer}>
            {ticks.map((tick, index) => (
              <View
                key={index}
                style={[styles.tick, { left: `${tick.position}%` }]}
              />
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.rangeLabels}>
        <ThemedText style={styles.rangeLabel}>{field.min}</ThemedText>
        <ThemedText style={styles.rangeLabel}>{field.max}</ThemedText>
      </View>
      
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  required: {
    color: '#E53935',
  },
  helpText: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  valueContainer: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 48,
    alignItems: 'center',
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: -12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  ticksContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tick: {
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    marginLeft: -1,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rangeLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  error: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
});

