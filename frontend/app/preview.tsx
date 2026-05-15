import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const SVG_W = width - 40;
const SVG_H = 500;

export default function PreviewScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.title}>معاينة الباترون</Text>
        <View style={styles.toolbarActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="refresh-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.svgContainer}>
        <Svg width={SVG_W} height={SVG_H} viewBox="0 0 500 700">
          <Rect x="50" y="50" width="120" height="300" fill="none" stroke="#e94560" strokeWidth="2" />
          <Line x1="50" y1="50" x2="170" y2="50" stroke="#e94560" strokeWidth="1" />
          <SvgText x="60" y="45" fill="#e94560" fontSize="12">صدر: 94 cm</SvgText>
          <SvgText x="60" y="75" fill="#fff" fontSize="10">الجزء الأمامي</SvgText>
          <SvgText x="60" y="370" fill="#e94560" fontSize="12">طول: 120 cm</SvgText>
          <Rect x="220" y="50" width="120" height="300" fill="none" stroke="#e94560" strokeWidth="2" />
          <SvgText x="230" y="75" fill="#fff" fontSize="10">الجزء الخلفي</SvgText>
        </Svg>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => router.push('/measurements/custom')}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.editText}>تعديل القياسات</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notesBtn}
          onPress={() => router.push('/notes')}
        >
          <Ionicons name="document-text-outline" size={20} color="#fff" />
          <Text style={styles.editText}>الملاحظات</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  toolbarActions: { flexDirection: 'row', gap: 12 },
  iconBtn: { padding: 8 },
  svgContainer: {
    backgroundColor: '#16213e', borderRadius: 16, padding: 16,
    alignItems: 'center', flex: 1,
  },
  actions: { flexDirection: 'row', gap: 12, marginTop: 20, marginBottom: 30 },
  editBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: '#0f3460', padding: 16, borderRadius: 12,
  },
  notesBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: '#e94560', padding: 16, borderRadius: 12,
  },
  editText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
