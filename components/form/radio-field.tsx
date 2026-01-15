import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { FormHeader } from './form-header';
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
  const selectedColor = useThemeColor(
    { light: Colors.light.primary, dark: Colors.dark.primary },
    'background'
  );
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
      <FormHeader title={field.label} helpText={field.helpText} required={field.required} />

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
    marginBottom: 16,
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

