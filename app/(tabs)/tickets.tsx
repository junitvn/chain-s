import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { TicketComponent } from '@/components/ticket-component';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';

export default function TicketsScreen() {
  const backgroundColor = useThemeColor({}, 'background');

  const handleTicketPress = (title: string) => {
    Alert.alert('Ticket Pressed', `You pressed: ${title}`);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.header}>
            Ticket Components
          </ThemedText>
          <ThemedText type="default" style={styles.description}>
            Examples of the TicketComponent from Figma design
          </ThemedText>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              High Priority Ticket
            </ThemedText>
            <TicketComponent
              location="Sắn Cafe Tô Ngọc Vân"
              title="Báo sửa chữa"
              category="Kỹ thuật & Bảo trì Thiết bị"
              priority="Cao"
              time="5p"
              onPress={() => handleTicketPress('Báo sửa chữa')}
            />
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Medium Priority Ticket
            </ThemedText>
            <TicketComponent
              location="Highlands Coffee Trần Duy Hưng"
              title="Kiểm tra hệ thống điện"
              category="Kỹ thuật & Bảo trì Thiết bị"
              priority="Trung bình"
              time="15p"
              onPress={() => handleTicketPress('Kiểm tra hệ thống điện')}
            />
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Low Priority Ticket
            </ThemedText>
            <TicketComponent
              location="The Coffee House Láng Hạ"
              title="Bảo dưỡng định kỳ"
              category="Bảo trì"
              priority="Thấp"
              time="1h"
              onPress={() => handleTicketPress('Bảo dưỡng định kỳ')}
            />
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Non-Interactive Ticket
            </ThemedText>
            <TicketComponent
              location="Phúc Long Coffee & Tea"
              title="Vệ sinh máy móc"
              category="Vệ sinh"
              priority="Trung bình"
              time="30p"
            />
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Custom Icon Color
            </ThemedText>
            <TicketComponent
              location="Starbucks Vincom Center"
              title="Sửa chữa khẩn cấp"
              category="Khẩn cấp"
              priority="Cao"
              time="2p"
              iconColor="#DC2626"
              onPress={() => handleTicketPress('Sửa chữa khẩn cấp')}
            />
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  container: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xs,
  },
  description: {
    marginBottom: Spacing.md,
    opacity: 0.7,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.xs,
  },
});

