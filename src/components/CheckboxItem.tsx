import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/style';

interface CheckboxItemProps {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({
  label,
  value,
  onValueChange,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      <View style={[styles.checkbox, value && styles.checkboxActive]}>
        {value && <Text style={styles.checkMark}>✓</Text>}
      </View>

      <Text style={[styles.label, value && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: COLORS.primary || '#39B54A',
    borderColor: COLORS.primary || '#39B54A',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '400',
  },
  labelActive: {
    color: '#000000',
  },
});