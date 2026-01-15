import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { FormHeader } from './form-header';
import type { FormFieldProps, OptionsField } from './types';

export function CheckboxFieldComponent({
  field,
  value,
  onChange,
  error,
}: FormFieldProps<OptionsField>) {
  const borderColor = useThemeColor(
    { light: '#D0D0D0', dark: '#505050' },
    'background'
  );
  const selectedColor = useThemeColor(
    { light: Colors.light.primary, dark: Colors.dark.primary },
    'background'
  );
  const pressedBg = useThemeColor(
    { light: '#F0F0F0', dark: '#2A2A2A' },
    'background'
  );

  const isHorizontal = field.layout === 'horizontal';

  // Value is expected to be an array of selected option values
  const selectedValues = Array.isArray(value) ? value : [];

  const handleToggle = (optionValue: string | number | boolean) => {
    const isSelected = selectedValues.includes(optionValue as boolean);

    if (isSelected) {
      onChange(selectedValues.filter((v) => v !== optionValue));
    } else {
      onChange([...selectedValues, optionValue as boolean]);
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader title={field.label} helpText={field.helpText} required={field.required} />

      <View style={[styles.optionsContainer, isHorizontal && styles.horizontal]}>
        {field.options.map((option, index) => {
          const isSelected = selectedValues.includes(option.value as boolean);

          return (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.option,
                isHorizontal && styles.horizontalOption,
                pressed && { backgroundColor: pressedBg },
              ]}
              onPress={() => handleToggle(option.value)}
            >
              <View
                style={[
                  styles.checkbox,
                  { borderColor: isSelected ? selectedColor : borderColor },
                  isSelected && { backgroundColor: selectedColor },
                ]}
              >
                {isSelected && (
                  <ThemedText style={styles.checkmark}>✓</ThemedText>
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
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  horizontalOption: {
    marginRight: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: -2
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

