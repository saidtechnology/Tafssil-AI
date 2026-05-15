import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8000',
  ios: 'http://localhost:8000',
  default: 'http://localhost:8000',
});

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const uploadImages = async (projectId: number, images: string[]) => {
  const formData = new FormData();
  images.forEach((uri, i) => {
    formData.append('files', {
      uri,
      type: 'image/jpeg',
      name: `photo_${i}.jpg`,
    } as any);
  });
  return api.post(`/api/projects/${projectId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const saveMeasurements = (data: Record<string, number>) =>
  api.post('/api/measurements/manual', data);

export const generatePattern = (data: { pattern_type: string; model: string; measurements: Record<string, number> }) =>
  api.post('/api/patterns/simple', data);

export const getReport = (projectId: number) =>
  api.get(`/api/reports/${projectId}`);
