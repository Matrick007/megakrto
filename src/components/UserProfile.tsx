import { X, Phone, Video, BellOff, Trash2, Users, Mail, MapPin, Briefcase, Calendar, Link as LinkIcon, Shield, Archive, Image as ImageIcon, FileText, Music } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { Chat, User, Message, Theme } from '../App';
import { motion } from 'motion/react';

interface UserProfileProps {
  chat: Chat;
  user?: User;
  messages: Message[];
  onClose: () => void;
  onMute: () => void;
  onArchive: () => void;
  onDelete: () => void;
  theme: Theme;
}

export function UserProfile({ chat, user, messages, onClose, onMute, onArchive, onDelete, theme }: UserProfileProps) {
  const mediaMessages = messages.filter(m => m.fileType === 'image');
  const fileMessages = messages.filter(m => m.fileType === 'file');
  const voiceMessages = messages.filter(m => m.fileType === 'voice');

  return (
    <motion.div 
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', damping: 25 }}
      className="w-96 border-l border-gray-200 bg-white flex flex-col h-screen"
    >
      {/* Header */}
      <div 
        className="p-4 border-b border-white/10 flex items-center justify-between backdrop-blur-lg"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
        }}
      >
        <h2 className="text-white">Профиль</h2>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {/* Profile Header */}
        <div className="p-6 text-center relative overflow-hidden">
          {/* Background gradient */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
            }}
          />
          
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
            >
              <Avatar className="h-32 w-32 mx-auto mb-4 ring-4 ring-white shadow-xl">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback 
                  className="text-4xl text-white"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                  }}
                >
                  {chat.name[0]}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl text-gray-900 mb-2">{chat.name}</h3>
              {!chat.isGroup && (
                <div className="flex items-center justify-center gap-2 mb-3">
                  {chat.online ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-sm text-green-600">В сети</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Был(а) недавно</p>
                  )}
                </div>
              )}
              {chat.isGroup && (
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <Users className="h-4 w-4" />
                  {chat.members?.length || 0} участников
                </p>
              )}
              {user?.bio && (
                <p className="text-sm text-gray-600 mt-3 max-w-sm mx-auto">
                  {user.bio}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 pb-6 grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="gap-2 hover:shadow-md transition-shadow"
            style={{
              borderColor: `${theme.primary}30`,
            }}
          >
            <Phone className="h-4 w-4" />
            Позвонить
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 hover:shadow-md transition-shadow"
            style={{
              borderColor: `${theme.primary}30`,
            }}
          >
            <Video className="h-4 w-4" />
            Видео
          </Button>
        </div>

        <Separator />

        {/* Info Tabs */}
        <Tabs defaultValue="info" className="px-4">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Инфо</TabsTrigger>
            <TabsTrigger value="media">Медиа</TabsTrigger>
            <TabsTrigger value="files">Файлы</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            {!chat.isGroup ? (
              <>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Телефон</p>
                      <p className="text-gray-900">{user?.phone || '+7 (900) 123-45-67'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-gray-900">{chat.name.toLowerCase().replace(' ', '.')}@email.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <LinkIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Имя пользователя</p>
                      <p className="text-gray-900">@{chat.name.toLowerCase().replace(' ', '_')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Местоположение</p>
                      <p className="text-gray-900">Москва, Россия</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">День рождения</p>
                      <p className="text-gray-900">15 марта</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Работа</p>
                      <p className="text-gray-900">Разработчик</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <h4 className="text-sm text-gray-500">Участники группы</h4>
                {chat.members?.slice(0, 10).map((memberId, index) => (
                  <div key={memberId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`https://images.unsplash.com/photo-${1494790108377 + index * 100}?w=100&h=100&fit=crop`}
                        alt={`User ${index}`}
                      />
                      <AvatarFallback>U{index + 1}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Участник {index + 1}</p>
                      <p className="text-xs text-gray-500">В сети</p>
                    </div>
                  </div>
                ))}
                {(chat.members?.length || 0) > 10 && (
                  <button className="text-sm text-blue-600 hover:underline w-full text-center py-2">
                    Показать всех ({chat.members?.length})
                  </button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="media" className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm text-gray-500">Фото и видео</h4>
              <span className="text-xs text-gray-400">{mediaMessages.length}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mediaMessages.slice(0, 12).map((msg, i) => (
                <div
                  key={msg.id}
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                >
                  {msg.fileUrl ? (
                    <img
                      src={msg.fileUrl}
                      alt="Media"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
              {[...Array(Math.max(0, 12 - mediaMessages.length))].map((_, i) => (
                <div
                  key={`placeholder-${i}`}
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${1506794778202 + i * 100}?w=200&h=200&fit=crop`}
                    alt={`Media ${i}`}
                    className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm text-gray-500">Документы</h4>
                <span className="text-xs text-gray-400">{fileMessages.length}</span>
              </div>
              {fileMessages.slice(0, 5).map((msg) => (
                <div key={msg.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{msg.fileName || 'Документ'}</p>
                    <p className="text-xs text-gray-500">{msg.timestamp.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}

              {voiceMessages.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-3 mt-6">
                    <h4 className="text-sm text-gray-500">Голосовые сообщения</h4>
                    <span className="text-xs text-gray-400">{voiceMessages.length}</span>
                  </div>
                  {voiceMessages.slice(0, 5).map((msg) => (
                    <div key={msg.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Music className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">Голосовое сообщение</p>
                        <p className="text-xs text-gray-500">{msg.timestamp.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        {/* Settings */}
        <div className="px-4 pb-6 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-900 hover:bg-gray-50"
            onClick={onMute}
          >
            <BellOff className="h-5 w-5" />
            {chat.muted ? 'Включить уведомления' : 'Выключить уведомления'}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-900 hover:bg-gray-50"
            onClick={onArchive}
          >
            <Archive className="h-5 w-5" />
            В архив
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-900 hover:bg-gray-50"
          >
            <Shield className="h-5 w-5" />
            Пожаловаться
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onDelete}
          >
            <Trash2 className="h-5 w-5" />
            Удалить чат
          </Button>
        </div>
      </ScrollArea>
    </motion.div>
  );
}
