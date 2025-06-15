
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { ThemeControlPanel } from './ThemeControlPanel';
import { useAdvancedTheme } from '@/hooks/useAdvancedTheme';

export function AdvancedThemeToggle() {
  const { config, updateTheme, resetTheme, saveConfigAsDefault, customAccentColors, addCustomAccentColor, removeCustomAccentColor } = useAdvancedTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground/80 hover:text-foreground relative"
        >
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <div 
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background"
            style={{ backgroundColor: config.accentColor }}
          />
          <span className="sr-only">Customize theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-border bg-popover" align="end">
        <ThemeControlPanel
          config={config}
          onChange={updateTheme}
          onReset={resetTheme}
          onSaveDefault={saveConfigAsDefault}
          customAccentColors={customAccentColors}
          onAddCustomColor={addCustomAccentColor}
          onRemoveCustomColor={removeCustomAccentColor}
        />
      </PopoverContent>
    </Popover>
  );
}
