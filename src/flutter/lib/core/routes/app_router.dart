import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/presentation/pages/login_page_vhv.dart';
import '../../features/auth/presentation/pages/register_page_vhv.dart';
import '../../features/auth/presentation/pages/forgot_password_page_vhv.dart';
import '../../features/home/presentation/pages/home_page_vhv.dart';
import '../../features/notifications/presentation/pages/notifications_page_vhv.dart';
import '../../features/settings/presentation/pages/settings_page_vhv.dart';
import '../../features/profile/presentation/pages/profile_page_vhv.dart';
import '../../features/profile/presentation/pages/change_password_page_vhv.dart';
import '../../features/devices/presentation/pages/devices_page_vhv.dart';
import '../../features/privacy/presentation/pages/privacy_page_vhv.dart';
import '../../features/language/presentation/pages/language_page_vhv.dart';
import '../../features/help/presentation/pages/help_center_page_vhv.dart';
import '../../features/help/presentation/pages/faq_page_vhv.dart';
import '../../features/help/presentation/pages/whats_new_page_vhv.dart';
import '../widgets/vhv_bottom_nav.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/login',
    routes: [
      // Auth Routes - Sử dụng VHV Pages
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginPageVHV(),
      ),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterPageVHV(),
      ),
      GoRoute(
        path: '/forgot-password',
        builder: (context, state) => const ForgotPasswordPageVHV(),
      ),
      
      // Main Routes with VHV Bottom Navigation
      ShellRoute(
        builder: (context, state, child) {
          return VHVBottomNavScaffold(child: child);
        },
        routes: [
          GoRoute(
            path: '/home',
            builder: (context, state) => const HomePageVHV(),
          ),
          GoRoute(
            path: '/notifications',
            builder: (context, state) => const NotificationsPageVHV(),
          ),
          GoRoute(
            path: '/settings',
            builder: (context, state) => const SettingsPageVHV(),
          ),
        ],
      ),
      
      // Profile Routes
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfilePageVHV(),
      ),
      GoRoute(
        path: '/change-password',
        builder: (context, state) => const ChangePasswordPageVHV(),
      ),
      
      // Settings Routes
      GoRoute(
        path: '/devices',
        builder: (context, state) => const DevicesPageVHV(),
      ),
      GoRoute(
        path: '/privacy',
        builder: (context, state) => const PrivacyPageVHV(),
      ),
      GoRoute(
        path: '/language',
        builder: (context, state) => const LanguagePageVHV(),
      ),
      
      // Help Routes
      GoRoute(
        path: '/help',
        builder: (context, state) => const HelpCenterPageVHV(),
      ),
      GoRoute(
        path: '/faq',
        builder: (context, state) => const FaqPageVHV(),
      ),
      GoRoute(
        path: '/whats-new',
        builder: (context, state) => const WhatsNewPageVHV(),
      ),
    ],
  );
}