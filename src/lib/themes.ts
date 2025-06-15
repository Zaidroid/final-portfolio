
export const themes = {
  // 1. Classic Light: fresh, clean, high‑contrast
  "Classic Light": {
    description: "A bright, minimal palette for a clean look.",
    vars: {
      "--color-bg": "#FFFFFF",
      "--color-surface": "#F4F4F4",
      "--color-primary": "#0052CC",
      "--color-secondary": "#172B4D",
      "--color-accent": "#FF5630",
      "--color-text-primary": "#172B4D",
      "--color-text-secondary": "#42526E",
      "--color-border": "#DFE1E6",
      "--color-gradient-from": "#0052CC",
      "--color-gradient-to": "#FF5630",
      "--color-hero-gradient-from": "#0052CC",
      "--color-hero-gradient-to": "#FF5630",
    },
    button: {
      bg: "var(--color-primary)",
      color: "#FFFFFF",
      hoverBg: "#0039A6",
      borderRadius: "4px",
    },
  },

  // 2. Midnight Dark: deep, moody, immersive
  "Midnight Dark": {
    description: "A dark theme with cool blue accents for night‑owl coders.",
    vars: {
      "--color-bg": "#0D1117",
      "--color-surface": "#161B22",
      "--color-primary": "#58A6FF",
      "--color-secondary": "#8B949E",
      "--color-accent": "#F85149",
      "--color-text-primary": "#C9D1D9",
      "--color-text-secondary": "#8B949E",
      "--color-border": "#30363D",
      "--color-gradient-from": "#58A6FF",
      "--color-gradient-to": "#F85149",
      "--color-hero-gradient-from": "#58A6FF",
      "--color-hero-gradient-to": "#A855F7",
    },
    button: {
      bg: "var(--color-primary)",
      color: "#0D1117",
      hoverBg: "#1B6CA8",
      borderRadius: "4px",
    },
  },

  // 3. Solar Flare: warm, energetic, vibrant
  "Solar Flare": {
    description: "A punchy, high‑energy palette with warm yellows and reds.",
    vars: {
      "--color-bg": "#FFF8E1",
      "--color-surface": "#FFE0B2",
      "--color-primary": "#FF6F00",
      "--color-secondary": "#D84315",
      "--color-accent": "#FFC400",
      "--color-text-primary": "#3E2723",
      "--color-text-secondary": "#5D4037",
      "--color-border": "#FFCC80",
      "--color-gradient-from": "#FF6F00",
      "--color-gradient-to": "#FFC400",
      "--color-hero-gradient-from": "#FF6F00",
      "--color-hero-gradient-to": "#D84315",
    },
    button: {
      bg: "var(--color-secondary)",
      color: "#FFF8E1",
      hoverBg: "#BF360C",
      borderRadius: "8px",
    },
  },

  // 4. Oceanic Twilight: cool, calming, nature‑inspired
  "Oceanic Twilight": {
    description: "Deep blues and teals for a serene, ocean‑themed interface.",
    vars: {
      "--color-bg": "#E0F7FA",
      "--color-surface": "#B2EBF2",
      "--color-primary": "#00796B",
      "--color-secondary": "#004D40",
      "--color-accent": "#00ACC1",
      "--color-text-primary": "#004D40",
      "--color-text-secondary": "#00695C",
      "--color-border": "#4DD0E1",
      "--color-gradient-from": "#00796B",
      "--color-gradient-to": "#00ACC1",
      "--color-hero-gradient-from": "#00796B",
      "--color-hero-gradient-to": "#004D40",
    },
    button: {
      bg: "var(--color-primary)",
      color: "#E0F7FA",
      hoverBg: "#004D40",
      borderRadius: "6px",
    },
  },

  // 5. Forest Whisper: earthy, muted, organic
  "Forest Whisper": {
    description: "Muted greens and browns for a grounded, eco‑friendly feel.",
    vars: {
      "--color-bg": "#F1F8E9",
      "--color-surface": "#DCEDC8",
      "--color-primary": "#558B2F",
      "--color-secondary": "#33691E",
      "--color-accent": "#AFB42B",
      "--color-text-primary": "#2E7D32",
      "--color-text-secondary": "#4CAF50",
      "--color-border": "#C5E1A5",
      "--color-gradient-from": "#558B2F",
      "--color-gradient-to": "#AFB42B",
      "--color-hero-gradient-from": "#558B2F",
      "--color-hero-gradient-to": "#33691E",
    },
    button: {
      bg: "var(--color-accent)",
      color: "#1B5E20",
      hoverBg: "#9E9D24",
      borderRadius: "12px",
    },
  },

  // 6. Monochrome Minimal: sleek, modern, typographic
  "Monochrome Minimal": {
    description: "All‑gray palette, letting typography and layout shine.",
    vars: {
      "--color-bg": "#FAFAFA",
      "--color-surface": "#F0F0F0",
      "--color-primary": "#333333",
      "--color-secondary": "#666666",
      "--color-accent": "#999999",
      "--color-text-primary": "#111111",
      "--color-text-secondary": "#444444",
      "--color-border": "#DDDDDD",
      "--color-gradient-from": "#333333",
      "--color-gradient-to": "#666666",
      "--color-hero-gradient-from": "#111111",
      "--color-hero-gradient-to": "#333333",
    },
    button: {
      bg: "transparent",
      color: "var(--color-primary)",
      hoverBg: "var(--color-surface)",
      borderRadius: "0px",
    },
  },
};

export type ThemeName = keyof typeof themes;

export const getThemeIcon = (themeName: ThemeName) => {
  const iconMap = {
    "Classic Light": "☀️",
    "Midnight Dark": "🌙",
    "Solar Flare": "🔥",
    "Oceanic Twilight": "🌊",
    "Forest Whisper": "🌲",
    "Monochrome Minimal": "⚫",
  };
  return iconMap[themeName];
};
