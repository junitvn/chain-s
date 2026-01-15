import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FormHeader } from './form-header';
import type { FormFieldProps, TextField } from './types';

export function TextFieldComponent({
  field,
  value,
  onChange,
  error,
}: FormFieldProps<TextField>) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor(
    { light: '#fff', dark: '#2A2A2A' },
    'background'
  );
  const borderColor = error ? '#E53935' : useThemeColor(
    { light: '#E0E0E0', dark: '#404040' },
    'background'
  );
  const placeholderColor = useThemeColor(
    { light: '#9E9E9E', dark: '#6E6E6E' },
    'text'
  );

  const isTextarea = field.type === 'textarea';

  const getKeyboardType = () => {
    switch (field.inputType) {
      case 'email':
        return 'email-address';
      case 'tel':
        return 'phone-pad';
      case 'url':
        return 'url';
      default:
        return 'default';
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader title={field.label} helpText={field.helpText} required={field.required} />

      <TextInput
        style={[
          styles.input,
          isTextarea && styles.textarea,
          {
            color: textColor,
            backgroundColor,
            borderColor,
          },
        ]}
        value={value as string ?? ''}
        onChangeText={onChange}
        placeholder={field.placeholder}
        placeholderTextColor={placeholderColor}
        keyboardType={getKeyboardType()}
        secureTextEntry={field.inputType === 'password'}
        autoCapitalize={field.inputType === 'email' ? 'none' : 'sentences'}
        autoCorrect={field.inputType !== 'email' && field.inputType !== 'password'}
        maxLength={field.maxLength}
        multiline={isTextarea}
        numberOfLines={isTextarea ? 4 : 1}
        textAlignVertical={isTextarea ? 'top' : 'center'}
      />

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
  },
  required: {
    color: '#E53935',
  },
  helpText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginTop: 6,
  },
  textarea: {
    minHeight: 120,
    paddingTop: 14,
  },
  error: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
});

