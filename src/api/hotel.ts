import { Room, RoomType } from '../components/RoomCard';
import { Reservation } from '../types/reservation';
import { api } from './clients';
import { request } from './utils';

type RoomRow = {
  id: string | number;
  title?: string | null;
  name?: string | null;
  price?: number | string | null;
  image?: string | null;
  image_url?: string | null;
  type?: string | null;
  capacity?: number | string | null;
  beds?: number | string | null;
  rating?: number | string | null;
  description?: string | null;
};

type ReservationRow = {
  id: string | number;
  guestName?: string | null;
  guest_name?: string | null;
  location?: string | null;
  status?: string | null;
  roomTitle?: string | null;
  room_title?: string | null;
  checkIn?: string | null;
  check_in?: string | null;
  checkOut?: string | null;
  check_out?: string | null;
  nights?: number | string | null;
  total?: number | string | null;
};

type ContactRow = {
  id: string | number;
  title?: string | null;
  name?: string | null;
  email?: string | null;
};

export type Contact = {
  id: string;
  title: string;
};

const toNumber = (value: number | string | null | undefined, fallback = 0) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

const toRoomType = (value: string | null | undefined): RoomType => {
  if (value === 'Family' || value === 'Suite' || value === 'Standart') {
    return value;
  }

  return 'Standart';
};

const mapRoom = (row: RoomRow): Room => ({
  id: String(row.id),
  title: row.title || row.name || 'Room',
  price: toNumber(row.price),
  image: row.image || row.image_url || '',
  type: toRoomType(row.type),
  capacity: toNumber(row.capacity, 1),
  beds: toNumber(row.beds, 1),
  rating: toNumber(row.rating),
  description: row.description || '',
});

const mapReservation = (row: ReservationRow): Reservation => {
  const checkIn = row.checkIn || row.check_in || '';
  const checkOut = row.checkOut || row.check_out || '';

  return {
    id: String(row.id),
    guestName: row.guestName || row.guest_name || 'Guest',
    location: row.location || '',
    status: row.status === 'finished' ? 'finished' : 'current',
    roomTitle: row.roomTitle || row.room_title || '',
    checkIn,
    checkOut,
    nights: toNumber(row.nights),
    total: toNumber(row.total),
  };
};

const mapContact = (row: ContactRow): Contact => ({
  id: String(row.id),
  title: row.title || row.name || row.email || 'Contact',
});

export const hotelApi = {
  getRooms: async () => {
    const rows = await request<RoomRow[]>(
      api.get('/rooms', {
        params: {
          select: '*',
          order: 'id.asc',
        },
      }),
    );

    return rows.map(mapRoom);
  },

  getReservations: async () => {
    const rows = await request<ReservationRow[]>(
      api.get('/reservations', {
        params: {
          select: '*',
          order: 'id.asc',
        },
      }),
    );

    return rows.map(mapReservation);
  },

  getContacts: async () => {
    const rows = await request<ContactRow[]>(
      api.get('/contacts', {
        params: {
          select: '*',
          order: 'id.asc',
        },
      }),
    );

    return rows.map(mapContact);
  },
};
