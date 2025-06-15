
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { themes, ThemeName } from '@/lib/themes';

interface CustomThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeName[];
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('Classic Light');

  const availableThemes = Object.keys(themes) as ThemeName[];

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('custom-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const theme = themes[currentTheme];
    const root = document.documentElement;

    // Clear any existing theme classes
    availableThemes.forEach(themeName => {
      root.classList.remove(`theme-${themeName.toLowerCase().replace(/\s+/g, '-')}`);
    });

    // Add current theme class
    const themeClass = `theme-${currentTheme.toLowerCase().replace(/\s+/g, '-')}`;
    root.classList.add(themeClass);

    // Apply CSS custom properties
    Object.entries(theme.vars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Map to Tailwind CSS variables
    root.style.setProperty('--background', theme.vars['--color-bg']);
    root.style.setProperty('--foreground', theme.vars['--color-text-primary']);
    root.style.setProperty('--card', theme.vars['--color-surface']);
    root.style.setProperty('--card-foreground', theme.vars['--color-text-primary']);
    root.style.setProperty('--popover', theme.vars['--color-surface']);
    root.style.setProperty('--popover-foreground', theme.vars['--color-text-primary']);
    root.style.setProperty('--primary', theme.vars['--color-primary']);
    root.style.setProperty('--primary-foreground', theme.vars['--color-bg']);
    root.style.setProperty('--secondary', theme.vars['--color-surface']);
    root.style.setProperty('--secondary-foreground', theme.vars['--color-text-secondary']);
    root.style.setProperty('--muted', theme.vars['--color-surface']);
    root.style.setProperty('--muted-foreground', theme.vars['--color-text-secondary']);
    root.style.setProperty('--accent', theme.vars['--color-accent']);
    root.style.setProperty('--accent-foreground', theme.vars['--color-bg']);
    root.style.setProperty('--border', theme.vars['--color-border']);
    root.style.setProperty('--input', theme.vars['--color-border']);
    root.style.setProperty('--ring', theme.vars['--color-primary']);

    // Save to localStorage
    localStorage.setItem('custom-theme', currentTheme);
  }, [currentTheme, availableThemes]);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  return (
    <CustomThemeContext.Provider value={{ currentTheme, setTheme, availableThemes }}>
      {children}
    </CustomThemeContext.Provider>
  );
}

export function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
}
