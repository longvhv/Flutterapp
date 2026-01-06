import 'package:flutter/material.dart';

/// Localization support for English and Vietnamese
class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  static const List<Locale> supportedLocales = [
    Locale('en', 'US'),
    Locale('vi', 'VN'),
  ];

  // Get localized strings based on current locale
  static final Map<String, Map<String, String>> _localizedValues = {
    'en': _enStrings,
    'vi': _viStrings,
  };

  String translate(String key) {
    return _localizedValues[locale.languageCode]?[key] ?? key;
  }

  // Convenience getters for common strings
  
  // Authentication
  String get appName => translate('app_name');
  String get welcomeBack => translate('welcome_back');
  String get signInToContinue => translate('sign_in_to_continue');
  String get email => translate('email');
  String get password => translate('password');
  String get login => translate('login');
  String get forgotPassword => translate('forgot_password');
  String get dontHaveAccount => translate('dont_have_account');
  String get signUp => translate('sign_up');
  String get createAccount => translate('create_account');
  String get fullName => translate('full_name');
  String get confirmPassword => translate('confirm_password');
  String get alreadyHaveAccount => translate('already_have_account');
  String get signIn => translate('sign_in');
  String get resetPassword => translate('reset_password');
  String get resetPasswordDesc => translate('reset_password_desc');
  String get sendResetLink => translate('send_reset_link');
  String get backToLogin => translate('back_to_login');
  
  // Navigation
  String get home => translate('home');
  String get notifications => translate('notifications');
  String get profile => translate('profile');
  String get settings => translate('settings');
  
  // Home
  String get dashboard => translate('dashboard');
  String get quickActions => translate('quick_actions');
  String get recentActivity => translate('recent_activity');
  String get viewAll => translate('view_all');
  
  // Notifications
  String get allNotifications => translate('all_notifications');
  String get unread => translate('unread');
  String get markAsRead => translate('mark_as_read');
  String get markAllAsRead => translate('mark_all_as_read');
  String get noNotifications => translate('no_notifications');
  
  // Profile
  String get editProfile => translate('edit_profile');
  String get personalInfo => translate('personal_info');
  String get phoneNumber => translate('phone_number');
  String get bio => translate('bio');
  String get save => translate('save');
  String get cancel => translate('cancel');
  String get accountStats => translate('account_stats');
  String get memberSince => translate('member_since');
  String get lastLogin => translate('last_login');
  String get activeDevices => translate('active_devices');
  String get securityScore => translate('security_score');
  
  // Settings
  String get account => translate('account');
  String get preferences => translate('preferences');
  String get privacyAndSecurity => translate('privacy_and_security');
  String get support => translate('support');
  String get language => translate('language');
  String get changePassword => translate('change_password');
  String get devices => translate('devices');
  String get darkMode => translate('dark_mode');
  String get emailNotifications => translate('email_notifications');
  String get pushNotifications => translate('push_notifications');
  String get logout => translate('logout');
  String get version => translate('version');
  
  // Change Password
  String get currentPassword => translate('current_password');
  String get newPassword => translate('new_password');
  String get confirmNewPassword => translate('confirm_new_password');
  String get passwordRequirements => translate('password_requirements');
  String get atLeast8Characters => translate('at_least_8_characters');
  String get oneUppercase => translate('one_uppercase');
  String get oneLowercase => translate('one_lowercase');
  String get oneNumber => translate('one_number');
  
  // Devices
  String get manageDevices => translate('manage_devices');
  String get currentDevice => translate('current_device');
  String get removeDevice => translate('remove_device');
  String get deviceRemoved => translate('device_removed');
  
  // Privacy
  String get privacySettings => translate('privacy_settings');
  String get securitySettings => translate('security_settings');
  String get dataManagement => translate('data_management');
  String get profileVisibility => translate('profile_visibility');
  String get activityStatus => translate('activity_status');
  String get dataCollection => translate('data_collection');
  String get marketingEmails => translate('marketing_emails');
  String get twoFactorAuth => translate('two_factor_auth');
  String get biometricAuth => translate('biometric_auth');
  String get loginHistory => translate('login_history');
  String get downloadYourData => translate('download_your_data');
  String get deleteAccount => translate('delete_account');
  String get privacyPolicy => translate('privacy_policy');
  
  // Help & Support
  String get helpCenter => translate('help_center');
  String get faq => translate('faq');
  String get whatsNew => translate('whats_new');
  String get contactSupport => translate('contact_support');
  String get searchFaqs => translate('search_faqs');
  String get searchForHelp => translate('search_for_help');
  String get browseByCategory => translate('browse_by_category');
  String get wasThisHelpful => translate('was_this_helpful');
  String get stillNeedHelp => translate('still_need_help');
  
  // Common
  String get loading => translate('loading');
  String get error => translate('error');
  String get success => translate('success');
  String get warning => translate('warning');
  String get info => translate('info');
  String get ok => translate('ok');
  String get yes => translate('yes');
  String get no => translate('no');
  String get confirm => translate('confirm');
  String get delete => translate('delete');
  String get edit => translate('edit');
  String get update => translate('update');
  String get search => translate('search');
  String get filter => translate('filter');
  String get sort => translate('sort');
  
  // Validation
  String get fieldRequired => translate('field_required');
  String get invalidEmail => translate('invalid_email');
  String get passwordTooShort => translate('password_too_short');
  String get passwordsDoNotMatch => translate('passwords_do_not_match');
  
  // Messages
  String get loginSuccessful => translate('login_successful');
  String get loginFailed => translate('login_failed');
  String get registrationSuccessful => translate('registration_successful');
  String get passwordResetSent => translate('password_reset_sent');
  String get profileUpdated => translate('profile_updated');
  String get settingsSaved => translate('settings_saved');
  String get somethingWentWrong => translate('something_went_wrong');
  String get comingSoon => translate('coming_soon');
}

