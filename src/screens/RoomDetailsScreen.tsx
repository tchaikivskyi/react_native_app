import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CustomButton } from '../components/Button';
import { AmenityList } from '../components/AmenityList';
import { ReviewCard } from '../components/ReviewCard';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { COLORS } from '../constants/style';
import { ROUTES } from '../constants/routes';
import { useTheme } from '../context/ThemeContext';
import { useRooms } from '../hooks/useRooms';
import { useRoomReviews } from '../hooks/useRoomReviews';
import { SearchStackParamList } from '../navigation/types';
import { useAppDispatch } from '../store';
import { addReservation } from '../store/reservation/reservationSlice';

type Props = NativeStackScreenProps<
  SearchStackParamList,
  typeof ROUTES.ROOM_DETAILS
>;

const getDateOffset = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return date.toISOString().split('T')[0];
};

export const RoomDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { rooms, loading, error, refetch } = useRooms();
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useRoomReviews(route.params.roomId);

  const room = useMemo(
    () => rooms.find(item => item.id === route.params.roomId),
    [rooms, route.params.roomId],
  );

  const handleReserve = () => {
    if (!room) return;

    const checkIn = getDateOffset(1);
    const checkOut = getDateOffset(2);

    dispatch(
      addReservation({
        id: `local-${room.id}-${Date.now()}`,
        guestName: 'Taras',
        location: 'Ibis Styles Hotel',
        status: 'current',
        roomTitle: room.title,
        checkIn,
        checkOut,
        nights: 1,
        total: room.price,
      }),
    );

    navigation.getParent()?.navigate(ROUTES.BOOKINGS);
  };

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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

            <AmenityList roomType={room.type} />

            <View style={styles.reviewsSection}>
              <View style={styles.reviewsHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Guest reviews
                </Text>
                {reviewsError && (
                  <TouchableOpacity onPress={refetchReviews}>
                    <Text style={styles.retryText}>Retry</Text>
                  </TouchableOpacity>
                )}
              </View>

              {reviewsLoading ? (
                <ActivityIndicator color={COLORS.primary} />
              ) : reviewsError ? (
                <Text style={[styles.description, { color: colors.mutedText }]}>
                  {reviewsError}
                </Text>
              ) : (
                reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 32,
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
  reviewsSection: {
    marginTop: 22,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  retryText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
  },
});
