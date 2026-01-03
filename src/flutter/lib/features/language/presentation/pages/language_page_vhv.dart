import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

/// Language Page sử dụng VHV Widgets
class LanguagePageVHV extends StatefulWidget {
  const LanguagePageVHV({super.key});

  @override
  State<LanguagePageVHV> createState() => _LanguagePageVHVState();
}

class _LanguagePageVHVState extends State<LanguagePageVHV> {
  String _selectedLanguage = 'en';

  final List<LanguageOption> _languages = [
    LanguageOption(
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
    ),
    LanguageOption(
      code: 'vi',
      name: 'Vietnamese',
      nativeName: 'Tiếng Việt',
      flag: '🇻🇳',
    ),
    LanguageOption(
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
    ),
    LanguageOption(
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
    ),
    LanguageOption(
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
    ),
    LanguageOption(
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
    ),
    LanguageOption(
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
    ),
    LanguageOption(
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
    ),
  ];

  void _selectLanguage(String code) {
    setState(() => _selectedLanguage = code);
    VHVToast.show(
      context: context,
      message: 'Language changed to ${_languages.firstWhere((l) => l.code == code).name}',
      type: VHVToastType.success,
    );
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
              Color(0xFF10B981),
              Color(0xFF06B6D4),
              Color(0xFF3B82F6),
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
                          'Language',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        VHVText(
                          'Choose your preferred language',
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
                  child: Column(
                    children: [
                      const SizedBox(height: 16),

                      // Search Bar
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: VHVTextField(
                          prefixIcon: const Icon(Icons.search),
                          label: 'Search languages',
                          onChanged: (value) {
                            // Implement search
                          },
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Languages List
                      Expanded(
                        child: VHVListView(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          itemCount: _languages.length,
                          itemBuilder: (context, index) {
                            final language = _languages[index];
                            final isSelected = _selectedLanguage == language.code;

                            return VHVCard(
                              margin: const EdgeInsets.only(bottom: 12),
                              padding: const EdgeInsets.all(16),
                              backgroundColor: isSelected
                                  ? const Color(0xFF3B82F6).withOpacity(0.1)
                                  : Colors.white,
                              onTap: () => _selectLanguage(language.code),
                              child: Row(
                                children: [
                                  // Flag
                                  VHVText(
                                    language.flag,
                                    style: const TextStyle(fontSize: 32),
                                  ),
                                  const SizedBox(width: 16),

                                  // Language Info
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        VHVText(
                                          language.name,
                                          style: TextStyle(
                                            fontWeight: isSelected
                                                ? FontWeight.bold
                                                : FontWeight.w500,
                                            color: isSelected
                                                ? const Color(0xFF3B82F6)
                                                : Colors.black,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        VHVText(
                                          language.nativeName,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: isSelected
                                                ? const Color(0xFF3B82F6).withOpacity(0.7)
                                                : Colors.grey.shade600,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),

                                  // Selected Indicator
                                  if (isSelected)
                                    const Icon(
                                      Icons.check_circle,
                                      color: Color(0xFF3B82F6),
                                      size: 24,
                                    )
                                  else
                                    Icon(
                                      Icons.circle_outlined,
                                      color: Colors.grey.shade300,
                                      size: 24,
                                    ),
                                ],
                              ),
                            );
                          },
                        ),
                      ),

                      // Apply Button
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: VHVButton(
                          onPressed: () {
                            context.pop();
                          },
                          width: double.infinity,
                          height: 56,
                          gradient: const LinearGradient(
                            colors: [Color(0xFF10B981), Color(0xFF3B82F6)],
                          ),
                          borderRadius: BorderRadius.circular(12),
                          child: const VHVText(
                            'Apply Changes',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Language Option Model
class LanguageOption {
  final String code;
  final String name;
  final String nativeName;
  final String flag;

  LanguageOption({
    required this.code,
    required this.name,
    required this.nativeName,
    required this.flag,
  });
}
