import { CustomHeader } from "@/components/custom-header";
import { BorderRadius, Colors, SemanticColors, Shadows, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

export default function Checklist() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <CustomHeader title="Kiểm tra cửa hàng" progressColor={colors.warning}
                totalSteps={12} currentStep={7} />
            {/* Checklist information */}
            <View style={styles.container}>
                <View style={[styles.card, { backgroundColor: SemanticColors.warning50 }]}>
                    {/* Store Information */}
                    <View style={styles.infoRow}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>
                            Cửa hàng
                        </Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            Sản Cafe Tô Ngọc Vân
                        </Text>
                    </View>

                    {/* Report Template */}
                    <View style={styles.infoRow}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>
                            Mẫu báo cáo
                        </Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            Mẫu QC F&B 2025
                        </Text>
                    </View>

                    {/* Report Date */}
                    <View style={styles.infoRow}>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>
                            Ngày báo cáo
                        </Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            14/11/2025
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});       