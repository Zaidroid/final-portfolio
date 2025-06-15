
import { themes, ThemeName } from '@/lib/themes';

interface ThemePreviewProps {
  themeName: ThemeName;
  isSelected: boolean;
}

export function ThemePreview({ themeName, isSelected }: ThemePreviewProps) {
  const theme = themes[themeName];

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
      isSelected ? 'border-primary bg-accent/10' : 'border-transparent hover:border-border hover:bg-accent/5'
    }`}>
      <div className="flex space-x-1">
        <div 
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: theme.vars['--color-primary'] }}
        />
        <div 
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: theme.vars['--color-accent'] }}
        />
        <div 
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: theme.vars['--color-surface'] }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{themeName}</div>
        <div className="text-xs text-muted-foreground truncate">{theme.description}</div>
      </div>
    </div>
  );
}
