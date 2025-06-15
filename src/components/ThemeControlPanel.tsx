import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Palette, Settings, Moon, Sun, Download, Upload, AppWindow, LayoutPanelLeft } from 'lucide-react';
import { ThemeConfig, accentColorPresets, defaultThemeConfig } from '@/lib/themeEngine';

interface ThemeControlPanelProps {
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
}

export function ThemeControlPanel({ config, onChange }: ThemeControlPanelProps) {
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
    <div 
      className="w-full max-h-[85vh] overflow-hidden glass"
      style={{ 
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
      }}
    >
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h2 className="text-md font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
          <Settings className="w-4 h-4" />
          Theme Customizer
        </h2>
      </div>

      <div className="flex">
        {/* Compact Sidebar */}
        <div className="w-24 border-r p-2 space-y-1" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={() => setActiveTab('colors')}
            className={`w-full text-xs p-2 rounded transition-colors ${
              activeTab === 'colors' ? 'text-white' : 'hover:bg-opacity-10'
            }`}
            style={{ 
              backgroundColor: activeTab === 'colors' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'colors' ? 'white' : 'var(--color-text)'
            }}
          >
            <Palette className="w-4 h-4 mx-auto mb-1" />
            Colors
          </button>
          <button
            onClick={() => setActiveTab('buttons')}
            className={`w-full text-xs p-2 rounded transition-colors ${
              activeTab === 'buttons' ? 'text-white' : 'hover:bg-opacity-10'
            }`}
            style={{ 
              backgroundColor: activeTab === 'buttons' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'buttons' ? 'white' : 'var(--color-text)'
            }}
          >
            <AppWindow className="w-4 h-4 mx-auto mb-1" />
            Buttons
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`w-full text-xs p-2 rounded transition-colors ${
              activeTab === 'layout' ? 'text-white' : 'hover:bg-opacity-10'
            }`}
            style={{ 
              backgroundColor: activeTab === 'layout' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'layout' ? 'white' : 'var(--color-text)'
            }}
          >
            <LayoutPanelLeft className="w-4 h-4 mx-auto mb-1" />
            Layout
          </button>
        </div>

        {/* Compact Content */}
        <div className="flex-1 p-3 overflow-y-auto max-h-[55vh]">
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Mode</Label>
                  <div className="flex items-center gap-2">
                    <Sun className="w-3 h-3" style={{ color: 'var(--color-text-muted)' }} />
                    <Switch
                      checked={config.mode === 'dark'}
                      onCheckedChange={(checked) => updateConfig({ mode: checked ? 'dark' : 'light' })}
                    />
                    <Moon className="w-3 h-3" style={{ color: 'var(--color-text-muted)' }} />
                  </div>
                </div>
              </div>

              <Separator style={{ backgroundColor: 'var(--color-border)' }} />

              <div>
                <Label className="text-sm font-medium mb-3 block" style={{ color: 'var(--color-text)' }}>Accent Color</Label>
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {accentColorPresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => handleColorChange(preset.value)}
                      className={`w-6 h-6 rounded border transition-transform hover:scale-110 ${
                        config.accentColor === preset.value ? 'scale-110 ring-2' : ''
                      }`}
                      style={{ 
                        backgroundColor: preset.value,
                        borderColor: 'var(--color-border)'
                      }}
                      title={preset.name}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={config.accentColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-8 rounded border cursor-pointer"
                  style={{ borderColor: 'var(--color-border)' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'buttons' && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block" style={{ color: 'var(--color-text)' }}>Button Style</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['rounded', 'sharp', 'minimal', 'pill'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateConfig({ buttonStyle: style })}
                      className={`p-2 border rounded transition-colors ${
                        config.buttonStyle === style ? 'border-2' : ''
                      }`}
                      style={{
                        borderColor: config.buttonStyle === style ? 'var(--color-primary)' : 'var(--color-border)',
                        backgroundColor: config.buttonStyle === style ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)' : 'transparent'
                      }}
                    >
                      <div className="text-xs font-medium mb-1 capitalize" style={{ color: 'var(--color-text)' }}>{style}</div>
                      <div
                        className={`w-full h-4 text-white text-xs flex items-center justify-center ${
                          style === 'rounded' ? 'rounded' :
                          style === 'sharp' ? 'rounded-none' :
                          style === 'minimal' ? 'rounded-sm' :
                          'rounded-full'
                        }`}
                        style={{ backgroundColor: 'var(--color-primary)' }}
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
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block" style={{ color: 'var(--color-text)' }}>Border Radius</Label>
                <Slider
                  value={[config.borderRadius]}
                  onValueChange={([value]) => updateConfig({ borderRadius: value })}
                  max={20}
                  min={0}
                  step={1}
                  className="mb-1"
                />
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{config.borderRadius}px</div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block" style={{ color: 'var(--color-text)' }}>Spacing</Label>
                <Slider
                  value={[config.spacing]}
                  onValueChange={([value]) => updateConfig({ spacing: value })}
                  max={24}
                  min={8}
                  step={2}
                  className="mb-1"
                />
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{config.spacing}px</div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block" style={{ color: 'var(--color-text)' }}>Shadow Intensity</Label>
                <Slider
                  value={[config.shadowIntensity * 100]}
                  onValueChange={([value]) => updateConfig({ shadowIntensity: value / 100 })}
                  max={50}
                  min={0}
                  step={5}
                  className="mb-1"
                />
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{Math.round(config.shadowIntensity * 100)}%</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 border-t flex gap-2 text-xs" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-surface) 50%, var(--color-background) 50%)' }}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="flex items-center gap-1 text-xs h-7"
        >
          <Download className="w-3 h-3" />
          Export
        </Button>
        <label className="cursor-pointer">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs h-7"
            asChild
          >
            <span>
              <Upload className="w-3 h-3" />
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
          size="sm"
          onClick={() => onChange(defaultThemeConfig)}
          className="text-xs h-7"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
