import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar, Search as SearchIcon, User } from 'lucide-react-native';

import { COLORS } from '../constants/style';
import { ROUTES } from '../constants/routes';
import { useTheme } from '../context/ThemeContext';
import { SearchScreen } from '../screens/SearchScreen';
import { RoomDetailsScreen } from '../screens/RoomDetailsScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SettingsScreen } from '../screens/tmp/SettingsScreen';
import { ContactsScreen } from '../screens/tmp/ContactsScreen';
import { SearchStackParamList } from './types';

export type TabParamList = {
  [ROUTES.SEARCH]: NavigatorScreenParams<SearchStackParamList> | undefined;
  [ROUTES.BOOKINGS]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.CONTACTS]: undefined;
};

export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.MAIN_TABS]: NavigatorScreenParams<TabParamList> | undefined;
};

type TabIconProps = {
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();

const hiddenTabOptions = {
  tabBarItemStyle: { display: 'none' as const },
};

const renderSearchIcon = ({ color, size }: TabIconProps) => (
  <SearchIcon color={color} size={size} />
);

const renderBookingsIcon = ({ color, size }: TabIconProps) => (
  <Calendar color={color} size={size} />
);

const renderProfileIcon = ({ color, size }: TabIconProps) => (
  <User color={color} size={size} />
);

const SearchStackNavigator = () => (
  <SearchStack.Navigator
    initialRouteName={ROUTES.SEARCH_RESULTS}
    screenOptions={{ headerShown: false }}
  >
    <SearchStack.Screen
      name={ROUTES.SEARCH_RESULTS}
      component={SearchScreen}
    />
    <SearchStack.Screen
      name={ROUTES.ROOM_DETAILS}
      component={RoomDetailsScreen}
    />
  </SearchStack.Navigator>
);

const MainTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
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
      }}
    >
      <Tab.Screen
        name={ROUTES.SEARCH}
        component={SearchStackNavigator}
        options={{
          tabBarLabel: 'Search a room',
          tabBarIcon: renderSearchIcon,
        }}
      />

      <Tab.Screen
        name={ROUTES.BOOKINGS}
        component={BookingScreen}
        options={{
          tabBarLabel: 'My reservations',
          tabBarIcon: renderBookingsIcon,
        }}
      />

      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: renderProfileIcon,
        }}
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
