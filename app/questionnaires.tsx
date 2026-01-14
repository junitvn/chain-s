import { CustomHeader } from '@/components/custom-header';
import { ChevronRightIcon, ClipboardCheckIcon, SearchIcon } from '@/components/icons';
import {
    BorderRadius,
    Colors,
    NeutralColors,
    Shadows,
    Spacing,
    Typography
} from '@/constants/theme';
import { useQuestionnairesByStore, type Questionnaire } from '@/hooks/use-brands-api';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function QuestionnairesScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const params = useLocalSearchParams<{ brandId: string; storeId: string; storeName: string }>();

    const [searchQuery, setSearchQuery] = useState('');

    // Fetch questionnaires by store
    const { data: questionnaires, isLoading } = useQuestionnairesByStore(
        params.storeId
    );

    // Filter questionnaires based on search query
    const filteredQuestionnaires = (questionnaires || []).filter((questionnaire) => {
        const matchesSearch =
            questionnaire.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (typeof questionnaire.description === 'string' &&
                questionnaire.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
    });

    const handleQuestionnaireSelect = (questionnaire: Questionnaire) => {
        // Navigate to checklist with questionnaire ID
        router.push({
            pathname: '/checklist',
            params: {
                questionnaireId: questionnaire.id,
                store: params.storeName,
                storeId: params.storeId,
            },
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <CustomHeader
                title={params.storeName || 'Câu hỏi khảo sát'}
                subtitle="Chọn mẫu báo cáo để bắt đầu kiểm tra"
            />

            {/* Search Input */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={[
                        styles.searchInput,
                        {
                            backgroundColor: colors.background,
                            borderColor: NeutralColors.gray200,
                            color: colors.text,
                        },
                    ]}
                    placeholder="Tìm kiếm mẫu báo cáo..."
                    placeholderTextColor={NeutralColors.gray400}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Questionnaires List */}
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.tint} />
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Results Count */}
                    <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
                        {filteredQuestionnaires.length} mẫu báo cáo
                    </Text>

                    {/* Questionnaire Cards */}
                    {filteredQuestionnaires.map((questionnaire: Questionnaire) => (
                        <TouchableOpacity
                            key={questionnaire.id}
                            style={[
                                styles.questionnaireCard,
                                {
                                    backgroundColor: colors.background,
                                    borderColor: NeutralColors.gray200,
                                },
                            ]}
                            onPress={() => handleQuestionnaireSelect(questionnaire)}
                            activeOpacity={0.7}
                        >
                            {/* Questionnaire Icon */}
                            <View style={styles.questionnaireIconContainer}>
                                <ClipboardCheckIcon
                                    width={24}
                                    height={24}
                                    color={NeutralColors.gray500}
                                />
                            </View>

                            {/* Questionnaire Info */}
                            <View style={styles.questionnaireInfo}>
                                <Text
                                    style={[
                                        styles.questionnaireName,
                                        { color: NeutralColors.gray900 },
                                    ]}
                                    numberOfLines={2}
                                >
                                    {questionnaire.title || 'Không có tên'}
                                </Text>
                                {questionnaire.description && (
                                    <Text
                                        style={[
                                            styles.questionnaireDescription,
                                            { color: NeutralColors.gray500 },
                                        ]}
                                        numberOfLines={2}
                                    >
                                        {questionnaire.description}
                                    </Text>
                                )}
                            </View>

                            {/* Chevron Right Icon */}
                            <View style={styles.chevronContainer}>
                                <ChevronRightIcon
                                    width={20}
                                    height={20}
                                    color={NeutralColors.gray400}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* Empty State */}
                    {filteredQuestionnaires.length === 0 && !isLoading && (
                        <View style={styles.emptyState}>
                            <SearchIcon width={48} height={48} color={NeutralColors.gray300} />
                            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                                Không tìm thấy mẫu báo cáo
                            </Text>
                            <Text style={[styles.emptySubtext, { color: NeutralColors.gray400 }]}>
                                Thử tìm kiếm với từ khóa khác
                            </Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    searchInput: {
        height: 48,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        fontSize: Typography.sizes.base,
        ...Shadows.sm,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing['3xl'],
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.md,
        paddingTop: Spacing.sm,
        gap: Spacing.sm,
        paddingBottom: Spacing.md,
    },
    resultsCount: {
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.medium,
        marginHorizontal: Spacing.sm,
        marginTop: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    questionnaireCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 2,
        gap: Spacing.md,
        ...Shadows.sm,
    },
    questionnaireIconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionnaireInfo: {
        flex: 1,
        gap: Spacing.xs,
    },
    questionnaireName: {
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.semibold,
        lineHeight: Typography.sizes.base * Typography.lineHeights.tight,
    },
    questionnaireDescription: {
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.normal,
        lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
    },
    chevronContainer: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing['3xl'],
        gap: Spacing.md,
    },
    emptyText: {
        fontSize: Typography.sizes.lg,
        fontWeight: Typography.weights.semibold,
    },
    emptySubtext: {
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.normal,
    },
});
