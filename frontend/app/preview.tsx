import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const SVG_W = width - 40;

export default function PreviewScreen() {
  const { svg, model, measurements: measurementsJson, error } = useLocalSearchParams<{
    svg?: string;
    model?: string;
    measurements?: string;
    error?: string;
  }>();

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle-outline" size={48} color="#e94560" />
          <Text style={styles.errorTitle}>خطأ</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>عودة</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!svg) {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Ionicons name="cut-outline" size={64} color="#555" />
          <Text style={styles.placeholderTitle}>لا يوجد باترون</Text>
          <Text style={styles.placeholderText}>اختر موديل وأدخل القياسات أولاً</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/patterns/simple')}>
            <Text style={styles.backBtnText}>اختيار موديل</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.title}>معاينة الباترون</Text>
        {model && <Text style={styles.modelLabel}>{model}</Text>}
      </View>

      <ScrollView
        style={styles.svgScroll}
        contentContainerStyle={styles.svgContent}
        horizontal
      >
        <ScrollView nestedScrollEnabled>
          <View style={styles.svgContainer}>
            <Svg width={SVG_W} height={600} viewBox="0 0 700 700">
              <Rect x="0" y="0" width="700" height="700" fill="#1a1a2e" rx="12" />
              <Line x1="10" y1="10" x2="690" y2="10" stroke="#e94560" strokeWidth="1" />
              <SvgText x="20" y="30" fill="#e94560" fontSize="14" fontWeight="bold">
                {model || 'Pattern'}
              </SvgText>
              <SvgText x="20" y="50" fill="#aaa" fontSize="11">
                أبعاد حقيقية — اضغط معاينة للاطلاع على كل القطع
              </SvgText>
              <SvgText x="350" y="350" fill="#555" fontSize="16" textAnchor="middle">
                SVG Preview
              </SvgText>
              <SvgText x="350" y="370" fill="#555" fontSize="12" textAnchor="middle">
                (Will render full pattern here)
              </SvgText>
            </Svg>
          </View>
        </ScrollView>
      </ScrollView>

      {measurementsJson && (
        <View style={styles.measurementsBox}>
          <Text style={styles.measurementsTitle}>القياسات المستخدمة</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.entries(JSON.parse(measurementsJson)).map(([key, val]) => (
              <View key={key} style={styles.measurementChip}>
                <Text style={styles.chipLabel}>{key}</Text>
                <Text style={styles.chipValue}>{String(val)} cm</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/measurements/custom')}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>تعديل القياسات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notesBtn} onPress={() => router.push('/notes')}>
          <Ionicons name="document-text-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>الملاحظات</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  modelLabel: { fontSize: 12, color: '#e94560', backgroundColor: '#16213e', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  svgScroll: { flex: 1 },
  svgContent: { paddingBottom: 20 },
  svgContainer: { backgroundColor: '#16213e', borderRadius: 16, padding: 12, alignItems: 'center' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  placeholderTitle: { fontSize: 20, color: '#fff', fontWeight: '600' },
  placeholderText: { fontSize: 14, color: '#888' },
  errorBox: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  errorTitle: { fontSize: 20, color: '#e94560', fontWeight: 'bold' },
  errorText: { fontSize: 14, color: '#aaa', textAlign: 'center', paddingHorizontal: 40 },
  backBtn: { backgroundColor: '#e94560', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, marginTop: 12 },
  backBtnText: { color: '#fff', fontWeight: '600' },
  measurementsBox: { backgroundColor: '#16213e', borderRadius: 12, padding: 12, marginBottom: 12 },
  measurementsTitle: { color: '#e94560', fontSize: 13, fontWeight: '600', marginBottom: 8 },
  measurementChip: { backgroundColor: '#0f3460', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, marginRight: 8 },
  chipLabel: { color: '#aaa', fontSize: 10, textTransform: 'capitalize' },
  chipValue: { color: '#fff', fontSize: 12, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  editBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#0f3460', padding: 14, borderRadius: 12 },
  notesBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#e94560', padding: 14, borderRadius: 12 },
  actionText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
