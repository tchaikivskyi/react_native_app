export type ReservationStatus = 'all' | 'finished' | 'current';

export type Reservation = {
  id: string;
  guestName: string;
  location: string;
  status: 'finished' | 'current';
  roomTitle: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
};

export const mockReservations: Reservation[] = [
  {
    id: '1',
    guestName: 'Alicia Keys',
    location: 'Orlando, Brazil',
    status: 'finished',
    roomTitle: 'Amazing Room',
    checkIn: '2026-01-12',
    checkOut: '2026-01-15',
    nights: 3,
    total: 360,
  },
  {
    id: '2',
    guestName: 'Michael Jackson',
    location: 'Recife, Brazil',
    status: 'current',
    roomTitle: 'Fabulous Room',
    checkIn: '2026-02-04',
    checkOut: '2026-02-08',
    nights: 4,
    total: 600,
  },
];