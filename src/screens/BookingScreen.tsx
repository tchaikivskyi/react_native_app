import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { COLORS } from '../constants/style';
import { ChevronRight } from 'lucide-react-native';

import { CustomButton } from '../components/Button';
import { useReservations } from '../hooks/useReservations';
import { Reservation, ReservationStatus } from '../types/reservation';
import { useAppSelector } from '../store';

export const BookingScreen = () => {
  const [activeFilter, setActiveFilter] = useState<ReservationStatus>('all');
  const { reservations, loading, error, refetch } = useReservations();
  const localReservations = useAppSelector(state => state.reservations.items);

  const allReservations = useMemo(
    () => [...localReservations, ...reservations],
    [localReservations, reservations],
  );

  const filteredReservations =
    activeFilter === 'all'
      ? allReservations
      : allReservations.filter(item => item.status === activeFilter);

  const filters: { label: string; value: ReservationStatus }[] = [
    { label: 'ALL', value: 'all' },
    { label: 'FINISHED', value: 'finished' },
    { label: 'CURRENT', value: 'current' },
  ];

  const renderReservation = ({ item }: { item: Reservation }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {}}
    >
      <View style={styles.imageBox}>
        <Text style={styles.imageIcon}>▧</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.guestName}>{item.guestName}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>

      <ChevronRight size={18} color="#999" />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <View style={styles.filters}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterChip,
                activeFilter === filter.value && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.value && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.title}>Your reservations</Text>

        {loading && allReservations.length === 0 ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={styles.loader}
          />
        ) : error ? (
          <View style={styles.errorBox}>
            <Text style={styles.empty}>{error}</Text>
            <CustomButton title="Try again" onPress={refetch} />
          </View>
        ) : (
          <FlatList
            data={filteredReservations}
            keyExtractor={item => item.id}
            renderItem={renderReservation}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.empty}>No reservations found</Text>
            }
          />
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
  top: {
    marginBottom: 20,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#EAF7EF',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 14,
  },
  list: {
    paddingBottom: 40,
  },
  loader: {
    marginTop: 40,
  },
  errorBox: {
    alignItems: 'center',
    gap: 14,
    marginTop: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#E8F0FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  imageIcon: {
    color: '#8AA8D8',
    fontSize: 22,
  },
  cardContent: {
    flex: 1,
  },
  guestName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
  },
  location: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
  },
});
