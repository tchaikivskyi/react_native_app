import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomButton } from './Button';

export const EmptyState = ({ onReset }: { onReset: () => void }) => (
  <View style={styles.container}>
    <View style={styles.iconCircle}>
      <Text style={styles.iconCircleText}>Empty</Text>
    </View>
    <Text style={styles.title}>Nothing here. For now.</Text>
    <Text style={styles.subtitle}>
      This is where you'll find your finished projects.
    </Text>
    <CustomButton
      title="Change filters"
      variant="primary"
      onPress={onReset}
      style={styles.btn}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleText: {
    fontSize: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 32,
  },
  btn: { paddingHorizontal: 30 },
});
