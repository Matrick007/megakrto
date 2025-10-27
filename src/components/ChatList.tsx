import { Search, MessageSquarePlus, Pin, BellOff, Trash2, Settings, Palette, Star, Archive, CircleDot, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { Chat, Theme } from '../App';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat;
  onSelectChat: (chat: Chat) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  onPinChat: (chatId: string) => void;
  onMuteChat: (chatId: string) => void;
  onArchiveChat: (chatId: string) => void;
  onOpenSettings: () => void;
  onOpenCustomization: () => void;
  onOpenStatus: () => void;
  onOpenFavorites: () => void;
  onOpenArchived: () => void;
  archivedCount: number;
  theme: Theme;
}

export function ChatList({
  chats,
  selectedChat,
  onSelectChat,
  searchQuery,
  onSearchChange,
  onNewChat,
  onDeleteChat,
  onPinChat,
  onMuteChat,
  onArchiveChat,
  onOpenSettings,
  onOpenCustomization,
  onOpenStatus,
  onOpenFavorites,
  onOpenArchived,
  archivedCount,
  theme,
}: ChatListProps) {
  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl text-white">QuickChat</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/20" onClick={onNewChat}>
              <MessageSquarePlus className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/20">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={onOpenStatus}>
                  <CircleDot className="h-4 w-4 mr-2" />
                  Статусы
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenFavorites}>
                  <Star className="h-4 w-4 mr-2" />
                  Избранное
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenArchived}>
                  <Archive className="h-4 w-4 mr-2" />
                  Архив {archivedCount > 0 && `(${archivedCount})`}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onOpenCustomization}>
                  <Palette className="h-4 w-4 mr-2" />
                  Кастомизация
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenSettings}>
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            placeholder="Поиск..."
            className="pl-9 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-2">
          {chats.map((chat) => (
            <div key={chat.id} className="relative group">
              <button
                onClick={() => onSelectChat(chat)}
                className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all ${
                  selectedChat.id === chat.id 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {chat.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && !chat.isGroup && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      {chat.pinned && <Pin className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />}
                      {chat.muted && <BellOff className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />}
                      <span className="text-gray-900 truncate">{chat.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {chat.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate flex-1">
                      {chat.typing ? (
                        <span className="text-blue-600 flex items-center gap-1">
                          <span className="inline-flex gap-1">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </span>
                          печатает
                        </span>
                      ) : (
                        chat.lastMessage
                      )}
                    </p>
                    {chat.unread > 0 && !chat.muted && (
                      <Badge 
                        className="ml-2 h-5 min-w-5 px-1.5 flex items-center justify-center text-xs"
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                        }}
                      >
                        {chat.unread}
                      </Badge>
                    )}
                    {chat.unread > 0 && chat.muted && (
                      <div className="ml-2 h-2 w-2 bg-gray-400 rounded-full" />
                    )}
                  </div>
                </div>
              </button>

              {/* Context Menu */}
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-white shadow-sm hover:shadow"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onPinChat(chat.id)}>
                      <Pin className="h-4 w-4 mr-2" />
                      {chat.pinned ? 'Открепить' : 'Закрепить'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onMuteChat(chat.id)}>
                      <BellOff className="h-4 w-4 mr-2" />
                      {chat.muted ? 'Включить звук' : 'Выключить звук'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onArchiveChat(chat.id)}>
                      <Archive className="h-4 w-4 mr-2" />
                      В архив
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDeleteChat(chat.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить чат
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
