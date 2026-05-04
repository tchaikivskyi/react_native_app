import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { User, ChevronRight } from 'lucide-react-native';

import { ScreenWrapper } from '../components/ScreenWrapper';
import { CustomButton } from '../components/Button';
import { COLORS } from '../constants/style';

export const ProfileScreen = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);

  const menuItems = [
    'Profile',
    'Language',
    'Appearance',
    'Payment',
    'Contacts',
  ];

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.userBox}>
          <View style={styles.avatar}>
            <User size={34} color={COLORS.primary} />
          </View>
          <Text style={styles.name}>{'Taras'}</Text>
          <Text style={styles.email}>{'taras@gmail.com'}</Text>
        </View>

        <View style={styles.menu}>
          {menuItems.map(item => (
            <TouchableOpacity key={item} style={styles.row}>
              <Text style={styles.rowText}>{item}</Text>
              <ChevronRight size={18} color="#999" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.row}
            onPress={() => setLogoutVisible(true)}
          >
            <Text style={styles.rowText}>Logout</Text>
            <ChevronRight size={18} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={logoutVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.logoutBox}>
            <Text style={styles.logoutTitle}>Log out</Text>
            <Text style={styles.logoutText}>
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
    marginBottom: 28,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
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
