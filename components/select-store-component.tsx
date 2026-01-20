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
import { useBrandsData, type Store } from '@/hooks/use-brands-api';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function SelectStoreComponent() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

    // Fetch brands with nested stores
    const { data: brands, isLoading: isLoadingBrands } = useBrandsData();

    // Get all stores from brands
    const allStores = useMemo(() => {
        if (!brands || !Array.isArray(brands)) return [];

        if (!selectedBrandId) {
            // Return all stores from all brands
            return brands.flatMap(brand => brand.stores || []);
        }

        // Return stores from selected brand
        const selectedBrand = brands.find(brand => brand.id === selectedBrandId);
        return selectedBrand?.stores || [];
    }, [brands, selectedBrandId]);

    // Build brand options
    const brandOptions = useMemo(() => {
        if (!brands || !Array.isArray(brands)) {
            return [{ label: 'All Brands', value: 'all' }];
        }
        return [
            { label: 'All Brands', value: 'all' },
            ...brands.map(brand => ({ label: brand.name || 'No name', value: brand.id }))
        ];
    }, [brands]);

    // Filter stores based on search query
    const filteredStores = useMemo(() => {
        if (!allStores || allStores.length === 0) return [];

        return allStores.filter(store => {
            const matchesSearch =
                store.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                store.code?.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSearch;
        });
    }, [allStores, searchQuery]);

    const handleBrandChange = (value: string) => {
        setSelectedBrandId(value === 'all' ? null : value);
    };

    const handleStoreSelect = (store: Store) => {
        // Find the brand that contains this store
        let brandId = selectedBrandId;
        if (!brandId && brands) {
            const brand = brands.find(b => b.stores?.some(s => s.id === store.id));
            brandId = brand?.id || null;
        }

        // Navigate to questionnaires screen with brand_id and store_id
        router.push({
            pathname: '/questionnaires',
            params: {
                brandId: brandId || '',
                storeId: store.id,
                storeName: store.name || '',
            }
        });
    };

    const isLoading = isLoadingBrands;

    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <View style={styles.content}>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterTitle}>Brand</Text>
                    <CustomSelect
                        options={brandOptions}
                        value={selectedBrandId || 'all'}
                        onValueChange={handleBrandChange}
                        placeholder="Select brand"
                        accessibilityLabel="Select brand"
                    />
                </View>

                {/* Search Input */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={[
                            styles.searchInput,
                            {
                                backgroundColor: colors.background,
                                borderColor: NeutralColors.gray200,
                                color: colors.text,
                            }
                        ]}
                        placeholder="Search store..."
                        placeholderTextColor={NeutralColors.gray400}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Store List */}
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
                            {filteredStores.length} stores
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
                                        {store.name || 'No name'}
                                    </Text>
                                    {store.code && (
                                        <Text
                                            style={[
                                                styles.storeAddress,
                                                { color: NeutralColors.gray500 }
                                            ]}
                                            numberOfLines={1}
                                        >
                                            {store.code}
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
                        {filteredStores.length === 0 && !isLoading && (
                            <View style={styles.emptyState}>
                                <SearchIcon width={48} height={48} color={NeutralColors.gray300} />
                                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                                    No store found
                                </Text>
                                <Text style={[styles.emptySubtext, { color: NeutralColors.gray400 }]}>
                                    {selectedBrandId ? 'Try selecting a different brand or search with a different keyword' : 'Please select a brand to view stores'}
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                )}
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
    searchContainer: {
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.sm,
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
