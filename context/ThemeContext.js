import { createContext, useContext, useState, useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { resolvedTheme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDarkMode = mounted ? resolvedTheme === 'dark' : true;
  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx) return ctx;
  return { isDarkMode: true, toggleTheme: () => {} };
}
