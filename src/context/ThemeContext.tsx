import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

type ThemeMode = 'light' | 'dark';

type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  text: string;
  mutedText: string;
  border: string;
};

type ThemeContextValue = {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const lightColors: ThemeColors = {
  background: '#F8F9FB',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#111111',
  mutedText: '#777777',
  border: '#F0F0F0',
};

const darkColors: ThemeColors = {
  background: '#101418',
  surface: '#151B20',
  card: '#1E252C',
  text: '#F5F7FA',
  mutedText: '#AAB4BE',
  border: '#2B343D',
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  const value = useMemo(
    () => ({
      theme,
      colors: theme === 'light' ? lightColors : darkColors,
      toggleTheme: () => {
        setTheme(currentTheme =>
          currentTheme === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
};
