import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Room } from '../types/room';
import { COLORS } from '../constants/style';

type Props = {
  room: Room;
  onPress: () => void;
};

export const RoomCard: React.FC<Props> = ({ room, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    <View style={styles.imagePlaceholder}>
      <Text style={styles.imageIcon}>▧</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={1}>
        {room.title}
      </Text>

      <Text style={styles.meta}>
        {room.capacity} guests · {room.beds} bed
      </Text>

      <Text style={styles.price}>€ {room.price}.00</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
    backgroundColor: '#E8F0FE',
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
    color: '#333',
    marginBottom: 4,
    fontWeight: '500',
  },
  meta: {
    fontSize: 11,
    color: '#757575',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
