import { motion } from 'motion/react';
import { MessageCircle, Zap } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="mb-8 relative"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 blur-xl"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mx-auto" />
            </motion.div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <MessageCircle className="w-16 h-16 text-blue-600 mx-auto" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-5xl mb-4 text-white">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              QuickChat
            </motion.span>
          </h1>
          <p className="text-xl text-white/80 mb-8">Мессенджер нового поколения</p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-64 mx-auto"
        >
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-white/60 mt-4"
          >
            Загрузка сообщений...
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex gap-8 justify-center text-white/80"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span>Быстрый</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>Безопасный</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span>Удобный</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
