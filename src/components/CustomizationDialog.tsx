import { X, Palette, Image as ImageIcon, Type, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import type { Theme } from '../App';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface CustomizationDialogProps {
  onClose: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const presetThemes: { name: string; theme: Theme }[] = [
  {
    name: 'Океан',
    theme: {
      primary: '#3b82f6',
      accent: '#8b5cf6',
      background: '#f9fafb',
      chatBackground: '#ffffff',
      bubbleMe: '#3b82f6',
      bubbleOther: '#f3f4f6',
    },
  },
  {
    name: 'Закат',
    theme: {
      primary: '#f97316',
      accent: '#ec4899',
      background: '#fef2f2',
      chatBackground: '#fffbeb',
      bubbleMe: '#f97316',
      bubbleOther: '#fed7aa',
    },
  },
  {
    name: 'Лес',
    theme: {
      primary: '#10b981',
      accent: '#059669',
      background: '#f0fdf4',
      chatBackground: '#f7fee7',
      bubbleMe: '#10b981',
      bubbleOther: '#dcfce7',
    },
  },
  {
    name: 'Ночь',
    theme: {
      primary: '#6366f1',
      accent: '#8b5cf6',
      background: '#1e293b',
      chatBackground: '#0f172a',
      bubbleMe: '#6366f1',
      bubbleOther: '#334155',
    },
  },
  {
    name: 'Роза',
    theme: {
      primary: '#ec4899',
      accent: '#f472b6',
      background: '#fdf2f8',
      chatBackground: '#fce7f3',
      bubbleMe: '#ec4899',
      bubbleOther: '#fbcfe8',
    },
  },
  {
    name: 'Космос',
    theme: {
      primary: '#8b5cf6',
      accent: '#a855f7',
      background: '#faf5ff',
      chatBackground: '#f5f3ff',
      bubbleMe: '#8b5cf6',
      bubbleOther: '#e9d5ff',
    },
  },
];

const backgroundImages = [
  'https://images.unsplash.com/photo-1640963269654-3fe248c5fba6?w=1080',
  'https://images.unsplash.com/photo-1643061678192-b3d5ad0c42c7?w=1080',
  'https://images.unsplash.com/photo-1626529110441-ab0da211273a?w=1080',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080',
  'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1080',
];

export function CustomizationDialog({ onClose, theme, onThemeChange }: CustomizationDialogProps) {
  const handleThemeSelect = (newTheme: Theme) => {
    onThemeChange(newTheme);
    toast.success('Тема применена');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div 
          className="p-6 border-b border-white/10 flex items-center justify-between rounded-t-2xl"
          style={{
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl text-white">Кастомизация</h2>
              <p className="text-sm text-white/70">Настройте внешний вид под себя</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-6">
          <Tabs defaultValue="themes" className="space-y-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="themes" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Темы
              </TabsTrigger>
              <TabsTrigger value="colors" className="gap-2">
                <Palette className="h-4 w-4" />
                Цвета
              </TabsTrigger>
              <TabsTrigger value="backgrounds" className="gap-2">
                <ImageIcon className="h-4 w-4" />
                Фоны
              </TabsTrigger>
            </TabsList>

            <TabsContent value="themes" className="space-y-4">
              <div>
                <h3 className="mb-4">Готовые темы</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {presetThemes.map((preset, index) => (
                    <motion.button
                      key={preset.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleThemeSelect(preset.theme)}
                      className="p-4 rounded-xl border-2 hover:shadow-lg transition-all text-left group"
                      style={{
                        borderColor: theme.primary === preset.theme.primary ? theme.primary : '#e5e7eb',
                        background: preset.theme.background,
                      }}
                    >
                      <div className="flex gap-2 mb-3">
                        <div 
                          className="h-8 w-8 rounded-lg"
                          style={{ background: preset.theme.primary }}
                        />
                        <div 
                          className="h-8 w-8 rounded-lg"
                          style={{ background: preset.theme.accent }}
                        />
                      </div>
                      <p className="text-gray-900 group-hover:scale-105 transition-transform">
                        {preset.name}
                      </p>
                      <div className="flex gap-1 mt-2">
                        <div 
                          className="h-6 flex-1 rounded"
                          style={{ background: preset.theme.bubbleMe }}
                        />
                        <div 
                          className="h-6 flex-1 rounded"
                          style={{ background: preset.theme.bubbleOther }}
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">Основной цвет</Label>
                <div className="grid grid-cols-8 gap-3">
                  {[
                    '#ef4444', '#f97316', '#f59e0b', '#eab308',
                    '#84cc16', '#10b981', '#06b6d4', '#3b82f6',
                    '#6366f1', '#8b5cf6', '#a855f7', '#ec4899',
                    '#f43f5e', '#14b8a6', '#0ea5e9', '#6366f1'
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => onThemeChange({ ...theme, primary: color })}
                      className="h-12 rounded-lg hover:scale-110 transition-transform ring-2 ring-offset-2"
                      style={{ 
                        background: color,
                        ringColor: theme.primary === color ? color : 'transparent',
                      }}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base mb-3 block">Акцентный цвет</Label>
                <div className="grid grid-cols-8 gap-3">
                  {[
                    '#f87171', '#fb923c', '#fbbf24', '#facc15',
                    '#a3e635', '#34d399', '#22d3ee', '#60a5fa',
                    '#818cf8', '#a78bfa', '#c084fc', '#f472b6',
                    '#fb7185', '#2dd4bf', '#38bdf8', '#818cf8'
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => onThemeChange({ ...theme, accent: color })}
                      className="h-12 rounded-lg hover:scale-110 transition-transform ring-2 ring-offset-2"
                      style={{ 
                        background: color,
                        ringColor: theme.accent === color ? color : 'transparent',
                      }}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base mb-3 block">Цвет моих сообщений</Label>
                <div className="grid grid-cols-8 gap-3">
                  {[
                    '#3b82f6', '#8b5cf6', '#ec4899', '#f97316',
                    '#10b981', '#06b6d4', '#6366f1', '#a855f7',
                    '#ef4444', '#f59e0b', '#14b8a6', '#0ea5e9',
                    '#7c3aed', '#db2777', '#ea580c', '#059669'
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => onThemeChange({ ...theme, bubbleMe: color })}
                      className="h-12 rounded-lg hover:scale-110 transition-transform ring-2 ring-offset-2"
                      style={{ 
                        background: color,
                        ringColor: theme.bubbleMe === color ? color : 'transparent',
                      }}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="backgrounds" className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">Фон чата</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => onThemeChange({ ...theme, chatBackground: '#ffffff' })}
                    className="h-32 rounded-xl border-2 hover:shadow-lg transition-all"
                    style={{
                      background: '#ffffff',
                      borderColor: theme.chatBackground === '#ffffff' ? theme.primary : '#e5e7eb',
                    }}
                  >
                    <p className="text-gray-900">Белый</p>
                  </button>
                  <button
                    onClick={() => onThemeChange({ ...theme, chatBackground: '#f9fafb' })}
                    className="h-32 rounded-xl border-2 hover:shadow-lg transition-all"
                    style={{
                      background: '#f9fafb',
                      borderColor: theme.chatBackground === '#f9fafb' ? theme.primary : '#e5e7eb',
                    }}
                  >
                    <p className="text-gray-900">Светлый</p>
                  </button>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base mb-3 block">Фоновые изображения</Label>
                <div className="grid grid-cols-2 gap-4">
                  {backgroundImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onThemeChange({ ...theme, chatBackground: `url(${img})` });
                        toast.success('Фон применен');
                      }}
                      className="h-32 rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all"
                      style={{
                        borderColor: theme.chatBackground === `url(${img})` ? theme.primary : '#e5e7eb',
                      }}
                    >
                      <img src={img} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Закрыть
          </Button>
          <Button 
            onClick={() => {
              handleThemeSelect(presetThemes[0].theme);
              toast.success('Настройки сброшены');
            }}
            className="flex-1"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
            }}
          >
            Сбросить
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
