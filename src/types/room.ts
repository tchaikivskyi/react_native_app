export type RoomType = 'Standart' | 'Family' | 'Suite';

export type Room = {
  id: string;
  title: string;
  price: number;
  image: string;
  type: RoomType;
  capacity: number;
  beds: number;
  rating: number;
  description: string;
};
