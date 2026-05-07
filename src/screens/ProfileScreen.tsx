import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { User, ChevronRight } from 'lucide-react-native';

import { ScreenWrapper } from '../components/ScreenWrapper';
import { CustomButton } from '../components/Button';
import { COLORS } from '../constants/style';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store';
import {
  removeSavedRoom,
  SavedRoom,
  updateSavedRoomGuests,
} from '../store/room/roomSlice';

const MIN_GUESTS = 1;

export const ProfileScreen = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const dispatch = useAppDispatch();
  const savedRooms = useAppSelector(state => state.rooms.savedRooms);
  const { colors, theme, toggleTheme } = useTheme();

  const menuItems = [
    'Profile',
    'Language',
    'Appearance',
    'Payment',
    'Contacts',
  ];

  const updateGuests = (room: SavedRoom, nextGuests: number) => {
    const guests = Math.max(MIN_GUESTS, Math.min(nextGuests, room.capacity));

    dispatch(updateSavedRoomGuests({ id: room.id, guests }));
  };

  const renderSavedRoom = ({ item }: { item: SavedRoom }) => (
    <View style={[styles.savedCard, { backgroundColor: colors.card }]}>
      <View style={styles.savedInfo}>
        <Text style={[styles.savedTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.savedMeta, { color: colors.mutedText }]}>
          EUR {item.price}.00 · {item.capacity} guests max
        </Text>
      </View>

      <View style={styles.savedControls}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => updateGuests(item, item.guests - 1)}
        >
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>

        <Text style={[styles.guestsText, { color: colors.text }]}>
          {item.guests}
        </Text>

        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => updateGuests(item, item.guests + 1)}
        >
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => dispatch(removeSavedRoom(item.id))}
      >
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

        <View style={styles.userBox}>
          <View style={styles.avatar}>
            <User size={34} color={COLORS.primary} />
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{'Taras'}</Text>
          <Text style={[styles.email, { color: colors.mutedText }]}>
            {'taras@gmail.com'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.themeRow, { backgroundColor: colors.card }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.rowText, { color: colors.text }]}>
            Theme: {theme === 'light' ? 'Light' : 'Dark'}
          </Text>
          <Text style={styles.themeAction}>Switch</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Saved rooms
        </Text>

        <FlatList
          data={savedRooms}
          keyExtractor={item => item.id}
          renderItem={renderSavedRoom}
          ListEmptyComponent={
            <Text style={[styles.emptySaved, { color: colors.mutedText }]}>
              Save rooms from Search to see them here.
            </Text>
          }
          scrollEnabled={false}
        />

        <View style={[styles.menu, { backgroundColor: colors.card }]}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.row, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.rowText, { color: colors.text }]}>
                {item}
              </Text>
              <ChevronRight size={18} color="#999" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.row, { borderBottomColor: colors.border }]}
            onPress={() => setLogoutVisible(true)}
          >
            <Text style={[styles.rowText, { color: colors.text }]}>
              Logout
            </Text>
            <ChevronRight size={18} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={logoutVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.logoutBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.logoutTitle, { color: colors.text }]}>
              Log out
            </Text>
            <Text style={[styles.logoutText, { color: colors.mutedText }]}>
              Are you sure you want to log out from your account?
            </Text>

            <View style={styles.actions}>
              <CustomButton
                title="Cancel"
                variant="outline"
                onPress={() => setLogoutVisible(false)}
                style={styles.actionBtn}
              />

              <CustomButton
                title="Log out"
                onPress={() => {}}
                style={styles.actionBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 18,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 24,
  },
  userBox: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#E8F0FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111',
  },
  email: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  menu: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  themeRow: {
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeAction: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  savedCard: {
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  savedInfo: {
    marginBottom: 10,
  },
  savedTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  savedMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  savedControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  guestsText: {
    minWidth: 34,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '800',
  },
  removeButton: {
    alignSelf: 'flex-start',
  },
  removeText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: '700',
  },
  emptySaved: {
    marginBottom: 20,
  },
  row: {
    height: 54,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    fontSize: 15,
    color: '#222',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoutBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
  },
  logoutTitle: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  logoutText: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    minWidth: 0,
  },
});
