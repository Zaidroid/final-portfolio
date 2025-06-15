
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { ThemeControlPanel } from './ThemeControlPanel';
import { useAdvancedTheme } from '@/hooks/useAdvancedTheme';

export function AdvancedThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { config, updateTheme } = useAdvancedTheme();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="text-foreground/80 hover:text-foreground relative"
      >
        <Palette className="h-[1.2rem] w-[1.2rem]" />
        <div 
          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background"
          style={{ backgroundColor: config.accentColor }}
        />
        <span className="sr-only">Customize theme</span>
      </Button>

      {isOpen && (
        <ThemeControlPanel
          config={config}
          onChange={updateTheme}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
