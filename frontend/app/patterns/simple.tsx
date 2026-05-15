import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MODELS = [
  { id: 'a-line', name: 'A-Line Dress', icon: 'woman-outline' },
  { id: 'bodycon', name: 'Bodycon Dress', icon: 'woman-outline' },
  { id: 'shirt', name: 'Classic Shirt', icon: 'shirt-outline' },
  { id: 'trousers', name: 'Trousers', icon: 'footsteps-outline' },
  { id: 'skirt', name: 'Skirt', icon: 'cut-outline' },
  { id: 'blouse', name: 'Blouse', icon: 'shirt-outline' },
  { id: 'blazer', name: 'Blazer', icon: 'shirt-outline' },
  { id: 'abaya', name: 'Abaya', icon: 'accessibility-outline' },
  { id: 'kaftan', name: 'Kaftan', icon: 'accessibility-outline' },
  { id: 'wedding', name: 'Basic Wedding Dress', icon: 'sparkles-outline' },
];

export default function SimplePatternsScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>اختر الموديل</Text>
      <Text style={styles.subtitle}>10 موديلات جاهزة بتقنيات احترافية</Text>

      <View style={styles.grid}>
        {MODELS.map((model) => (
          <TouchableOpacity
            key={model.id}
            style={[styles.modelCard, selected === model.id && styles.modelSelected]}
            onPress={() => setSelected(model.id)}
          >
            <Ionicons
              name={model.icon as any}
              size={28}
              color={selected === model.id ? '#fff' : '#e94560'}
            />
            <Text style={[styles.modelName, selected === model.id && styles.modelNameSelected]}>
              {model.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected && (
        <TouchableOpacity
          style={styles.generateBtn}
          onPress={() => router.push('/preview')}
        >
          <Text style={styles.generateText}>توليد الباترون</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  modelCard: {
    width: '47%', backgroundColor: '#16213e', padding: 20, borderRadius: 16,
    alignItems: 'center', borderWidth: 1, borderColor: '#0f3460',
  },
  modelSelected: { backgroundColor: '#e94560', borderColor: '#e94560' },
  modelName: { color: '#fff', fontSize: 13, marginTop: 8, textAlign: 'center', fontWeight: '500' },
  modelNameSelected: { color: '#fff' },
  generateBtn: { backgroundColor: '#e94560', padding: 16, borderRadius: 12, alignItems: 'center', marginVertical: 30 },
  generateText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
