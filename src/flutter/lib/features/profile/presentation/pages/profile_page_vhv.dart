import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

import '../../../auth/presentation/bloc/auth_bloc.dart';

/// Profile Page sử dụng VHV Widgets
class ProfilePageVHV extends StatefulWidget {
  const ProfilePageVHV({super.key});

  @override
  State<ProfilePageVHV> createState() => _ProfilePageVHVState();
}

class _ProfilePageVHVState extends State<ProfilePageVHV> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _fullNameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  late TextEditingController _bioController;
  bool _isEditing = false;

  @override
  void initState() {
    super.initState();
    final user = context.read<AuthBloc>().state;
    final userData = user is AuthAuthenticated ? user.user : null;

    _fullNameController = TextEditingController(text: userData?.fullName ?? 'John Doe');
    _emailController = TextEditingController(text: userData?.email ?? 'john@example.com');
    _phoneController = TextEditingController(text: '+1 234 567 8900');
    _bioController = TextEditingController(text: 'Flutter Developer | Tech Enthusiast');
  }

  @override
  void dispose() {
    _fullNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _bioController.dispose();
    super.dispose();
  }

  Future<void> _handleSave() async {
    if (_formKey.currentState!.validate()) {
      await VHVLoadManager.show(
        context: context,
        loadingText: 'Saving profile...',
        future: Future.delayed(const Duration(seconds: 1)),
      );

      setState(() => _isEditing = false);

      VHVToast.show(
        context: context,
        message: 'Profile updated successfully',
        type: VHVToastType.success,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // App Bar với Gradient
          VHVSliverAppBar(
            expandedHeight: 280,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Color(0xFF8B5CF6),
                      Color(0xFFEC4899),
                      Color(0xFFF97316),
                    ],
                  ),
                ),
                child: SafeArea(
                  child: Column(
                    children: [
                      // Back Button
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Row(
                          children: [
                            VHVIconButton(
                              icon: const Icon(Icons.arrow_back, color: Colors.white),
                              onPressed: () => context.pop(),
                            ),
                            const Spacer(),
                            if (!_isEditing)
                              VHVIconButton(
                                icon: const Icon(Icons.edit, color: Colors.white),
                                onPressed: () {
                                  setState(() => _isEditing = true);
                                },
                              ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Profile Avatar
                      Stack(
                        children: [
                          VHVAvatar(
                            radius: 56,
                            imageUrl: 'https://ui-avatars.com/api/?name=John+Doe&size=200',
                            backgroundColor: Colors.white,
                          ),
                          if (_isEditing)
                            Positioned(
                              bottom: 0,
                              right: 0,
                              child: VHVAvatar(
                                radius: 18,
                                backgroundColor: const Color(0xFF3B82F6),
                                child: VHVIconButton(
                                  icon: const Icon(Icons.camera_alt, color: Colors.white, size: 18),
                                  onPressed: () async {
                                    // Image picker
                                    VHVToast.show(
                                      context: context,
                                      message: 'Image picker coming soon',
                                      type: VHVToastType.info,
                                    );
                                  },
                                ),
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      VHVText(
                        _fullNameController.text,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      VHVText(
                        _emailController.text,
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

          // Profile Content
          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                VHVCard(
                  padding: const EdgeInsets.all(24),
                  child: VHVForm(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const VHVText(
                          'Personal Information',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 24),

                        // Full Name
                        VHVTextField(
                          controller: _fullNameController,
                          label: 'Full Name',
                          prefixIcon: const Icon(Icons.person_outline),
                          enabled: _isEditing,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter your name';
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 16),

                        // Email
                        VHVTextField(
                          controller: _emailController,
                          label: 'Email',
                          prefixIcon: const Icon(Icons.email_outline),
                          enabled: _isEditing,
                          keyboardType: TextInputType.emailAddress,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter your email';
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 16),

                        // Phone
                        VHVTextField(
                          controller: _phoneController,
                          label: 'Phone Number',
                          prefixIcon: const Icon(Icons.phone_outline),
                          enabled: _isEditing,
                          keyboardType: TextInputType.phone,
                        ),
                        const SizedBox(height: 16),

                        // Bio
                        VHVTextArea(
                          controller: _bioController,
                          label: 'Bio',
                          maxLines: 3,
                          enabled: _isEditing,
                        ),

                        if (_isEditing) ...[
                          const SizedBox(height: 24),
                          Row(
                            children: [
                              Expanded(
                                child: VHVButton(
                                  onPressed: () {
                                    setState(() => _isEditing = false);
                                  },
                                  height: 48,
                                  backgroundColor: Colors.grey.shade200,
                                  borderRadius: BorderRadius.circular(12),
                                  child: VHVText(
                                    'Cancel',
                                    style: TextStyle(
                                      color: Colors.grey.shade700,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: VHVButton(
                                  onPressed: _handleSave,
                                  height: 48,
                                  gradient: const LinearGradient(
                                    colors: [Color(0xFF8B5CF6), Color(0xFFEC4899)],
                                  ),
                                  borderRadius: BorderRadius.circular(12),
                                  child: const VHVText(
                                    'Save',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Account Stats
                VHVCard(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const VHVText(
                        'Account Statistics',
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
                          _buildStatCard(
                            icon: Icons.calendar_today,
                            label: 'Member Since',
                            value: 'Jan 2024',
                            color: const Color(0xFF3B82F6),
                          ),
                          _buildStatCard(
                            icon: Icons.login,
                            label: 'Last Login',
                            value: 'Today',
                            color: const Color(0xFF10B981),
                          ),
                          _buildStatCard(
                            icon: Icons.devices,
                            label: 'Active Devices',
                            value: '3',
                            color: const Color(0xFF9333EA),
                          ),
                          _buildStatCard(
                            icon: Icons.security,
                            label: 'Security Score',
                            value: '95%',
                            color: const Color(0xFFF59E0B),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard({
    required IconData icon,
    required String label,
    required String value,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(height: 8),
          VHVText(
            value,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          VHVText(
            label,
            style: TextStyle(
              fontSize: 11,
              color: Colors.grey.shade600,
            ),
          ),
        ],
      ),
    );
  }
}
