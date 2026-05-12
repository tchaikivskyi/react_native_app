import React, { useCallback, useMemo, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChevronRight, User } from 'lucide-react-native';

import { CustomButton } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { COLORS } from '../constants/style';
import { useTheme } from '../context/ThemeContext';

export const ProfileScreen = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { colors, theme, toggleTheme } = useTheme();

  const menuItems = useMemo(
    () => ['Profile', 'Language', 'Appearance', 'Payment', 'Contacts'],
    [],
  );

  const openLogoutDialog = useCallback(() => {
    setLogoutVisible(true);
  }, []);

  const closeLogoutDialog = useCallback(() => {
    setLogoutVisible(false);
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

        <View style={styles.userBox}>
          <View style={styles.avatar}>
            <User size={34} color={COLORS.primary} />
          </View>
          <Text style={[styles.name, { color: colors.text }]}>Taras</Text>
          <Text style={[styles.email, { color: colors.mutedText }]}>
            taras@gmail.com
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

        <View style={[styles.menu, { backgroundColor: colors.card }]}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.row, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.rowText, { color: colors.text }]}>
                {item}
              </Text>
              <ChevronRight size={18} color={colors.mutedText} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.row, { borderBottomColor: colors.border }]}
            onPress={openLogoutDialog}
          >
            <Text style={[styles.rowText, { color: colors.text }]}>
              Logout
            </Text>
            <ChevronRight size={18} color={colors.mutedText} />
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
                onPress={closeLogoutDialog}
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
  },
  email: {
    fontSize: 13,
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
  row: {
    height: 54,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    fontSize: 15,
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
