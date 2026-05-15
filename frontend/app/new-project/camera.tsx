import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [capturedCount, setCapturedCount] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <Ionicons name="camera" size={64} color="#555" />
        <Text style={styles.placeholderText}>كاميرا</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.captureBtn}>
          <View style={styles.captureInner} />
        </TouchableOpacity>
      </View>

      <Text style={styles.countText}>تم التقاط: {capturedCount} صور</Text>

      {capturedCount >= 1 && (
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => router.push('/measurements')}
        >
          <Text style={styles.doneText}>تم → القياسات</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  placeholderText: { color: '#555', fontSize: 18, marginTop: 12 },
  controls: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    alignItems: 'center',
  },
  captureBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
  countText: {
    position: 'absolute',
    bottom: 160,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14,
  },
  doneBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#e94560',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  doneText: { color: '#fff', fontWeight: '600' },
});
