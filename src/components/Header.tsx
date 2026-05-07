import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS } from './../constants/style';
import { ROUTES } from '../constants/routes';
import { useTheme } from '../context/ThemeContext';
import type { RootStackParamList, TabParamList } from '../navigation/AppNavigator';

type NavigationProp = BottomTabNavigationProp<TabParamList> &
  NativeStackNavigationProp<RootStackParamList>;

type MenuItem =
  | {
      label: string;
      type: 'tab';
      screen: keyof TabParamList;
      destructive?: boolean;
    }
  | {
      label: string;
      type: 'stack';
      screen: keyof RootStackParamList;
      destructive?: boolean;
    };

export const CustomHeader = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();

  const menuItems: MenuItem[] = [
    { label: 'My Bookings', type: 'tab', screen: ROUTES.BOOKINGS },
    { label: 'Settings', type: 'tab', screen: ROUTES.SETTINGS },
    { label: 'Contacts', type: 'tab', screen: ROUTES.CONTACTS },
    { label: 'Log out', type: 'stack', screen: ROUTES.LOGIN, destructive: true },
  ];

  const goTo = (item: MenuItem) => {
    setVisible(false);

    if (item.type === 'stack') {
      navigation.replace(item.screen);
      return;
    }

    navigation.navigate(item.screen);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <Text style={[styles.logo, { color: COLORS.primary }]}>
        ibis <Text style={[styles.sub, { color: colors.text }]}>STYLES</Text>
      </Text>

      <TouchableOpacity onPress={() => setVisible(true)} style={styles.trigger}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>TC</Text>
        </View>
        <Text style={styles.arrow}>▾</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.menu, { backgroundColor: colors.card }]}>
                <View style={styles.user}>
                  <Text style={[styles.name, { color: colors.text }]}>
                    Taras
                  </Text>
                  <Text style={[styles.email, { color: colors.mutedText }]}>
                    taras@gmail.com
                  </Text>
                </View>

                <View
                  style={[styles.divider, { backgroundColor: colors.border }]}
                />

                {menuItems.map(item => (
                  <TouchableOpacity
                    key={item.label}
                    style={styles.item}
                    onPress={() => goTo(item)}
                  >
                    <Text
                      style={[
                        styles.label,
                        { color: colors.text },
                        item.destructive && styles.destructive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
    fontStyle: 'italic',
  },
  sub: {
    fontSize: 12,
    fontWeight: '400',
    color: '#333',
    letterSpacing: 1,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  avatarText: {
    fontWeight: '600',
    color: '#555',
  },
  arrow: {
    marginLeft: 6,
    color: '#A0A0A0',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 16,
    width: 200,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 10,
  },
  user: {
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    fontSize: 12,
    color: '#757575',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },
  item: {
    padding: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  destructive: {
    color: '#FF3B30',
  },
});
