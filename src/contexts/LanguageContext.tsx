import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'vi';

interface Translations {
  // Navigation
  home: string;
  notifications: string;
  settings: string;
  
  // Auth
  login: string;
  register: string;
  logout: string;
  email: string;
  password: string;
  confirmPassword: string;
  forgotPassword: string;
  resetPassword: string;
  fullName: string;
  rememberMe: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  signIn: string;
  signUp: string;
  sendResetLink: string;
  backToLogin: string;
  
  // Dashboard
  welcome: string;
  dashboard: string;
  statistics: string;
  recentActivity: string;
  totalUsers: string;
  activeProjects: string;
  revenue: string;
  growth: string;
  
  // Notifications
  markAllRead: string;
  markAsRead: string;
  deleteNotification: string;
  noNotifications: string;
  
  // Settings
  account: string;
  profile: string;
  changePassword: string;
  devices: string;
  privacySecurity: string;
  language: string;
  helpCenter: string;
  faq: string;
  whatsNew: string;
  
  // Profile
  editProfile: string;
  saveChanges: string;
  cancel: string;
  uploadAvatar: string;
  phoneNumber: string;
  bio: string;
  
  // Change Password
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  passwordRequirements: string;
  
  // Devices
  activeDevices: string;
  currentDevice: string;
  lastActive: string;
  revokeAccess: string;
  revokeAll: string;
  
  // Privacy & Security
  twoFactorAuth: string;
  loginNotifications: string;
  dataSharing: string;
  activityStatus: string;
  profileVisibility: string;
  
  // Language
  selectLanguage: string;
  english: string;
  vietnamese: string;
  
  // Help Center
  searchHelp: string;
  categories: string;
  popularArticles: string;
  myTickets: string;
  contactSupport: string;
  gettingStarted: string;
  accountSettings: string;
  troubleshooting: string;
  articles: string;
  newTicket: string;
  
  // FAQ
  frequentlyAskedQuestions: string;
  
  // What's New
  latestUpdates: string;
  newFeatures: string;
  
  // Common
  search: string;
  delete: string;
  edit: string;
  save: string;
  submit: string;
  close: string;
  open: string;
  status: string;
  priority: string;
  date: string;
  name: string;
  message: string;
  send: string;
  or: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    notifications: 'Notifications',
    settings: 'Settings',
    
    // Auth
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password',
    resetPassword: 'Reset Password',
    fullName: 'Full Name',
    rememberMe: 'Remember me',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    sendResetLink: 'Send Reset Link',
    backToLogin: 'Back to Login',
    
    // Dashboard
    welcome: 'Welcome back',
    dashboard: 'Dashboard',
    statistics: 'Statistics',
    recentActivity: 'Recent Activity',
    totalUsers: 'Total Users',
    activeProjects: 'Active Projects',
    revenue: 'Revenue',
    growth: 'Growth',
    
    // Notifications
    markAllRead: 'Mark all as read',
    markAsRead: 'Mark as read',
    deleteNotification: 'Delete',
    noNotifications: 'No notifications',
    
    // Settings
    account: 'Account',
    profile: 'Profile',
    changePassword: 'Change Password',
    devices: 'Devices',
    privacySecurity: 'Privacy & Security',
    language: 'Language',
    helpCenter: 'Help Center',
    faq: 'FAQ',
    whatsNew: "What's New",
    
    // Profile
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    uploadAvatar: 'Upload Avatar',
    phoneNumber: 'Phone Number',
    bio: 'Bio',
    
    // Change Password
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    passwordRequirements: 'Password must be at least 8 characters',
    
    // Devices
    activeDevices: 'Active Devices',
    currentDevice: 'Current Device',
    lastActive: 'Last Active',
    revokeAccess: 'Revoke Access',
    revokeAll: 'Revoke All Other Devices',
    
    // Privacy & Security
    twoFactorAuth: 'Two-Factor Authentication',
    loginNotifications: 'Login Notifications',
    dataSharing: 'Data Sharing',
    activityStatus: 'Activity Status',
    profileVisibility: 'Profile Visibility',
    
    // Language
    selectLanguage: 'Select Language',
    english: 'English',
    vietnamese: 'Tiếng Việt',
    
    // Help Center
    searchHelp: 'Search for help...',
    categories: 'Categories',
    popularArticles: 'Popular Articles',
    myTickets: 'My Support Tickets',
    contactSupport: 'Contact Support',
    gettingStarted: 'Getting Started',
    accountSettings: 'Account & Settings',
    troubleshooting: 'Troubleshooting',
    articles: 'articles',
    newTicket: 'New',
    
    // FAQ
    frequentlyAskedQuestions: 'Frequently Asked Questions',
    
    // What's New
    latestUpdates: 'Latest Updates',
    newFeatures: 'New Features',
    
