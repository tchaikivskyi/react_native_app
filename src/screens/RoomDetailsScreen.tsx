import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CustomButton } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { COLORS } from '../constants/style';
import { ROUTES } from '../constants/routes';
import { useTheme } from '../context/ThemeContext';
import { useRooms } from '../hooks/useRooms';
import { SearchStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<
  SearchStackParamList,
  typeof ROUTES.ROOM_DETAILS
>;

export const RoomDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { rooms, loading, error, refetch } = useRooms();

  const room = useMemo(
    () => rooms.find(item => item.id === route.params.roomId),
    [rooms, route.params.roomId],
  );

  const handleReserve = () => {
    navigation.getParent()?.navigate(ROUTES.BOOKINGS);
  };

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {loading && !room ? (
          <ActivityIndicator color={COLORS.primary} style={styles.loader} />
        ) : error ? (
          <View style={styles.centerBox}>
            <Text style={[styles.title, { color: colors.text }]}>
              Could not load room
            </Text>
            <Text style={[styles.description, { color: colors.mutedText }]}>
              {error}
            </Text>
            <CustomButton title="Try again" onPress={refetch} />
          </View>
        ) : !room ? (
          <View style={styles.centerBox}>
            <Text style={[styles.title, { color: colors.text }]}>
              Room not found
            </Text>
            <Text style={[styles.description, { color: colors.mutedText }]}>
              Go back and choose another room.
            </Text>
          </View>
        ) : (
          <>
            <View
              style={[
                styles.hero,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={styles.heroIcon}>□</Text>
            </View>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.type, { color: COLORS.primary }]}>
                {room.type}
              </Text>
              <Text style={[styles.title, { color: colors.text }]}>
                {room.title}
              </Text>
              <Text style={[styles.description, { color: colors.mutedText }]}>
                {room.description}
              </Text>

              <View style={styles.metaRow}>
                <View>
                  <Text style={[styles.metaLabel, { color: colors.mutedText }]}>
                    Guests
                  </Text>
                  <Text style={[styles.metaValue, { color: colors.text }]}>
                    {room.capacity}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.metaLabel, { color: colors.mutedText }]}>
                    Beds
                  </Text>
                  <Text style={[styles.metaValue, { color: colors.text }]}>
                    {room.beds}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.metaLabel, { color: colors.mutedText }]}>
                    Rating
                  </Text>
                  <Text style={[styles.metaValue, { color: colors.text }]}>
                    {room.rating}
                  </Text>
                </View>
              </View>

              <Text style={[styles.price, { color: colors.text }]}>
                EUR {room.price}.00 / night
              </Text>

              <CustomButton
                title="Reserve"
                onPress={handleReserve}
                style={styles.reserveButton}
              />
            </View>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  loader: {
    marginTop: 40,
  },
  centerBox: {
    alignItems: 'center',
    marginTop: 50,
  },
  hero: {
    height: 180,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroIcon: {
    fontSize: 42,
    color: '#9BBBEA',
  },
  card: {
    borderRadius: 18,
    padding: 18,
  },
  type: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  metaLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  price: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 18,
  },
  reserveButton: {
    width: '100%',
  },
});
