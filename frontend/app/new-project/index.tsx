import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NewProjectScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختيار طريقة الإدخال</Text>
      <Text style={styles.subtitle}>يمكنك التقاط صور أو رفعها من المعرض</Text>

      <TouchableOpacity
        style={styles.optionBtn}
        onPress={() => router.push('/new-project/camera')}
      >
        <Ionicons name="camera-outline" size={40} color="#e94560" />
        <Text style={styles.optionText">تصوير مباشر</Text>
        <Text style={styles.optionDesc}>التقط صور متعددة للموديل</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionBtn}
        onPress={() => router.push('/new-project/gallery')}
      >
        <Ionicons name="images-outline" size={40} color="#e94560" />
        <Text style={styles.optionText}>رفع من المعرض</Text>
        <Text style={styles.optionDesc}>اختر صور موجودة على جهازك</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 8, marginTop: 20 },
  subtitle: { fontSize: 14, color: '#aaa', marginBottom: 40 },
  optionBtn: {
    backgroundColor: '#16213e',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  optionText: { fontSize: 18, fontWeight: '600', color: '#fff', marginTop: 12 },
  optionDesc: { fontSize: 12, color: '#888', marginTop: 4 },
});
