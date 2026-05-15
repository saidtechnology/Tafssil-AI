import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface Measurement {
  label: string;
  key: string;
  value: string;
}

const DEFAULT_MEASUREMENTS: Measurement[] = [
  { label: 'الطول', key: 'height', value: '' },
  { label: 'الصدر', key: 'chest', value: '' },
  { label: 'الخصر', key: 'waist', value: '' },
  { label: 'الوركين', key: 'hips', value: '' },
  { label: 'عرض الكتف', key: 'shoulder_width', value: '' },
  { label: 'طول الذراع', key: 'arm_length', value: '' },
  { label: 'درزة داخلية', key: 'inseam', value: '' },
  { label: 'الرقبة', key: 'neck', value: '' },
  { label: 'عرض الظهر', key: 'back_width', value: '' },
  { label: 'العضد', key: 'bicep', value: '' },
  { label: 'الرسغ', key: 'wrist', value: '' },
];

export default function CustomMeasurementsScreen() {
  const [measurements, setMeasurements] = useState(DEFAULT_MEASUREMENTS);
  const [mode, setMode] = useState<'manual' | 'ai'>('manual');

  const updateValue = (key: string, val: string) => {
    setMeasurements((prev) =>
      prev.map((m) => (m.key === key ? { ...m, value: val } : m))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.modeSwitch}>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'manual' && styles.modeActive]}
          onPress={() => setMode('manual')}
        >
          <Text style={[styles.modeText, mode === 'manual' && styles.modeTextActive]}>يدوي</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'ai' && styles.modeActive]}
          onPress={() => setMode('ai')}
        >
          <Text style={[styles.modeText, mode === 'ai' && styles.modeTextActive]}>
            {mode === 'ai' ? 'جاري التحليل...' : 'AI تلقائي'}
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'manual' ? (
        <>
          <Text style={styles.title}>أدخل القياسات يدويًا</Text>
          {measurements.map((m) => (
            <View key={m.key} style={styles.field}>
              <Text style={styles.label}>{m.label}</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#555"
                  value={m.value}
                  onChangeText={(v) => updateValue(m.key, v)}
                />
                <Text style={styles.unit}>cm</Text>
              </View>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.aiMode}>
          <Text style={styles.aiTitle}>AI التحليل التلقائي</Text>
          <Text style={styles.aiDesc}>
            سيتم تحليل الصور المرفوعة لاستخراج القياسات تلقائيًا.
            الرجاء إدخال طول الزبون للمساعدة في المعايرة.
          </Text>
          <View style={styles.field}>
            <Text style={styles.label}>الطول (سم)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="مثال: 170"
              placeholderTextColor="#555"
            />
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => router.push('/patterns')}
      >
        <Text style={styles.nextText}>التالي ← اختيار الباترون</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  modeSwitch: { flexDirection: 'row', gap: 12, marginTop: 20, marginBottom: 24 },
  modeBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: '#16213e', alignItems: 'center' },
  modeActive: { backgroundColor: '#e94560' },
  modeText: { color: '#888', fontWeight: '600' },
  modeTextActive: { color: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  field: { marginBottom: 16 },
  label: { color: '#aaa', fontSize: 14, marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: {
    flex: 1, backgroundColor: '#16213e', color: '#fff', padding: 14,
    borderRadius: 10, fontSize: 16, borderWidth: 1, borderColor: '#0f3460',
  },
  unit: { color: '#888', fontSize: 14, width: 30 },
  aiMode: { marginBottom: 20 },
  aiTitle: { fontSize: 18, fontWeight: 'bold', color: '#e94560', marginBottom: 12 },
  aiDesc: { color: '#aaa', fontSize: 14, lineHeight: 22, marginBottom: 20 },
  nextBtn: { backgroundColor: '#e94560', padding: 16, borderRadius: 12, alignItems: 'center', marginVertical: 30 },
  nextText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
