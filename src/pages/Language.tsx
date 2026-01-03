import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Check, Globe } from 'lucide-react';

export const Language = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    {
      code: 'en' as const,
      name: t.english,
      nativeName: 'English',
      flag: '🇺🇸',
    },
    {
      code: 'vi' as const,
      name: t.vietnamese,
      nativeName: 'Tiếng Việt',
      flag: '🇻🇳',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title={t.selectLanguage} showBack />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-xl mb-2">Language Preferences</h2>
          <p className="text-white/80 text-sm">
            Select your preferred language for the app interface
          </p>
        </motion.div>

        {/* Language Options */}
        <div className="space-y-3">
          {languages.map((lang, index) => {
            const isSelected = language === lang.code;

            return (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setLanguage(lang.code)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-white rounded-2xl p-5 shadow-sm border-2 transition-all ${
                  isSelected ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{lang.flag}</div>
                  <div className="flex-1 text-left">
                    <h3 className="text-base text-gray-900">{lang.nativeName}</h3>
                    <p className="text-sm text-gray-600">{lang.name}</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gray-100 rounded-2xl p-4"
        >
          <p className="text-sm text-gray-600 text-center">
            Your language preference will be saved automatically
          </p>
        </motion.div>
      </div>
    </div>
  );
};
