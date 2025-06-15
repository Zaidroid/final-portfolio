
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Palette, Settings, Moon, Sun, Download, Upload } from 'lucide-react';
import { ThemeConfig, accentColorPresets, defaultThemeConfig } from '@/lib/themeEngine';

interface ThemeControlPanelProps {
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
  onClose: () => void;
}

export function ThemeControlPanel({ config, onChange, onClose }: ThemeControlPanelProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'buttons' | 'layout'>('colors');

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Theme Customization
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 border-r p-4 space-y-2">
            <button
              onClick={() => setActiveTab('colors')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'colors' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <Palette className="w-4 h-4 inline mr-2" />
              Colors
            </button>
            <button
              onClick={() => setActiveTab('buttons')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'buttons' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              Button Styles
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'layout' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              Layout
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
            {activeTab === 'colors' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-lg font-semibold">Theme Mode</Label>
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      <Switch
                        checked={config.mode === 'dark'}
                        onCheckedChange={(checked) => updateConfig({ mode: checked ? 'dark' : 'light' })}
                      />
                      <Moon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-lg font-semibold mb-4 block">Accent Color</Label>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {accentColorPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => handleColorChange(preset.value)}
                        className={`w-12 h-12 rounded-lg border-2 transition-transform hover:scale-110 ${
                          config.accentColor === preset.value ? 'border-gray-800 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: preset.value }}
                        title={preset.name}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-full h-12 rounded-lg border cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === 'buttons' && (
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Button Style</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {(['rounded', 'sharp', 'minimal', 'pill'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => updateConfig({ buttonStyle: style })}
                        className={`p-4 border-2 rounded-lg transition-colors ${
                          config.buttonStyle === style ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="text-sm font-medium mb-2 capitalize">{style}</div>
                        <div
                          className={`w-full h-8 bg-blue-500 text-white text-xs flex items-center justify-center ${
                            style === 'rounded' ? 'rounded-lg' :
                            style === 'sharp' ? 'rounded-none' :
                            style === 'minimal' ? 'rounded' :
                            'rounded-full'
                          }`}
                        >
                          Button
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Border Radius</Label>
                  <Slider
                    value={[config.borderRadius]}
                    onValueChange={([value]) => updateConfig({ borderRadius: value })}
                    max={20}
                    min={0}
                    step={1}
                    className="mb-2"
                  />
                  <div className="text-sm text-gray-600">{config.borderRadius}px</div>
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-4 block">Spacing Scale</Label>
                  <Slider
                    value={[config.spacing]}
                    onValueChange={([value]) => updateConfig({ spacing: value })}
                    max={24}
                    min={8}
                    step={2}
                    className="mb-2"
                  />
                  <div className="text-sm text-gray-600">{config.spacing}px</div>
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-4 block">Shadow Intensity</Label>
                  <Slider
                    value={[config.shadowIntensity * 100]}
                    onValueChange={([value]) => updateConfig({ shadowIntensity: value / 100 })}
                    max={50}
                    min={0}
                    step={5}
                    className="mb-2"
                  />
                  <div className="text-sm text-gray-600">{Math.round(config.shadowIntensity * 100)}%</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 dark:bg-gray-800 flex gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <label className="cursor-pointer">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              asChild
            >
              <span>
                <Upload className="w-4 h-4" />
                Import
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <Button
            variant="outline"
            onClick={() => onChange(defaultThemeConfig)}
          >
            Reset
          </Button>
          <Button onClick={onClose} className="ml-auto">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
