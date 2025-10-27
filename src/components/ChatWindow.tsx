import { Phone, Video, MoreVertical, Users, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { MessageInput } from './MessageInput';
import { MessageBubble } from './MessageBubble';
import type { Chat, Message, Theme } from '../App';
import { useEffect, useRef } from 'react';

interface ChatWindowProps {
  chat: Chat;
  messages: Message[];
  onSendMessage: (text: string, replyTo?: string, fileUrl?: string, fileName?: string, fileType?: 'image' | 'file' | 'voice') => void;
  onEditMessage: (messageId: string, newText: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onReactToMessage: (messageId: string, emoji: string) => void;
  onOpenProfile: () => void;
  onAddToFavorites: (message: Message) => void;
  onForwardMessage: (messageId: string) => void;
  theme: Theme;
}

export function ChatWindow({
  chat,
  messages,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onReactToMessage,
  onOpenProfile,
  onAddToFavorites,
  onForwardMessage,
  theme,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div 
      className="flex-1 flex flex-col h-screen"
      style={{ 
        background: chat.background || theme.chatBackground,
      }}
    >
      {/* Header */}
      <div 
        className="p-4 border-b border-white/10 flex items-center justify-between backdrop-blur-lg flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
        }}
      >
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-3 hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors"
        >
          <div className="relative">
            <Avatar className="h-10 w-10 ring-2 ring-white/30">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback className="bg-white/20 text-white">
                {chat.name[0]}
              </AvatarFallback>
            </Avatar>
            {chat.online && !chat.isGroup && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm" />
            )}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h2 className="text-white">{chat.name}</h2>
              {chat.isGroup && <Users className="h-4 w-4 text-white/70" />}
            </div>
            <p className="text-sm text-white/70">
              {chat.typing ? (
                <span className="flex items-center gap-1">
                  <span className="inline-flex gap-0.5">
                    <span className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                  печатает...
                </span>
              ) : chat.isGroup ? (
                `${chat.members?.length || 0} участников`
              ) : chat.online ? (
                'В сети'
              ) : (
                'Был(а) недавно'
              )}
            </p>
          </div>
        </button>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10" onClick={onOpenProfile}>
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.accent}20 100%)`,
                }}
              >
                <Users className="w-10 h-10" style={{ color: theme.primary }} />
              </div>
              <h3 className="text-xl text-gray-700 mb-2">Начните общение</h3>
              <p className="text-gray-500">Отправьте первое сообщение!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                avatar={chat.avatar}
                onEdit={onEditMessage}
                onDelete={onDeleteMessage}
                onReact={onReactToMessage}
                onAddToFavorites={() => onAddToFavorites(message)}
                onForward={() => onForwardMessage(message.id)}
                replyToMessage={
                  message.replyTo
                    ? messages.find(m => m.id === message.replyTo)
                    : undefined
                }
                showAvatar={
                  index === 0 ||
                  messages[index - 1].sender !== message.sender
                }
                theme={theme}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex-shrink-0">
        <MessageInput onSendMessage={onSendMessage} messages={messages} theme={theme} />
      </div>
    </div>
  );
}
