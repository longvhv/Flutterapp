import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../features/language/presentation/bloc/language_bloc.dart';
import 'l10n_helper.dart';

/// Example page demonstrating localization usage
/// 
/// This file shows various ways to use the localization system
class LocalizationExamplePage extends StatelessWidget {
  const LocalizationExamplePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(context.l10n.appName),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Example 1: Basic text localization
            _buildSection(
              context,
              'Basic Text',
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(context.l10n.welcomeBack),
                  Text(context.l10n.signInToContinue),
                  Text(context.l10n.email),
                  Text(context.l10n.password),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Example 2: Current language info
            _buildSection(
              context,
              'Current Language',
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Language Code: ${context.locale.languageCode}'),
                  Text('Country Code: ${context.locale.countryCode}'),
                  Text('Is English: ${context.isEnglish}'),
                  Text('Is Vietnamese: ${context.isVietnamese}'),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Example 3: Language switcher
            _buildSection(
              context,
              'Language Switcher',
              Column(
                children: [
                  ElevatedButton(
                    onPressed: () {
                      context.read<LanguageBloc>().add(
                            const LanguageChanged('en'),
                          );
                    },
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('🇺🇸'),
                        SizedBox(width: 8),
                        Text('English'),
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),
                  ElevatedButton(
                    onPressed: () {
                      context.read<LanguageBloc>().add(
                            const LanguageChanged('vi'),
                          );
                    },
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('🇻🇳'),
                        SizedBox(width: 8),
                        Text('Tiếng Việt'),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Example 4: Form with validation
            _buildSection(
              context,
              'Form Example',
              Form(
                child: Column(
                  children: [
                    TextFormField(
                      decoration: InputDecoration(
                        labelText: context.l10n.email,
                        hintText: 'user@example.com',
                        border: const OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return context.l10n.fieldRequired;
                        }
                        if (!value.contains('@')) {
                          return context.l10n.invalidEmail;
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      obscureText: true,
                      decoration: InputDecoration(
                        labelText: context.l10n.password,
                        border: const OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return context.l10n.fieldRequired;
                        }
                        if (value.length < 8) {
                          return context.l10n.passwordTooShort;
                        }
                        return null;
                      },
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Example 5: Action buttons
            _buildSection(
              context,
              'Action Buttons',
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  ElevatedButton(
                    onPressed: () {},
                    child: Text(context.l10n.save),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    child: Text(context.l10n.cancel),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    child: Text(context.l10n.delete),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    child: Text(context.l10n.edit),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Example 6: Status messages
            _buildSection(
              context,
              'Status Messages',
              Column(
                children: [
                  ElevatedButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(context.l10n.loginSuccessful),
                          backgroundColor: Colors.green,
                        ),
                      );
                    },
                    child: Text('Show ${context.l10n.success}'),
                  ),
                  const SizedBox(height: 8),
                  ElevatedButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(context.l10n.somethingWentWrong),
                          backgroundColor: Colors.red,
                        ),
                      );
                    },
                    child: Text('Show ${context.l10n.error}'),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Example 7: Language options list
            _buildSection(
              context,
              'All Language Options',
              Column(
                children: L10nHelper.getSupportedLanguages().map((lang) {
                  return ListTile(
                    leading: Text(
                      lang.flag,
                      style: const TextStyle(fontSize: 32),
                    ),
                    title: Text(lang.nativeName),
                    subtitle: Text(lang.name),
                    trailing: context.locale.languageCode == lang.code
                        ? const Icon(Icons.check, color: Colors.green)
                        : null,
                    onTap: () {
                      context.read<LanguageBloc>().add(
                            LanguageChanged(lang.code),
                          );
                    },
                  );
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSection(BuildContext context, String title, Widget child) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Divider(),
            child,
          ],
        ),
      ),
    );
  }
}
