import React, { createContext, useContext, useState, useEffect } from 'react';

export type VHVThemeMode = 'light' | 'dark' | 'system';

export interface VHVThemeData {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  errorColor: string;
  textColor: string;
  mode: 'light' | 'dark';
}

interface VHVThemeContextValue {
  theme: VHVThemeData;
  themeMode: VHVThemeMode;
  setThemeMode: (mode: VHVThemeMode) => void;
  toggleTheme: () => void;
}

const defaultLightTheme: VHVThemeData = {
  primaryColor: '#3B82F6',
  accentColor: '#10B981',
  backgroundColor: '#FFFFFF',
  surfaceColor: '#F9FAFB',
  errorColor: '#EF4444',
  textColor: '#111827',
  mode: 'light',
};

const defaultDarkTheme: VHVThemeData = {
  primaryColor: '#60A5FA',
  accentColor: '#34D399',
  backgroundColor: '#111827',
  surfaceColor: '#1F2937',
  errorColor: '#F87171',
  textColor: '#F9FAFB',
  mode: 'dark',
};

const VHVThemeContext = createContext<VHVThemeContextValue | null>(null);

export const useVHVTheme = () => {
  const context = useContext(VHVThemeContext);
  if (!context) {
    throw new Error('useVHVTheme must be used within VHVThemeProvider');
  }
  return context;
};

interface VHVThemeProviderProps {
  children: React.ReactNode;
  initialMode?: VHVThemeMode;
  lightTheme?: Partial<VHVThemeData>;
  darkTheme?: Partial<VHVThemeData>;
}

export const VHVThemeProvider: React.FC<VHVThemeProviderProps> = ({
  children,
  initialMode = 'system',
  lightTheme,
  darkTheme,
}) => {
  const [themeMode, setThemeMode] = useState<VHVThemeMode>(initialMode);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const effectiveMode = themeMode === 'system' ? systemTheme : themeMode;
  const theme = effectiveMode === 'dark'
    ? { ...defaultDarkTheme, ...darkTheme }
    : { ...defaultLightTheme, ...lightTheme };

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  useEffect(() => {
    if (effectiveMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [effectiveMode]);

  return (
    <VHVThemeContext.Provider value={{ theme, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </VHVThemeContext.Provider>
  );
};
