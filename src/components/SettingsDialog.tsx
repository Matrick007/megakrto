import { X, User, Bell, Lock, Palette, Moon, Globe, Download, Shield, Smartphone, Database, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import type { Theme } from '../App';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface SettingsDialogProps {
  onClose: () => void;
  theme: Theme;
}

export function SettingsDialog({ onClose, theme }: SettingsDialogProps) {
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
              <User className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl text-white">Настройки</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          {/* Profile Section */}
          <div className="p-6">
            <h3 className="flex items-center gap-2 mb-4 text-gray-900">
              <User className="h-5 w-5" />
              Профиль
            </h3>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border">
              <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Мой профиль"
                />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="text-lg text-gray-900">Иван Иванов</h4>
                <p className="text-sm text-gray-500">@ivan_ivanov</p>
                <p className="text-sm text-green-600 mt-1">В сети</p>
              </div>
              <Button 
                variant="outline"
                style={{ borderColor: `${theme.primary}30` }}
              >
                Изменить
              </Button>
            </div>
          </div>

          <Separator />

          {/* Notifications */}
          <div className="p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-gray-900 mb-4">
              <Bell className="h-5 w-5" />
              Уведомления
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <Label htmlFor="message-notifications">Уведомления о сообщениях</Label>
                  <p className="text-sm text-gray-500">Получать уведомления о новых сообщениях</p>
                </div>
                <Switch 
                  id="message-notifications" 
                  defaultChecked 
                  onCheckedChange={(checked) => {
                    toast.success(checked ? 'Уведомления включены' : 'Уведомления выключены');
                  }}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <Label htmlFor="sound">Звук уведомлений</Label>
                  <p className="text-sm text-gray-500">Воспроизводить звук при получении сообщений</p>
                </div>
                <Switch id="sound" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <Label htmlFor="preview">Предпросмотр сообщений</Label>
                  <p className="text-sm text-gray-500">Показывать текст сообщения в уведомлении</p>
                </div>
                <Switch id="preview" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <Label htmlFor="vibration">Вибрация</Label>
                  <p className="text-sm text-gray-500">Вибрировать при получении сообщений</p>
                </div>
                <Switch id="vibration" defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacy */}
          <div className="p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-gray-900 mb-4">
              <Lock className="h-5 w-5" />
              Приватность и безопасность
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <Label htmlFor="read-receipts">Отчеты о прочтении</Label>
                  <p className="text-sm text-gray-500">Отправлять уведомления о прочтении сообщений</p>
                </div>
                <Switch id="read-receipts" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <Label htmlFor="online-status">Статус "В сети"</Label>
                  <p className="text-sm text-gray-500">Показывать когда вы в сети</p>
                </div>
                <Switch id="online-status" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <Label htmlFor="typing">Индикатор набора текста</Label>
                  <p className="text-sm text-gray-500">Показывать когда вы печатаете</p>
                </div>
                <Switch id="typing" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <Label htmlFor="last-seen">Последний визит</Label>
                  <p className="text-sm text-gray-500">Показывать время последнего визита</p>
                </div>
                <Switch id="last-seen" defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          {/* Data & Storage */}
          <div className="p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-gray-900 mb-4">
              <Database className="h-5 w-5" />
              Данные и хранилище
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Download className="h-5 w-5" />
                Управление хранилищем
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Download className="h-5 w-5" />
                Экспортировать данные
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Shield className="h-5 w-5" />
                Резервное копирование
              </Button>
            </div>
          </div>

          <Separator />

          {/* Devices */}
          <div className="p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-gray-900 mb-4">
              <Smartphone className="h-5 w-5" />
              Устройства
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-10 w-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                    }}
                  >
                    <Smartphone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900">Это устройство</p>
                    <p className="text-sm text-gray-500">Активно сейчас</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Просмотреть все устройства
              </Button>
            </div>
          </div>

          <Separator />

          {/* About */}
          <div className="p-6 space-y-2">
            <h3 className="flex items-center gap-2 text-gray-900 mb-4">
              <HelpCircle className="h-5 w-5" />
              О приложении
            </h3>
            <Button variant="ghost" className="w-full justify-start">
              Помощь и поддержка
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Политика конфиденциальности
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Условия использования
            </Button>
            <div className="pt-4 text-center text-sm text-gray-500">
              QuickChat v2.0.0
            </div>
          </div>

          <Separator />

          {/* Danger Zone */}
          <div className="p-6 space-y-2">
            <Button 
              variant="outline" 
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              onClick={() => {
                if (confirm('Вы уверены, что хотите выйти?')) {
                  toast.success('Вы вышли из аккаунта');
                }
              }}
            >
              Выйти из аккаунта
            </Button>
            <Button 
              variant="outline" 
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              onClick={() => {
                if (confirm('Вы уверены? Это действие необратимо!')) {
                  toast.error('Аккаунт удален');
                }
              }}
            >
              Удалить аккаунт
            </Button>
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
}
