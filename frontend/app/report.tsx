import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_MEASUREMENTS = [
  { label: 'الصدر', value: '94 cm' },
  { label: 'الخصر', value: '80 cm' },
  { label: 'الوركين', value: '100 cm' },
  { label: 'الطول', value: '170 cm' },
  { label: 'عرض الكتف', value: '42 cm' },
  { label: 'طول الذراع', value: '60 cm' },
  { label: 'الرقبة', value: '39 cm' },
];

export default function ReportScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="document-text" size={36} color="#e94560" />
        <Text style={styles.title}>التقرير النهائي</Text>
        <Text style={styles.subtitle}>Tafssil AI — تفصيل بالذكاء الاصطناعي</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>القياسات</Text>
        {MOCK_MEASUREMENTS.map((m, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.label}>{m.label}</Text>
            <Text style={styles.value}>{m.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الباترون</Text>
        <View style={styles.patternPreview}>
          <Ionicons name="image-outline" size={40} color="#555" />
          <Text style={styles.patternText}>معاينة الباترون</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الملاحظات</Text>
        <Text style={styles.note}>
          يوصى بإضافة 3 سم للخياطة. هذا الموديل مناسب للأقمشة القطنية.
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.pdfBtn}>
          <Ionicons name="download-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>تحميل PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>مشاركة</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  header: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  subtitle: { fontSize: 12, color: '#e94560', marginTop: 4 },
  section: { backgroundColor: '#16213e', borderRadius: 16, padding: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#e94560', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#0f3460' },
  label: { color: '#aaa', fontSize: 14 },
  value: { color: '#fff', fontSize: 14, fontWeight: '600' },
  patternPreview: { height: 120, backgroundColor: '#0f3460', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  patternText: { color: '#555', fontSize: 14, marginTop: 8 },
  note: { color: '#ccc', fontSize: 13, lineHeight: 20 },
  actions: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  pdfBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#e94560', padding: 16, borderRadius: 12 },
  shareBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#0f3460', padding: 16, borderRadius: 12 },
  actionText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
