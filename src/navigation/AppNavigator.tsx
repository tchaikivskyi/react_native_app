import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar, Search as SearchIcon, User } from 'lucide-react-native';

import { COLORS } from '../constants/style';
import { ROUTES } from '../constants/routes';
import { useTheme } from '../context/ThemeContext';

import { SearchScreen } from '../screens/SearchScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SettingsScreen } from '../screens/tmp/SettingsScreen';
import { ContactsScreen } from '../screens/tmp/ContactsScreen';

export type TabParamList = {
  [ROUTES.SEARCH]: undefined;
  [ROUTES.BOOKINGS]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.CONTACTS]: undefined;
};

export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.MAIN_TABS]: NavigatorScreenParams<TabParamList> | undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const hiddenTabOptions = {
  tabBarItemStyle: { display: 'none' as const },
};

const MainTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: colors.mutedText,
      tabBarStyle: {
        height: 68,
        paddingBottom: 10,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
      },
      tabBarIcon: ({ color, size }) => {
        const icons = {
          [ROUTES.SEARCH]: SearchIcon,
          [ROUTES.BOOKINGS]: Calendar,
          [ROUTES.PROFILE]: User,
        };

        const Icon = icons[route.name as keyof typeof icons];

        return Icon ? <Icon color={color} size={size} /> : <Text>●</Text>;
      },
      })}
    >
    <Tab.Screen
      name={ROUTES.SEARCH}
      component={SearchScreen}
      options={{ tabBarLabel: 'Search a room' }}
    />

    <Tab.Screen
      name={ROUTES.BOOKINGS}
      component={BookingScreen}
      options={{ tabBarLabel: 'My reservations' }}
    />

    <Tab.Screen
      name={ROUTES.PROFILE}
      component={ProfileScreen}
      options={{ tabBarLabel: 'Profile' }}
    />

    <Tab.Screen
      name={ROUTES.SETTINGS}
      component={SettingsScreen}
      options={hiddenTabOptions}
    />

    <Tab.Screen
      name={ROUTES.CONTACTS}
      component={ContactsScreen}
      options={hiddenTabOptions}
    />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.MAIN_TABS} component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);
