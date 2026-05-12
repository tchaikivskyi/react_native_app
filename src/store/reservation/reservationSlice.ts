import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reservation, ReservationStatus } from '../../types/reservation';

type ReservationState = {
  items: Reservation[];
  activeFilter: ReservationStatus;
  loading: boolean;
  error: string | null;
};

const initialState: ReservationState = {
  items: [],
  activeFilter: 'all',
  loading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.items = action.payload;
    },
    setReservationsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setReservationsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setReservationFilter: (
      state,
      action: PayloadAction<ReservationStatus>,
    ) => {
      state.activeFilter = action.payload;
    },
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.items.unshift(action.payload);
    },
    resetReservationsState: () => initialState,
  },
});

export const {
  setReservations,
  setReservationsLoading,
  setReservationsError,
  setReservationFilter,
  addReservation,
  resetReservationsState,
} = reservationSlice.actions;

export default reservationSlice.reducer;
