import { useEffect, useState } from 'react';
import { hotelApi } from '../api/hotel';
import { Reservation } from '../types/reservation';

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await hotelApi.getReservations();
      setReservations(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return {
    reservations,
    loading,
    error,
    refetch: fetchReservations,
  };
};
