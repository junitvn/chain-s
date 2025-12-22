import { StyleSheet, View, Pressable } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '@/components/themed-text';
import type { FormFieldProps, OptionsField } from './types';

export function RadioFieldComponent({
  field,
  value,
  onChange,
  error,
}: FormFieldProps<OptionsField>) {
  const borderColor = useThemeColor(
    { light: '#D0D0D0', dark: '#505050' },
    'background'
  );
  const selectedColor = '#2196F3';
  const pressedBg = useThemeColor(
    { light: '#F0F0F0', dark: '#2A2A2A' },
    'background'
  );

  const isHorizontal = field.layout === 'horizontal';

  const handleSelect = (optionValue: string | number | boolean) => {
    onChange(optionValue);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>
        {field.label}
        {field.required && <ThemedText style={styles.required}> *</ThemedText>}
      </ThemedText>
      
      {field.helpText && (
        <ThemedText style={styles.helpText}>{field.helpText}</ThemedText>
      )}
      
      <View style={[styles.optionsContainer, isHorizontal && styles.horizontal]}>
        {field.options.map((option, index) => {
          const isSelected = value === option.value;
          
          return (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.option,
                isHorizontal && styles.horizontalOption,
                pressed && { backgroundColor: pressedBg },
              ]}
              onPress={() => handleSelect(option.value)}
            >
              <View
                style={[
                  styles.radio,
                  { borderColor: isSelected ? selectedColor : borderColor },
                ]}
              >
                {isSelected && (
                  <View style={[styles.radioInner, { backgroundColor: selectedColor }]} />
                )}
              </View>
              <ThemedText style={styles.optionLabel}>{option.label}</ThemedText>
            </Pressable>
          );
        })}
      </View>
      
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  required: {
    color: '#E53935',
  },
  helpText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6,
  },
  optionsContainer: {
    gap: 8,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  horizontalOption: {
    marginRight: 16,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  optionLabel: {
    fontSize: 16,
  },
  error: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
});

