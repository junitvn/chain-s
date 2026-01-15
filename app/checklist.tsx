import { CustomHeader } from "@/components/custom-header";
import {
    FormFieldsRenderer,
    type FormField,
    type FormValues,
} from "@/components/form";
import { Collapsible } from "@/components/ui/collapsible";
import { Gap } from "@/components/ui/gap";
import { BorderRadius, Colors, SemanticColors, Shadows, Spacing, Typography } from "@/constants/theme";
import { useQuestionnaire, useSubmitChecklist } from "@/hooks/use-brands-api";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/stores/auth-store";
import { questionToFormField } from "@/utils/formUtils";
import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

// Helper function to convert Question to FormField


export default function Checklist() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const router = useRouter();
    const params = useLocalSearchParams<{ questionnaireId: string, store: string, storeId: string }>();
    const [generalNote, setGeneralNote] = useState('');
    const [formValues, setFormValues] = useState<FormValues>({});
    const { session } = useAuthStore();
    const submitMutation = useSubmitChecklist();

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
                case 'date':
                    return value !== '' && value !== null;
                case 'text':
                case 'textarea':
                case 'rich_text':
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

    // Validate all required fields are filled
    const isFormValid = useMemo(() => {
        if (!questionnaireData?.data?.questions) return false;

        return questionnaireData.data.questions.every((question) => {
            if (!question.required) return true;

            const field = formFields.find((f) => f.id === question.id);
            if (!field) return true;

            const value = formValues[field.id];

            if (value === undefined || value === null) return false;

            switch (field.type) {
                case 'date':
                    return value !== '' && value !== null;
                case 'text':
                case 'textarea':
                case 'rich_text':
                    return typeof value === 'string' && value.trim().length > 0;
                case 'radio':
                    return value !== '' && value !== null;
                case 'checkbox':
                    return Array.isArray(value) && value.length > 0;
                case 'number':
                    return typeof value === 'number' && !isNaN(value);
                default:
                    return false;
            }
        });
    }, [formFields, formValues, questionnaireData?.data?.questions]);

    // Handle form submission
    const handleSubmit = useCallback(async () => {
        if (!isFormValid) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ các trường bắt buộc');
            return;
        }

        if (!params.questionnaireId || !params.storeId) {
            Alert.alert('Lỗi', 'Thiếu thông tin questionnaire hoặc store');
            return;
        }

        if (!session?.user?.language) {
            Alert.alert('Lỗi', 'Không tìm thấy ngôn ngữ người dùng');
            return;
        }

        // Map form values to question keys
        const submissionData: Record<string, any> = {};
        questionnaireData?.data?.questions.forEach((question) => {
            const field = formFields.find((f) => f.id === question.id);
            if (field) {
                const value = formValues[field.id];
                if (value !== undefined && value !== null) {
                    submissionData[question.key] = value;
                }
            }
        });

        try {
            await submitMutation.mutateAsync({
                questionnaireId: params.questionnaireId,
                storeId: params.storeId,
                language: session.user.language,
                data: submissionData,
                isTest: false,
            });

            Alert.alert('Thành công', 'Đã gửi báo cáo thành công', [
                {
                    text: 'OK',
                    onPress: () => router.back(),
                },
            ]);
        } catch (error) {
            Alert.alert('Lỗi', error instanceof Error ? error.message : 'Không thể gửi báo cáo');
        }
    }, [isFormValid, params, session, formValues, formFields, questionnaireData, submitMutation, router]);

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
                            {questionnaireData?.data?.createdAt
                                ? dayjs(questionnaireData.data.createdAt).format('DD/MM/YYYY HH:mm')
                                : 'N/A'}
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
                <FormFieldsRenderer
                    fields={formFields}
                    values={formValues}
                    onChange={handleFieldChange}
                />

                <Gap size={Spacing.lg} />

                {/* Submit Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.submitButton,
                        {
                            backgroundColor: isFormValid ? colors.tint : colors.border,
                            opacity: pressed ? 0.8 : 1,
                        },
                    ]}
                    onPress={handleSubmit}
                    disabled={!isFormValid || submitMutation.isPending}
                >
                    {submitMutation.isPending ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>
                            Gửi báo cáo
                        </Text>
                    )}
                </Pressable>

                <Gap size={Spacing.md} />
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
    submitButton: {
        borderRadius: BorderRadius.lg,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
        ...Shadows.md,
    },
    submitButtonText: {
        fontSize: Typography.sizes.lg,
        fontWeight: Typography.weights.semibold,
        color: '#FFFFFF',
    },
});       