import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

/// Help Center Page sử dụng VHV Widgets
class HelpCenterPageVHV extends StatefulWidget {
  const HelpCenterPageVHV({super.key});

  @override
  State<HelpCenterPageVHV> createState() => _HelpCenterPageVHVState();
}

class _HelpCenterPageVHVState extends State<HelpCenterPageVHV> {
  final List<HelpCategory> _categories = [
    HelpCategory(
      icon: Icons.account_circle,
      title: 'Account',
      description: 'Manage your account settings',
      color: const Color(0xFF3B82F6),
      articles: 12,
    ),
    HelpCategory(
      icon: Icons.security,
      title: 'Security & Privacy',
      description: 'Keep your account secure',
      color: const Color(0xFFEF4444),
      articles: 8,
    ),
    HelpCategory(
      icon: Icons.payment,
      title: 'Billing',
      description: 'Payment and subscription help',
      color: const Color(0xFF10B981),
      articles: 6,
    ),
    HelpCategory(
      icon: Icons.settings,
      title: 'Settings',
      description: 'Customize your experience',
      color: const Color(0xFF8B5CF6),
      articles: 10,
    ),
    HelpCategory(
      icon: Icons.bug_report,
      title: 'Troubleshooting',
      description: 'Fix common issues',
      color: const Color(0xFFF59E0B),
      articles: 15,
    ),
    HelpCategory(
      icon: Icons.extension,
      title: 'Features',
      description: 'Learn about our features',
      color: const Color(0xFF06B6D4),
      articles: 20,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF3B82F6),
              Color(0xFF8B5CF6),
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
                child: Column(
                  children: [
                    Row(
                      children: [
                        VHVIconButton(
                          icon: const Icon(Icons.arrow_back, color: Colors.white),
                          onPressed: () => context.pop(),
                        ),
                        const Spacer(),
                        VHVIconButton(
                          icon: const Icon(Icons.mail_outline, color: Colors.white),
                          onPressed: () {
                            _showContactSupport();
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    const VHVText(
                      'How can we help?',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Search Bar
                    VHVTextField(
                      prefixIcon: const Icon(Icons.search),
                      label: 'Search for help',
                      fillColor: Colors.white,
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
                        // Quick Actions
                        const VHVText(
                          'Quick Actions',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        VHVGridView(
                          crossAxisCount: 2,
                          mainAxisSpacing: 12,
                          crossAxisSpacing: 12,
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          children: [
                            _buildQuickAction(
                              icon: Icons.chat_bubble_outline,
                              title: 'Live Chat',
                              onTap: () {
                                VHVToast.show(
                                  context: context,
                                  message: 'Chat feature coming soon',
                                  type: VHVToastType.info,
                                );
                              },
                              color: const Color(0xFF3B82F6),
                            ),
                            _buildQuickAction(
                              icon: Icons.question_answer,
                              title: 'FAQ',
                              onTap: () => context.push('/faq'),
                              color: const Color(0xFF9333EA),
                            ),
                          ],
                        ),
                        const SizedBox(height: 32),

                        // Categories
                        const VHVText(
                          'Browse by Category',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        VHVListView(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: _categories.length,
                          itemBuilder: (context, index) {
                            final category = _categories[index];
                            return VHVCard(
                              margin: const EdgeInsets.only(bottom: 12),
                              padding: const EdgeInsets.all(16),
                              onTap: () {
                                VHVToast.show(
                                  context: context,
                                  message: '${category.title} articles coming soon',
                                  type: VHVToastType.info,
                                );
                              },
                              child: Row(
                                children: [
                                  VHVAvatar(
                                    radius: 28,
                                    backgroundColor: category.color.withOpacity(0.1),
                                    child: Icon(
                                      category.icon,
                                      color: category.color,
                                      size: 28,
                                    ),
                                  ),
                                  const SizedBox(width: 16),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        VHVText(
                                          category.title,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        VHVText(
                                          category.description,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.grey.shade600,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        VHVText(
                                          '${category.articles} articles',
                                          style: TextStyle(
                                            fontSize: 11,
                                            color: category.color,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Icon(
                                    Icons.chevron_right,
                                    color: Colors.grey.shade400,
                                  ),
                                ],
                              ),
                            );
                          },
                        ),

                        const SizedBox(height: 32),

                        // Contact Support Card
                        VHVCard(
                          padding: const EdgeInsets.all(20),
                          gradient: const LinearGradient(
                            colors: [Color(0xFF3B82F6), Color(0xFF8B5CF6)],
                          ),
                          child: Column(
                            children: [
                              const Icon(
                                Icons.support_agent,
                                color: Colors.white,
                                size: 48,
                              ),
                              const SizedBox(height: 16),
                              const VHVText(
                                'Still need help?',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 8),
                              const VHVText(
                                'Contact our support team',
                                style: TextStyle(
                                  color: Colors.white70,
                                  fontSize: 14,
                                ),
                              ),
                              const SizedBox(height: 16),
                              VHVButton(
                                onPressed: _showContactSupport,
                                backgroundColor: Colors.white,
                                borderRadius: BorderRadius.circular(12),
                                height: 48,
                                child: const VHVText(
                                  'Contact Support',
                                  style: TextStyle(
                                    color: Color(0xFF3B82F6),
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ],
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

  Widget _buildQuickAction({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    required Color color,
  }) {
    return VHVCard(
      padding: const EdgeInsets.all(20),
      onTap: onTap,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          VHVAvatar(
            radius: 32,
            backgroundColor: color.withOpacity(0.1),
            child: Icon(icon, color: color, size: 32),
          ),
          const SizedBox(height: 12),
          VHVText(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w600,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  void _showContactSupport() {
    VHVDialog.show(
      context: context,
      title: 'Contact Support',
      content: 'Choose how you\'d like to contact us:',
      actions: [
        VHVButton(
          onPressed: () {
            Navigator.pop(context);
            VHVToast.show(
              context: context,
              message: 'Opening email client...',
              type: VHVToastType.info,
            );
          },
          child: const VHVText('Email', style: TextStyle(color: Colors.white)),
        ),
        VHVButton(
          onPressed: () {
            Navigator.pop(context);
            VHVToast.show(
              context: context,
              message: 'Starting chat...',
              type: VHVToastType.info,
            );
          },
          child: const VHVText('Chat', style: TextStyle(color: Colors.white)),
        ),
      ],
    );
  }
}

// Help Category Model
class HelpCategory {
  final IconData icon;
  final String title;
  final String description;
  final Color color;
  final int articles;

  HelpCategory({
    required this.icon,
    required this.title,
    required this.description,
    required this.color,
    required this.articles,
  });
}
