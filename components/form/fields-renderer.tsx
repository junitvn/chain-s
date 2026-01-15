import React from 'react';

import { CheckboxFieldComponent } from './checkbox-field';
import { DateFieldComponent } from './date-field';
import { FileFieldComponent } from './file-field';
import { NumberFieldComponent } from './number-field';
import { RadioFieldComponent } from './radio-field';
import { SliderFieldComponent } from './slider-field';
import { TextFieldComponent } from './text-field';
import type {
  DateField,
  FileField,
  FormField,
  FormValues,
  NumberField,
  OptionsField,
  SliderField,
  TextField,
} from './types';

interface FormFieldsRendererProps {
  fields: FormField[];
  values: FormValues;
  onChange: (fieldId: string, value: FormValues[string]) => void;
  errors?: Record<string, string>;
}

export function FormFieldsRenderer({
  fields,
  values,
  onChange,
  errors = {},
}: FormFieldsRendererProps) {
  return (
    <>
      {fields.map((field) => {
        if (field.hidden) return null;

        const commonProps = {
          field,
          value: values[field.id],
          onChange: (value: FormValues[string]) => onChange(field.id, value),
          error: errors[field.id],
        };

        switch (field.type) {
          case 'text':
          case 'textarea':
          case 'rich_text':
            return (
              <TextFieldComponent
                key={field.id}
                {...commonProps}
                field={field as TextField}
              />
            );

          case 'number':
            return (
              <NumberFieldComponent
                key={field.id}
                {...commonProps}
                field={field as NumberField}
              />
            );

          case 'radio':
            return (
              <RadioFieldComponent
                key={field.id}
                {...commonProps}
                field={field as OptionsField}
              />
            );

          case 'checkbox':
            return (
              <CheckboxFieldComponent
                key={field.id}
                {...commonProps}
                field={field as OptionsField}
              />
            );

          case 'slider':
            return (
              <SliderFieldComponent
                key={field.id}
                {...commonProps}
                field={field as SliderField}
              />
            );

          case 'file':
            return (
              <FileFieldComponent
                key={field.id}
                {...commonProps}
                field={field as FileField}
              />
            );

          case 'date':
            return (
              <DateFieldComponent
                key={field.id}
                {...commonProps}
                field={field as DateField}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
