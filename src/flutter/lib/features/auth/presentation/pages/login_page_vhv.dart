import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

import '../bloc/auth_bloc.dart';

/// Login Page sử dụng VHV Widgets
class LoginPageVHV extends StatefulWidget {
  const LoginPageVHV({super.key});

  @override
  State<LoginPageVHV> createState() => _LoginPageVHVState();
}

class _LoginPageVHVState extends State<LoginPageVHV> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _rememberMe = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin() {
    if (_formKey.currentState!.validate()) {
      context.read<AuthBloc>().add(
            AuthLoginRequested(
              email: _emailController.text,
              password: _passwordController.text,
            ),
          );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocListener<AuthBloc, AuthState>(
        listener: (context, state) {
          if (state is AuthAuthenticated) {
            context.go('/home');
          } else if (state is AuthError) {
            // Sử dụng VHV Toast/Snackbar
            VHVToast.show(
              context: context,
              message: state.message,
              type: VHVToastType.error,
            );
          }
        },
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Color(0xFF3B82F6),
                Color(0xFF9333EA),
                Color(0xFFEC4899),
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
                    // Logo sử dụng VHV Avatar/Image
                    VHVAnimatedContainer(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(24),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 20,
                            offset: const Offset(0, 10),
                          ),
                        ],
                      ),
                      child: Center(
                        child: Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFF3B82F6), Color(0xFF9333EA)],
                            ),
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    
                    // Title
                    VHVText(
                      'Welcome back',
                      style: const TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 8),
                    VHVText(
                      'Sign In',
                      style: const TextStyle(
                        fontSize: 16,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 40),
                    
                    // Form Card sử dụng VHV Card
                    VHVCard(
                      padding: const EdgeInsets.all(24),
                      borderRadius: BorderRadius.circular(24),
                      elevation: 30,
                      child: VHVForm(
                        key: _formKey,
                        child: Column(
                          children: [
                            // Email Field - Sử dụng VHV TextField
                            VHVTextField(
                              controller: _emailController,
                              keyboardType: TextInputType.emailAddress,
                              label: 'Email',
                              prefixIcon: const Icon(Icons.email_outlined),
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter your email';
                                }
                                return null;
                              },
                            ),
                            const SizedBox(height: 16),
                            
                            // Password Field - Sử dụng VHV TextField
                            VHVTextField(
                              controller: _passwordController,
                              obscureText: _obscurePassword,
                              label: 'Password',
                              prefixIcon: const Icon(Icons.lock_outlined),
                              suffixIcon: VHVIconButton(
                                icon: Icon(
                                  _obscurePassword
                                      ? Icons.visibility_outlined
                                      : Icons.visibility_off_outlined,
                                ),
                                onPressed: () {
                                  setState(() {
                                    _obscurePassword = !_obscurePassword;
                                  });
                                },
                              ),
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter your password';
                                }
                                return null;
                              },
                            ),
                            const SizedBox(height: 16),
                            
                            // Remember Me & Forgot Password
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    VHVCheckbox(
                                      value: _rememberMe,
                                      onChanged: (value) {
                                        setState(() {
                                          _rememberMe = value ?? false;
                                        });
                                      },
                                    ),
                                    const VHVText('Remember me'),
                                  ],
                                ),
                                VHVTextButton(
                                  onPressed: () {
                                    context.push('/forgot-password');
                                  },
                                  child: const VHVText('Forgot Password?'),
                                ),
                              ],
                            ),
                            const SizedBox(height: 24),
                            
                            // Login Button - Sử dụng VHV Button
                            BlocBuilder<AuthBloc, AuthState>(
                              builder: (context, state) {
                                return VHVButton(
                                  onPressed: _handleLogin,
                                  loading: state is AuthLoading,
                                  width: double.infinity,
                                  height: 56,
                                  gradient: const LinearGradient(
                                    colors: [Color(0xFF3B82F6), Color(0xFF9333EA)],
                                  ),
                                  borderRadius: BorderRadius.circular(12),
                                  child: const VHVText(
                                    'Sign In',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    
                    // Register Link
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const VHVText(
                          "Don't have an account? ",
                          style: TextStyle(color: Colors.white70),
                        ),
                        VHVTextButton(
                          onPressed: () {
                            context.push('/register');
                          },
                          child: const VHVText(
                            'Sign Up',
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
      ),
    );
  }
}
