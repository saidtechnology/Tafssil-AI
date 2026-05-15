import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GalleryScreen() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="images-outline" size={32} color="#e94560" />
        <Text style={styles.title}>اختر الصور</Text>
        <Text style={styles.count}>{selectedImages.length} / 5 صور</Text>
      </View>

      <View style={styles.galleryGrid}>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={40} color="#555" />
        </TouchableOpacity>
        {selectedImages.map((img, i) => (
          <Image key={i} source={{ uri: img }} style={styles.thumbnail} />
        ))}
      </View>

      {selectedImages.length >= 1 && (
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => router.push('/measurements')}
        >
          <Text style={styles.doneText}>تم ← القياسات</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 20, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff', flex: 1 },
  count: { color: '#e94560', fontSize: 14 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  addBtn: {
    width: 100, height: 100, borderRadius: 12,
    backgroundColor: '#16213e', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#333',
  },
  thumbnail: { width: 100, height: 100, borderRadius: 12 },
  doneBtn: {
    backgroundColor: '#e94560', padding: 16, borderRadius: 12,
    alignItems: 'center', marginTop: 30,
  },
  doneText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
