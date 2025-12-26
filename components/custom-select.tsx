import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    BorderRadius,
    BrandColors,
    Colors,
    NeutralColors,
    Shadows,
    Spacing,
    Typography,
} from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CheckCircleIcon, ChevronDownIcon } from '@/components/icons';

export interface SelectOption {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: SelectOption[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    accessibilityLabel?: string;
}

export function CustomSelect({
    options,
    value,
    onValueChange,
    placeholder = 'Chọn...',
    accessibilityLabel,
}: CustomSelectProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    const handleSelect = (optionValue: string) => {
        onValueChange(optionValue);
        setIsOpen(false);
    };

    return (
        <>
            {/* Select Trigger */}
            <TouchableOpacity
                style={[
                    styles.selectTrigger,
                    {
                        backgroundColor: colors.background,
                        borderColor: NeutralColors.gray200,
                    },
                ]}
                onPress={() => setIsOpen(true)}
                activeOpacity={0.7}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
            >
                <Text
                    style={[
                        styles.selectText,
                        {
                            color: selectedOption
                                ? NeutralColors.gray900
                                : NeutralColors.gray400,
                        },
                    ]}
                    numberOfLines={1}
                >
                    {displayText}
                </Text>
                <ChevronDownIcon
                    width={20}
                    height={20}
                    color={NeutralColors.gray500}
                />
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsOpen(false)}
                >
                    <View
                        style={[
                            styles.modalContent,
                            { backgroundColor: colors.background },
                        ]}
                        onStartShouldSetResponder={() => true}
                    >
                        {/* Modal Header */}
                        <View
                            style={[
                                styles.modalHeader,
                                { borderBottomColor: NeutralColors.gray200 },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modalTitle,
                                    { color: colors.text },
                                ]}
                            >
                                {placeholder}
                            </Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setIsOpen(false)}
                                accessibilityLabel="Đóng"
                                accessibilityRole="button"
                            >
                                <Text
                                    style={[
                                        styles.closeButtonText,
                                        { color: BrandColors.primary },
                                    ]}
                                >
                                    Đóng
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Options List */}
                        <ScrollView
                            style={styles.optionsList}
                            showsVerticalScrollIndicator={false}
                        >
                            {options.map((option) => {
                                const isSelected = option.value === value;
                                return (
                                    <TouchableOpacity
                                        key={option.value}
                                        style={[
                                            styles.optionItem,
                                            isSelected && {
                                                backgroundColor:
                                                    colors.backgroundSecondary,
                                            },
                                        ]}
                                        onPress={() => handleSelect(option.value)}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                {
                                                    color: isSelected
                                                        ? BrandColors.primary
                                                        : colors.text,
                                                    fontWeight: isSelected
                                                        ? Typography.weights.semibold
                                                        : Typography.weights.normal,
                                                },
                                            ]}
                                        >
                                            {option.label}
                                        </Text>
                                        {isSelected && (
                                            <CheckCircleIcon
                                                width={20}
                                                height={20}
                                                color={BrandColors.primary}
                                            />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    // Select Trigger Styles
    selectTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 48,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        ...Shadows.sm,
    },
    selectText: {
        flex: 1,
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.normal,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.md,
    },
    modalContent: {
        width: '100%',
        maxHeight: '70%',
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        ...Shadows.lg,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.md,
        borderBottomWidth: 1,
    },
    modalTitle: {
        fontSize: Typography.sizes.lg,
        fontWeight: Typography.weights.semibold,
    },
    closeButton: {
        padding: Spacing.xs,
    },
    closeButtonText: {
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.semibold,
    },
    optionsList: {
        maxHeight: 400,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.md,
        minHeight: 56,
    },
    optionText: {
        flex: 1,
        fontSize: Typography.sizes.base,
    },
});

