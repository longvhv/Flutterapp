import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';

export const WhatsNew = () => {
  const { t, language } = useLanguage();

  const updates = language === 'vi' ? [
    {
      version: '2.0.0',
      date: '3 Tháng 1, 2026',
      title: 'Cập nhật lớn - Giao diện mới',
      features: [
        'Thiết kế lại hoàn toàn với Material Design 3',
        'Chế độ tối được cải thiện với gradient đẹp mắt',
        'Hiệu ứng chuyển động mượt mà hơn',
        'Hiệu suất tăng 40%',
      ],
      color: 'from-blue-500 to-purple-600',
    },
    {
      version: '1.9.0',
      date: '25 Tháng 12, 2025',
      title: 'Tính năng bảo mật mới',
      features: [
        'Xác thực sinh trắc học',
        'Mã hóa end-to-end',
        'Quản lý phiên nâng cao',
        'Cảnh báo bảo mật thời gian thực',
      ],
      color: 'from-green-500 to-teal-600',
    },
    {
      version: '1.8.5',
      date: '15 Tháng 12, 2025',
      title: 'Cải thiện trải nghiệm người dùng',
      features: [
        'Hỗ trợ đa ngôn ngữ',
        'Tùy chỉnh thông báo',
        'Tìm kiếm nâng cao',
        'Sửa lỗi và cải thiện ổn định',
      ],
      color: 'from-orange-500 to-pink-600',
    },
    {
      version: '1.8.0',
      date: '1 Tháng 12, 2025',
      title: 'Tính năng cộng tác',
      features: [
        'Chia sẻ thời gian thực',
        'Bình luận và phản hồi',
        'Quyền truy cập theo nhóm',
        'Lịch sử hoạt động',
      ],
      color: 'from-cyan-500 to-blue-600',
    },
  ] : [
    {
      version: '2.0.0',
      date: 'January 3, 2026',
      title: 'Major Update - New Interface',
      features: [
        'Complete redesign with Material Design 3',
        'Enhanced dark mode with beautiful gradients',
        'Smoother animations and transitions',
        '40% performance improvement',
      ],
      color: 'from-blue-500 to-purple-600',
    },
    {
      version: '1.9.0',
      date: 'December 25, 2025',
      title: 'New Security Features',
      features: [
        'Biometric authentication',
        'End-to-end encryption',
        'Advanced session management',
        'Real-time security alerts',
      ],
      color: 'from-green-500 to-teal-600',
    },
    {
      version: '1.8.5',
      date: 'December 15, 2025',
      title: 'User Experience Improvements',
      features: [
        'Multi-language support',
        'Customizable notifications',
        'Advanced search',
        'Bug fixes and stability improvements',
      ],
      color: 'from-orange-500 to-pink-600',
    },
    {
      version: '1.8.0',
      date: 'December 1, 2025',
      title: 'Collaboration Features',
      features: [
        'Real-time sharing',
        'Comments and feedback',
        'Team access permissions',
        'Activity history',
      ],
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title={t.whatsNew} showBack />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-xl mb-2">{t.latestUpdates}</h2>
          <p className="text-white/80 text-sm">
            {language === 'vi' 
              ? 'Khám phá những tính năng và cải tiến mới nhất' 
              : 'Discover the latest features and improvements'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200" />

          {/* Updates */}
          <div className="space-y-8">
            {updates.map((update, index) => (
              <motion.div
                key={update.version}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative pl-16"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-0 w-12 h-12 bg-gradient-to-br ${update.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base text-gray-900 mb-1">{update.title}</h3>
                      <p className="text-xs text-gray-500">{update.date}</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      v{update.version}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mt-4 space-y-2">
                    {update.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + idx * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <div className={`w-5 h-5 bg-gradient-to-br ${update.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-sm text-gray-700">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-5"
        >
          <div className="flex gap-3">
            <Sparkles className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm text-indigo-900 mb-2">
                {language === 'vi' ? 'Sắp có' : 'Coming Soon'}
              </h4>
              <p className="text-xs text-indigo-700">
                {language === 'vi'
                  ? 'Chúng tôi đang làm việc trên nhiều tính năng thú vị. Theo dõi để cập nhật!'
                  : 'We are working on many exciting features. Stay tuned for updates!'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
