
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeConfig, defaultThemeConfig, applyTheme } from '@/lib/themeEngine';

interface AdvancedThemeContextType {
  config: ThemeConfig;
  updateTheme: (config: ThemeConfig) => void;
  resetTheme: () => void;
}

const AdvancedThemeContext = createContext<AdvancedThemeContextType | undefined>(undefined);

export function AdvancedThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(defaultThemeConfig);

  useEffect(() => {
    // Load theme from localStorage
    const savedConfig = localStorage.getItem('advanced-theme-config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...defaultThemeConfig, ...parsedConfig });
      } catch (error) {
        console.error('Failed to parse saved theme config');
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    applyTheme(config);
    
    // Save to localStorage
    localStorage.setItem('advanced-theme-config', JSON.stringify(config));
  }, [config]);

  const updateTheme = (newConfig: ThemeConfig) => {
    setConfig(newConfig);
  };

  const resetTheme = () => {
    setConfig(defaultThemeConfig);
  };

  return (
    <AdvancedThemeContext.Provider value={{ config, updateTheme, resetTheme }}>
      {children}
    </AdvancedThemeContext.Provider>
  );
}

export function useAdvancedTheme() {
  const context = useContext(AdvancedThemeContext);
  if (context === undefined) {
    throw new Error('useAdvancedTheme must be used within an AdvancedThemeProvider');
  }
  return context;
}
