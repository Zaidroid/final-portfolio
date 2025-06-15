
import { themes, ThemeName, getThemeIcon } from '@/lib/themes';

interface ThemePreviewProps {
  themeName: ThemeName;
  isSelected: boolean;
}

export function ThemePreview({ themeName, isSelected }: ThemePreviewProps) {
  const theme = themes[themeName];

  return (
    <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 w-full ${
      isSelected 
        ? 'border-primary bg-primary/10 shadow-lg scale-[1.02]' 
        : 'border-transparent hover:border-border hover:bg-accent/5 hover:scale-[1.01]'
    }`}>
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{getThemeIcon(themeName)}</div>
        <div className="flex space-x-1.5">
          <div 
            className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: theme.vars['--color-primary'] }}
          />
          <div 
            className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: theme.vars['--color-accent'] }}
          />
          <div 
            className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: theme.vars['--color-surface'] }}
          />
          <div 
            className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: theme.vars['--color-text-primary'] }}
          />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-base mb-1">{themeName}</div>
        <div className="text-sm text-muted-foreground leading-tight">{theme.description}</div>
      </div>
      
      {isSelected && (
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      )}
    </div>
  );
}
