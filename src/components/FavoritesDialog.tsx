import { X, Star } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import type { Message, Theme } from '../App';
import { motion } from 'motion/react';

interface FavoritesDialogProps {
  favorites: Message[];
  onClose: () => void;
  theme: Theme;
}

export function FavoritesDialog({ favorites, onClose, theme }: FavoritesDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl"
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
              <Star className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl text-white">Избранное</h2>
              <p className="text-sm text-white/70">{favorites.length} сообщений</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-6">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.accent}20 100%)`,
                }}
              >
                <Star className="w-10 h-10" style={{ color: theme.primary }} />
              </div>
              <h3 className="text-xl text-gray-700 mb-2">Нет избранных</h3>
              <p className="text-gray-500">Добавляйте важные сообщения в избранное</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: theme.primary }} />
                    <div className="flex-1">
                      <p className="text-gray-900">{message.text}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {message.timestamp.toLocaleDateString()} • {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} className="w-full">
            Закрыть
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
