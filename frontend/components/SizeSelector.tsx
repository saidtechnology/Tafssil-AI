import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

interface Props {
  selected: string | null;
  onSelect: (size: string) => void;
}

export default function SizeSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {SIZES.map((size) => (
        <TouchableOpacity
          key={size}
          style={[styles.btn, selected === size && styles.btnSelected]}
          onPress={() => onSelect(size)}
        >
          <Text style={[styles.text, selected === size && styles.textSelected]}>
            {size}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  btn: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#16213e', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#0f3460',
  },
  btnSelected: { borderColor: '#e94560', backgroundColor: '#e94560' },
  text: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  textSelected: { color: '#fff' },
});
