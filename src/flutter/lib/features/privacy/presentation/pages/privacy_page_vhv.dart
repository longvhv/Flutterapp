import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// Privacy Page sử dụng Material Widgets
class PrivacyPageVHV extends StatefulWidget {
  const PrivacyPageVHV({super.key});

  @override
  State<PrivacyPageVHV> createState() => _PrivacyPageVHVState();
}

class _PrivacyPageVHVState extends State<PrivacyPageVHV> {
  bool _profileVisibility = true;
  bool _activityStatus = true;
  bool _dataCollection = false;
  bool _marketingEmails = false;
  bool _twoFactorAuth = true;
  bool _biometricAuth = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFFEF4444),
              Color(0xFFF97316),
              Color(0xFFF59E0B),
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // Header
              Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_back, color: Colors.white),
                      onPressed: () => context.pop(),
                    ),
                    const SizedBox(width: 12),
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Privacy & Security',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          'Manage your privacy settings',
                          style: TextStyle(
                            color: Colors.white70,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              // Content
              Expanded(
                child: Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(24),
                      topRight: Radius.circular(24),
                    ),
                  ),
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Privacy Settings
                        const Text(
                          'Privacy Settings',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Card(
                          child: Column(
                            children: [
                              _buildSwitchTile(
                                icon: Icons.visibility_outlined,
                                title: 'Profile Visibility',
                                subtitle: 'Make your profile visible to others',
                                value: _profileVisibility,
                                onChanged: (value) {
                                  setState(() => _profileVisibility = value);
                                },
                                color: const Color(0xFF3B82F6),
                              ),
                              const Divider(height: 1),
                              _buildSwitchTile(
                                icon: Icons.radio_button_checked,
                                title: 'Activity Status',
                                subtitle: 'Show when you\'re active',
                                value: _activityStatus,
                                onChanged: (value) {
                                  setState(() => _activityStatus = value);
                                },
                                color: const Color(0xFF10B981),
                              ),
                              const Divider(height: 1),
                              _buildSwitchTile(
                                icon: Icons.analytics_outlined,
                                title: 'Data Collection',
                                subtitle: 'Allow analytics and tracking',
                                value: _dataCollection,
                                onChanged: (value) {
                                  setState(() => _dataCollection = value);
                                },
                                color: const Color(0xFF9333EA),
                              ),
                              const Divider(height: 1),
                              _buildSwitchTile(
                                icon: Icons.email_outlined,
                                title: 'Marketing Emails',
                                subtitle: 'Receive promotional emails',
                                value: _marketingEmails,
                                onChanged: (value) {
                                  setState(() => _marketingEmails = value);
                                },
                                color: const Color(0xFFF59E0B),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),

                        // Security Settings
                        const Text(
                          'Security Settings',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Card(
                          child: Column(
                            children: [
                              _buildSwitchTile(
                                icon: Icons.shield_outlined,
                                title: 'Two-Factor Authentication',
                                subtitle: 'Add extra security to your account',
                                value: _twoFactorAuth,
                                onChanged: (value) {
                                  setState(() => _twoFactorAuth = value);
                                },
                                color: const Color(0xFF10B981),
                              ),
                              const Divider(height: 1),
                              _buildSwitchTile(
                                icon: Icons.fingerprint,
                                title: 'Biometric Authentication',
                                subtitle: 'Use fingerprint or face recognition',
                                value: _biometricAuth,
                                onChanged: (value) {
                                  setState(() => _biometricAuth = value);
                                },
                                color: const Color(0xFF8B5CF6),
                              ),
                              const Divider(height: 1),
                              _buildSettingTile(
                                icon: Icons.history,
                                title: 'Login History',
                                subtitle: 'View recent login activity',
                                onTap: () {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: const Text('Feature coming soon'),
                                      backgroundColor: Colors.blue,
                                      behavior: SnackBarBehavior.floating,
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                    ),
                                  );
                                },
                                color: const Color(0xFF3B82F6),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),

                        // Data Management
                        const Text(
                          'Data Management',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Card(
                          child: Column(
                            children: [
                              _buildSettingTile(
                                icon: Icons.download_outlined,
                                title: 'Download Your Data',
                                subtitle: 'Get a copy of your information',
                                onTap: () {
                                  _showDownloadDialog();
                                },
                                color: const Color(0xFF3B82F6),
                              ),
                              const Divider(height: 1),
                              _buildSettingTile(
                                icon: Icons.delete_outline,
                                title: 'Delete Account',
                                subtitle: 'Permanently delete your account',
                                onTap: () {
                                  _showDeleteAccountDialog();
                                },
                                color: const Color(0xFFEF4444),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),

                        // Privacy Policy
                        Card(
                          color: Colors.blue.shade50,
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Row(
                              children: [
                                Icon(
                                  Icons.info_outline,
                                  color: Colors.blue.shade700,
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'Privacy Policy',
                                        style: TextStyle(
                                          fontWeight: FontWeight.w600,
                                          color: Colors.blue.shade900,
                                        ),
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        'Learn how we collect, use, and protect your data',
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.blue.shade700,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                IconButton(
                                  icon: Icon(
                                    Icons.arrow_forward,
                                    color: Colors.blue.shade700,
                                  ),
                                  onPressed: () {
                                    // Open privacy policy
                                  },
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSwitchTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
    required Color color,
  }) {
    return ListTile(
      leading: CircleAvatar(
        radius: 20,
        backgroundColor: color.withOpacity(0.1),
        child: Icon(icon, color: color, size: 20),
      ),
      title: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.w500),
      ),
      subtitle: Text(
        subtitle,
        style: const TextStyle(fontSize: 12),
      ),
      trailing: Switch(
        value: value,
        onChanged: onChanged,
      ),
    );
  }

  Widget _buildSettingTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
    required Color color,
  }) {
    return ListTile(
      leading: CircleAvatar(
        radius: 20,
        backgroundColor: color.withOpacity(0.1),
        child: Icon(icon, color: color, size: 20),
      ),
      title: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.w500),
      ),
      subtitle: Text(
        subtitle,
        style: const TextStyle(fontSize: 12),
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }

  void _showDownloadDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Download Your Data'),
        content: const Text('We\'ll prepare your data and send you a download link via email within 48 hours.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: const Text('Download request submitted'),
                  backgroundColor: Colors.green,
                  behavior: SnackBarBehavior.floating,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                ),
              );
            },
            child: const Text('Request Download'),
          ),
        ],
      ),
    );
  }

  void _showDeleteAccountDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Account'),
        content: const Text('Are you sure? This action cannot be undone. All your data will be permanently deleted.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: const Text('Account deletion cancelled'),
                  backgroundColor: Colors.blue,
                  behavior: SnackBarBehavior.floating,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                ),
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFEF4444),
              foregroundColor: Colors.white,
            ),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }
}
