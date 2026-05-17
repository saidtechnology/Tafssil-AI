import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PatternTypeScreen() {
  const { measurements } = useLocalSearchParams<{ measurements?: string }>();

  const goToSimple = () => {
    const params: Record<string, string> = {};
    if (measurements) params.measurements = measurements;
    router.push({ pathname: '/patterns/simple', params });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختر نوع الباترون</Text>

      <TouchableOpacity style={styles.card} onPress={goToSimple}>
        <Ionicons name="layers-outline" size={36} color="#e94560" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>باترون بسيط</Text>
          <Text style={styles.cardDesc}>قميص، عباية، قفطان، وتزيد...</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#555" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/patterns/professional')}
      >
        <Ionicons name="color-wand-outline" size={36} color="#e94560" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>باترون احترافي</Text>
          <Text style={styles.cardDesc}>تحديد القصة، الياقة، الكم، الطول...</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#555" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginBottom: 30 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#16213e',
    padding: 20, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#0f3460',
  },
  cardContent: { marginLeft: 16, flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 4 },
  cardDesc: { fontSize: 13, color: '#888' },
});
