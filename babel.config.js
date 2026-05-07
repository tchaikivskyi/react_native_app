module.exports = api => {
  api.cache(false);

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          path: '.env',
          allowlist: [
            'NEXT_PUBLIC_SUPABASE_URL',
            'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
          ],
        },
      ],
    ],
  };
};
