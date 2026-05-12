import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../types/room';

type RoomState = {
  items: Room[];
  selectedRoomId: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: RoomState = {
  items: [],
  selectedRoomId: null,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.items = action.payload;
    },
    setRoomsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRoomsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSelectedRoomId: (state, action: PayloadAction<string | null>) => {
      state.selectedRoomId = action.payload;
    },
    resetRoomsState: () => initialState,
  },
});

export const {
  setRooms,
  setRoomsLoading,
  setRoomsError,
  setSelectedRoomId,
  resetRoomsState,
} = roomSlice.actions;

export default roomSlice.reducer;