// English Strings
const Map<String, String> _enStrings = {
  // App
  'app_name': 'MyApp',
  
  // Authentication
  'welcome_back': 'Welcome Back',
  'sign_in_to_continue': 'Sign in to continue',
  'email': 'Email',
  'password': 'Password',
  'login': 'Login',
  'forgot_password': 'Forgot Password?',
  'dont_have_account': "Don't have an account?",
  'sign_up': 'Sign Up',
  'create_account': 'Create Account',
  'full_name': 'Full Name',
  'confirm_password': 'Confirm Password',
  'already_have_account': 'Already have an account?',
  'sign_in': 'Sign In',
  'reset_password': 'Reset Password',
  'reset_password_desc': 'Enter your email to receive a password reset link',
  'send_reset_link': 'Send Reset Link',
  'back_to_login': 'Back to Login',
  
  // Navigation
  'home': 'Home',
  'notifications': 'Notifications',
  'profile': 'Profile',
  'settings': 'Settings',
  
  // Home
  'dashboard': 'Dashboard',
  'quick_actions': 'Quick Actions',
  'recent_activity': 'Recent Activity',
  'view_all': 'View All',
  
  // Notifications
  'all_notifications': 'All',
  'unread': 'Unread',
  'mark_as_read': 'Mark as Read',
  'mark_all_as_read': 'Mark All as Read',
  'no_notifications': 'No Notifications',
  
  // Profile
  'edit_profile': 'Edit Profile',
  'personal_info': 'Personal Information',
  'phone_number': 'Phone Number',
  'bio': 'Bio',
  'save': 'Save',
  'cancel': 'Cancel',
  'account_stats': 'Account Statistics',
  'member_since': 'Member Since',
  'last_login': 'Last Login',
  'active_devices': 'Active Devices',
  'security_score': 'Security Score',
  
  // Settings
  'account': 'Account',
  'preferences': 'Preferences',
  'privacy_and_security': 'Privacy & Security',
  'support': 'Support',
  'language': 'Language',
  'change_password': 'Change Password',
  'devices': 'Devices',
  'dark_mode': 'Dark Mode',
  'email_notifications': 'Email Notifications',
  'push_notifications': 'Push Notifications',
  'logout': 'Logout',
  'version': 'Version',
  
  // Change Password
  'current_password': 'Current Password',
  'new_password': 'New Password',
  'confirm_new_password': 'Confirm New Password',
  'password_requirements': 'Password Requirements',
  'at_least_8_characters': 'At least 8 characters',
  'one_uppercase': 'One uppercase letter',
  'one_lowercase': 'One lowercase letter',
  'one_number': 'One number',
  
  // Devices
  'manage_devices': 'Manage Devices',
  'current_device': 'Current',
  'remove_device': 'Remove Device',
  'device_removed': 'Device removed successfully',
  
  // Privacy
  'privacy_settings': 'Privacy Settings',
  'security_settings': 'Security Settings',
  'data_management': 'Data Management',
  'profile_visibility': 'Profile Visibility',
  'activity_status': 'Activity Status',
  'data_collection': 'Data Collection',
  'marketing_emails': 'Marketing Emails',
  'two_factor_auth': 'Two-Factor Authentication',
  'biometric_auth': 'Biometric Authentication',
  'login_history': 'Login History',
  'download_your_data': 'Download Your Data',
  'delete_account': 'Delete Account',
  'privacy_policy': 'Privacy Policy',
  
  // Help & Support
  'help_center': 'Help Center',
  'faq': 'FAQ',
  'whats_new': "What's New",
  'contact_support': 'Contact Support',
  'search_faqs': 'Search FAQs',
  'search_for_help': 'Search for help',
  'browse_by_category': 'Browse by Category',
  'was_this_helpful': 'Was this helpful?',
  'still_need_help': 'Still need help?',
  
  // Common
  'loading': 'Loading...',
  'error': 'Error',
  'success': 'Success',
  'warning': 'Warning',
  'info': 'Info',
  'ok': 'OK',
  'yes': 'Yes',
  'no': 'No',
  'confirm': 'Confirm',
  'delete': 'Delete',
  'edit': 'Edit',
  'update': 'Update',
  'search': 'Search',
  'filter': 'Filter',
  'sort': 'Sort',
  
  // Validation
  'field_required': 'This field is required',
  'invalid_email': 'Please enter a valid email',
  'password_too_short': 'Password must be at least 8 characters',
  'passwords_do_not_match': 'Passwords do not match',
  
  // Messages
  'login_successful': 'Login successful',
  'login_failed': 'Login failed',
  'registration_successful': 'Registration successful',
  'password_reset_sent': 'Password reset link sent',
  'profile_updated': 'Profile updated successfully',
  'settings_saved': 'Settings saved',
  'something_went_wrong': 'Something went wrong',
  'coming_soon': 'Coming soon',
};

