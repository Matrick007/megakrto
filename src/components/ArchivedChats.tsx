import { X, Archive } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import type { Chat, Theme } from '../App';
import { motion } from 'motion/react';

interface ArchivedChatsProps {
  chats: Chat[];
  onClose: () => void;
  onSelectChat: (chat: Chat) => void;
  theme: Theme;
}

export function ArchivedChats({ chats, onClose, onSelectChat, theme }: ArchivedChatsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl"
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
              <Archive className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl text-white">Архив</h2>
              <p className="text-sm text-white/70">{chats.length} чатов</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.accent}20 100%)`,
                }}
              >
                <Archive className="w-10 h-10" style={{ color: theme.primary }} />
              </div>
              <h3 className="text-xl text-gray-700 mb-2">Архив пуст</h3>
              <p className="text-gray-500">Здесь будут архивированные чаты</p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat, index) => (
                <motion.button
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectChat(chat)}
                  className="w-full p-3 rounded-xl flex items-center gap-3 hover:bg-gray-50 transition-all"
                >
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-gray-900 truncate">{chat.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{chat.timestamp}</span>
                </motion.button>
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
