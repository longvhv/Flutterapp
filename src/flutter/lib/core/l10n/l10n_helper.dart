import 'package:flutter/material.dart';
import 'app_localizations.dart';

/// Extension to easily access localization from BuildContext
extension LocalizationExtension on BuildContext {
  /// Get AppLocalizations instance
  AppLocalizations get l10n => AppLocalizations.of(this);
  
  /// Get current locale
  Locale get locale => Localizations.localeOf(this);
  
  /// Check if current language is English
  bool get isEnglish => locale.languageCode == 'en';
  
  /// Check if current language is Vietnamese
  bool get isVietnamese => locale.languageCode == 'vi';
}

/// Helper class for localization utilities
class L10nHelper {
  L10nHelper._();
  
  /// Get language name from language code
  static String getLanguageName(String languageCode) {
    switch (languageCode) {
      case 'en':
        return 'English';
      case 'vi':
        return 'Tiếng Việt';
      default:
        return languageCode;
    }
  }
  
  /// Get flag emoji for language
  static String getLanguageFlag(String languageCode) {
    switch (languageCode) {
      case 'en':
        return '🇺🇸';
      case 'vi':
        return '🇻🇳';
      default:
        return '🌐';
    }
  }
  
  /// Get list of supported languages
  static List<LanguageOption> getSupportedLanguages() {
    return [
      LanguageOption(
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        locale: const Locale('en', 'US'),
      ),
      LanguageOption(
        code: 'vi',
        name: 'Vietnamese',
        nativeName: 'Tiếng Việt',
        flag: '🇻🇳',
        locale: const Locale('vi', 'VN'),
      ),
    ];
  }
}

/// Language option model
class LanguageOption {
  final String code;
  final String name;
  final String nativeName;
  final String flag;
  final Locale locale;

  LanguageOption({
    required this.code,
    required this.name,
    required this.nativeName,
    required this.flag,
    required this.locale,
  });
}
