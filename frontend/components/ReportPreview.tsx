import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Props {
  measurements: { label: string; value: string }[];
  notes: string;
}

export default function ReportPreview({ measurements, notes }: Props) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>تقرير Tafssil AI</Text>
      {measurements.map((m, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.label}>{m.label}</Text>
          <Text style={styles.value}>{m.value}</Text>
        </View>
      ))}
      <View style={styles.notesSection}>
        <Text style={styles.notesTitle}>الملاحظات</Text>
        <Text style={styles.notesText}>{notes}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#1a1a2e' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  label: { color: '#666', fontSize: 14 },
  value: { color: '#333', fontSize: 14, fontWeight: '600' },
  notesSection: { marginTop: 20 },
  notesTitle: { fontSize: 16, fontWeight: 'bold', color: '#e94560', marginBottom: 8 },
  notesText: { color: '#666', fontSize: 13, lineHeight: 20 },
});
