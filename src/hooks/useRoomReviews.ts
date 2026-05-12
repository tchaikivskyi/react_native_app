import { useCallback, useEffect, useState } from 'react';
import { reviewsApi } from '../api/reviews';
import { RoomReview } from '../types/review';

export const useRoomReviews = (roomId: string) => {
  const [reviews, setReviews] = useState<RoomReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await reviewsApi.getRoomReviews(roomId);
      setReviews(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews,
  };
};
