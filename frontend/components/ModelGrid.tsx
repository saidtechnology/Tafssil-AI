import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MODELS = [
  { id: 'a-line', name: 'A-Line Dress', icon: 'woman-outline' },
  { id: 'bodycon', name: 'Bodycon', icon: 'woman-outline' },
  { id: 'shirt', name: 'Shirt', icon: 'shirt-outline' },
  { id: 'trousers', name: 'Trousers', icon: 'footsteps-outline' },
  { id: 'skirt', name: 'Skirt', icon: 'cut-outline' },
  { id: 'blouse', name: 'Blouse', icon: 'shirt-outline' },
  { id: 'abaya', name: 'Abaya', icon: 'accessibility-outline' },
  { id: 'kaftan', name: 'Kaftan', icon: 'accessibility-outline' },
];

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function ModelGrid({ selected, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {MODELS.map((model) => (
        <TouchableOpacity
          key={model.id}
          style={[styles.card, selected === model.id && styles.selected]}
          onPress={() => onSelect(model.id)}
        >
          <Ionicons name={model.icon as any} size={24} color={selected === model.id ? '#fff' : '#e94560'} />
          <Text style={[styles.name, selected === model.id && styles.nameSelected]}>{model.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '47%', backgroundColor: '#16213e', padding: 16, borderRadius: 16,
    alignItems: 'center', borderWidth: 1, borderColor: '#0f3460',
  },
  selected: { backgroundColor: '#e94560', borderColor: '#e94560' },
  name: { color: '#fff', fontSize: 12, marginTop: 6, fontWeight: '500' },
  nameSelected: { color: '#fff' },
});
