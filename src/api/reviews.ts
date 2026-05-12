import axios from 'axios';
import { RoomReview } from '../types/review';

type JsonPlaceholderComment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

const reviewsApiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

const mapReview = (review: JsonPlaceholderComment): RoomReview => ({
  id: String(review.id),
  author: review.name,
  email: review.email,
  body: review.body,
});

export const reviewsApi = {
  getRoomReviews: async (roomId: string) => {
    const postId = Number(roomId) || 1;
    const { data } = await reviewsApiClient.get<JsonPlaceholderComment[]>(
      '/comments',
      {
        params: {
          postId,
        },
      },
    );

    return data.slice(0, 3).map(mapReview);
  },
};
