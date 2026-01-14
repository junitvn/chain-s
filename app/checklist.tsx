import { CustomHeader } from "@/components/custom-header";
import {
    CheckboxFieldComponent,
    NumberFieldComponent,
    RadioFieldComponent,
    TextFieldComponent,
    type FormField,
    type FormValues,
    type NumberField,
    type OptionsField,
    type TextField,
} from "@/components/form";
import { Collapsible } from "@/components/ui/collapsible";
import { Gap } from "@/components/ui/gap";
import { BorderRadius, Colors, SemanticColors, Shadows, Spacing, Typography } from "@/constants/theme";
import { useQuestionnaire, type Question } from "@/hooks/use-brands-api";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

// Helper function to convert Question to FormField
function questionToFormField(question: Question): FormField | null {
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
        case 'DATE':
            return {
                ...baseField,
                type: 'text' as const,
                placeholder: question.placeholder || undefined,
            } as TextField;

        case 'TEXTAREA':
            return {
                ...baseField,
                type: 'textarea' as const,
                placeholder: question.placeholder || undefined,
            } as TextField;

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

export default function Checklist() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const params = useLocalSearchParams<{ questionnaireId: string, store: string, storeId: string }>();
    const [generalNote, setGeneralNote] = useState('');
    const [formValues, setFormValues] = useState<FormValues>({});

    // Fetch questionnaire data
    const { data: questionnaireData, isLoading } = useQuestionnaire(params.questionnaireId || null);

    // Handle form value changes
    const handleFieldChange = useCallback((fieldId: string, value: FormValues[string]) => {
        setFormValues((prev) => ({
            ...prev,
            [fieldId]: value,
        }));
    }, []);

    // Convert questions to form fields
    const formFields = useMemo(() => {
        if (!questionnaireData?.data?.questions) return [];
        return questionnaireData.data.questions
            .map(questionToFormField)
            .filter((field): field is FormField => field !== null)
            .sort((a, b) => {
                const questionA = questionnaireData.data.questions.find(q => q.id === a.id);
                const questionB = questionnaireData.data.questions.find(q => q.id === b.id);
                return (questionA?.order || 0) - (questionB?.order || 0);
            });
    }, [questionnaireData?.data?.questions]);

    // Calculate progress based on answered questions
    const progress = useMemo(() => {
        if (formFields.length === 0) return { currentStep: 0, totalSteps: 0 };
        
        const answeredCount = formFields.filter((field) => {
            const value = formValues[field.id];
            
            if (value === undefined || value === null) return false;
            
            switch (field.type) {
                case 'text':
                case 'textarea':
                    return typeof value === 'string' && value.trim().length > 0;
                case 'radio':
                    return value !== '' && value !== null;
                case 'checkbox':
                    return Array.isArray(value) && value.length > 0;
                case 'number':
                    return typeof value === 'number';
                default:
                    return false;
            }
        }).length;

        return {
            currentStep: answeredCount,
            totalSteps: formFields.length,
        };
    }, [formFields, formValues]);

    // Format current date
    const currentDate = useMemo(() => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    }, []);

    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.tint} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <CustomHeader 
                title="Kiểm tra cửa hàng" 
                progressColor={colors.warning}
                totalSteps={progress.totalSteps} 
                currentStep={progress.currentStep} 
            />
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.card, { backgroundColor: SemanticColors.warning50 }]}>
                    {/* Store Information */}
                    {params.store && (
                        <View style={styles.infoRow}>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Cửa hàng
                            </Text>
                            <Text style={[styles.value, { color: colors.text }]}>
                                {params.store}
                            </Text>
                        </View>
                    )}

                    {/* Report Template */}
                    <View style={styles.infoRow}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>
                            Mẫu báo cáo
                        </Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            {questionnaireData?.data?.title || 'Không có tên'}
                        </Text>
                    </View>

                    {/* Report Date */}
                    <View style={styles.infoRow}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>
                            Ngày báo cáo
                        </Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            {questionnaireData?.data?.createdAt}
                            {/* {moment(questionnaireData?.data?.createdAt).format('DD/MM/YYYY')} */}
                        </Text>
                    </View>
                </View>
                <Gap size={Spacing.md} />
                {/* General notes */}
                <View>
                    <Collapsible title="Ghi chú chung">
                        <TextInput
                            style={[
                                styles.textArea,
                                {
                                    backgroundColor: colors.background,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }
                            ]}
                            value={generalNote}
                            onChangeText={setGeneralNote}
                            placeholder={`Ví dụ: "Cần chú trọng khu vực ngoài trời và nhà vệ sinh."`}
                            placeholderTextColor={colors.textSecondary}
                            multiline
                            maxLength={500}
                            numberOfLines={6}
                            textAlignVertical="top"
                        />
                    </Collapsible>
                </View>

                <Gap size={Spacing.md} />

                {/* Questions */}
                {formFields.map((field) => {
                    const value = formValues[field.id];
                    const commonProps = {
                        field,
                        value,
                        onChange: (newValue: FormValues[string]) => handleFieldChange(field.id, newValue),
                        error: undefined,
                    };

                    switch (field.type) {
                        case 'text':
                        case 'textarea':
                            return (
                                <TextFieldComponent
                                    key={field.id}
                                    {...commonProps}
                                    field={field as TextField}
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
                        case 'number':
                            return (
                                <NumberFieldComponent
                                    key={field.id}
                                    {...commonProps}
                                    field={field as NumberField}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        padding: Spacing.md,
    },
    card: {
        borderRadius: BorderRadius.lg,
        padding: Spacing.sm,
        paddingHorizontal: Spacing.md,
        ...Shadows.sm,
    },
    infoRow: {
        paddingVertical: Spacing.sm,
    },
    label: {
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.normal,
        marginBottom: Spacing.xs,
    },
    value: {
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.normal,
    },
    divider: {
        height: 1,
        marginVertical: Spacing.xs,
    },
    textArea: {
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        padding: Spacing.md,
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.normal,
        minHeight: 120,
    },
});       