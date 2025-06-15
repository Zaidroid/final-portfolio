
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeConfig, defaultThemeConfig, applyTheme, accentColorPresets } from '@/lib/themeEngine';

interface AdvancedThemeContextType {
  config: ThemeConfig;
  updateTheme: (config: ThemeConfig) => void;
  resetTheme: () => void;
  saveConfigAsDefault: () => void;
  customAccentColors: string[];
  addCustomAccentColor: (color: string) => void;
  removeCustomAccentColor: (color: string) => void;
}

const AdvancedThemeContext = createContext<AdvancedThemeContextType | undefined>(undefined);

export function AdvancedThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(defaultThemeConfig);
  const [userDefaultConfig, setUserDefaultConfig] = useState<ThemeConfig | null>(null);
  const [customAccentColors, setCustomAccentColors] = useState<string[]>([]);

  useEffect(() => {
    // Load all theme-related data from localStorage
    const savedConfig = localStorage.getItem('advanced-theme-config');
    const savedUserDefault = localStorage.getItem('user-default-theme-config');
    const savedCustomColors = localStorage.getItem('custom-accent-colors');

    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...defaultThemeConfig, ...parsedConfig });
      } catch (error) {
        console.error('Failed to parse saved theme config');
      }
    }
    if (savedUserDefault) {
      try {
        setUserDefaultConfig(JSON.parse(savedUserDefault));
      } catch (error) {
        console.error('Failed to parse user default theme config');
      }
    }
    if (savedCustomColors) {
      try {
        setCustomAccentColors(JSON.parse(savedCustomColors));
      } catch (error) {
        console.error('Failed to parse custom accent colors');
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to document and save to localStorage
    applyTheme(config);
    localStorage.setItem('advanced-theme-config', JSON.stringify(config));
  }, [config]);

  const updateTheme = (newConfig: ThemeConfig) => {
    setConfig(newConfig);
  };

  const saveConfigAsDefault = () => {
    setUserDefaultConfig(config);
    localStorage.setItem('user-default-theme-config', JSON.stringify(config));
  };

  const resetTheme = () => {
    setConfig(userDefaultConfig || defaultThemeConfig);
  };

  const addCustomAccentColor = (color: string) => {
    if (color && !customAccentColors.includes(color) && !accentColorPresets.some(p => p.value.toLowerCase() === color.toLowerCase())) {
      const newColors = [...customAccentColors, color];
      setCustomAccentColors(newColors);
      localStorage.setItem('custom-accent-colors', JSON.stringify(newColors));
    }
  };

  const removeCustomAccentColor = (color: string) => {
    const newColors = customAccentColors.filter(c => c !== color);
    setCustomAccentColors(newColors);
    localStorage.setItem('custom-accent-colors', JSON.stringify(newColors));
  };

  return (
    <AdvancedThemeContext.Provider value={{ config, updateTheme, resetTheme, saveConfigAsDefault, customAccentColors, addCustomAccentColor, removeCustomAccentColor }}>
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
