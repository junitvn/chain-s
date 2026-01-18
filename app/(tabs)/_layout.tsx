import BottomSheet from '@gorhom/bottom-sheet';
import { router, Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { View } from 'react-native';

import { ActionBottomSheet } from '@/components/action-bottom-sheet';
import { CustomTabBar } from '@/components/custom-tab-bar';
import { UserRole } from '@/lib/ability';
import { useAuthStore } from '@/stores/auth-store';
import HomeScreen from '.';

export default function TabLayout() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { session, getEffectiveUser } = useAuthStore();

  const handleCheckStore = () => {
    router.push('/select-store');
  };

  const handleReportIssue = () => {
    console.log('Report issue pressed');
    // TODO: Navigate to report issue screen
  };

  const effectiveUser = getEffectiveUser();
  const isStaff = effectiveUser?.role?.toLowerCase() === UserRole.STAFF.toLowerCase();

  return (
    <View style={{ flex: 1 }}>
      {isStaff ? (
        // Staff should only see HomeScreen (with header)
        <HomeScreen showHeader={true} />
      ) : (
        // Other roles should access tabs
        <>
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
              {/* <Tabs.Screen
              name="tickets"
              options={{
                title: 'Quản lý',
              }}
            /> */}
            {/* <Tabs.Screen
              name="notifications"
              options={{
                title: 'Chat',
              }}
            /> */}
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Profile',
              }}
            />
          </Tabs>

          {/* Bottom Sheet at full page level */}
          <ActionBottomSheet
            ref={bottomSheetRef}
            onCheckStore={handleCheckStore}
            onReportIssue={handleReportIssue}
          />
        </>
      )}
    </View>
  );
}
