import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Room } from '../types/room';
import { COLORS } from '../constants/style';
import { useTheme } from '../context/ThemeContext';

type Props = {
  room: Room;
  onPress: () => void;
  isSaved?: boolean;
  onToggleSave?: (room: Room) => void;
};

export const RoomCard: React.FC<Props> = ({
  room,
  onPress,
  isSaved = false,
  onToggleSave,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
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

        {onToggleSave && (
          <TouchableOpacity
            style={[styles.saveButton, isSaved && styles.saveButtonActive]}
            onPress={() => onToggleSave(room)}
          >
            <Text style={[styles.saveText, isSaved && styles.saveTextActive]}>
              {isSaved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

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
  saveButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  saveButtonActive: {
    backgroundColor: COLORS.primary,
  },
  saveText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  saveTextActive: {
    color: '#FFFFFF',
  },
});
