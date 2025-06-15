
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { themes, themeNames, toKebabCase, Theme } from '@/lib/themes';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  currentTheme: Theme;
  themes: Record<string, Theme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      // Ensure the stored theme is one of the available themes
      if (storedTheme && themeNames.includes(storedTheme)) {
        return storedTheme;
      }
    }
    // Fallback to the first theme in the list
    return themeNames[0];
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const currentThemeObject = themes[theme];

    if (!currentThemeObject) {
      // This is a safeguard and should not be hit with the new state logic,
      // but it prevents a crash if something goes wrong.
      return;
    }
    
    // Remove all theme classes to avoid conflicts
    themeNames.forEach(name => root.classList.remove(`theme-${toKebabCase(name)}`));
    
    // Add current theme class
    root.classList.add(`theme-${toKebabCase(theme)}`);

    // Apply CSS variables for the current theme
    Object.entries(currentThemeObject.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    Object.entries(currentThemeObject.button).forEach(([key, value]) => {
        const varName = `--button-${toKebabCase(key)}`;
        root.style.setProperty(varName, value);
    });

  }, [theme]);

  const setTheme = (newTheme: string) => {
    if (themeNames.includes(newTheme)) {
      localStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    }
  };
  
  const currentTheme = useMemo(() => themes[theme], [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a CustomThemeProvider');
  }
  return context;
};
