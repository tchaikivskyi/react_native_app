export const ROUTES = {
  LOGIN: 'LoginScreen',
  MAIN_TABS: 'MainTabs',

  SEARCH: 'Search',
  BOOKINGS: 'Bookings',
  PROFILE: 'Profile',
  SETTINGS: 'SettingsScreen',
  CONTACTS: 'ContactsScreen',

  SEARCH_RESULTS: 'SearchResults',
  ROOM_DETAILS: 'RoomDetails',
  CHECKOUT: 'Checkout',
  PAYMENT_SUCCESS: 'PaymentSuccess',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
