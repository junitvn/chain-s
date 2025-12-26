import { ChevronRightIcon, ClipboardCheckIcon, CloseIcon, LightbulbIcon } from '@/components/icons';
import { NeutralColors, SemanticColors } from '@/constants/theme';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActionBottomSheetProps {
  onCheckStore?: () => void;
  onReportIssue?: () => void;
}

export const ActionBottomSheet = forwardRef<BottomSheet, ActionBottomSheetProps>(
  ({ onCheckStore, onReportIssue }, ref) => {
    const snapPoints = useMemo(() => ['75%'], []);

    const handleSheetClose = () => {
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.close();
      }
    };

    const handleCheckStore = () => {
      handleSheetClose();
      onCheckStore?.();
    };

    const handleReportIssue = () => {
      handleSheetClose();
      onReportIssue?.();
    };

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={StyleSheet.flatten([styles.bottomSheetBackground as object])}
        handleIndicatorStyle={StyleSheet.flatten([styles.handleIndicator as object])}
      >
        <BottomSheetView style={StyleSheet.flatten([styles.contentContainer as object])}>
          {/* Header */}
          <View style={StyleSheet.flatten([styles.header as object])}>
            <View style={StyleSheet.flatten([styles.closeButton as object])} />
            <Text style={StyleSheet.flatten([styles.headerTitle as object])}>Thao tác</Text>
            <TouchableOpacity
              onPress={handleSheetClose}
              style={StyleSheet.flatten([styles.closeButton as object])}
              accessibilityLabel="Close"
              accessibilityRole="button"
            >
              <CloseIcon width={24} height={24} color="#566681" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={StyleSheet.flatten([styles.menuContainer as object])}>
            {/* Check Store */}
            <TouchableOpacity
              style={StyleSheet.flatten([styles.menuItem as object])}
              onPress={handleCheckStore}
              accessibilityLabel="Kiểm tra cửa hàng"
              accessibilityRole="button"
            >
              <View style={StyleSheet.flatten([styles.menuItemContent as object])}>
                <ClipboardCheckIcon width={36} height={36} color={SemanticColors.warning} />
                <Text style={StyleSheet.flatten([styles.menuItemTitle as object])}>Kiểm tra cửa hàng</Text>
              </View>
              <ChevronRightIcon width={24} height={24} color={NeutralColors.muted400} />
            </TouchableOpacity>

            {/* Report Issue */}
            <TouchableOpacity
              style={StyleSheet.flatten([styles.menuItem as object])}
              onPress={handleReportIssue}
              accessibilityLabel="Báo cáo vấn đề"
              accessibilityRole="button"
            >
              <View style={StyleSheet.flatten([styles.menuItemContent as object])}>
                <LightbulbIcon width={36} height={36} color={SemanticColors.warning} />
                <View style={StyleSheet.flatten([styles.menuItemTextContainer as object])}>
                  <Text style={StyleSheet.flatten([styles.menuItemTitle as object])}>Báo cáo vấn đề</Text>
                  <Text style={StyleSheet.flatten([styles.menuItemSubtitle as object])}>Báo cáo hỏng hóc, sữa chữa,...</Text>
                </View>
              </View>
              <ChevronRightIcon width={24} height={24} color="#525252" />
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

ActionBottomSheet.displayName = 'ActionBottomSheet';

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleIndicator: {
    backgroundColor: '#E0E0E0',
    width: 36,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
    color: '#171717',
    fontFamily: 'SF Pro',
    textAlign: 'center',
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingLeft: 12,
    paddingRight: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: NeutralColors.muted400,
    borderRadius: 8,
    gap: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  menuItemTextContainer: {
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    color: '#0A0A0A',
    fontFamily: 'SF Pro',
  },
  menuItemSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: '#8E8E93',
    fontFamily: 'SF Pro',
  },
});

