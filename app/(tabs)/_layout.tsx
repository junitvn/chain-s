import BottomSheet from '@gorhom/bottom-sheet';
import { router, Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { View } from 'react-native';

import { ActionBottomSheet } from '@/components/action-bottom-sheet';
import { CustomTabBar } from '@/components/custom-tab-bar';

export default function TabLayout() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleCheckStore = () => {
    router.push('/select-store');
  };

  const handleReportIssue = () => {
    console.log('Report issue pressed');
    // TODO: Navigate to report issue screen
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} bottomSheetRef={bottomSheetRef} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
          }}
        />
        <Tabs.Screen
          name="tickets"
          options={{
            title: 'Quản lý',
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Chat',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Cá nhân',
          }}
        />
      </Tabs>

      {/* Bottom Sheet at full page level */}
      <ActionBottomSheet
        ref={bottomSheetRef}
        onCheckStore={handleCheckStore}
        onReportIssue={handleReportIssue}
      />
    </View>
  );
}
