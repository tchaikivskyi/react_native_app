import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FilterRowProps {
  label: string;
  children: React.ReactNode;
  badge?: number | string;
}

export const FilterRow: React.FC<FilterRowProps> = ({
  label,
  children,
  badge,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <Text style={styles.label}>{label}</Text>
        <View style={styles.rightSide}>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
          <Text style={[styles.arrow, expanded && styles.arrowUp]}>∨</Text>
        </View>
      </TouchableOpacity>

      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 4,
  },
  label: { fontSize: 16, color: '#333' },
  rightSide: { flexDirection: 'row', alignItems: 'center' },
  badge: {
    backgroundColor: '#39B54A',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  arrow: { fontSize: 18, color: '#A0A0A0' },
  arrowUp: { transform: [{ rotate: '180deg' }] },
  content: { paddingBottom: 20, paddingHorizontal: 10 },
});
