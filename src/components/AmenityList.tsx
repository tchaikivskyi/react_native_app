import React, { memo, useCallback, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { COLORS } from '../constants/style';
import { useTheme } from '../context/ThemeContext';
import { RoomType } from '../types/room';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = {
  roomType: RoomType;
};

const baseAmenities = ['Free Wi-Fi', 'Air conditioning', 'Private bathroom'];

const amenitiesByType: Record<RoomType, string[]> = {
  Standart: [...baseAmenities, 'Work desk'],
  Family: [...baseAmenities, 'Extra storage', 'Kids friendly layout'],
  Suite: [...baseAmenities, 'Lounge zone', 'Premium view', 'Coffee machine'],
};

const AmenityListComponent: React.FC<Props> = ({ roomType }) => {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();

  const amenities = amenitiesByType[roomType];
  const visibleAmenities = expanded ? amenities : amenities.slice(0, 3);

  const toggleExpanded = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(current => !current);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpanded}
        activeOpacity={0.8}
      >
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Amenities</Text>
          <Text style={[styles.subtitle, { color: colors.mutedText }]}>
            Included with this {roomType.toLowerCase()} room
          </Text>
        </View>
        <Text style={styles.toggle}>{expanded ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>

      <View style={styles.grid}>
        {visibleAmenities.map(amenity => (
          <View
            key={amenity}
            style={[
              styles.chip,
              { backgroundColor: colors.background, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.chipText, { color: colors.text }]}>
              {amenity}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export const AmenityList = memo(AmenityListComponent);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  toggle: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
