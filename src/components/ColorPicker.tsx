
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { accentColorPresets } from '@/lib/themeEngine';

interface ColorPickerProps {
  currentColor: string;
  customColors: string[];
  onColorChange: (color: string) => void;
  onAddCustomColor: (color: string) => void;
  onRemoveCustomColor: (color: string) => void;
}

export function ColorPicker({
  currentColor,
  customColors,
  onColorChange,
  onAddCustomColor,
  onRemoveCustomColor,
}: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Accent Color</Label>
      <div className="grid grid-cols-8 gap-2">
        {accentColorPresets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onColorChange(preset.value)}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none ${
              currentColor.toLowerCase() === preset.value.toLowerCase() ? 'border-primary' : 'border-transparent'
            }`}
            style={{ backgroundColor: preset.value }}
            title={preset.name}
          />
        ))}
        {customColors.map((color) => (
          <div key={color} className="relative group">
            <button
              onClick={() => onColorChange(color)}
              className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none ${
                currentColor.toLowerCase() === color.toLowerCase() ? 'border-primary' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
            <button
              onClick={() => onRemoveCustomColor(color)}
              className="absolute -top-1 -right-1 bg-background border border-border rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
              title="Remove color"
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 pt-1">
        <div className="relative h-8 w-8 rounded-md border" style={{ backgroundColor: currentColor }}>
            <input
                type="color"
                value={currentColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
        </div>
        <input
          type="text"
          value={currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="h-8 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <Button variant="outline" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => onAddCustomColor(currentColor)} title="Add to swatches">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
