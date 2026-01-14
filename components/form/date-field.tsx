import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { DateField, FormFieldProps, FormValues } from './types';

// Lazy import DatePicker to handle module loading errors
let DatePicker: any = null;
let datePickerAvailable = false;
let datePickerChecked = false;

// Check if native module is available (lazy initialization)
const getDatePicker = () => {
  if (datePickerChecked) {
    return { DatePicker, available: datePickerAvailable };
  }
  
  datePickerChecked = true;
  
  try {
    // Try to require the module
    const datePickerModule = require('react-native-date-picker');
    DatePicker = datePickerModule.default || datePickerModule;
    datePickerAvailable = true;
  } catch (error) {
    console.warn('react-native-date-picker not available:', error);
    datePickerAvailable = false;
    DatePicker = null;
  }
  
  return { DatePicker, available: datePickerAvailable };
};

export function DateFieldComponent({
  field,
  value,
  onChange,
  error,
}: FormFieldProps<DateField>) {
  const parseDate = (val: FormValues[string]): Date | null => {
    if (!val) return null;
    if (val instanceof Date) return val;
    if (typeof val === 'string') {
      const parsed = new Date(val);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(() => parseDate(value));
  const [showPicker, setShowPicker] = useState(false);

  // Update selectedDate when value prop changes
  useEffect(() => {
    const parsed = parseDate(value);
    if (parsed?.getTime() !== selectedDate?.getTime()) {
      setSelectedDate(parsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor(
    { light: '#F5F5F5', dark: '#2A2A2A' },
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

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return dayjs(date).format('DD/MM/YYYY');
  };

  const handleOpenPicker = () => {
    const { DatePicker: Picker, available } = getDatePicker();
    if (!available || !Picker) {
      Alert.alert(
        'Date Picker Unavailable',
        'The date picker requires a development build. Please rebuild the app:\n\nFor iOS: npx expo run:ios\nFor Android: npx expo run:android',
        [{ text: 'OK' }]
      );
      return;
    }
    setShowPicker(true);
  };

  const handleClosePicker = () => {
    setShowPicker(false);
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    onChange(date.toISOString());
    setShowPicker(false);
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
      
      <TouchableOpacity
        onPress={handleOpenPicker}
        activeOpacity={0.7}
        accessibilityLabel={`Select date for ${field.label}`}
        accessibilityRole="button"
      >
        <View
          style={[
            styles.input,
            {
              backgroundColor,
              borderColor,
            },
          ]}
          pointerEvents="none"
        >
          <TextInput
            style={[
              styles.inputText,
              {
                color: selectedDate ? textColor : placeholderColor,
              },
            ]}
            value={formatDate(selectedDate)}
            placeholder={field.placeholder || 'Select date'}
            placeholderTextColor={placeholderColor}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      {showPicker && (() => {
        const { DatePicker: Picker, available } = getDatePicker();
        if (!available || !Picker) return null;
        return (
          <Picker
            modal
            open={showPicker}
            date={selectedDate || new Date()}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={handleClosePicker}
            minimumDate={field.minDate}
            maximumDate={field.maxDate}
            title={field.label || 'Select Date'}
          />
        );
      })()}
      
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
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
  },
  error: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
});
