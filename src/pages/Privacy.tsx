import { useState } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, Bell, Share2 } from 'lucide-react';

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: any;
  color: string;
}

export const Privacy = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: 'twoFactor',
      title: t.twoFactorAuth,
      description: 'Add an extra layer of security to your account',
      enabled: true,
      icon: Shield,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'loginNotifications',
      title: t.loginNotifications,
      description: 'Get notified when someone logs into your account',
      enabled: true,
      icon: Bell,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'dataSharing',
      title: t.dataSharing,
      description: 'Allow anonymous usage data collection',
      enabled: false,
      icon: Share2,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'activityStatus',
      title: t.activityStatus,
      description: 'Show when you are online',
      enabled: true,
      icon: Eye,
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'profileVisibility',
      title: t.profileVisibility,
      description: 'Make your profile visible to everyone',
      enabled: false,
      icon: Lock,
      color: 'from-red-500 to-red-600',
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title={t.privacySecurity} showBack />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-xl mb-2">Security Settings</h2>
          <p className="text-white/80 text-sm">
            Manage your privacy and security preferences to keep your account safe
          </p>
        </motion.div>

        {/* Settings List */}
        <div className="space-y-3">
          {settings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <motion.div
                key={setting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${setting.color} rounded-xl flex items-center justify-center flex-shrink-0 mt-1`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-gray-900 mb-1">{setting.title}</h3>
                    <p className="text-xs text-gray-600">{setting.description}</p>
                  </div>
                  <motion.button
                    onClick={() => toggleSetting(setting.id)}
                    className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-colors ${
                      setting.enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{
                        x: setting.enabled ? 24 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Security Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4"
        >
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm text-blue-900 mb-1">End-to-end Encryption</h4>
              <p className="text-xs text-blue-700">
                Your data is encrypted and secured with industry-standard protocols
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
