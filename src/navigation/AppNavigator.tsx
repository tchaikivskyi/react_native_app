import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search, Calendar, User } from 'lucide-react-native';

import { COLORS } from '../constants/style';

import { SearchScreen } from '../screens/SearchScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SettingsScreen } from '../screens/tmp/SettingsScreen';
import { ContactsScreen } from '../screens/tmp/ContactsScreen';

export type TabParamList = {
  Search: undefined;
  Bookings: undefined;
  Profile: undefined;
  SettingsScreen: undefined;
  ContactsScreen: undefined;
};

export type RootStackParamList = {
  LoginScreen: undefined;
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const hiddenTabOptions = {
  tabBarItemStyle: { display: 'none' as const },
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: '#C7C7C7',
      tabBarStyle: {
        height: 68,
        paddingBottom: 10,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
      },
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Search,
          Bookings: Calendar,
          Profile: User,
        };

        const Icon = icons[route.name as keyof typeof icons];

        return Icon ? <Icon color={color} size={size} /> : <Text>●</Text>;
      },
    })}
  >
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{ tabBarLabel: 'Search a room' }}
    />

    <Tab.Screen
      name="Bookings"
      component={BookingScreen}
      options={{ tabBarLabel: 'My reservations' }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarLabel: 'Profile' }}
    />

    <Tab.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={hiddenTabOptions}
    />

    <Tab.Screen
      name="ContactsScreen"
      component={ContactsScreen}
      options={hiddenTabOptions}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);