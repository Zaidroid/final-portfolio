import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Palette, Settings, Moon, Sun, Download, Upload, AppWindow, LayoutPanelLeft, Plus, Save, X } from 'lucide-react';
import { ThemeConfig, accentColorPresets, defaultThemeConfig } from '@/lib/themeEngine';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface ThemeControlPanelProps {
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
  onReset: () => void;
  onSaveDefault: () => void;
  customAccentColors: string[];
  onAddCustomColor: (color: string) => void;
  onRemoveCustomColor: (color: string) => void;
}

export function ThemeControlPanel({ config, onChange, onReset, onSaveDefault, customAccentColors, onAddCustomColor, onRemoveCustomColor }: ThemeControlPanelProps) {
  const updateConfig = (updates: Partial<ThemeConfig>) => {
    onChange({ ...config, ...updates });
  };

  const handleColorChange = (color: string) => {
    updateConfig({ accentColor: color });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'theme-config.json';
    
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
    <div className="w-full max-h-[85vh] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Theme Customizer
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="colors" className="p-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors"><Palette className="w-4 h-4 mr-2" />Colors</TabsTrigger>
            <TabsTrigger value="buttons"><AppWindow className="w-4 h-4 mr-2" />Appearance</TabsTrigger>
            <TabsTrigger value="layout"><LayoutPanelLeft className="w-4 h-4 mr-2" />Layout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-md font-medium">Color Scheme</h3>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                  <span>Dark Mode</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Toggle between light and dark themes.
                  </span>
                </Label>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  <Switch
                    id="dark-mode"
                    checked={config.mode === 'dark'}
                    onCheckedChange={(checked) => updateConfig({ mode: checked ? 'dark' : 'light' })}
                  />
                  <Moon className="w-4 h-4" />
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-md font-medium">Accent Color</h3>
              <div className="flex items-center gap-2">
                <div 
                    className="h-8 w-8 rounded-full border-2 border-border cursor-pointer relative" 
                    style={{ backgroundColor: config.accentColor }}
                >
                    <input
                        type="color"
                        value={config.accentColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-full h-full opacity-0 cursor-pointer"
                        title="Select color"
                    />
                </div>
                <Input
                    value={config.accentColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="flex-1 h-8"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onAddCustomColor(config.accentColor)} title="Save color to palette">
                    <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-8 gap-2 pt-2">
                {accentColorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => handleColorChange(preset.value)}
                    className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 ${
                      config.accentColor === preset.value ? 'scale-110 ring-2 ring-ring ring-offset-2 ring-offset-background' : 'border-border'
                    }`}
                    style={{ backgroundColor: preset.value }}
                    title={preset.name}
                  />
                ))}
                {customAccentColors.map((color) => (
                  <div key={color} className="relative group">
                    <button
                      onClick={() => handleColorChange(color)}
                      className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 ${
                        config.accentColor === color ? 'scale-110 ring-2 ring-ring ring-offset-2 ring-offset-background' : 'border-border'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                    <button onClick={() => onRemoveCustomColor(color)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Remove color">
                        <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="buttons" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-md font-medium">Button Style</h3>
              <div className="grid grid-cols-2 gap-4">
                {(['rounded', 'sharp', 'minimal', 'pill'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => updateConfig({ buttonStyle: style })}
                    className={`p-3 border-2 rounded-lg transition-colors flex flex-col items-center justify-center space-y-3 ${
                      config.buttonStyle === style ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div
                      className={`w-24 h-8 text-primary-foreground text-xs flex items-center justify-center ${
                        style === 'rounded' ? 'rounded-md' :
                        style === 'sharp' ? 'rounded-none' :
                        style === 'minimal' ? 'rounded-sm' :
                        'rounded-full'
                      }`}
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      Button
                    </div>
                    <div className="text-sm font-medium capitalize">{style}</div>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-md font-medium">Sizing & Spacing</h3>
              <div className="space-y-4 rounded-lg border p-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Border Radius</Label>
                        <span className="text-sm text-muted-foreground">{config.borderRadius}px</span>
                    </div>
                    <Slider
                      value={[config.borderRadius]}
                      onValueChange={([value]) => updateConfig({ borderRadius: value })}
                      max={24} min={0} step={1}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Spacing</Label>
                        <span className="text-sm text-muted-foreground">{config.spacing}px</span>
                    </div>
                    <Slider
                      value={[config.spacing]}
                      onValueChange={([value]) => updateConfig({ spacing: value })}
                      max={64} min={16} step={4}
                    />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-md font-medium">Effects</h3>
              <div className="space-y-4 rounded-lg border p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Shadow Intensity</Label>
                        <span className="text-sm text-muted-foreground">{Math.round(config.shadowIntensity * 100)}%</span>
                    </div>
                    <Slider
                      value={[config.shadowIntensity * 100]}
                      onValueChange={([value]) => updateConfig({ shadowIntensity: value / 100 })}
                      max={50} min={0} step={5}
                    />
                  </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-3 border-t border-border bg-muted/20 flex flex-wrap gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={onReset}>Reset</Button>
        <Button variant="ghost" size="sm" onClick={onSaveDefault}><Save className="w-3.5 h-3.5 mr-1.5" />Save Default</Button>
        <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-3.5 h-3.5 mr-1.5" />Export</Button>
        <label className="cursor-pointer">
          <Button variant="outline" size="sm" asChild>
            <span>
              <Upload className="w-3.5 h-3.5 mr-1.5" />Import
            </span>
          </Button>
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>
      </div>
    </div>
  );
}
