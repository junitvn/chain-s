import { useState, useCallback } from 'react';
import { StyleSheet, View, Pressable, ScrollView } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '@/components/themed-text';
import { TextFieldComponent } from './text-field';
import { NumberFieldComponent } from './number-field';
import { RadioFieldComponent } from './radio-field';
import { CheckboxFieldComponent } from './checkbox-field';
import { SliderFieldComponent } from './slider-field';
import { FileFieldComponent } from './file-field';
import type {
  FormSchema,
  FormField,
  FormValues,
  TextField,
  NumberField,
  SliderField,
  OptionsField,
  FileField,
} from './types';

interface DynamicFormProps {
  schema: FormSchema;
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onValuesChange?: (values: FormValues) => void;
}

export function DynamicForm({
  schema,
  initialValues = {},
  onSubmit,
  onValuesChange,
}: DynamicFormProps) {
  const [values, setValues] = useState<FormValues>(() => {
    // Initialize with default values from schema
    const defaults: FormValues = {};
    schema.fields.forEach((field) => {
      if (field.type === 'slider') {
        defaults[field.id] = (field as SliderField).min;
      } else if (field.type === 'checkbox') {
        defaults[field.id] = [];
      } else if (field.type === 'number') {
        defaults[field.id] = 0;
      } else {
        defaults[field.id] = '';
      }
    });
    return { ...defaults, ...initialValues };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const buttonBg = useThemeColor(
    { light: '#2196F3', dark: '#1976D2' },
    'background'
  );
  const cardBg = useThemeColor(
    { light: '#FFFFFF', dark: '#1E1E1E' },
    'background'
  );

  const handleChange = useCallback(
    (fieldId: string, value: FormValues[string]) => {
      setValues((prev) => {
        const newValues = { ...prev, [fieldId]: value };
        onValuesChange?.(newValues);
        return newValues;
      });
      // Clear error when user starts typing
      if (errors[fieldId]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldId];
          return newErrors;
        });
      }
    },
    [errors, onValuesChange]
  );

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    schema.fields.forEach((field) => {
      if (field.hidden) return;

      const value = values[field.id];

      // Required validation
      if (field.required) {
        if (value === undefined || value === null || value === '') {
          newErrors[field.id] = `${field.label} is required`;
          return;
        }
        if (field.type === 'checkbox' && Array.isArray(value) && value.length === 0) {
          newErrors[field.id] = `Please select at least one option`;
          return;
        }
      }

      // Type-specific validation
      if (field.type === 'text' || field.type === 'textarea') {
        const textField = field as TextField;
        const strValue = String(value || '');

        if (textField.minLength && strValue.length < textField.minLength) {
          newErrors[field.id] = `Minimum ${textField.minLength} characters required`;
        } else if (textField.maxLength && strValue.length > textField.maxLength) {
          newErrors[field.id] = `Maximum ${textField.maxLength} characters allowed`;
        } else if (textField.pattern && strValue) {
          const regex = new RegExp(textField.pattern);
          if (!regex.test(strValue)) {
            newErrors[field.id] = `Invalid format`;
          }
        }
      }

      if (field.type === 'number') {
        const numField = field as NumberField;
        const numValue = typeof value === 'number' ? value : parseFloat(String(value));

        if (!isNaN(numValue)) {
          if (numField.min !== undefined && numValue < numField.min) {
            newErrors[field.id] = `Minimum value is ${numField.min}`;
          } else if (numField.max !== undefined && numValue > numField.max) {
            newErrors[field.id] = `Maximum value is ${numField.max}`;
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(values);
    }
  };

  const renderField = (field: FormField) => {
    if (field.hidden) return null;

    const commonProps = {
      value: values[field.id],
      onChange: (value: FormValues[string]) => handleChange(field.id, value),
      error: errors[field.id],
    };

    switch (field.type) {
      case 'text':
      case 'textarea':
        return (
          <TextFieldComponent
            key={field.id}
            field={field as TextField}
            {...commonProps}
          />
        );

      case 'number':
        return (
          <NumberFieldComponent
            key={field.id}
            field={field as NumberField}
            {...commonProps}
          />
        );

      case 'radio':
        return (
          <RadioFieldComponent
            key={field.id}
            field={field as OptionsField}
            {...commonProps}
          />
        );

      case 'checkbox':
        return (
          <CheckboxFieldComponent
            key={field.id}
            field={field as OptionsField}
            {...commonProps}
          />
        );

      case 'slider':
        return (
          <SliderFieldComponent
            key={field.id}
            field={field as SliderField}
            {...commonProps}
          />
        );

      case 'file':
        return (
          <FileFieldComponent
            key={field.id}
            field={field as FileField}
            {...commonProps}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={[styles.container, { backgroundColor: cardBg }]}>
        <ThemedText style={styles.title}>{schema.title}</ThemedText>
        {schema.description && (
          <ThemedText style={styles.description}>{schema.description}</ThemedText>
        )}

        <View style={styles.fields}>
          {schema.fields.map(renderField)}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            { backgroundColor: buttonBg, opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={handleSubmit}
        >
          <ThemedText style={styles.submitText}>
            {schema.submitLabel || 'Submit'}
          </ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 24,
  },
  fields: {
    marginBottom: 8,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

