import { useEffect, useState } from 'react';
import { Room } from '../components/RoomCard';
import { hotelApi } from '../api/hotel';

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await hotelApi.getRooms();
      setRooms(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    refetch: fetchRooms,
  };
};
