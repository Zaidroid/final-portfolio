
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { ThemePreview } from "./ThemePreview";
import { getThemeIcon } from "@/lib/themes";

export function ThemeToggle() {
  const { currentTheme, setTheme, availableThemes } = useCustomTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground/80 hover:text-foreground"
        >
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 max-h-96 overflow-y-auto bg-background/95 backdrop-blur-sm border-border"
      >
        <div className="p-2">
          <div className="text-sm font-medium mb-2 px-2">Choose Theme</div>
          {availableThemes.map((themeName) => (
            <DropdownMenuItem
              key={themeName}
              onClick={() => setTheme(themeName)}
              className="p-0 cursor-pointer"
            >
              <ThemePreview 
                themeName={themeName} 
                isSelected={currentTheme === themeName}
              />
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
