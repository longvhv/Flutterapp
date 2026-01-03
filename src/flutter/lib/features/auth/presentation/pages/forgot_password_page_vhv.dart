import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

/// Forgot Password Page sử dụng VHV Widgets
class ForgotPasswordPageVHV extends StatefulWidget {
  const ForgotPasswordPageVHV({super.key});

  @override
  State<ForgotPasswordPageVHV> createState() => _ForgotPasswordPageVHVState();
}

class _ForgotPasswordPageVHVState extends State<ForgotPasswordPageVHV> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  bool _isLoading = false;
  bool _emailSent = false;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _handleResetPassword() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);

      await VHVLoadManager.show(
        context: context,
        loadingText: 'Sending reset link...',
        future: Future.delayed(const Duration(seconds: 2)),
      );

      setState(() {
        _isLoading = false;
        _emailSent = true;
      });

      VHVToast.show(
        context: context,
        message: 'Password reset link sent to ${_emailController.text}',
        type: VHVToastType.success,
      );
    }
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
              Color(0xFFF97316),
              Color(0xFFEC4899),
              Color(0xFF9333EA),
            ],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Back Button
                  Align(
                    alignment: Alignment.centerLeft,
                    child: VHVIconButton(
                      icon: const Icon(Icons.arrow_back, color: Colors.white),
                      onPressed: () => context.pop(),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Icon
                  VHVAnimatedContainer(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(28),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 20,
                          offset: const Offset(0, 10),
                        ),
                      ],
                    ),
                    child: const Center(
                      child: Icon(
                        Icons.lock_reset,
                        size: 56,
                        color: Color(0xFFEC4899),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),

                  if (!_emailSent) ...[
                    // Title
                    const VHVText(
                      'Forgot Password?',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const VHVText(
                      'Enter your email to reset your password',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.white70,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 40),

                    // Form Card
                    VHVCard(
                      padding: const EdgeInsets.all(24),
                      borderRadius: BorderRadius.circular(24),
                      elevation: 30,
                      child: VHVForm(
                        key: _formKey,
                        child: Column(
                          children: [
                            // Email Field
                            VHVTextField(
                              controller: _emailController,
                              keyboardType: TextInputType.emailAddress,
                              label: 'Email',
                              prefixIcon: const Icon(Icons.email_outlined),
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter your email';
                                }
                                if (!value.contains('@')) {
                                  return 'Please enter a valid email';
                                }
                                return null;
                              },
                            ),
                            const SizedBox(height: 24),

                            // Reset Button
                            VHVButton(
                              onPressed: _handleResetPassword,
                              loading: _isLoading,
                              width: double.infinity,
                              height: 56,
                              gradient: const LinearGradient(
                                colors: [Color(0xFFF97316), Color(0xFFEC4899)],
                              ),
                              borderRadius: BorderRadius.circular(12),
                              child: const VHVText(
                                'Send Reset Link',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ] else ...[
                    // Success State
                    VHVCard(
                      padding: const EdgeInsets.all(32),
                      borderRadius: BorderRadius.circular(24),
                      elevation: 30,
                      child: Column(
                        children: [
                          VHVAvatar(
                            radius: 40,
                            backgroundColor: const Color(0xFF10B981),
                            child: const Icon(
                              Icons.check,
                              size: 48,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 24),
                          const VHVText(
                            'Email Sent!',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 12),
                          VHVText(
                            'We\'ve sent a password reset link to\n${_emailController.text}',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey.shade600,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(height: 24),
                          VHVButton(
                            onPressed: () {
                              context.go('/login');
                            },
                            width: double.infinity,
                            height: 48,
                            gradient: const LinearGradient(
                              colors: [Color(0xFF3B82F6), Color(0xFF9333EA)],
                            ),
                            borderRadius: BorderRadius.circular(12),
                            child: const VHVText(
                              'Back to Login',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],

                  const SizedBox(height: 24),

                  // Back to Login Link
                  if (!_emailSent)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const VHVText(
                          'Remember your password? ',
                          style: TextStyle(color: Colors.white70),
                        ),
                        VHVTextButton(
                          onPressed: () {
                            context.go('/login');
                          },
                          child: const VHVText(
                            'Sign In',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