    // Common
    search: 'Search',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    submit: 'Submit',
    close: 'Close',
    open: 'Open',
    status: 'Status',
    priority: 'Priority',
    date: 'Date',
    name: 'Name',
    message: 'Message',
    send: 'Send',
    or: 'or',
  },
  vi: {
    // Navigation
    home: 'Trang chủ',
    notifications: 'Thông báo',
    settings: 'Cài đặt',
    
    // Auth
    login: 'Đăng nhập',
    register: 'Đăng ký',
    logout: 'Đăng xuất',
    email: 'Email',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    forgotPassword: 'Quên mật khẩu',
    resetPassword: 'Đặt lại mật khẩu',
    fullName: 'Họ và tên',
    rememberMe: 'Ghi nhớ đăng nhập',
    dontHaveAccount: 'Chưa có tài khoản?',
    alreadyHaveAccount: 'Đã có tài khoản?',
    signIn: 'Đăng nhập',
    signUp: 'Đăng ký',
    sendResetLink: 'Gửi liên kết',
    backToLogin: 'Quay lại đăng nhập',
    
    // Dashboard
    welcome: 'Chào mừng trở lại',
    dashboard: 'Tổng quan',
    statistics: 'Thống kê',
    recentActivity: 'Hoạt động gần đây',
    totalUsers: 'Tổng người dùng',
    activeProjects: 'Dự án đang hoạt động',
    revenue: 'Doanh thu',
    growth: 'Tăng trưởng',
    
    // Notifications
    markAllRead: 'Đánh dấu tất cả đã đọc',
    markAsRead: 'Đánh dấu đã đọc',
    deleteNotification: 'Xóa',
    noNotifications: 'Không có thông báo',
    
    // Settings
    account: 'Tài khoản',
    profile: 'Hồ sơ',
    changePassword: 'Đổi mật khẩu',
    devices: 'Thiết bị',
    privacySecurity: 'Riêng tư & Bảo mật',
    language: 'Ngôn ngữ',
    helpCenter: 'Trung tâm hỗ trợ',
    faq: 'Hỏi đáp',
    whatsNew: 'Tính năng mới',
    
    // Profile
    editProfile: 'Chỉnh sửa hồ sơ',
    saveChanges: 'Lưu thay đổi',
    cancel: 'Hủy',
    uploadAvatar: 'Tải ảnh đại diện',
    phoneNumber: 'Số điện thoại',
    bio: 'Giới thiệu',
    
    // Change Password
    currentPassword: 'Mật khẩu hiện tại',
    newPassword: 'Mật khẩu mới',
    confirmNewPassword: 'Xác nhận mật khẩu mới',
    passwordRequirements: 'Mật khẩu phải có ít nhất 8 ký tự',
    
    // Devices
    activeDevices: 'Thiết bị đang hoạt động',
    currentDevice: 'Thiết bị hiện tại',
    lastActive: 'Hoạt động lần cuối',
    revokeAccess: 'Thu hồi quyền truy cập',
    revokeAll: 'Thu hồi tất cả thiết bị khác',
    
    // Privacy & Security
    twoFactorAuth: 'Xác thực hai yếu tố',
    loginNotifications: 'Thông báo đăng nhập',
    dataSharing: 'Chia sẻ dữ liệu',
    activityStatus: 'Trạng thái hoạt động',
    profileVisibility: 'Hiển thị hồ sơ',
    
    // Language
    selectLanguage: 'Chọn ngôn ngữ',
    english: 'English',
    vietnamese: 'Tiếng Việt',
    
    // Help Center
    searchHelp: 'Tìm kiếm trợ giúp...',
    categories: 'Danh mục',
    popularArticles: 'Bài viết phổ biến',
    myTickets: 'Yêu cầu hỗ trợ của tôi',
    contactSupport: 'Liên hệ hỗ trợ',
    gettingStarted: 'Bắt đầu',
    accountSettings: 'Tài khoản & Cài đặt',
    troubleshooting: 'Khắc phục sự cố',
    articles: 'bài viết',
    newTicket: 'Tạo mới',
    
    // FAQ
    frequentlyAskedQuestions: 'Câu hỏi thường gặp',
    
    // What's New
    latestUpdates: 'Cập nhật mới nhất',
    newFeatures: 'Tính năng mới',
    
    // Common
    search: 'Tìm kiếm',
    delete: 'Xóa',
    edit: 'Chỉnh sửa',
    save: 'Lưu',
    submit: 'Gửi',
    close: 'Đóng',
    open: 'Mở',
    status: 'Trạng thái',
    priority: 'Ưu tiên',
    date: 'Ngày',
    name: 'Tên',
    message: 'Tin nhắn',
    send: 'Gửi',
    or: 'hoặc',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'vi') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
