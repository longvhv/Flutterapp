import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

import '../../../auth/presentation/bloc/auth_bloc.dart';

/// Settings Page sử dụng VHV Widgets
class SettingsPageVHV extends StatefulWidget {
  const SettingsPageVHV({super.key});

  @override
  State<SettingsPageVHV> createState() => _SettingsPageVHVState();
}

class _SettingsPageVHVState extends State<SettingsPageVHV> {
  bool _notificationsEnabled = true;
  bool _emailNotifications = true;
  bool _pushNotifications = false;
  bool _darkModeEnabled = false;

  @override
  Widget build(BuildContext context) {
    final user = context.select((AuthBloc bloc) {
      final state = bloc.state;
      return state is AuthAuthenticated ? state.user : null;
    });

    return VHVScaffold(
      body: CustomScrollView(
        slivers: [
          // App Bar với Gradient
          VHVSliverAppBar(
            expandedHeight: 200,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Color(0xFF6366F1),
                      Color(0xFF9333EA),
                      Color(0xFFEC4899),
                    ],
                  ),
                ),
                child: SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        const VHVText(
                          'Settings',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        VHVText(
                          user?.email ?? 'user@example.com',
                          style: const TextStyle(
                            color: Colors.white70,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),

          // Settings Content
          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                // Account Section
                _buildSectionHeader('Account'),
                VHVCard(
                  padding: EdgeInsets.zero,
                  child: Column(
                    children: [
                      _buildSettingItem(
                        icon: Icons.person_outline,
                        title: 'Profile',
                        subtitle: 'Manage your personal information',
                        onTap: () => context.push('/profile'),
                        color: const Color(0xFF3B82F6),
                      ),
                      const Divider(height: 1),
                      _buildSettingItem(
                        icon: Icons.lock_outline,
                        title: 'Change Password',
                        subtitle: 'Update your password',
                        onTap: () => context.push('/change-password'),
                        color: const Color(0xFF9333EA),
                      ),
                      const Divider(height: 1),
                      _buildSettingItem(
                        icon: Icons.devices,
                        title: 'Devices',
                        subtitle: 'Manage your devices',
                        onTap: () => context.push('/devices'),
                        color: const Color(0xFF10B981),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Preferences Section
                _buildSectionHeader('Preferences'),
                VHVCard(
                  padding: EdgeInsets.zero,
                  child: Column(
                    children: [
                      _buildSwitchItem(
                        icon: Icons.notifications_outlined,
                        title: 'Notifications',
                        subtitle: 'Enable all notifications',
                        value: _notificationsEnabled,
                        onChanged: (value) {
                          setState(() => _notificationsEnabled = value);
                        },
                        color: const Color(0xFFF59E0B),
                      ),
                      const Divider(height: 1),
                      _buildSwitchItem(
                        icon: Icons.email_outlined,
                        title: 'Email Notifications',
                        subtitle: 'Receive updates via email',
                        value: _emailNotifications,
                        onChanged: (value) {
                          setState(() => _emailNotifications = value);
                        },
                        color: const Color(0xFF3B82F6),
                      ),
                      const Divider(height: 1),
                      _buildSwitchItem(
                        icon: Icons.phone_android,
                        title: 'Push Notifications',
                        subtitle: 'Receive push notifications',
                        value: _pushNotifications,
                        onChanged: (value) {
                          setState(() => _pushNotifications = value);
                        },
                        color: const Color(0xFFEC4899),
                      ),
                      const Divider(height: 1),
                      _buildSwitchItem(
                        icon: Icons.dark_mode_outlined,
                        title: 'Dark Mode',
                        subtitle: 'Enable dark theme',
                        value: _darkModeEnabled,
                        onChanged: (value) {
                          setState(() => _darkModeEnabled = value);
                        },
                        color: const Color(0xFF6366F1),
                      ),
                      const Divider(height: 1),
                      _buildSettingItem(
                        icon: Icons.language,
                        title: 'Language',
                        subtitle: 'English',
                        onTap: () => context.push('/language'),
                        color: const Color(0xFF10B981),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Privacy & Security Section
                _buildSectionHeader('Privacy & Security'),
                VHVCard(
                  padding: EdgeInsets.zero,
                  child: Column(
                    children: [
                      _buildSettingItem(
                        icon: Icons.security,
                        title: 'Privacy Settings',
                        subtitle: 'Control your privacy',
                        onTap: () => context.push('/privacy'),
                        color: const Color(0xFFF97316),
                      ),
                      const Divider(height: 1),
                      _buildSettingItem(
                        icon: Icons.shield_outlined,
                        title: 'Two-Factor Authentication',
                        subtitle: 'Add an extra layer of security',
                        onTap: () {
                          VHVToast.show(
                            context: context,
                            message: 'Feature coming soon',
                            type: VHVToastType.info,
                          );
                        },
                        color: const Color(0xFF10B981),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Support Section
                _buildSectionHeader('Support'),
                VHVCard(
                  padding: EdgeInsets.zero,
                  child: Column(
                    children: [
                      _buildSettingItem(
                        icon: Icons.help_outline,
                        title: 'Help Center',
                        subtitle: 'Get help and support',
                        onTap: () => context.push('/help'),
                        color: const Color(0xFF3B82F6),
                      ),
                      const Divider(height: 1),
                      _buildSettingItem(
                        icon: Icons.question_answer_outlined,
                        title: 'FAQ',
                        subtitle: 'Frequently asked questions',
                        onTap: () => context.push('/faq'),
                        color: const Color(0xFF9333EA),
                      ),
                      const Divider(height: 1),
                      _buildSettingItem(
                        icon: Icons.new_releases_outlined,
                        title: "What's New",
                        subtitle: 'Check out new features',
                        onTap: () => context.push('/whats-new'),
                        color: const Color(0xFFF59E0B),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Logout Button
                VHVButton(
                  onPressed: () {
                    VHVDialog.show(
                      context: context,
                      title: 'Logout',
                      content: 'Are you sure you want to logout?',
                      actions: [
                        VHVTextButton(
                          onPressed: () => Navigator.pop(context),
                          child: const VHVText('Cancel'),
                        ),
                        VHVButton(
                          onPressed: () {
                            context.read<AuthBloc>().add(AuthLogoutRequested());
                            context.go('/login');
                          },
                          child: const VHVText('Logout'),
                        ),
                      ],
                    );
                  },
                  width: double.infinity,
                  height: 56,
                  backgroundColor: const Color(0xFFEF4444),
                  borderRadius: BorderRadius.circular(12),
                  child: const VHVText(
                    'Logout',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // App Version
                Center(
                  child: VHVText(
                    'Version 1.0.0',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey.shade500,
                    ),
                  ),
                ),
                const SizedBox(height: 32),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: 12),
      child: VHVText(
        title,
        style: const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: Color(0xFF6B7280),
        ),
      ),
    );
  }

  Widget _buildSettingItem({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
    required Color color,
  }) {
    return VHVListTile(
      leading: VHVAvatar(
        radius: 20,
        backgroundColor: color.withOpacity(0.1),
        child: Icon(icon, color: color, size: 20),
      ),
      title: VHVText(
        title,
        style: const TextStyle(fontWeight: FontWeight.w500),
      ),
      subtitle: VHVText(
        subtitle,
        style: const TextStyle(fontSize: 12),
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }

  Widget _buildSwitchItem({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
    required Color color,
  }) {
    return VHVListTile(
      leading: VHVAvatar(
        radius: 20,
        backgroundColor: color.withOpacity(0.1),
        child: Icon(icon, color: color, size: 20),
      ),
      title: VHVText(
        title,
        style: const TextStyle(fontWeight: FontWeight.w500),
      ),
      subtitle: VHVText(
        subtitle,
        style: const TextStyle(fontSize: 12),
      ),
      trailing: VHVSwitch(
        value: value,
        onChanged: onChanged,
      ),
    );
  }
}
