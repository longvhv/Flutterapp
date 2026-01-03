import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BottomNav } from '../components/BottomNav';
import { motion } from 'motion/react';
import {
  User,
  Lock,
  Smartphone,
  Shield,
  Globe,
  HelpCircle,
  MessageSquare,
  Sparkles,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const settingsGroups = [
    {
      title: t.account,
      items: [
        { icon: User, label: t.profile, path: '/profile', color: 'from-blue-500 to-blue-600' },
        { icon: Lock, label: t.changePassword, path: '/change-password', color: 'from-purple-500 to-purple-600' },
      ],
    },
    {
      title: 'Security',
      items: [
        { icon: Smartphone, label: t.devices, path: '/devices', color: 'from-green-500 to-green-600' },
        { icon: Shield, label: t.privacySecurity, path: '/privacy', color: 'from-red-500 to-red-600' },
      ],
    },
    {
      title: 'General',
      items: [
        { icon: Globe, label: t.language, path: '/language', color: 'from-indigo-500 to-indigo-600' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: t.helpCenter, path: '/help', color: 'from-orange-500 to-orange-600' },
        { icon: MessageSquare, label: t.faq, path: '/faq', color: 'from-pink-500 to-pink-600' },
        { icon: Sparkles, label: t.whatsNew, path: '/whats-new', color: 'from-cyan-500 to-cyan-600' },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Profile Card */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 pt-safe pb-8">
        <div className="max-w-lg mx-auto px-4">
          <h1 className="text-2xl text-white mb-6">{t.settings}</h1>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/profile')}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-xl cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg text-gray-900 truncate">{user?.fullName}</h2>
                <p className="text-sm text-gray-600 truncate">{user?.email}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h3 className="text-xs text-gray-500 uppercase tracking-wider px-2 mb-3">
              {group.title}
            </h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                      itemIndex !== group.items.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="flex-1 text-left text-gray-900">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          <span>{t.logout}</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
};
