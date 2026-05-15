import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SAVED_PROJECTS: { id: number; name: string; date: string }[] = [];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="cut" size={48} color="#e94560" />
        <Text style={styles.title}>Tafssil AI</Text>
        <Text style={styles.subtitle}>تفصيل بالذكاء الاصطناعي</Text>
      </View>

      <TouchableOpacity
        style={styles.newProjectBtn}
        onPress={() => router.push('/new-project')}
      >
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.btnText}>مشروع جديد</Text>
      </TouchableOpacity>

      <View style={styles.savedSection}>
        <Text style={styles.sectionTitle}>المشاريع المحفوظة</Text>
        {SAVED_PROJECTS.length === 0 ? (
          <Text style={styles.emptyText}>لا توجد مشاريع بعد</Text>
        ) : (
          <FlatList
            data={SAVED_PROJECTS}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.projectCard}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  header: { alignItems: 'center', marginTop: 60, marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  subtitle: { fontSize: 16, color: '#e94560', marginTop: 4 },
  newProjectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e94560',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 30,
  },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  savedSection: { flex: 1 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 12 },
  emptyText: { color: '#666', fontSize: 14, textAlign: 'center', marginTop: 20 },
  projectCard: { backgroundColor: '#16213e', padding: 16, borderRadius: 8, marginBottom: 8 },
});
