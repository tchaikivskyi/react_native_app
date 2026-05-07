import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ScreenWrapper } from '../components/ScreenWrapper';
import { RoomList } from '../components/RoomList';
import { DateRangePicker } from '../components/Calendar';
import { CustomButton } from '../components/Button';
import { COLORS } from '../constants/style';
import { ROUTES } from '../constants/routes';
import { SearchStackParamList } from '../navigation/types';
import { useRooms } from '../hooks/useRooms';
import { Room, RoomType } from '../types/room';
import { useAppDispatch, useAppSelector } from '../store';
import { addSavedRoom, removeSavedRoom } from '../store/room/roomSlice';
import { useTheme } from '../context/ThemeContext';

type SearchNavigationProp = StackNavigationProp<
  SearchStackParamList,
  typeof ROUTES.SEARCH_RESULTS
>;

type SortType = 'default' | 'price_asc' | 'price_desc' | 'rating_desc';

type Filters = {
  type: RoomType | null;
  minPrice: number | null;
  maxPrice: number | null;
  guests: number | null;
  startDate: string | null;
  endDate: string | null;
};

const initialFilters: Filters = {
  type: null,
  minPrice: null,
  maxPrice: null,
  guests: null,
  startDate: null,
  endDate: null,
};

const sortOptions: { label: string; value: SortType }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Price: low to high', value: 'price_asc' },
  { label: 'Price: high to low', value: 'price_desc' },
  { label: 'Best rating', value: 'rating_desc' },
];

const roomTypes: RoomType[] = ['Standart', 'Family', 'Suite'];
const guestOptions = [1, 2, 3, 4];

export const SearchScreen = () => {
  const navigation = useNavigation<SearchNavigationProp>();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { rooms, loading, error, refetch } = useRooms();
  const savedRooms = useAppSelector(state => state.rooms.savedRooms);
  const savedRoomIds = useMemo(
    () => savedRooms.map(room => room.id),
    [savedRooms],
  );

  const [sort, setSort] = useState<SortType>('default');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSort('default');
  };

  const filteredData = useMemo(() => {
    let result = [...rooms];

    if (filters.type) {
      result = result.filter(room => room.type === filters.type);
    }

    if (filters.guests !== null) {
      result = result.filter(room => room.capacity >= filters.guests!);
    }

    if (filters.minPrice !== null) {
      result = result.filter(room => room.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== null) {
      result = result.filter(room => room.price <= filters.maxPrice!);
    }

    switch (sort) {
      case 'price_asc':
        return result.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return result.sort((a, b) => b.price - a.price);
      case 'rating_desc':
        return result.sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  }, [rooms, filters, sort]);

  const activeFiltersCount = useMemo(() => {
    return [
      filters.type,
      filters.minPrice,
      filters.maxPrice,
      filters.guests,
      filters.startDate,
      filters.endDate,
    ].filter(value => value !== null).length;
  }, [filters]);

  const handleOpenRoom = (roomId: string) => {
    navigation.navigate(ROUTES.ROOM_DETAILS, { roomId });
  };

  const handleToggleSaveRoom = (room: Room) => {
    if (savedRoomIds.includes(room.id)) {
      dispatch(removeSavedRoom(room.id));
      return;
    }

    dispatch(addSavedRoom(room));
  };

  const toggleRoomType = (type: RoomType) => {
    updateFilters({ type: filters.type === type ? null : type });
  };

  const toggleGuests = (guests: number) => {
    updateFilters({ guests: filters.guests === guests ? null : guests });
  };

  const ListHeader = useMemo(
    () => (
      <View style={styles.headerContent}>
        <Text style={[styles.mainTitle, { color: colors.text }]}>Rooms</Text>

        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => setSortVisible(true)}
          >
            <Text style={[styles.filterText, { color: colors.text }]}>
              Sort
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => setFilterVisible(true)}
          >
            <Text style={[styles.filterText, { color: colors.text }]}>
              Filter
            </Text>

            {activeFiltersCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{activeFiltersCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.calendarContainer}>
          <DateRangePicker
            from={filters.startDate}
            to={filters.endDate}
            onChange={(startDate, endDate) => {
              updateFilters({ startDate, endDate });
            }}
          />
        </View>
      </View>
    ),
    [activeFiltersCount, colors, filters.startDate, filters.endDate],
  );

  const renderChip = (
    label: string,
    isActive: boolean,
    onPress: () => void,
  ) => (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: colors.background, borderColor: colors.border },
        isActive && styles.chipActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.chipText,
          { color: colors.text },
          isActive && styles.chipTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      {loading && rooms.length === 0 ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={[styles.errorTitle, { color: colors.text }]}>
            Could not load rooms
          </Text>
          <Text style={[styles.errorText, { color: colors.mutedText }]}>
            {error}
          </Text>
          <CustomButton title="Try again" onPress={refetch} />
        </View>
      ) : (
        <RoomList
          data={filteredData}
          loading={loading}
          HeaderComponent={ListHeader}
          onReset={resetFilters}
          onRoomPress={handleOpenRoom}
          savedRoomIds={savedRoomIds}
          onToggleSave={handleToggleSaveRoom}
        />
      )}

      <Modal
        visible={sortVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Sort by
            </Text>

            {sortOptions.map(option => {
              const isActive = sort === option.value;

              return (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.optionRow, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    setSort(option.value);
                    setSortVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: colors.text },
                      isActive && styles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>

                  {isActive && <Text style={styles.checkIcon}>OK</Text>}
                </TouchableOpacity>
              );
            })}

            <CustomButton
              title="Close"
              variant="outline"
              onPress={() => setSortVisible(false)}
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Filter
            </Text>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Room type
            </Text>
            <View style={styles.chipsRow}>
              {roomTypes.map(type =>
                renderChip(type, filters.type === type, () =>
                  toggleRoomType(type),
                ),
              )}
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Guests
            </Text>
            <View style={styles.chipsRow}>
              {guestOptions.map(guest =>
                renderChip(String(guest), filters.guests === guest, () =>
                  toggleGuests(guest),
                ),
              )}
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Price
            </Text>
            <View style={styles.chipsRow}>
              {renderChip(
                'Up to EUR 120',
                filters.minPrice === null && filters.maxPrice === 120,
                () =>
                  updateFilters({
                    minPrice: null,
                    maxPrice:
                      filters.minPrice === null && filters.maxPrice === 120
                        ? null
                        : 120,
                  }),
              )}
              {renderChip(
                'EUR 121 - EUR 170',
                filters.minPrice === 121 && filters.maxPrice === 170,
                () =>
                  updateFilters({
                    minPrice:
                      filters.minPrice === 121 && filters.maxPrice === 170
                        ? null
                        : 121,
                    maxPrice:
                      filters.minPrice === 121 && filters.maxPrice === 170
                        ? null
                        : 170,
                  }),
              )}
              {renderChip(
                'EUR 171+',
                filters.minPrice === 171 && filters.maxPrice === null,
                () =>
                  updateFilters({
                    minPrice:
                      filters.minPrice === 171 && filters.maxPrice === null
                        ? null
                        : 171,
                    maxPrice: null,
                  }),
              )}
            </View>

            <View style={styles.modalActions}>
              <CustomButton
                title="Reset"
                variant="outline"
                onPress={resetFilters}
                style={styles.actionButton}
              />
              <CustomButton
                title="Apply filters"
                onPress={() => setFilterVisible(false)}
                style={styles.actionButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    paddingVertical: 10,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  optionRow: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
  },
  optionTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  checkIcon: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  modalButton: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 10,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 14,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    minWidth: 0,
  },
});
