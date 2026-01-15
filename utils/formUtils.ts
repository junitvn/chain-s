import { NumberField, OptionsField, TextField } from "@/components/form";
import { DateField, FormField, RichTextField } from "@/components/form/types";
import { Question } from "@/hooks/use-brands-api";

export function questionToFormField(question: Question): FormField | null {
    const baseField = {
        id: question.id,
        label: question.label,
        helpText: question.description || undefined,
        required: question.required,
        hidden: false,
    };

    const questionType = question.type.toUpperCase();

    switch (questionType) {
        case 'TEXT':
            return {
                ...baseField,
                type: 'text' as const,
                placeholder: question.placeholder || undefined,
            } as TextField;

        case 'DATE':
            return {
                ...baseField,
                type: 'date' as const,
                placeholder: question.placeholder || undefined,
            } as DateField;

        case 'TEXTAREA':
            return {
                ...baseField,
                type: 'textarea' as const,
                placeholder: question.placeholder || undefined,
            } as TextField;

        case 'RICH_TEXT':
            return {
                ...baseField,
                type: 'rich_text' as const,
                placeholder: question.placeholder || undefined,
            } as RichTextField;

        case 'SELECT':
            return {
                ...baseField,
                type: 'radio' as const,
                options: question.options || [],
            } as OptionsField;

        case 'CHECKBOX':
            return {
                ...baseField,
                type: 'checkbox' as const,
                options: question.options || [],
            } as OptionsField;

        case 'NUMBER':
            return {
                ...baseField,
                type: 'number' as const,
                min: question.min ?? undefined,
                max: question.max ?? undefined,
            } as NumberField;

        default:
            return null;
    }
}