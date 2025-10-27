import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { MoreVertical, Reply, Smile, Pencil, Trash2, Check, CheckCheck, File, Mic, Star, Forward, Copy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import type { Message, Theme } from '../App';
import { toast } from 'sonner';

interface MessageBubbleProps {
  message: Message;
  avatar: string;
  onEdit: (messageId: string, newText: string) => void;
  onDelete: (messageId: string) => void;
  onReact: (messageId: string, emoji: string) => void;
  onAddToFavorites: () => void;
  onForward: () => void;
  replyToMessage?: Message;
  showAvatar: boolean;
  theme: Theme;
}

const quickEmojis = ['❤️', '👍', '😂', '😮', '😢', '🙏', '🔥', '🎉'];

export function MessageBubble({
  message,
  avatar,
  onEdit,
  onDelete,
  onReact,
  onAddToFavorites,
  onForward,
  replyToMessage,
  showAvatar,
  theme,
}: MessageBubbleProps) {
  const isMe = message.sender === 'me';
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);
  const [showReactions, setShowReactions] = useState(false);
  const time = message.timestamp.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== message.text) {
      onEdit(message.id, editText);
      toast.success('Сообщение изменено');
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(message.text);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    toast.success('Текст скопирован');
  };

  const handleReact = (emoji: string) => {
    onReact(message.id, emoji);
    setShowReactions(false);
  };

  // Group reactions by emoji
  const groupedReactions = message.reactions?.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = [];
    }
    acc[reaction.emoji].push(reaction);
    return acc;
  }, {} as Record<string, typeof message.reactions>);

  if (message.deleted) {
    return (
      <div className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
        <div className="h-8 w-8" />
        <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-[70%]">
          <p className="text-gray-400 italic text-sm">🚫 Сообщение удалено</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 group ${isMe ? 'flex-row-reverse' : ''}`}>
      {!isMe && (
        <div className="flex-shrink-0">
          {showAvatar ? (
            <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
              <AvatarImage src={avatar} alt="Avatar" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-8 w-8" />
          )}
        </div>
      )}

      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[70%] relative`}>
        {/* Reply to message */}
        {replyToMessage && (
          <div className={`text-xs mb-1 px-2 ${isMe ? 'text-right' : ''}`}>
            <div 
              className="rounded-lg px-3 py-1.5 border-l-2"
              style={{
                backgroundColor: `${theme.primary}10`,
                borderLeftColor: theme.primary,
              }}
            >
              <p className="text-gray-500 text-xs mb-0.5">Ответ на сообщение</p>
              <p className="text-gray-700 text-sm">{replyToMessage.text}</p>
            </div>
          </div>
        )}

        {/* Message content */}
        <div className="relative">
          <div
            className={`rounded-2xl px-4 py-2 shadow-sm ${
              isMe
                ? 'rounded-tr-sm text-white'
                : 'rounded-tl-sm text-gray-900'
            }`}
            style={{
              background: isMe 
                ? `linear-gradient(135deg, ${theme.bubbleMe} 0%, ${theme.accent} 100%)`
                : theme.bubbleOther,
            }}
          >
            {/* Forwarded indicator */}
            {message.forwarded && (
              <div className="flex items-center gap-1 text-xs opacity-70 mb-1">
                <Forward className="h-3 w-3" />
                <span>Переслано</span>
              </div>
            )}

            {/* File preview */}
            {message.fileType === 'image' && message.fileUrl && (
              <div className="mb-2 rounded-lg overflow-hidden">
                <img src={message.fileUrl} alt={message.fileName} className="max-w-full rounded-lg" />
              </div>
            )}
            {message.fileType === 'file' && message.fileName && (
              <div className={`flex items-center gap-2 mb-2 p-2 rounded ${isMe ? 'bg-white/20' : 'bg-gray-100'}`}>
                <File className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm truncate">{message.fileName}</span>
              </div>
            )}
            {message.fileType === 'voice' && (
              <div className="flex items-center gap-2 mb-2 min-w-[200px]">
                <Mic className="h-4 w-4 flex-shrink-0" />
                <div className={`flex-1 h-1 rounded ${isMe ? 'bg-white/30' : 'bg-gray-300'}`}>
                  <div className={`h-full w-1/3 rounded ${isMe ? 'bg-white' : 'bg-blue-500'}`} />
                </div>
                <span className="text-xs">0:15</span>
              </div>
            )}

            {/* Text */}
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSaveEdit();
                    }
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  className="bg-white text-gray-900 border-0"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit} className="h-7">
                    Сохранить
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleCancelEdit} className="h-7">
                    Отмена
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {message.text && <p className="break-words">{message.text}</p>}
                {message.edited && (
                  <span className="text-xs opacity-70 ml-2">изменено</span>
                )}
              </>
            )}
          </div>

          {/* Reactions */}
          {groupedReactions && Object.keys(groupedReactions).length > 0 && (
            <div className={`flex gap-1 mt-1 flex-wrap ${isMe ? 'justify-end' : ''}`}>
              {Object.entries(groupedReactions).map(([emoji, reactions]) => (
                <button
                  key={emoji}
                  onClick={() => handleReact(emoji)}
                  className="bg-white border border-gray-200 rounded-full px-2 py-0.5 text-xs flex items-center gap-1 hover:bg-gray-50 shadow-sm transition-all hover:scale-105"
                >
                  <span>{emoji}</span>
                  <span className="text-gray-600">{reactions?.length}</span>
                </button>
              ))}
            </div>
          )}

          {/* Hover actions */}
          <div className={`absolute top-0 ${isMe ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 px-2`}>
            {/* Reaction button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-white shadow-md hover:shadow-lg"
                onClick={() => setShowReactions(!showReactions)}
              >
                <Smile className="h-4 w-4" />
              </Button>
              {showReactions && (
                <div className="absolute top-full mt-1 bg-white shadow-lg rounded-lg p-2 flex gap-1 z-50 border border-gray-200">
                  {quickEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReact(emoji)}
                      className="text-xl hover:bg-gray-100 rounded p-1.5 transition-all hover:scale-125"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* More actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 bg-white shadow-md hover:shadow-lg">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isMe ? 'end' : 'start'}>
                <DropdownMenuItem onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Копировать
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onForward}>
                  <Forward className="h-4 w-4 mr-2" />
                  Переслать
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onAddToFavorites}>
                  <Star className="h-4 w-4 mr-2" />
                  В избранное
                </DropdownMenuItem>
                {isMe && (
                  <>
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      onDelete(message.id);
                      toast.success('Сообщение удалено');
                    }} className="text-red-600 focus:text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Time and status */}
        <div className="flex items-center gap-1 mt-1 px-1">
          <span className="text-xs text-gray-500">{time}</span>
          {isMe && (
            message.read ? (
              <CheckCheck className="h-3 w-3" style={{ color: theme.primary }} />
            ) : (
              <Check className="h-3 w-3 text-gray-400" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
