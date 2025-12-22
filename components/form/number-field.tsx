import { StyleSheet, TextInput, View, Pressable } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '@/components/themed-text';
import type { FormFieldProps, NumberField } from './types';

export function NumberFieldComponent({
  field,
  value,
  onChange,
  error,
}: FormFieldProps<NumberField>) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor(
    { light: '#F5F5F5', dark: '#2A2A2A' },
    'background'
  );
  const borderColor = error ? '#E53935' : useThemeColor(
    { light: '#E0E0E0', dark: '#404040' },
    'background'
  );
  const buttonBg = useThemeColor(
    { light: '#E8E8E8', dark: '#3A3A3A' },
    'background'
  );

  const numValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;

  const handleIncrement = () => {
    const newValue = numValue + 1;
    if (field.max === undefined || newValue <= field.max) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = numValue - 1;
    if (field.min === undefined || newValue >= field.min) {
      onChange(newValue);
    }
  };

  const handleTextChange = (text: string) => {
    const parsed = parseFloat(text);
    if (text === '' || text === '-') {
      onChange(text);
    } else if (!isNaN(parsed)) {
      onChange(parsed);
    }
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
      
      <View style={[styles.inputContainer, { borderColor }]}>
        <Pressable
          style={[styles.button, { backgroundColor: buttonBg }]}
          onPress={handleDecrement}
        >
          <ThemedText style={styles.buttonText}>−</ThemedText>
        </Pressable>
        
        <TextInput
          style={[
            styles.input,
            {
              color: textColor,
              backgroundColor,
            },
          ]}
          value={String(value ?? '')}
          onChangeText={handleTextChange}
          keyboardType="numeric"
          textAlign="center"
        />
        
        <Pressable
          style={[styles.button, { backgroundColor: buttonBg }]}
          onPress={handleIncrement}
        >
          <ThemedText style={styles.buttonText}>+</ThemedText>
        </Pressable>
      </View>
      
      {(field.min !== undefined || field.max !== undefined) && (
        <ThemedText style={styles.range}>
          {field.min !== undefined && `Min: ${field.min}`}
          {field.min !== undefined && field.max !== undefined && ' · '}
          {field.max !== undefined && `Max: ${field.max}`}
        </ThemedText>
      )}
      
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    fontWeight: '600',
  },
  range: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  error: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
});

