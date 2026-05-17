import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const MAX_IMAGES = 5;

export default function GalleryScreen() {
  const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>جاري طلب إذن المعرض...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionBox}>
          <Ionicons name="images-outline" size={64} color="#e94560" />
          <Text style={styles.permissionTitle}>إذن المعرض مطلوب</Text>
          <Text style={styles.permissionDesc}>تحتاج إلى منح صلاحية الوصول للمعرض لاختيار صور الموديل</Text>
          <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
            <Text style={styles.permissionBtnText}>منح الإذن</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: MAX_IMAGES,
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        const uris = result.assets.map(a => a.uri);
        setSelectedImages(prev => {
          const combined = [...prev, ...uris];
          return combined.slice(0, MAX_IMAGES);
        });
      }
    } catch (e: any) {
      Alert.alert('خطأ', 'فشل تحميل الصور: ' + e.message);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="images-outline" size={32} color="#e94560" />
        <Text style={styles.title}>اختر الصور</Text>
        <Text style={styles.count}>{selectedImages.length} / {MAX_IMAGES}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        <TouchableOpacity
          style={[styles.addBtn, selectedImages.length >= MAX_IMAGES && styles.addBtnDisabled]}
          onPress={pickImages}
          disabled={selectedImages.length >= MAX_IMAGES}
        >
          <Ionicons name="add" size={40} color="#555" />
          <Text style={styles.addLabel}>إضافة</Text>
        </TouchableOpacity>

        {selectedImages.map((uri, i) => (
          <View key={i} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.thumbnail} />
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(i)}>
              <Text style={styles.removeLabel}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {selectedImages.length >= 1 && (
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => router.push({ pathname: '/measurements', params: { photos: JSON.stringify(selectedImages) } })}
        >
          <Text style={styles.doneText}>تم ← القياسات ({selectedImages.length})</Text>
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  addBtn: {
    width: 100, height: 100, borderRadius: 12, backgroundColor: '#16213e',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333',
  },
  addBtnDisabled: { opacity: 0.4 },
  addLabel: { color: '#555', fontSize: 12, marginTop: 4 },
  imageWrapper: { position: 'relative' },
  thumbnail: { width: 100, height: 100, borderRadius: 12, borderWidth: 2, borderColor: '#e94560' },
  removeBtn: {
    position: 'absolute', top: -6, right: -6,
    backgroundColor: '#e94560', width: 22, height: 22, borderRadius: 11,
    justifyContent: 'center', alignItems: 'center',
  },
  removeLabel: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  doneBtn: {
    backgroundColor: '#e94560', padding: 16, borderRadius: 12,
    alignItems: 'center', marginTop: 30,
  },
  doneText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  permissionBox: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, gap: 16,
  },
  permissionTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  permissionDesc: { fontSize: 14, color: '#aaa', textAlign: 'center' },
  permissionBtn: {
    backgroundColor: '#e94560', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12,
  },
  permissionBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  infoText: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 100 },
});
