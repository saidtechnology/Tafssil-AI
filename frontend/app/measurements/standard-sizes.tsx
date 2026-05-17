import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

const SIZE_DATA: Record<string, Record<string, number>> = {
  'S': { chest: 88, waist: 74, hips: 94, shoulder: 40, arm: 58, inseam: 76, neck: 37 },
  'M': { chest: 94, waist: 80, hips: 100, shoulder: 42, arm: 60, inseam: 78, neck: 39 },
  'L': { chest: 100, waist: 86, hips: 106, shoulder: 44, arm: 62, inseam: 80, neck: 41 },
  'XL': { chest: 106, waist: 92, hips: 112, shoulder: 46, arm: 63, inseam: 82, neck: 43 },
  '2XL': { chest: 112, waist: 98, hips: 118, shoulder: 48, arm: 64, inseam: 83, neck: 45 },
  '3XL': { chest: 118, waist: 104, hips: 124, shoulder: 50, arm: 65, inseam: 84, neck: 47 },
  '4XL': { chest: 124, waist: 110, hips: 130, shoulder: 52, arm: 66, inseam: 85, neck: 49 },
};

export default function StandardSizesScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>اختر المقاس القياسي</Text>
      <Text style={styles.subtitle}>اضغط على المقاس لملء الجدول تلقائيًا</Text>

      <View style={styles.sizeGrid}>
        {SIZES.map((size) => (
          <TouchableOpacity
            key={size}
            style={[styles.sizeBtn, selected === size && styles.sizeBtnSelected]}
            onPress={() => setSelected(size)}
          >
            <Text style={[styles.sizeText, selected === size && styles.sizeTextSelected]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected && (
        <View style={styles.table}>
          <Text style={styles.tableTitle}>القياسات: {selected}</Text>
          {Object.entries(SIZE_DATA[selected]).map(([key, val]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{key}</Text>
              <Text style={styles.value}>{val} cm</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => router.push('/patterns')}
          >
            <Text style={styles.confirmText}>تأكيد واختيار الباترون</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  sizeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 24 },
  sizeBtn: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: '#16213e', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#0f3460',
  },
  sizeBtnSelected: { borderColor: '#e94560', backgroundColor: '#e94560' },
  sizeText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  sizeTextSelected: { color: '#fff' },
  table: { backgroundColor: '#16213e', borderRadius: 16, padding: 20, marginBottom: 30 },
  tableTitle: { fontSize: 18, fontWeight: 'bold', color: '#e94560', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#0f3460' },
  label: { color: '#aaa', fontSize: 14, textTransform: 'capitalize' },
  value: { color: '#fff', fontSize: 14, fontWeight: '600' },
  confirmBtn: { backgroundColor: '#e94560', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
