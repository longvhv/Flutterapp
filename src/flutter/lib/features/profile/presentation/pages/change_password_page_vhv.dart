import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

/// Change Password Page sử dụng VHV Widgets
class ChangePasswordPageVHV extends StatefulWidget {
  const ChangePasswordPageVHV({super.key});

  @override
  State<ChangePasswordPageVHV> createState() => _ChangePasswordPageVHVState();
}

class _ChangePasswordPageVHVState extends State<ChangePasswordPageVHV> {
  final _formKey = GlobalKey<FormState>();
  final _currentPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _obscureCurrentPassword = true;
  bool _obscureNewPassword = true;
  bool _obscureConfirmPassword = true;

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _handleChangePassword() async {
    if (_formKey.currentState!.validate()) {
      await VHVLoadManager.show(
        context: context,
        loadingText: 'Changing password...',
        future: Future.delayed(const Duration(seconds: 2)),
      );

      VHVToast.show(
        context: context,
        message: 'Password changed successfully',
        type: VHVToastType.success,
      );

      context.pop();
    }
  }

  bool _isPasswordStrong(String password) {
    return password.length >= 8 &&
        password.contains(RegExp(r'[A-Z]')) &&
        password.contains(RegExp(r'[a-z]')) &&
        password.contains(RegExp(r'[0-9]'));
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
              Color(0xFFEF4444),
              Color(0xFFEC4899),
              Color(0xFF9333EA),
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
                    const VHVText(
                      'Change Password',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),

              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    children: [
                      // Icon
                      VHVAvatar(
                        radius: 56,
                        backgroundColor: Colors.white,
                        child: const Icon(
                          Icons.lock_reset,
                          size: 56,
                          color: Color(0xFFEC4899),
                        ),
                      ),
                      const SizedBox(height: 32),

                      // Form Card
                      VHVCard(
                        padding: const EdgeInsets.all(24),
                        child: VHVForm(
                          key: _formKey,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const VHVText(
                                'Security First',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 8),
                              VHVText(
                                'Make sure your new password is strong and secure',
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.grey.shade600,
                                ),
                              ),
                              const SizedBox(height: 24),

                              // Current Password
                              VHVTextField(
                                controller: _currentPasswordController,
                                obscureText: _obscureCurrentPassword,
                                label: 'Current Password',
                                prefixIcon: const Icon(Icons.lock_outline),
                                suffixIcon: VHVIconButton(
                                  icon: Icon(
                                    _obscureCurrentPassword
                                        ? Icons.visibility_outlined
                                        : Icons.visibility_off_outlined,
                                  ),
                                  onPressed: () {
                                    setState(() {
                                      _obscureCurrentPassword = !_obscureCurrentPassword;
                                    });
                                  },
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter your current password';
                                  }
                                  return null;
                                },
                              ),
                              const SizedBox(height: 16),

                              // New Password
                              VHVTextField(
                                controller: _newPasswordController,
                                obscureText: _obscureNewPassword,
                                label: 'New Password',
                                prefixIcon: const Icon(Icons.lock),
                                suffixIcon: VHVIconButton(
                                  icon: Icon(
                                    _obscureNewPassword
                                        ? Icons.visibility_outlined
                                        : Icons.visibility_off_outlined,
                                  ),
                                  onPressed: () {
                                    setState(() {
                                      _obscureNewPassword = !_obscureNewPassword;
                                    });
                                  },
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter a new password';
                                  }
                                  if (value == _currentPasswordController.text) {
                                    return 'New password must be different';
                                  }
                                  if (!_isPasswordStrong(value)) {
                                    return 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
                                  }
                                  return null;
                                },
                              ),
                              const SizedBox(height: 16),

                              // Confirm Password
                              VHVTextField(
                                controller: _confirmPasswordController,
                                obscureText: _obscureConfirmPassword,
                                label: 'Confirm New Password',
                                prefixIcon: const Icon(Icons.lock),
                                suffixIcon: VHVIconButton(
                                  icon: Icon(
                                    _obscureConfirmPassword
                                        ? Icons.visibility_outlined
                                        : Icons.visibility_off_outlined,
                                  ),
                                  onPressed: () {
                                    setState(() {
                                      _obscureConfirmPassword = !_obscureConfirmPassword;
                                    });
                                  },
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please confirm your new password';
                                  }
                                  if (value != _newPasswordController.text) {
                                    return 'Passwords do not match';
                                  }
                                  return null;
                                },
                              ),
                              const SizedBox(height: 24),

                              // Password Requirements
                              VHVCard(
                                padding: const EdgeInsets.all(16),
                                backgroundColor: Colors.blue.shade50,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        const Icon(
                                          Icons.info_outline,
                                          size: 16,
                                          color: Color(0xFF3B82F6),
                                        ),
                                        const SizedBox(width: 8),
                                        VHVText(
                                          'Password Requirements',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.w600,
                                            color: Colors.blue.shade900,
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    _buildRequirement('At least 8 characters'),
                                    _buildRequirement('One uppercase letter'),
                                    _buildRequirement('One lowercase letter'),
                                    _buildRequirement('One number'),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 24),

                              // Change Password Button
                              VHVButton(
                                onPressed: _handleChangePassword,
                                width: double.infinity,
                                height: 56,
                                gradient: const LinearGradient(
                                  colors: [Color(0xFFEF4444), Color(0xFFEC4899)],
                                ),
                                borderRadius: BorderRadius.circular(12),
                                child: const VHVText(
                                  'Change Password',
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

  Widget _buildRequirement(String text) {
    return Padding(
      padding: const EdgeInsets.only(top: 4),
      child: Row(
        children: [
          Icon(
            Icons.check_circle_outline,
            size: 14,
            color: Colors.grey.shade600,
          ),
          const SizedBox(width: 6),
          VHVText(
            text,
            style: TextStyle(
              fontSize: 11,
              color: Colors.grey.shade700,
            ),
          ),
        ],
      ),
    );
  }
}
