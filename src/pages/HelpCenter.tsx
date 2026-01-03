import { useState } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  BookOpen,
  Settings as SettingsIcon,
  AlertCircle,
  Shield,
  Mail,
  Phone,
  Video,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  X,
} from 'lucide-react';
import { supportApi } from '../services/api';

export const HelpCenter = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [articleIndex, setArticleIndex] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  useState(() => {
    loadTickets();
  });

  const loadTickets = async () => {
    const response = await supportApi.getTickets();
    if (response.success && response.data) {
      setTickets(response.data);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await supportApi.createTicket(contactForm);
      if (response.success) {
        setTickets([response.data, ...tickets]);
        setShowContactModal(false);
        setContactForm({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to create ticket', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      icon: BookOpen,
      title: language === 'vi' ? 'Bắt đầu' : 'Getting Started',
      articles: 12,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: SettingsIcon,
      title: language === 'vi' ? 'Tài khoản & Cài đặt' : 'Account & Settings',
      articles: 8,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: AlertCircle,
      title: language === 'vi' ? 'Khắc phục sự cố' : 'Troubleshooting',
      articles: 15,
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Shield,
      title: language === 'vi' ? 'Riêng tư & Bảo mật' : 'Privacy & Security',
      articles: 10,
      color: 'from-green-500 to-green-600',
    },
  ];

  const popularArticles = language === 'vi' ? [
    'Cách tạo tài khoản mới',
    'Đặt lại mật khẩu của bạn',
    'Bật xác thực hai yếu tố',
    'Quản lý thiết bị đã đăng nhập',
    'Cài đặt riêng tư và bảo mật',
  ] : [
    'How to create a new account',
    'Reset your password',
    'Enable two-factor authentication',
    'Manage logged-in devices',
    'Privacy and security settings',
  ];

  const faqs = language === 'vi' ? [
    {
      id: '1',
      question: 'Làm thế nào để thay đổi email của tôi?',
      answer: 'Đi tới Cài đặt > Hồ sơ và nhấp vào nút Chỉnh sửa. Bạn có thể cập nhật địa chỉ email của mình tại đó.',
    },
    {
      id: '2',
      question: 'Tài khoản của tôi có an toàn không?',
      answer: 'Chúng tôi sử dụng mã hóa end-to-end và các giao thức bảo mật tiêu chuẩn ngành để bảo vệ dữ liệu của bạn.',
    },
    {
      id: '3',
      question: 'Tôi có thể xuất dữ liệu của mình không?',
      answer: 'Có, đi tới Cài đặt > Riêng tư & Bảo mật để yêu cầu xuất dữ liệu đầy đủ.',
    },
    {
      id: '4',
      question: 'Làm thế nào để xóa tài khoản của tôi?',
      answer: 'Liên hệ với bộ phận hỗ trợ của chúng tôi để yêu cầu xóa tài khoản. Lưu ý rằng hành động này không thể hoàn tác.',
    },
    {
      id: '5',
      question: 'Tôi có thể sử dụng trên nhiều thiết bị không?',
      answer: 'Có, bạn có thể đăng nhập trên nhiều thiết bị. Quản lý chúng trong Cài đặt > Thiết bị.',
    },
  ] : [
    {
      id: '1',
      question: 'How do I change my email?',
      answer: 'Go to Settings > Profile and click the Edit button. You can update your email address there.',
    },
    {
      id: '2',
      question: 'Is my account secure?',
      answer: 'We use end-to-end encryption and industry-standard security protocols to protect your data.',
    },
    {
      id: '3',
      question: 'Can I export my data?',
      answer: 'Yes, go to Settings > Privacy & Security to request a full data export.',
    },
    {
      id: '4',
      question: 'How do I delete my account?',
      answer: 'Contact our support team to request account deletion. Note that this action is irreversible.',
    },
    {
      id: '5',
      question: 'Can I use on multiple devices?',
      answer: 'Yes, you can log in on multiple devices. Manage them in Settings > Devices.',
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@example.com',
      online: true,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      online: true,
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Video,
      title: 'Video Chat',
      value: language === 'vi' ? 'Có sẵn 24/7' : 'Available 24/7',
      online: true,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      value: language === 'vi' ? 'Trả lời ngay lập tức' : 'Instant response',
      online: true,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
      case 'Đang xử lý':
        return 'bg-blue-100 text-blue-700';
      case 'Open':
      case 'Mở':
        return 'bg-yellow-100 text-yellow-700';
      case 'Resolved':
      case 'Đã giải quyết':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
      case 'Cao':
        return 'text-red-600';
      case 'Medium':
      case 'Trung bình':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title={t.helpCenter} showBack />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl mb-2">{t.helpCenter}</h2>
          <p className="text-white/80 text-sm">
            {language === 'vi' ? 'Chúng tôi luôn sẵn sàng hỗ trợ bạn' : 'We are here to help you anytime'}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchHelp}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-base text-gray-900 mb-3">{t.categories}</h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm text-gray-900 mb-1">{category.title}</h4>
                  <p className="text-xs text-gray-500">{category.articles} {t.articles}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-6">
          <h3 className="text-base text-gray-900 mb-3">{t.popularArticles}</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  onClick={() => setArticleIndex(Math.max(0, articleIndex - 1))}
                  disabled={articleIndex === 0}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <span className="text-sm text-gray-900">
                  {popularArticles[articleIndex]}
                </span>
                <motion.button
                  onClick={() => setArticleIndex(Math.min(popularArticles.length - 1, articleIndex + 1))}
                  disabled={articleIndex === popularArticles.length - 1}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex gap-1 justify-center">
                {popularArticles.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === articleIndex ? 'w-6 bg-orange-500' : 'w-1 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick FAQ */}
        <div className="mb-6">
          <h3 className="text-base text-gray-900 mb-3">{t.faq}</h3>
          <div className="space-y-2">
            {faqs.map((faq) => {
              const isExpanded = expandedFAQ === faq.id;
              return (
                <div key={faq.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <motion.button
                    onClick={() => setExpandedFAQ(isExpanded ? null : faq.id)}
                    className="w-full p-4 flex items-start gap-3 text-left hover:bg-gray-50"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{faq.question}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
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
                </div>
              );
            })}
          </div>
        </div>

        {/* My Support Tickets */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base text-gray-900">{t.myTickets}</h3>
            <motion.button
              onClick={() => setShowContactModal(true)}
              className="text-sm text-orange-600 hover:text-orange-700"
              whileTap={{ scale: 0.95 }}
            >
              {t.newTicket}
            </motion.button>
          </div>
          <div className="space-y-3">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm text-gray-900 flex-1">{ticket.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className={getPriorityColor(ticket.priority)}>{ticket.priority}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ticket.createdAt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div>
          <h3 className="text-base text-gray-900 mb-3">{t.contactSupport}</h3>
          <div className="grid grid-cols-2 gap-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.button
                  key={method.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl p-4 shadow-sm text-left relative"
                >
                  {method.online && (
                    <div className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full" />
                  )}
                  <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm text-gray-900 mb-1">{method.title}</h4>
                  <p className="text-xs text-gray-500">{method.value}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-gray-900">{t.contactSupport}</h3>
                <motion.button
                  onClick={() => setShowContactModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">{t.name}</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">{t.email}</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">{t.message}</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl shadow-lg disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Sending...' : t.send}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