// Vietnamese Strings
const Map<String, String> _viStrings = {
  // App
  'app_name': 'Ứng Dụng',
  
  // Authentication
  'welcome_back': 'Chào Mừng Trở Lại',
  'sign_in_to_continue': 'Đăng nhập để tiếp tục',
  'email': 'Email',
  'password': 'Mật khẩu',
  'login': 'Đăng Nhập',
  'forgot_password': 'Quên mật khẩu?',
  'dont_have_account': 'Chưa có tài khoản?',
  'sign_up': 'Đăng Ký',
  'create_account': 'Tạo Tài Khoản',
  'full_name': 'Họ và Tên',
  'confirm_password': 'Xác Nhận Mật Khẩu',
  'already_have_account': 'Đã có tài khoản?',
  'sign_in': 'Đăng Nhập',
  'reset_password': 'Đặt Lại Mật Khẩu',
  'reset_password_desc': 'Nhập email để nhận liên kết đặt lại mật khẩu',
  'send_reset_link': 'Gửi Liên Kết',
  'back_to_login': 'Quay Lại Đăng Nhập',
  
  // Navigation
  'home': 'Trang Chủ',
  'notifications': 'Thông Báo',
  'profile': 'Hồ Sơ',
  'settings': 'Cài Đặt',
  
  // Home
  'dashboard': 'Bảng Điều Khiển',
  'quick_actions': 'Thao Tác Nhanh',
  'recent_activity': 'Hoạt Động Gần Đây',
  'view_all': 'Xem Tất Cả',
  
  // Notifications
  'all_notifications': 'Tất Cả',
  'unread': 'Chưa Đọc',
  'mark_as_read': 'Đánh Dấu Đã Đọc',
  'mark_all_as_read': 'Đánh Dấu Tất Cả Đã Đọc',
  'no_notifications': 'Không Có Thông Báo',
  
  // Profile
  'edit_profile': 'Chỉnh Sửa Hồ Sơ',
  'personal_info': 'Thông Tin Cá Nhân',
  'phone_number': 'Số Điện Thoại',
  'bio': 'Tiểu Sử',
  'save': 'Lưu',
  'cancel': 'Hủy',
  'account_stats': 'Thống Kê Tài Khoản',
  'member_since': 'Thành Viên Từ',
  'last_login': 'Đăng Nhập Lần Cuối',
  'active_devices': 'Thiết Bị Hoạt Động',
  'security_score': 'Điểm Bảo Mật',
  
  // Settings
  'account': 'Tài Khoản',
  'preferences': 'Tùy Chọn',
  'privacy_and_security': 'Quyền Riêng Tư & Bảo Mật',
  'support': 'Hỗ Trợ',
  'language': 'Ngôn Ngữ',
  'change_password': 'Đổi Mật Khẩu',
  'devices': 'Thiết Bị',
  'dark_mode': 'Chế Độ Tối',
  'email_notifications': 'Thông Báo Email',
  'push_notifications': 'Thông Báo Đẩy',
  'logout': 'Đăng Xuất',
  'version': 'Phiên Bản',
  
  // Change Password
  'current_password': 'Mật Khẩu Hiện Tại',
  'new_password': 'Mật Khẩu Mới',
  'confirm_new_password': 'Xác Nhận Mật Khẩu Mới',
  'password_requirements': 'Yêu Cầu Mật Khẩu',
  'at_least_8_characters': 'Ít nhất 8 ký tự',
  'one_uppercase': 'Một chữ hoa',
  'one_lowercase': 'Một chữ thường',
  'one_number': 'Một chữ số',
  
  // Devices
  'manage_devices': 'Quản Lý Thiết Bị',
  'current_device': 'Hiện Tại',
  'remove_device': 'Xóa Thiết Bị',
  'device_removed': 'Đã xóa thiết bị thành công',
  
  // Privacy
  'privacy_settings': 'Cài Đặt Quyền Riêng Tư',
  'security_settings': 'Cài Đặt Bảo Mật',
  'data_management': 'Quản Lý Dữ Liệu',
  'profile_visibility': 'Hiển Thị Hồ Sơ',
  'activity_status': 'Trạng Thái Hoạt Động',
  'data_collection': 'Thu Thập Dữ Liệu',
  'marketing_emails': 'Email Quảng Cáo',
  'two_factor_auth': 'Xác Thực Hai Yếu Tố',
  'biometric_auth': 'Xác Thực Sinh Trắc',
  'login_history': 'Lịch Sử Đăng Nhập',
  'download_your_data': 'Tải Dữ Liệu Của Bạn',
  'delete_account': 'Xóa Tài Khoản',
  'privacy_policy': 'Chính Sách Bảo Mật',
  
  // Help & Support
  'help_center': 'Trung Tâm Trợ Giúp',
  'faq': 'Câu Hỏi Thường Gặp',
  'whats_new': 'Có Gì Mới',
  'contact_support': 'Liên Hệ Hỗ Trợ',
  'search_faqs': 'Tìm Kiếm FAQ',
  'search_for_help': 'Tìm kiếm trợ giúp',
  'browse_by_category': 'Duyệt Theo Danh Mục',
  'was_this_helpful': 'Có hữu ích không?',
  'still_need_help': 'Vẫn cần trợ giúp?',
  
  // Common
  'loading': 'Đang tải...',
  'error': 'Lỗi',
  'success': 'Thành Công',
  'warning': 'Cảnh Báo',
  'info': 'Thông Tin',
  'ok': 'OK',
  'yes': 'Có',
  'no': 'Không',
  'confirm': 'Xác Nhận',
  'delete': 'Xóa',
  'edit': 'Chỉnh Sửa',
  'update': 'Cập Nhật',
  'search': 'Tìm Kiếm',
  'filter': 'Lọc',
  'sort': 'Sắp Xếp',
  
  // Validation
  'field_required': 'Trường này là bắt buộc',
  'invalid_email': 'Vui lòng nhập email hợp lệ',
  'password_too_short': 'Mật khẩu phải có ít nhất 8 ký tự',
  'passwords_do_not_match': 'Mật khẩu không khớp',
  
  // Messages
  'login_successful': 'Đăng nhập thành công',
  'login_failed': 'Đăng nhập thất bại',
  'registration_successful': 'Đăng ký thành công',
  'password_reset_sent': 'Đã gửi liên kết đặt lại mật khẩu',
  'profile_updated': 'Đã cập nhật hồ sơ thành công',
  'settings_saved': 'Đã lưu cài đặt',
  'something_went_wrong': 'Đã xảy ra lỗi',
  'coming_soon': 'Sắp ra mắt',
};

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) {
    return ['en', 'vi'].contains(locale.languageCode);
  }

  @override
  Future<AppLocalizations> load(Locale locale) async {
    return AppLocalizations(locale);
  }

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}
