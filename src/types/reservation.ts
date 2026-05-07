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
