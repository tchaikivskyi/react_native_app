import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Room } from '../types/room';
import { useTheme } from '../context/ThemeContext';

type Props = {
  room: Room;
  onPress: (roomId: string) => void;
};

const RoomCardComponent: React.FC<Props> = ({ room, onPress }) => {
  const { colors } = useTheme();

  const handlePress = useCallback(() => {
    onPress(room.id);
  }, [onPress, room.id]);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View
        style={[
          styles.imagePlaceholder,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={styles.imageIcon}>□</Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {room.title}
        </Text>

        <Text style={[styles.meta, { color: colors.mutedText }]}>
          {room.capacity} guests · {room.beds} bed
        </Text>

        <Text style={[styles.price, { color: colors.text }]}>
          EUR {room.price}.00
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const RoomCard = memo(RoomCardComponent);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    width: '48%',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  imagePlaceholder: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    fontSize: 28,
    color: '#9BBBEA',
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    marginBottom: 4,
    fontWeight: '500',
  },
  meta: {
    fontSize: 11,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
