
import { RotateCcw, Palette, AppWindow, LayoutPanelLeft, Settings, Save, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeConfig, defaultThemeConfig } from '@/lib/themeEngine';
import { ColorPicker } from './ColorPicker';

interface ModernThemeCustomizerProps {
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
  onReset: () => void;
  onSaveDefault: () => void;
  customAccentColors: string[];
  onAddCustomColor: (color: string) => void;
  onRemoveCustomColor: (color: string) => void;
}

export function ModernThemeCustomizer({
  config,
  onChange,
  onReset,
  onSaveDefault,
  customAccentColors,
  onAddCustomColor,
  onRemoveCustomColor,
}: ModernThemeCustomizerProps) {
  const updateConfig = (updates: Partial<ThemeConfig>) => {
    onChange({ ...config, ...updates });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'lovable-theme.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string);
          onChange({ ...defaultThemeConfig, ...importedConfig });
        } catch (error) {
          console.error('Invalid theme file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Customize Theme</h3>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onSaveDefault}>
                    <Save className="mr-2 h-4 w-4" />
                    <span>Save as Default</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onReset}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    <span>Reset to Default</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Export Theme</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <label className="w-full flex items-center cursor-pointer relative">
                        <Upload className="mr-2 h-4 w-4" />
                        <span>Import Theme</span>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </label>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
          <TabsTrigger value="colors" className="py-2 flex-col gap-1 h-auto text-xs">
            <Palette className="h-4 w-4" />
            <span>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="py-2 flex-col gap-1 h-auto text-xs">
            <AppWindow className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="py-2 flex-col gap-1 h-auto text-xs">
            <LayoutPanelLeft className="h-4 w-4" />
            <span>Layout</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
            <TabsContent value="colors" className="mt-0 space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode-switch" className="font-medium">Dark Mode</Label>
                  <Switch
                    id="dark-mode-switch"
                    checked={config.mode === 'dark'}
                    onCheckedChange={(checked) => updateConfig({ mode: checked ? 'dark' : 'light' })}
                  />
                </div>
                <ColorPicker
                    currentColor={config.accentColor}
                    customColors={customAccentColors}
                    onColorChange={(color) => updateConfig({ accentColor: color })}
                    onAddCustomColor={onAddCustomColor}
                    onRemoveCustomColor={onRemoveCustomColor}
                />
            </TabsContent>
            <TabsContent value="appearance" className="mt-0 space-y-6">
                <div>
                    <Label className="text-sm font-medium mb-3 block">Button Style</Label>
                    <div className="grid grid-cols-2 gap-3">
                    {(['rounded', 'sharp', 'minimal', 'pill'] as const).map((style) => (
                        <button
                        key={style}
                        onClick={() => updateConfig({ buttonStyle: style })}
                        className={`p-2 border-2 rounded-lg transition-colors bg-background hover:bg-accent ${
                            config.buttonStyle === style ? 'border-primary' : 'border-border'
                        }`}
                        >
                        <div
                            className={`w-full h-8 text-primary-foreground text-xs flex items-center justify-center font-semibold bg-primary ${
                            style === 'rounded' ? 'rounded-md' :
                            style === 'sharp' ? 'rounded-none' :
                            style === 'minimal' ? 'rounded-sm' :
                            'rounded-full'
                            }`}
                        >
                            Button
                        </div>
                        <div className="text-xs text-muted-foreground font-medium mt-2 capitalize">{style}</div>
                        </button>
                    ))}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="layout" className="mt-0 space-y-6">
                <div>
                    <Label className="text-sm font-medium mb-2 block">Border Radius</Label>
                    <div className="flex items-center gap-4">
                        <Slider
                        value={[config.borderRadius]}
                        onValueChange={([value]) => updateConfig({ borderRadius: value })}
                        max={24}
                        min={0}
                        step={1}
                        />
                        <span className="text-sm text-muted-foreground w-8 text-center">{config.borderRadius}px</span>
                    </div>
                </div>
                <div>
                    <Label className="text-sm font-medium mb-2 block">Spacing</Label>
                    <div className="flex items-center gap-4">
                        <Slider
                        value={[config.spacing]}
                        onValueChange={([value]) => updateConfig({ spacing: value })}
                        max={64}
                        min={16}
                        step={4}
                        />
                        <span className="text-sm text-muted-foreground w-8 text-center">{config.spacing}px</span>
                    </div>
                </div>
                <div>
                    <Label className="text-sm font-medium mb-2 block">Shadow Intensity</Label>
                    <div className="flex items-center gap-4">
                        <Slider
                        value={[config.shadowIntensity * 100]}
                        onValueChange={([value]) => updateConfig({ shadowIntensity: value / 100 })}
                        max={50}
                        min={0}
                        step={5}
                        />
                        <span className="text-sm text-muted-foreground w-8 text-center">{Math.round(config.shadowIntensity * 100)}%</span>
                    </div>
                </div>
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
