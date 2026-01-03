import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

/// What's New Page sử dụng VHV Widgets
class WhatsNewPageVHV extends StatelessWidget {
  const WhatsNewPageVHV({super.key});

  @override
  Widget build(BuildContext context) {
    final releases = [
      Release(
        version: '1.2.0',
        date: DateTime(2024, 1, 15),
        features: [
          Feature(
            title: 'Dark Mode',
            description: 'Now you can switch to dark mode for better viewing at night',
            icon: Icons.dark_mode,
            color: const Color(0xFF6366F1),
          ),
          Feature(
            title: 'Biometric Authentication',
            description: 'Login with fingerprint or face recognition',
            icon: Icons.fingerprint,
            color: const Color(0xFF10B981),
          ),
          Feature(
            title: 'Performance Improvements',
            description: 'The app is now 50% faster with optimized code',
            icon: Icons.speed,
            color: const Color(0xFFF59E0B),
          ),
        ],
      ),
      Release(
        version: '1.1.0',
        date: DateTime(2023, 12, 1),
        features: [
          Feature(
            title: 'Multi-language Support',
            description: 'App now available in 8 languages including Vietnamese',
            icon: Icons.language,
            color: const Color(0xFF3B82F6),
          ),
          Feature(
            title: 'Enhanced Security',
            description: 'Two-factor authentication and advanced encryption',
            icon: Icons.security,
            color: const Color(0xFFEF4444),
          ),
          Feature(
            title: 'Bug Fixes',
            description: 'Fixed issues with notifications and profile sync',
            icon: Icons.bug_report,
            color: const Color(0xFF8B5CF6),
          ),
        ],
      ),
      Release(
        version: '1.0.0',
        date: DateTime(2023, 10, 15),
        features: [
          Feature(
            title: 'Initial Release',
            description: 'First version with core features',
            icon: Icons.rocket_launch,
            color: const Color(0xFFEC4899),
          ),
          Feature(
            title: 'User Dashboard',
            description: 'Beautiful and intuitive dashboard',
            icon: Icons.dashboard,
            color: const Color(0xFF06B6D4),
          ),
          Feature(
            title: 'Notifications',
            description: 'Real-time push notifications',
            icon: Icons.notifications,
            color: const Color(0xFFF97316),
          ),
        ],
      ),
    ];

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFFF59E0B),
              Color(0xFFF97316),
              Color(0xFFEC4899),
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
                    VHVIconButton(
                      icon: const Icon(Icons.arrow_back, color: Colors.white),
                      onPressed: () => context.pop(),
                    ),
                    const SizedBox(width: 12),
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        VHVText(
                          "What's New",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        VHVText(
                          'Latest features and updates',
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

              // Releases Timeline
              Expanded(
                child: Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(24),
                      topRight: Radius.circular(24),
                    ),
                  ),
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: releases.length,
                    itemBuilder: (context, index) {
                      final release = releases[index];
                      final isLatest = index == 0;

                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Version Header
                          Row(
                            children: [
                              VHVAvatar(
                                radius: 20,
                                backgroundColor: isLatest
                                    ? const Color(0xFF10B981)
                                    : Colors.grey.shade200,
                                child: Icon(
                                  Icons.auto_awesome,
                                  color: isLatest ? Colors.white : Colors.grey.shade600,
                                  size: 20,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      VHVText(
                                        'Version ${release.version}',
                                        style: const TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      if (isLatest) ...[
                                        const SizedBox(width: 8),
                                        VHVChip(
                                          label: 'Latest',
                                          backgroundColor: const Color(0xFF10B981),
                                          textColor: Colors.white,
                                          size: VHVChipSize.small,
                                        ),
                                      ],
                                    ],
                                  ),
                                  const SizedBox(height: 4),
                                  VHVText(
                                    _formatDate(release.date),
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.grey.shade600,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),

                          // Features
                          ...release.features.map((feature) {
                            return VHVCard(
                              margin: const EdgeInsets.only(bottom: 12),
                              padding: const EdgeInsets.all(16),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  VHVAvatar(
                                    radius: 24,
                                    backgroundColor: feature.color.withOpacity(0.1),
                                    child: Icon(
                                      feature.icon,
                                      color: feature.color,
                                      size: 24,
                                    ),
                                  ),
                                  const SizedBox(width: 16),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        VHVText(
                                          feature.title,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        VHVText(
                                          feature.description,
                                          style: TextStyle(
                                            fontSize: 14,
                                            color: Colors.grey.shade700,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            );
                          }).toList(),

                          if (index < releases.length - 1) ...[
                            const SizedBox(height: 24),
                            const Divider(),
                            const SizedBox(height: 24),
                          ],
                        ],
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _formatDate(DateTime date) {
    final months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return '${months[date.month - 1]} ${date.day}, ${date.year}';
  }
}

// Release Model
class Release {
  final String version;
  final DateTime date;
  final List<Feature> features;

  Release({
    required this.version,
    required this.date,
    required this.features,
  });
}

// Feature Model
class Feature {
  final String title;
  final String description;
  final IconData icon;
  final Color color;

  Feature({
    required this.title,
    required this.description,
    required this.icon,
    required this.color,
  });
}
