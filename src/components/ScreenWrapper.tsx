import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomHeader } from './Header';
import { useTheme } from '../context/ThemeContext';

export const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.surface }]}
      edges={['top']}
    >
      <CustomHeader />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: '#F8F9FB' },
});
