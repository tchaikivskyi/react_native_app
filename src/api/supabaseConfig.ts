const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Supabase environment variables are missing');
}

export const SUPABASE_URL = supabaseUrl;

export const SUPABASE_ANON_KEY = supabasePublishableKey;
