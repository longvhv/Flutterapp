import { useState } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ = () => {
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQItem[] = language === 'vi' ? [
    {
      id: '1',
      question: 'Làm thế nào để tạo tài khoản?',
      answer: 'Để tạo tài khoản, nhấp vào nút "Đăng ký" trên màn hình đăng nhập. Điền thông tin cần thiết như họ tên, email và mật khẩu. Sau khi hoàn tất, bạn sẽ nhận được email xác nhận để kích hoạt tài khoản.',
    },
    {
      id: '2',
      question: 'Làm thế nào để đặt lại mật khẩu?',
      answer: 'Nhấp vào "Quên mật khẩu" trên màn hình đăng nhập, nhập địa chỉ email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu. Kiểm tra email và làm theo hướng dẫn để tạo mật khẩu mới.',
    },
    {
      id: '3',
      question: 'Tôi có thể thay đổi thông tin hồ sơ của mình không?',
      answer: 'Có, bạn có thể cập nhật thông tin hồ sơ của mình bất cứ lúc nào. Đi tới Cài đặt > Hồ sơ, sau đó nhấp vào nút "Chỉnh sửa". Bạn có thể thay đổi tên, email, số điện thoại và ảnh đại diện.',
    },
    {
      id: '4',
      question: 'Làm thế nào để bật xác thực hai yếu tố?',
      answer: 'Để bảo mật tài khoản tốt hơn, hãy vào Cài đặt > Riêng tư & Bảo mật. Bật tùy chọn "Xác thực hai yếu tố" và làm theo hướng dẫn để thiết lập. Bạn sẽ cần xác minh danh tính thông qua điện thoại hoặc email mỗi khi đăng nhập.',
    },
    {
      id: '5',
      question: 'Tôi có thể quản lý thiết bị đã đăng nhập ở đâu?',
      answer: 'Đi tới Cài đặt > Thiết bị để xem tất cả các thiết bị hiện đang đăng nhập vào tài khoản của bạn. Bạn có thể thu hồi quyền truy cập từ bất kỳ thiết bị nào hoặc đăng xuất khỏi tất cả thiết bị khác cùng một lúc.',
    },
  ] : [
    {
      id: '1',
      question: 'How do I create an account?',
      answer: 'To create an account, click the "Sign Up" button on the login screen. Fill in the required information including your name, email, and password. Once completed, you will receive a confirmation email to activate your account.',
    },
    {
      id: '2',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login screen, enter your email address, and we will send you a password reset link. Check your email and follow the instructions to create a new password.',
    },
    {
      id: '3',
      question: 'Can I change my profile information?',
      answer: 'Yes, you can update your profile information at any time. Go to Settings > Profile, then click the "Edit" button. You can change your name, email, phone number, and profile picture.',
    },
    {
      id: '4',
      question: 'How do I enable two-factor authentication?',
      answer: 'For better account security, go to Settings > Privacy & Security. Enable the "Two-Factor Authentication" option and follow the setup instructions. You will need to verify your identity via phone or email each time you log in.',
    },
    {
      id: '5',
      question: 'Where can I manage my logged-in devices?',
      answer: 'Go to Settings > Devices to see all devices currently logged into your account. You can revoke access from any device or sign out from all other devices at once.',
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title={t.frequentlyAskedQuestions} showBack />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl mb-2">{t.frequentlyAskedQuestions}</h2>
          <p className="text-white/80 text-sm">
            Find answers to commonly asked questions
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isExpanded = expandedId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-4 flex items-start gap-3 text-left hover:bg-gray-50 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-1">
                    <h3 className="text-sm text-gray-900">{faq.question}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
