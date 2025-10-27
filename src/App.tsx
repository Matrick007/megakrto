import { useState, useEffect } from 'react';
import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';
import { UserProfile } from './components/UserProfile';
import { NewChatDialog } from './components/NewChatDialog';
import { SettingsDialog } from './components/SettingsDialog';
import { CustomizationDialog } from './components/CustomizationDialog';
import { LoadingScreen } from './components/LoadingScreen';
import { StatusView } from './components/StatusView';
import { FavoritesDialog } from './components/FavoritesDialog';
import { ArchivedChats } from './components/ArchivedChats';
import { generateMockData } from './utils/mockData';
import { Toaster } from './components/ui/sonner';

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  edited?: boolean;
  reactions?: Reaction[];
  fileUrl?: string;
  fileName?: string;
  fileType?: 'image' | 'file' | 'voice';
  replyTo?: string;
  read?: boolean;
  forwarded?: boolean;
  deleted?: boolean;
}

export interface Reaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  members?: string[];
  typing?: boolean;
  pinned?: boolean;
  muted?: boolean;
  archived?: boolean;
  folder?: string;
  background?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
  bio?: string;
  phone?: string;
}

export interface Theme {
  primary: string;
  accent: string;
  background: string;
  chatBackground: string;
  bubbleMe: string;
  bubbleOther: string;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [favorites, setFavorites] = useState<Message[]>([]);
  const [theme, setTheme] = useState<Theme>({
    primary: '#3b82f6',
    accent: '#8b5cf6',
    background: '#f9fafb',
    chatBackground: '#ffffff',
    bubbleMe: '#3b82f6',
    bubbleOther: '#f3f4f6',
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const mockData = generateMockData();
      setChats(mockData.chats);
      setMessages(mockData.messages);
      setUsers(mockData.users);
      setSelectedChat(mockData.chats[0]);
      setLoading(false);
    }, 2500);
  }, []);

  const handleSendMessage = (text: string, replyTo?: string, fileUrl?: string, fileName?: string, fileType?: 'image' | 'file' | 'voice') => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: new Date(),
      replyTo,
      fileUrl,
      fileName,
      fileType,
      read: true,
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
    }));

    setChats(prev => prev.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, lastMessage: text || fileName || 'Файл', timestamp: 'Сейчас' }
        : chat
    ));

    if (!selectedChat.isGroup) {
      simulateTypingAndResponse(selectedChat.id);
    }
  };

  const simulateTypingAndResponse = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, typing: true } : chat
    ));

    setTimeout(() => {
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, typing: false } : chat
      ));

      const responses = [
        'Звучит отлично!',
        'Хорошо, договорились',
        'Спасибо за информацию',
        'Понял, сделаю',
        'Отлично, жду',
        'Согласен!',
        'Давай обсудим это позже',
        'Интересная идея',
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'other',
        timestamp: new Date(),
        read: false,
      };

      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), responseMessage],
      }));

      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, lastMessage: randomResponse, timestamp: 'Сейчас', unread: selectedChat?.id === chatId ? 0 : chat.unread + 1 }
          : chat
      ));
    }, 2000 + Math.random() * 2000);
  };

  const handleEditMessage = (messageId: string, newText: string) => {
    if (!selectedChat) return;

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: prev[selectedChat.id].map(msg =>
        msg.id === messageId ? { ...msg, text: newText, edited: true } : msg
      ),
    }));
  };

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedChat) return;

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: prev[selectedChat.id].map(msg =>
        msg.id === messageId ? { ...msg, deleted: true, text: 'Сообщение удалено' } : msg
      ),
    }));
  };

  const handleReactToMessage = (messageId: string, emoji: string) => {
    if (!selectedChat) return;

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: prev[selectedChat.id].map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find(r => r.userId === 'me');
          
          if (existingReaction) {
            if (existingReaction.emoji === emoji) {
              return { ...msg, reactions: reactions.filter(r => r.userId !== 'me') };
            } else {
              return {
                ...msg,
                reactions: reactions.map(r =>
                  r.userId === 'me' ? { ...r, emoji } : r
                ),
              };
            }
          } else {
            return {
              ...msg,
              reactions: [...reactions, { emoji, userId: 'me', userName: 'Вы' }],
            };
          }
        }
        return msg;
      }),
    }));
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat?.id === chatId) {
      setSelectedChat(chats.filter(c => c.id !== chatId)[0]);
    }
  };

  const handlePinChat = (chatId: string) => {
    setChats(prev => {
      const updated = prev.map(chat =>
        chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
      );
      return updated.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });
    });
  };

  const handleMuteChat = (chatId: string) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, muted: !chat.muted } : chat
    ));
  };

  const handleArchiveChat = (chatId: string) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, archived: !chat.archived } : chat
    ));
  };

  const handleCreateChat = (userId: string, isGroup: boolean, memberIds?: string[]) => {
    const user = users.find(u => u.id === userId);
    if (!user && !isGroup) return;

    const newChat: Chat = isGroup ? {
      id: Date.now().toString(),
      name: 'Новая группа',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      lastMessage: 'Группа создана',
      timestamp: 'Сейчас',
      unread: 0,
      online: false,
      isGroup: true,
      members: memberIds,
    } : {
      id: Date.now().toString(),
      name: user!.name,
      avatar: user!.avatar,
      lastMessage: '',
      timestamp: '',
      unread: 0,
      online: user!.online,
    };

    setChats(prev => [newChat, ...prev]);
    setMessages(prev => ({ ...prev, [newChat.id]: [] }));
    setSelectedChat(newChat);
    setShowNewChat(false);
  };

  const handleMarkAsRead = () => {
    if (!selectedChat) return;

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: prev[selectedChat.id].map(msg => ({ ...msg, read: true })),
    }));

    setChats(prev => prev.map(chat =>
      chat.id === selectedChat.id ? { ...chat, unread: 0 } : chat
    ));
  };

  const handleAddToFavorites = (message: Message) => {
    setFavorites(prev => [...prev, message]);
  };

  const handleForwardMessage = (messageId: string) => {
    // Implementation for forwarding
    console.log('Forward message', messageId);
  };

  useEffect(() => {
    if (selectedChat) {
      handleMarkAsRead();
    }
  }, [selectedChat?.id]);

  const filteredChats = chats.filter(chat =>
    !chat.archived && chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const archivedChats = chats.filter(chat => chat.archived);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!selectedChat) return null;

  return (
    <div 
      className="flex h-screen overflow-hidden"
      style={{ background: theme.background }}
    >
      <ChatList
        chats={filteredChats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewChat={() => setShowNewChat(true)}
        onDeleteChat={handleDeleteChat}
        onPinChat={handlePinChat}
        onMuteChat={handleMuteChat}
        onArchiveChat={handleArchiveChat}
        onOpenSettings={() => setShowSettings(true)}
        onOpenCustomization={() => setShowCustomization(true)}
        onOpenStatus={() => setShowStatus(true)}
        onOpenFavorites={() => setShowFavorites(true)}
        onOpenArchived={() => setShowArchived(true)}
        archivedCount={archivedChats.length}
        theme={theme}
      />
      <ChatWindow
        chat={selectedChat}
        messages={messages[selectedChat.id] || []}
        onSendMessage={handleSendMessage}
        onEditMessage={handleEditMessage}
        onDeleteMessage={handleDeleteMessage}
        onReactToMessage={handleReactToMessage}
        onOpenProfile={() => setShowProfile(true)}
        onAddToFavorites={handleAddToFavorites}
        onForwardMessage={handleForwardMessage}
        theme={theme}
      />
      {showProfile && (
        <UserProfile
          chat={selectedChat}
          user={users.find(u => u.name === selectedChat.name)}
          messages={messages[selectedChat.id] || []}
          onClose={() => setShowProfile(false)}
          onMute={() => handleMuteChat(selectedChat.id)}
          onArchive={() => handleArchiveChat(selectedChat.id)}
          onDelete={() => {
            handleDeleteChat(selectedChat.id);
            setShowProfile(false);
          }}
          theme={theme}
        />
      )}
      {showNewChat && (
        <NewChatDialog
          users={users}
          onClose={() => setShowNewChat(false)}
          onCreateChat={handleCreateChat}
          theme={theme}
        />
      )}
      {showSettings && (
        <SettingsDialog 
          onClose={() => setShowSettings(false)}
          theme={theme}
        />
      )}
      {showCustomization && (
        <CustomizationDialog
          onClose={() => setShowCustomization(false)}
          theme={theme}
          onThemeChange={setTheme}
        />
      )}
      {showStatus && (
        <StatusView
          onClose={() => setShowStatus(false)}
          users={users}
          theme={theme}
        />
      )}
      {showFavorites && (
        <FavoritesDialog
          favorites={favorites}
          onClose={() => setShowFavorites(false)}
          theme={theme}
        />
      )}
      {showArchived && (
        <ArchivedChats
          chats={archivedChats}
          onClose={() => setShowArchived(false)}
          onSelectChat={(chat) => {
            handleArchiveChat(chat.id);
            setSelectedChat(chat);
            setShowArchived(false);
          }}
          theme={theme}
        />
      )}
      <Toaster />
    </div>
  );
}
