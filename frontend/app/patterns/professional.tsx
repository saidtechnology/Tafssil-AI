import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const PARAMS = [
  { key: 'neckline', label: 'خط العنق', options: ['V-Neck', 'Round', 'Square', 'Sweetheart', 'Off-shoulder'] },
  { key: 'sleeve', label: 'نوع الكم', options: ['Long', 'Short', '3/4', 'Puff', 'None'] },
  { key: 'length', label: 'الطول', options: ['Mini', 'Knee', 'Midi', 'Maxi', 'Floor'] },
  { key: 'fit', label: 'القصة', options: ['Fitted', 'Semi-fitted', 'Loose', 'Oversized', 'A-Line'] },
  { key: 'collar', label: 'الياقة', options: ['No collar', 'Mandarin', 'Peter Pan', 'Lapel', 'Turtle'] },
  { key: 'waist', label: 'خط الخصر', options: ['Natural', 'Empire', 'Low', 'Dropped', 'No waist'] },
];

export default function ProfessionalPatternScreen() {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const select = (key: string, val: string) => {
    setSelections((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>تخصيص الباترون الاحترافي</Text>
      <Text style={styles.subtitle}>اختر تفاصيل التصميم</Text>

      {PARAMS.map((param) => (
        <View key={param.key} style={styles.section}>
          <Text style={styles.sectionTitle}>{param.label}</Text>
          <View style={styles.optionsRow}>
            {param.options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.option, selections[param.key] === opt && styles.optionSelected]}
                onPress={() => select(param.key, opt)}
              >
                <Text style={[styles.optionText, selections[param.key] === opt && styles.optionTextSelected]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.generateBtn}
        onPress={() => router.push('/preview')}
      >
        <Text style={styles.generateText}>توليد الباترون الاحترافي</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  section: { marginBottom: 20 },
  sectionTitle: { color: '#e94560', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
    backgroundColor: '#16213e', borderWidth: 1, borderColor: '#0f3460',
  },
  optionSelected: { backgroundColor: '#e94560', borderColor: '#e94560' },
  optionText: { color: '#aaa', fontSize: 13 },
  optionTextSelected: { color: '#fff' },
  generateBtn: { backgroundColor: '#e94560', padding: 16, borderRadius: 12, alignItems: 'center', marginVertical: 30 },
  generateText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
