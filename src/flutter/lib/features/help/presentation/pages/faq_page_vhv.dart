import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// FAQ Page sử dụng Material Widgets
class FaqPageVHV extends StatefulWidget {
  const FaqPageVHV({super.key});

  @override
  State<FaqPageVHV> createState() => _FaqPageVHVState();
}

class _FaqPageVHVState extends State<FaqPageVHV> {
  final List<FAQItem> _faqs = [
    FAQItem(
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button on the login page. Fill in your details including name, email, and password. You\'ll receive a confirmation email to verify your account.',
      category: 'Account',
    ),
    FAQItem(
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link. Follow the link to create a new password.',
      category: 'Account',
    ),
    FAQItem(
      question: 'Is my data secure?',
      answer: 'Yes! We use industry-standard encryption to protect your data. All sensitive information is encrypted both in transit and at rest. We also offer two-factor authentication for additional security.',
      category: 'Security',
    ),
    FAQItem(
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to Settings > Privacy & Security > Two-Factor Authentication. Toggle the switch to enable it. You\'ll need to set up an authenticator app on your phone.',
      category: 'Security',
    ),
    FAQItem(
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment partners.',
      category: 'Billing',
    ),
    FAQItem(
      question: 'Can I change my subscription plan?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time from Settings > Billing. Changes will be reflected in your next billing cycle.',
      category: 'Billing',
    ),
    FAQItem(
      question: 'How do I change the app language?',
      answer: 'Go to Settings > Language and select your preferred language from the list. The app will update immediately.',
      category: 'Settings',
    ),
    FAQItem(
      question: 'Can I use the app on multiple devices?',
      answer: 'Yes! You can use your account on multiple devices. Go to Settings > Devices to manage your active devices.',
      category: 'Settings',
    ),
  ];

  String? _expandedQuestion;
  String _searchQuery = '';

  List<FAQItem> get _filteredFaqs {
    if (_searchQuery.isEmpty) return _faqs;
    return _faqs.where((faq) {
      return faq.question.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          faq.category.toLowerCase().contains(_searchQuery.toLowerCase());
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF9333EA),
              Color(0xFFEC4899),
              Color(0xFFF97316),
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
                        IconButton(
                          icon: const Icon(Icons.arrow_back, color: Colors.white),
                          onPressed: () => context.pop(),
                        ),
                        const SizedBox(width: 12),
                        const Text(
                          'Frequently Asked Questions',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Search Bar
                    TextField(
                      decoration: InputDecoration(
                        prefixIcon: const Icon(Icons.search),
                        labelText: 'Search FAQs',
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      onChanged: (value) {
                        setState(() => _searchQuery = value);
                      },
                    ),
                  ],
                ),
              ),

              // FAQs List
              Expanded(
                child: Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(24),
                      topRight: Radius.circular(24),
                    ),
                  ),
                  child: _filteredFaqs.isEmpty
                      ? Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.search_off,
                                size: 64,
                                color: Colors.grey.shade400,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'No results found',
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Colors.grey.shade600,
                                ),
                              ),
                            ],
                          ),
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.all(16),
                          itemCount: _filteredFaqs.length,
                          itemBuilder: (context, index) {
                            final faq = _filteredFaqs[index];
                            final isExpanded = _expandedQuestion == faq.question;

                            return Card(
                              margin: const EdgeInsets.only(bottom: 12),
                              child: ExpansionTile(
                                title: Text(
                                  faq.question,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                leading: CircleAvatar(
                                  radius: 20,
                                  backgroundColor: _getCategoryColor(faq.category).withOpacity(0.1),
                                  child: Icon(
                                    _getCategoryIcon(faq.category),
                                    color: _getCategoryColor(faq.category),
                                    size: 20,
                                  ),
                                ),
                                trailing: Icon(
                                  isExpanded
                                      ? Icons.keyboard_arrow_up
                                      : Icons.keyboard_arrow_down,
                                ),
                                initiallyExpanded: isExpanded,
                                onExpansionChanged: (expanded) {
                                  setState(() {
                                    _expandedQuestion = expanded ? faq.question : null;
                                  });
                                },
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Divider(),
                                        const SizedBox(height: 12),
                                        Text(
                                          faq.answer,
                                          style: TextStyle(
                                            fontSize: 14,
                                            color: Colors.grey.shade700,
                                            height: 1.5,
                                          ),
                                        ),
                                        const SizedBox(height: 12),
                                        Chip(
                                          label: Text(
                                            faq.category,
                                            style: TextStyle(
                                              color: _getCategoryColor(faq.category),
                                              fontSize: 11,
                                            ),
                                          ),
                                          backgroundColor: _getCategoryColor(faq.category).withOpacity(0.1),
                                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 0),
                                          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                        ),
                                        const SizedBox(height: 12),
                                        Row(
                                          children: [
                                            Text(
                                              'Was this helpful?',
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Colors.grey.shade600,
                                              ),
                                            ),
                                            const SizedBox(width: 12),
                                            IconButton(
                                              icon: Icon(
                                                Icons.thumb_up_outlined,
                                                size: 16,
                                                color: Colors.grey.shade600,
                                              ),
                                              onPressed: () {
                                                ScaffoldMessenger.of(context).showSnackBar(
                                                  SnackBar(
                                                    content: const Text('Thanks for your feedback!'),
                                                    backgroundColor: Colors.green,
                                                    behavior: SnackBarBehavior.floating,
                                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                                  ),
                                                );
                                              },
                                            ),
                                            IconButton(
                                              icon: Icon(
                                                Icons.thumb_down_outlined,
                                                size: 16,
                                                color: Colors.grey.shade600,
                                              ),
                                              onPressed: () {
                                                ScaffoldMessenger.of(context).showSnackBar(
                                                  SnackBar(
                                                    content: const Text('We\'ll improve this answer'),
                                                    backgroundColor: Colors.blue,
                                                    behavior: SnackBarBehavior.floating,
                                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                                  ),
                                                );
                                              },
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.push('/help');
        },
        backgroundColor: const Color(0xFF9333EA),
        child: const Icon(Icons.help_outline, color: Colors.white),
      ),
    );
  }

  IconData _getCategoryIcon(String category) {
    switch (category) {
      case 'Account':
        return Icons.account_circle;
      case 'Security':
        return Icons.security;
      case 'Billing':
        return Icons.payment;
      case 'Settings':
        return Icons.settings;
      default:
        return Icons.help_outline;
    }
  }

  Color _getCategoryColor(String category) {
    switch (category) {
      case 'Account':
        return const Color(0xFF3B82F6);
      case 'Security':
        return const Color(0xFFEF4444);
      case 'Billing':
        return const Color(0xFF10B981);
      case 'Settings':
        return const Color(0xFF8B5CF6);
      default:
        return Colors.grey;
    }
  }
}

// FAQ Item Model
class FAQItem {
  final String question;
  final String answer;
  final String category;

  FAQItem({
    required this.question,
    required this.answer,
    required this.category,
  });
}
