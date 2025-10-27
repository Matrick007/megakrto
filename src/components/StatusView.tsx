import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import type { User, Theme } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface StatusViewProps {
  onClose: () => void;
  users: User[];
  theme: Theme;
}

export function StatusView({ onClose, users, theme }: StatusViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

  const statuses = users.slice(0, 10).map((user, index) => ({
    user,
    images: [
      `https://images.unsplash.com/photo-${1506794778202 + index * 100}?w=400&h=600&fit=crop`,
      `https://images.unsplash.com/photo-${1517841905240 + index * 100}?w=400&h=600&fit=crop`,
    ],
    viewed: Math.random() > 0.5,
  }));

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {selectedStatus === null ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md h-full flex flex-col"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between text-white">
              <h2 className="text-xl">Статусы</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Status List */}
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4">
                {/* My Status */}
                <div>
                  <p className="text-sm text-gray-400 mb-3">Мой статус</p>
                  <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="relative">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                        <AvatarFallback>Я</AvatarFallback>
                      </Avatar>
                      <div 
                        className="absolute bottom-0 right-0 h-5 w-5 rounded-full flex items-center justify-center border-2 border-black"
                        style={{ background: theme.primary }}
                      >
                        <Plus className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-white">Добавить статус</p>
                      <p className="text-sm text-gray-400">Поделитесь моментом</p>
                    </div>
                  </button>
                </div>

                {/* Others' Statuses */}
                <div>
                  <p className="text-sm text-gray-400 mb-3">Недавние обновления</p>
                  <div className="space-y-2">
                    {statuses.map((status, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedStatus(index)}
                        className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="relative">
                          <div 
                            className="h-14 w-14 rounded-full p-0.5"
                            style={{
                              background: status.viewed 
                                ? 'rgba(255,255,255,0.3)' 
                                : `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                            }}
                          >
                            <Avatar className="h-full w-full border-2 border-black">
                              <AvatarImage src={status.user.avatar} />
                              <AvatarFallback>{status.user.name[0]}</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-white">{status.user.name}</p>
                          <p className="text-sm text-gray-400">
                            {Math.floor(Math.random() * 24)}ч назад
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        ) : (
          <motion.div
            key="viewer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md h-full flex flex-col"
          >
            {/* Status Viewer */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="p-4 flex items-center justify-between text-white z-10">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-white">
                    <AvatarImage src={statuses[selectedStatus].user.avatar} />
                    <AvatarFallback>{statuses[selectedStatus].user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="">{statuses[selectedStatus].user.name}</p>
                    <p className="text-sm text-gray-300">
                      {Math.floor(Math.random() * 24)}ч назад
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedStatus(null)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Image */}
              <div className="flex-1 flex items-center justify-center p-4">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={statuses[selectedStatus].images[0]}
                  alt="Status"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Progress bars */}
              <div className="absolute top-2 left-4 right-4 flex gap-1">
                {statuses[selectedStatus].images.map((_, i) => (
                  <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
