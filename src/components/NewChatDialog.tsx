import { useState } from 'react';
import { X, Search, Users, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import type { User, Theme } from '../App';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface NewChatDialogProps {
  users: User[];
  onClose: () => void;
  onCreateChat: (userId: string, isGroup: boolean, memberIds?: string[]) => void;
  theme: Theme;
}

export function NewChatDialog({ users, onClose, onCreateChat, theme }: NewChatDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = () => {
    if (selectedUsers.length > 0) {
      onCreateChat('', true, selectedUsers);
      toast.success('Группа создана');
    }
  };

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
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl text-white">Новый чат</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Поиск контактов..."
              className="pl-9 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="direct" className="flex-1 flex flex-col min-h-0">
          <TabsList className="w-full rounded-none border-b mx-4">
            <TabsTrigger value="direct" className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Личный чат
            </TabsTrigger>
            <TabsTrigger value="group" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              Группа
            </TabsTrigger>
          </TabsList>

          <TabsContent value="direct" className="flex-1 m-0 min-h-0">
            <ScrollArea className="h-[400px]">
              <div className="p-2">
                {filteredUsers.map((user, index) => (
                  <motion.button
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => {
                      onCreateChat(user.id, false);
                      toast.success(`Чат с ${user.name} создан`);
                    }}
                    className="w-full p-3 rounded-xl flex items-center gap-3 hover:bg-gray-50 transition-all"
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.status}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="group" className="flex-1 m-0 flex flex-col min-h-0">
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="p-3 rounded-xl flex items-center gap-3 hover:bg-gray-50 transition-all"
                  >
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleToggleUser(user.id)}
                    />
                    <div className="relative">
                      <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {selectedUsers.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <Button 
                  onClick={handleCreateGroup} 
                  className="w-full"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Создать группу ({selectedUsers.length})
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
