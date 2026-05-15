import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function MeasurementForm({ label, value, onChange }: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#555"
          value={value}
          onChangeText={onChange}
        />
        <Text style={styles.unit}>cm</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 16 },
  label: { color: '#aaa', fontSize: 14, marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: {
    flex: 1, backgroundColor: '#16213e', color: '#fff', padding: 14,
    borderRadius: 10, fontSize: 16, borderWidth: 1, borderColor: '#0f3460',
  },
  unit: { color: '#888', fontSize: 14, width: 30 },
});
