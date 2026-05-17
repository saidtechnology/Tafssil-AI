import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchModels, generatePattern } from '../../services/api';

interface PatternModel {
  id: string;
  name: string;
  name_en: string;
  icon: string;
  required_measurements: string[];
}

export default function SimplePatternsScreen() {
  const { measurements: measurementsJson } = useLocalSearchParams<{ measurements?: string }>();
  const [models, setModels] = useState<PatternModel[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const data = await fetchModels();
      setModels(data);
    } catch {
      setModels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!selected) return;
    setGenerating(true);
    try {
      const measurements = measurementsJson ? JSON.parse(measurementsJson) : {};
      const res = await generatePattern({
        pattern_type: 'simple',
        model: selected,
        measurements,
      });
      router.push({
        pathname: '/preview',
        params: { svg: res.data.svg, model: selected, measurements: measurementsJson || '' },
      });
    } catch (e: any) {
      router.push({
        pathname: '/preview',
        params: { error: 'فشل توليد الباترون: ' + (e.message || '') },
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.loadingText}>جاري تحميل الموديلات...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>اختر الموديل</Text>
      <Text style={styles.subtitle}>اختر نوع اللباس الذي تريد تفصيله</Text>

      <View style={styles.grid}>
        {models.map((model: PatternModel, i: number) => (
          <TouchableOpacity
            key={model.id}
            style={[styles.modelCard, selected === model.id && styles.modelSelected]}
            onPress={() => setSelected(model.id)}
          >
            <Ionicons
              name={(model.icon || 'cut-outline') as any}
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
          onPress={handleGenerate}
          disabled={generating}
        >
          {generating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.generateText}>توليد الباترون</Text>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  centered: { flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#888', marginTop: 12, fontSize: 14 },
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
