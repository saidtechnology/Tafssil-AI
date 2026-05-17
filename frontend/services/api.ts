import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  android: 'https://tafssil-api.onrender.com',
  ios: 'https://tafssil-api.onrender.com',
  default: 'https://tafssil-api.onrender.com',
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

export const fetchStandardSizes = async () => {
  const res = await api.get('/api/measurements/sizes');
  return res.data;
};

export const getStandardSize = (size: string) =>
  api.post('/api/measurements/standard', { size, gender: 'female' });

export const fetchModels = async () => {
  const res = await api.get('/api/patterns/models');
  return res.data.models;
};

export const generatePattern = (data: {
  pattern_type: string;
  model: string;
  measurements: Record<string, number>;
  parameters?: Record<string, string>;
}) => api.post('/api/patterns/simple', data);

export const getReport = (projectId: number) =>
  api.get(`/api/reports/${projectId}`);
