import axios from 'axios';
import { Platform } from 'react-native';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './supabaseConfig';

const supabaseHeaders = SUPABASE_ANON_KEY
  ? { apikey: SUPABASE_ANON_KEY }
  : {};

export const api = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
    'App-Os': Platform.OS,
    ...supabaseHeaders,
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  },
);
