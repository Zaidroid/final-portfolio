
export interface ThemeConfig {
  mode: 'light' | 'dark';
  accentColor: string;
  buttonStyle: 'rounded' | 'sharp' | 'minimal' | 'pill';
  borderRadius: number;
  spacing: number;
  shadowIntensity: number;
}

export const defaultThemeConfig: ThemeConfig = {
  mode: 'light',
  accentColor: '#8b5cf6',
  buttonStyle: 'rounded',
  borderRadius: 8,
  spacing: 16,
  shadowIntensity: 0.15,
};

export const accentColorPresets = [
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Indigo', value: '#6366f1' },
];

// Generate complementary colors from accent
export function generateColorPalette(accentColor: string, mode: 'light' | 'dark') {
  const hex = accentColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const lighten = (amount: number) => {
    const factor = mode === 'light' ? amount : -amount;
    return `rgb(${Math.min(255, r + factor)}, ${Math.min(255, g + factor)}, ${Math.min(255, b + factor)})`;
  };

  const darken = (amount: number) => {
    const factor = mode === 'light' ? -amount : amount;
    return `rgb(${Math.max(0, r + factor)}, ${Math.max(0, g + factor)}, ${Math.max(0, b + factor)})`;
  };

  return {
    primary: accentColor,
    primaryHover: darken(20),
    secondary: mode === 'light' ? '#e4e4e7' : '#3f3f46', // Using neutral grays for better contrast
    accent: lighten(60),
    surface: mode === 'light' ? '#ffffff' : '#1a1a1a',
    background: mode === 'light' ? '#fafafa' : '#0f0f0f',
    text: mode === 'light' ? '#1a1a1a' : '#fafafa',
    textMuted: mode === 'light' ? '#6b7280' : '#9ca3af',
    border: mode === 'light' ? '#e5e7eb' : '#374151',
  };
}

export function applyTheme(config: ThemeConfig) {
  const palette = generateColorPalette(config.accentColor, config.mode);
  const root = document.documentElement;

  // Apply color variables
  root.style.setProperty('--color-primary', palette.primary);
  root.style.setProperty('--color-primary-hover', palette.primaryHover);
  root.style.setProperty('--color-secondary', palette.secondary);
  root.style.setProperty('--color-accent', palette.accent);
  root.style.setProperty('--color-surface', palette.surface);
  root.style.setProperty('--color-background', palette.background);
  root.style.setProperty('--color-text', palette.text);
  root.style.setProperty('--color-text-muted', palette.textMuted);
  root.style.setProperty('--color-border', palette.border);

  // Apply layout variables
  root.style.setProperty('--border-radius', `${config.borderRadius}px`);
  root.style.setProperty('--spacing', `${config.spacing}px`);
  root.style.setProperty('--shadow-intensity', config.shadowIntensity.toString());

  // Apply button style variables with proper mapping
  const buttonStyles = {
    rounded: { radius: `${config.borderRadius}px`, padding: '12px 24px' },
    sharp: { radius: '0px', padding: '12px 24px' },
    minimal: { radius: '4px', padding: '8px 16px' },
    pill: { radius: '50px', padding: '12px 24px' },
  };

  const buttonStyle = buttonStyles[config.buttonStyle];
  root.style.setProperty('--button-radius', buttonStyle.radius);
  root.style.setProperty('--button-padding', buttonStyle.padding);

  // Apply mode class
  root.classList.toggle('dark-mode', config.mode === 'dark');
  root.classList.toggle('light-mode', config.mode === 'light');

  // Update Tailwind CSS variables for compatibility
  root.style.setProperty('--background', palette.background);
  root.style.setProperty('--foreground', palette.text);
  root.style.setProperty('--primary', palette.primary);
  root.style.setProperty('--primary-foreground', palette.surface);
  root.style.setProperty('--secondary', palette.secondary);
  root.style.setProperty('--secondary-foreground', palette.text);
  root.style.setProperty('--accent', palette.accent);
  root.style.setProperty('--accent-foreground', palette.text);
  root.style.setProperty('--border', palette.border);
  root.style.setProperty('--input', palette.border);
  root.style.setProperty('--ring', palette.primary);
  root.style.setProperty('--radius', `${config.borderRadius}px`);

  // Apply global button style class
  root.classList.remove('btn-rounded', 'btn-sharp', 'btn-minimal', 'btn-pill');
  root.classList.add(`btn-${config.buttonStyle}`);
}
