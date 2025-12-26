import { CustomHeader } from '@/components/custom-header';
import { CustomSelect } from '@/components/custom-select';
import { ChevronRightIcon, MapPinIcon, SearchIcon } from '@/components/icons';
import {
    BorderRadius,
    Colors,
    NeutralColors,
    Shadows,
    Spacing,
    Typography
} from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Store {
    id: string;
    name: string;
    address: string;
    region: string;
    distance?: string;
}

// Mock store data - Replace with real data from API
const MOCK_STORES: Store[] = [
    {
        id: '1',
        name: 'Sắn Cafe Tô Ngọc Vân',
        address: '123 Tô Ngọc Vân, Tây Hồ',
        region: 'Khu vực Tây Hồ',
        distance: '1.2 km',
    },
    {
        id: '2',
        name: 'Highlands Coffee Trần Duy Hưng',
        address: '45 Trần Duy Hưng, Cầu Giấy',
        region: 'Khu vực Cầu Giấy',
        distance: '2.5 km',
    },
    {
        id: '3',
        name: 'The Coffee House Láng Hạ',
        address: '78 Láng Hạ, Đống Đa',
        region: 'Khu vực Đống Đa',
        distance: '3.1 km',
    },
    {
        id: '4',
        name: 'Phúc Long Coffee & Tea',
        address: '234 Nguyễn Trãi, Thanh Xuân',
        region: 'Khu vực Thanh Xuân',
        distance: '4.2 km',
    },
    {
        id: '5',
        name: 'Starbucks Vincom Center',
        address: '191 Bà Triệu, Hai Bà Trưng',
        region: 'Khu vực Hai Bà Trưng',
        distance: '5.0 km',
    },
    {
        id: '6',
        name: 'Cộng Cà Phê Điện Biên Phủ',
        address: '56 Điện Biên Phủ, Ba Đình',
        region: 'Khu vực Ba Đình',
        distance: '1.8 km',
    },
    {
        id: '7',
        name: 'Trung Nguyên Legend',
        address: '89 Xã Đàn, Đống Đa',
        region: 'Khu vực Đống Đa',
        distance: '3.5 km',
    },
    {
        id: '8',
        name: 'Milano Coffee Hoàng Cầu',
        address: '12 Hoàng Cầu, Đống Đa',
        region: 'Khu vực Đống Đa',
        distance: '2.9 km',
    },
];

export default function SelectStore() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState<string>('all');

    // Get unique regions from stores
    const uniqueRegions = Array.from(new Set(MOCK_STORES.map(store => store.region)));
    const regionOptions = [
        { label: 'Tất cả khu vực', value: 'all' },
        ...uniqueRegions.map(region => ({ label: region, value: region }))
    ];

    // Filter stores based on search query and selected region
    const filteredStores = MOCK_STORES.filter(store => {
        const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.region.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRegion = selectedRegion === 'all' || store.region === selectedRegion;

        return matchesSearch && matchesRegion;
    });

    const handleStoreSelect = (store: Store) => {
        // Navigate to store details page or main tab
        // You can customize this navigation based on your needs
        router.push('/checklist');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
            <CustomHeader
                title="Lựa chọn cửa hàng"
                subtitle="Chọn cửa hàng để bắt đầu kiểm tra"
            />

            <View style={styles.content}>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterTitle}>Khu vực</Text>
                    <CustomSelect
                        options={regionOptions}
                        value={selectedRegion}
                        onValueChange={setSelectedRegion}
                        placeholder="Chọn khu vực"
                        accessibilityLabel="Chọn khu vực"
                    />
                </View>

                {/* Store List */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Results Count */}
                    <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
                        {filteredStores.length} cửa hàng
                    </Text>

                    {/* Store Cards */}
                    {filteredStores.map((store) => (
                        <TouchableOpacity
                            key={store.id}
                            style={[
                                styles.storeCard,
                                {
                                    backgroundColor: colors.background,
                                    borderColor: NeutralColors.gray200,
                                },
                            ]}
                            onPress={() => handleStoreSelect(store)}
                            activeOpacity={0.7}
                        >
                            {/* Store Icon */}
                            <View style={styles.storeIconContainer}>
                                <MapPinIcon
                                    width={24}
                                    height={24}
                                    color={NeutralColors.gray500}
                                />
                            </View>

                            {/* Store Info */}
                            <View style={styles.storeInfo}>
                                <Text
                                    style={[
                                        styles.storeName,
                                        { color: NeutralColors.gray900 }
                                    ]}
                                    numberOfLines={1}
                                >
                                    {store.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.storeAddress,
                                        { color: NeutralColors.gray500 }
                                    ]}
                                    numberOfLines={1}
                                >
                                    {store.address}
                                </Text>
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
                    {filteredStores.length === 0 && (
                        <View style={styles.emptyState}>
                            <SearchIcon width={48} height={48} color={NeutralColors.gray300} />
                            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                                Không tìm thấy cửa hàng
                            </Text>
                            <Text style={[styles.emptySubtext, { color: NeutralColors.gray400 }]}>
                                Thử tìm kiếm với từ khóa khác
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: Spacing.md,
    },
    // Select Container
    selectContainer: {
        marginHorizontal: Spacing.md,
        marginBottom: Spacing.md,
    },
    filterContainer: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        gap: Spacing.sm,
    },
    filterTitle: {
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.medium,
    },
    // Results Count
    resultsCount: {
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.medium,
        marginHorizontal: Spacing.sm,
        marginTop: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    // Store List Styles
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.md,
        paddingTop: Spacing.sm,
        gap: Spacing.sm,
        paddingBottom: Spacing.md,
    },
    // Store Card Styles
    storeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 2,
        gap: Spacing.md,
        ...Shadows.sm,
    },
    storeIconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    storeInfo: {
        flex: 1,
        gap: Spacing.xs,
    },
    storeName: {
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.semibold,
        lineHeight: Typography.sizes.base * Typography.lineHeights.tight,
    },
    storeAddress: {
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.normal,
        lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
    },
    storeMetadata: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        flexWrap: 'wrap',
    },
    regionBadge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: BorderRadius.sm,
    },
    regionText: {
        fontSize: Typography.sizes.xs,
        fontWeight: Typography.weights.medium,
        lineHeight: Typography.sizes.xs * Typography.lineHeights.normal,
    },
    distanceText: {
        fontSize: Typography.sizes.xs,
        fontWeight: Typography.weights.normal,
    },
    chevronContainer: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Empty State
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