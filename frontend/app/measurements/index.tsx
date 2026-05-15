import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MeasurementsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>طريقة إدخال القياسات</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/measurements/standard-sizes')}
      >
        <Ionicons name="grid-outline" size={32} color="#e94560" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>مقاسات قياسية</Text>
          <Text style={styles.cardDesc}>S - M - L - XL - 2XL - 3XL - 4XL</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/measurements/custom')}
      >
        <Ionicons name="create-outline" size={32} color="#e94560" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>قياسات مخصصة</Text>
          <Text style={styles.cardDesc}>إدخال القياسات يدويًا أو باستخدام AI</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginBottom: 30 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  cardContent: { marginLeft: 16, flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 4 },
  cardDesc: { fontSize: 13, color: '#888' },
});
