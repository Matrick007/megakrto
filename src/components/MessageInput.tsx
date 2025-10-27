import { useState, useRef } from 'react';
import { Smile, Paperclip, Mic, Send, X, ImageIcon, StopCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import type { Message, Theme } from '../App';
import { toast } from 'sonner';

interface MessageInputProps {
  onSendMessage: (text: string, replyTo?: string, fileUrl?: string, fileName?: string, fileType?: 'image' | 'file' | 'voice') => void;
  messages: Message[];
  theme: Theme;
}

const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
  '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
  '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪',
  '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
  '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
  '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕',
  '🤢', '🤮', '🤧', '🥵', '🥶', '😶‍🌫️', '😵', '😵‍💫',
  '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟',
  '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦',
  '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖',
  '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤',
  '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙',
  '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪',
  '🔥', '⭐', '✨', '💫', '⚡', '💥', '💯', '🎉',
  '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '⚽',
];

export function MessageInput({ onSendMessage, messages, theme }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [attachedFile, setAttachedFile] = useState<{ url: string; name: string; type: 'image' | 'file' } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() || attachedFile) {
      onSendMessage(
        message,
        replyTo?.id,
        attachedFile?.url,
        attachedFile?.name,
        isRecording ? 'voice' : attachedFile?.type
      );
      setMessage('');
      setReplyTo(null);
      setAttachedFile(null);
      setIsRecording(false);
      toast.success('Сообщение отправлено');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = message.slice(0, start) + emoji + message.slice(end);
      setMessage(newText);
      
      // Set cursor position after emoji
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    } else {
      setMessage(prev => prev + emoji);
    }
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      setAttachedFile({
        url: URL.createObjectURL(file),
        name: file.name,
        type: isImage ? 'image' : 'file',
      });
      toast.success('Файл прикреплен');
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.success('Запись началась');
      // Simulate recording
      setTimeout(() => {
        if (isRecording) {
          onSendMessage('', undefined, undefined, 'Голосовое сообщение', 'voice');
          setIsRecording(false);
        }
      }, 3000);
    } else {
      setIsRecording(false);
      toast.info('Запись остановлена');
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white/95 backdrop-blur">
      {/* Reply preview */}
      {replyTo && (
        <div className="mb-2 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xs font-medium" style={{ color: theme.primary }}>Ответ на сообщение</div>
            <div className="text-sm text-gray-600 truncate">{replyTo.text}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 flex-shrink-0"
            onClick={() => setReplyTo(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* File preview */}
      {attachedFile && (
        <div className="mb-2 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            {attachedFile.type === 'image' ? (
              <img
                src={attachedFile.url}
                alt={attachedFile.name}
                className="h-12 w-12 object-cover rounded"
              />
            ) : (
              <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-gray-500" />
              </div>
            )}
            <span className="text-sm text-gray-600">{attachedFile.name}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 flex-shrink-0"
            onClick={() => setAttachedFile(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Recording indicator */}
      {isRecording && (
        <div className="mb-2 p-3 bg-red-50 rounded-lg flex items-center gap-3">
          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-red-600">Запись голосового сообщения...</span>
        </div>
      )}

      <div className="flex items-end gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,application/pdf,.doc,.docx"
        />

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 flex-shrink-0"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isRecording ? 'Запись...' : 'Введите сообщение...'}
            className="min-h-[44px] max-h-32 resize-none pr-10 rounded-2xl border-2 focus-visible:ring-0"
            style={{
              borderColor: `${theme.primary}30`,
            }}
            rows={1}
            disabled={isRecording}
          />
          <div className="absolute right-1 bottom-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-5 w-5" />
            </Button>
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 bg-white shadow-xl rounded-2xl p-3 w-80 max-h-64 overflow-y-auto border-2 border-gray-100 z-50">
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl hover:bg-gray-100 rounded p-1.5 transition-all hover:scale-125"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {message.trim() || attachedFile ? (
          <Button
            onClick={handleSend}
            size="icon"
            className="h-9 w-9 flex-shrink-0 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
            }}
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className={`h-9 w-9 flex-shrink-0 ${isRecording ? 'text-red-600 bg-red-50' : ''}`}
            onClick={toggleRecording}
          >
            {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        )}
      </div>
    </div>
  );
}
