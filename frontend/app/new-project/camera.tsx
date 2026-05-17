import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useState, useRef } from 'react';
import { router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [capturing, setCapturing] = useState(false);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>جاري طلب إذن الكاميرا...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionBox}>
          <Text style={styles.permissionTitle}>إذن الكاميرا مطلوب</Text>
          <Text style={styles.permissionDesc}>تحتاج إلى منح صلاحية الكاميرا لالتقاط صور الموديل</Text>
          <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
            <Text style={styles.permissionBtnText}>منح الإذن</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const takePicture = async () => {
    if (capturing || !cameraRef.current) return;
    setCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({});
      if (photo?.uri) {
        setPhotos(prev => [...prev, photo.uri]);
      }
    } catch (e: any) {
      Alert.alert('خطأ', 'فشل التقاط الصورة: ' + e.message);
    } finally {
      setCapturing(false);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      >
        <View style={styles.topBar}>
          <Text style={styles.captureCount}>{photos.length} / 5</Text>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.captureBtn, capturing && styles.captureBtnDisabled]}
            onPress={takePicture}
            disabled={photos.length >= 5}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </CameraView>

      {photos.length > 0 && (
        <View style={styles.previewStrip}>
          {photos.map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => removePhoto(i)}>
              <Image source={{ uri }} style={styles.thumbnail} />
              <Text style={styles.removeLabel}>✕</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {photos.length >= 1 && (
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => router.push({ pathname: '/measurements', params: { photos: JSON.stringify(photos) } })}
        >
          <Text style={styles.doneText}>تم ← القياسات ({photos.length})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  topBar: {
    position: 'absolute', top: 50, left: 20, right: 20,
    flexDirection: 'row', justifyContent: 'flex-end',
  },
  captureCount: { color: '#fff', fontSize: 16, fontWeight: '600', backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  bottomBar: {
    position: 'absolute', bottom: 80, alignSelf: 'center', alignItems: 'center',
  },
  captureBtn: {
    width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
  },
  captureBtnDisabled: { opacity: 0.5 },
  captureInner: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#fff' },
  previewStrip: {
    position: 'absolute', bottom: 170, alignSelf: 'center',
    flexDirection: 'row', gap: 8,
  },
  thumbnail: { width: 60, height: 60, borderRadius: 8, borderWidth: 2, borderColor: '#e94560' },
  removeLabel: {
    position: 'absolute', top: -6, right: -6,
    backgroundColor: '#e94560', color: '#fff', fontSize: 12,
    width: 20, height: 20, borderRadius: 10, textAlign: 'center', lineHeight: 20, overflow: 'hidden',
  },
  doneBtn: {
    position: 'absolute', bottom: 30, right: 20,
    backgroundColor: '#e94560', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8,
  },
  doneText: { color: '#fff', fontWeight: '600' },
  permissionBox: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40,
  },
  permissionTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  permissionDesc: { fontSize: 14, color: '#aaa', textAlign: 'center', marginBottom: 24 },
  permissionBtn: {
    backgroundColor: '#e94560', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12,
  },
  permissionBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  permissionText: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 100 },
});
