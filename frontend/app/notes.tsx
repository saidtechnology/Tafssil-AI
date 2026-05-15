import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NotesScreen() {
  const [userNote, setUserNote] = useState('');
  const [aiNotes] = useState([
    'بناءً على القياسات، يوصى بإضافة 3 سم للخياطة (seam allowance).',
    'نسبة الخصر إلى الوركين تشير إلى أن المقاس Large مناسب.',
    'هذا الموديل يتناسب مع الأقمشة الخفيفة مثل القطن والكتان.',
    'يُفضل استخدام قماش مطاطي للحصول على أفضل نتيجة.',
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bulb-outline" size={32} color="#e94560" />
        <Text style={styles.title}>ملاحظات وتوصيات</Text>
      </View>

      <View style={styles.aiSection}>
        <Text style={styles.sectionTitle}>AI التوصيات الذكية</Text>
        {aiNotes.map((note, i) => (
          <View key={i} style={styles.noteCard}>
            <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
            <Text style={styles.noteText}>{note}</Text>
          </View>
        ))}
      </View>

      <View style={styles.userSection}>
        <Text style={styles.sectionTitle}>ملاحظاتك</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          placeholder="أضف ملاحظاتك هنا..."
          placeholderTextColor="#555"
          value={userNote}
          onChangeText={setUserNote}
        />
      </View>

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => router.push('/report')}
      >
        <Text style={styles.nextText}>عرض التقرير النهائي ←</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 20, marginBottom: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#e94560', marginBottom: 12 },
  aiSection: { marginBottom: 30 },
  noteCard: { flexDirection: 'row', gap: 10, marginBottom: 12, backgroundColor: '#16213e', padding: 14, borderRadius: 12 },
  noteText: { color: '#ccc', fontSize: 13, flex: 1, lineHeight: 20 },
  userSection: { marginBottom: 30 },
  textArea: {
    backgroundColor: '#16213e', color: '#fff', padding: 16, borderRadius: 12,
    borderWidth: 1, borderColor: '#0f3460', textAlignVertical: 'top',
    minHeight: 100, fontSize: 14,
  },
  nextBtn: { backgroundColor: '#e94560', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 30 },
  nextText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
