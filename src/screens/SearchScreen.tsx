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
import { RoomType } from '../types/room';

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

  const { rooms, loading, error, refetch } = useRooms();

  const [sort, setSort] = useState<SortType>('default');
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
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

  const toggleRoomType = (type: RoomType) => {
    updateFilters({
      type: filters.type === type ? null : type,
    });
  };

  const toggleGuests = (guests: number) => {
    updateFilters({
      guests: filters.guests === guests ? null : guests,
    });
  };

  const togglePriceUpTo120 = () => {
    const isActive = filters.minPrice === null && filters.maxPrice === 120;

    updateFilters({
      minPrice: null,
      maxPrice: isActive ? null : 120,
    });
  };

  const togglePrice121To170 = () => {
    const isActive = filters.minPrice === 121 && filters.maxPrice === 170;

    updateFilters({
      minPrice: isActive ? null : 121,
      maxPrice: isActive ? null : 170,
    });
  };

  const togglePriceFrom171 = () => {
    const isActive = filters.minPrice === 171 && filters.maxPrice === null;

    updateFilters({
      minPrice: isActive ? null : 171,
      maxPrice: null,
    });
  };

  const ListHeader = useMemo(
    () => (
      <View style={styles.headerContent}>
        <Text style={styles.mainTitle}>Rooms</Text>

        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSortVisible(true)}
          >
            <Text style={styles.filterText}>⇅ Sort</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Text style={styles.filterText}>⚙ Filter</Text>

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
    [activeFiltersCount, filters.startDate, filters.endDate],
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
          <Text style={styles.errorTitle}>Could not load rooms</Text>
          <Text style={styles.errorText}>{error}</Text>
          <CustomButton title="Try again" onPress={refetch} />
        </View>
      ) : (
        <RoomList
          data={filteredData}
          loading={loading}
          HeaderComponent={ListHeader}
          onReset={resetFilters}
          onRoomPress={handleOpenRoom}
        />
      )}

      <Modal
        visible={sortVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Sort by</Text>

            {sortOptions.map(option => {
              const isActive = sort === option.value;

              return (
                <TouchableOpacity
                  key={option.value}
                  style={styles.optionRow}
                  onPress={() => {
                    setSort(option.value);
                    setSortVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isActive && styles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>

                  {isActive && <Text style={styles.checkIcon}>✓</Text>}
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
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Filter</Text>

            <Text style={styles.sectionTitle}>Room type</Text>

            <View style={styles.chipsRow}>
              {roomTypes.map(type => {
                const isActive = filters.type === type;

                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.chip, isActive && styles.chipActive]}
                    onPress={() => toggleRoomType(type)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isActive && styles.chipTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Guests</Text>

            <View style={styles.chipsRow}>
              {guestOptions.map(guest => {
                const isActive = filters.guests === guest;

                return (
                  <TouchableOpacity
                    key={guest}
                    style={[styles.chip, isActive && styles.chipActive]}
                    onPress={() => toggleGuests(guest)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isActive && styles.chipTextActive,
                      ]}
                    >
                      {guest}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Price</Text>

            <View style={styles.chipsRow}>
              <TouchableOpacity
                style={[
                  styles.chip,
                  filters.minPrice === null &&
                    filters.maxPrice === 120 &&
                    styles.chipActive,
                ]}
                onPress={togglePriceUpTo120}
              >
                <Text
                  style={[
                    styles.chipText,
                    filters.minPrice === null &&
                      filters.maxPrice === 120 &&
                      styles.chipTextActive,
                  ]}
                >
                  Up to €120
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.chip,
                  filters.minPrice === 121 &&
                    filters.maxPrice === 170 &&
                    styles.chipActive,
                ]}
                onPress={togglePrice121To170}
              >
                <Text
                  style={[
                    styles.chipText,
                    filters.minPrice === 121 &&
                      filters.maxPrice === 170 &&
                      styles.chipTextActive,
                  ]}
                >
                  €121 - €170
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.chip,
                  filters.minPrice === 171 &&
                    filters.maxPrice === null &&
                    styles.chipActive,
                ]}
                onPress={togglePriceFrom171}
              >
                <Text
                  style={[
                    styles.chipText,
                    filters.minPrice === 171 &&
                      filters.maxPrice === null &&
                      styles.chipTextActive,
                  ]}
                >
                  €171+
                </Text>
              </TouchableOpacity>
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
    backgroundColor: '#F8F9FB',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
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
    color: '#111',
    marginBottom: 8,
  },
  errorText: {
    color: '#777',
    textAlign: 'center',
    marginBottom: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#000',
  },
  optionRow: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  checkIcon: {
    color: COLORS.primary,
    fontSize: 18,
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
    color: '#000',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 14,
    color: '#555',
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
