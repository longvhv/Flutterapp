import { useState, useEffect } from 'react';
import { BottomNav } from '../components/BottomNav';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, Trash2, Info, Star, Shield } from 'lucide-react';
import { notificationsApi } from '../services/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'feature' | 'security';
  read: boolean;
  createdAt: string;
}

export const Notifications = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await notificationsApi.getNotifications();
      if (response.success && response.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Failed to load notifications', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    await notificationsApi.markAsRead(id);
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = async () => {
    await notificationsApi.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = async (id: string) => {
    await notificationsApi.deleteNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'feature': return Star;
      case 'security': return Shield;
      default: return Info;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'feature': return 'from-purple-500 to-pink-500';
      case 'security': return 'from-red-500 to-orange-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl">{t.notifications}</h1>
                {unreadCount > 0 && (
                  <p className="text-xs text-gray-500">{unreadCount} unread</p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <motion.button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700"
                whileTap={{ scale: 0.95 }}
              >
                {t.markAllRead}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-lg mx-auto px-4 py-4">
        {loading ? (
          // Skeleton loading
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t.noNotifications}</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {notifications.map((notification, index) => {
                const Icon = getIcon(notification.type);
                const colorClass = getColor(notification.type);

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${
                      notification.read ? 'border-transparent' : 'border-blue-200'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-gray-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {!notification.read && (
                          <motion.button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors"
                            whileTap={{ scale: 0.9 }}
                            title={t.markAsRead}
                          >
                            <Check className="w-4 h-4" />
                          </motion.button>
                        )}
                        <motion.button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                          whileTap={{ scale: 0.9 }}
                          title={t.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
