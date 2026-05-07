import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../types/room';

export type SavedRoom = Room & {
  guests: number;
};

type RoomState = {
  items: Room[];
  savedRooms: SavedRoom[];
  selectedRoomId: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: RoomState = {
  items: [],
  savedRooms: [],
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
    addSavedRoom: (state, action: PayloadAction<Room>) => {
      const alreadySaved = state.savedRooms.some(
        room => room.id === action.payload.id,
      );

      if (!alreadySaved) {
        state.savedRooms.push({ ...action.payload, guests: 1 });
      }
    },
    removeSavedRoom: (state, action: PayloadAction<string>) => {
      state.savedRooms = state.savedRooms.filter(
        room => room.id !== action.payload,
      );
    },
    updateSavedRoomGuests: (
      state,
      action: PayloadAction<{ id: string; guests: number }>,
    ) => {
      const room = state.savedRooms.find(
        savedRoom => savedRoom.id === action.payload.id,
      );

      if (room) {
        room.guests = action.payload.guests;
      }
    },
    resetRoomsState: () => initialState,
  },
});

export const {
  setRooms,
  setRoomsLoading,
  setRoomsError,
  setSelectedRoomId,
  addSavedRoom,
  removeSavedRoom,
  updateSavedRoomGuests,
  resetRoomsState,
} = roomSlice.actions;

export default roomSlice.reducer;
