/**
 * TypeScript types based on form.schema.json
 * These types define the structure for dynamic form generation
 */

export type FieldType = 'text' | 'textarea' | 'number' | 'radio' | 'checkbox' | 'slider' | 'file';

export type InputType = 'text' | 'email' | 'password' | 'tel' | 'url';

export type OptionsLayout = 'vertical' | 'horizontal' | 'dropdown';

export interface Option {
  label: string;
  value: string | number | boolean;
}

export interface BaseField {
  id: string;
  type: FieldType;
  label: string;
  helpText?: string;
  required?: boolean;
  hidden?: boolean;
}

export interface TextField extends BaseField {
  type: 'text' | 'textarea';
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  inputType?: InputType;
}

export interface NumberField extends BaseField {
  type: 'number';
  min?: number;
  max?: number;
}

export interface SliderField extends BaseField {
  type: 'slider';
  min: number;
  max: number;
  step?: number;
  showTicks?: boolean;
}

export interface OptionsField extends BaseField {
  type: 'radio' | 'checkbox';
  layout?: OptionsLayout;
  options: Option[];
}

export interface FileField extends BaseField {
  type: 'file';
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
}

export type FormField = TextField | NumberField | SliderField | OptionsField | FileField;

export interface FormSchema {
  formId: string;
  title: string;
  description?: string;
  submitLabel?: string;
  fields: FormField[];
}

export type FormValues = Record<string, string | number | boolean | boolean[] | null>;

export interface FormFieldProps<T extends FormField = FormField> {
  field: T;
  value: FormValues[string];
  onChange: (value: FormValues[string]) => void;
  error?: string;
}

