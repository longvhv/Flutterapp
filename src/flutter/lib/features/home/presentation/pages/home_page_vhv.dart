import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../auth/presentation/bloc/auth_bloc.dart';
import '../../domain/entities/dashboard_stats.dart';

/// Home Page sử dụng Material Widgets
class HomePageVHV extends StatefulWidget {
  const HomePageVHV({super.key});

  @override
  State<HomePageVHV> createState() => _HomePageVHVState();
}

class _HomePageVHVState extends State<HomePageVHV> {
  bool _isLoading = true;
  DashboardStats? _stats;
  List<Activity> _activities = [];

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    // Show loading dialog
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => const Center(
        child: CircularProgressIndicator(),
      ),
    );

    await Future.delayed(const Duration(seconds: 1));

    if (mounted) {
      Navigator.of(context).pop(); // Close loading

      setState(() {
        _stats = DashboardStats(
          totalUsers: 12453,
          activeProjects: 48,
          revenue: '\$125,430',
          growth: '+12.5%',
        );
        _activities = [
          Activity(
            type: 'login',
            message: 'Logged in from new device',
            timestamp: DateTime.now().subtract(const Duration(minutes: 30)),
          ),
          Activity(
            type: 'update',
            message: 'Updated profile information',
            timestamp: DateTime.now().subtract(const Duration(hours: 2)),
          ),
          Activity(
            type: 'security',
            message: 'Enabled two-factor authentication',
            timestamp: DateTime.now().subtract(const Duration(days: 1)),
          ),
        ];
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = context.select((AuthBloc bloc) {
      final state = bloc.state;
      return state is AuthAuthenticated ? state.user : null;
    });

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // Header với Gradient
          SliverAppBar(
            expandedHeight: 280,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
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
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Welcome back',
                          style: TextStyle(
                            color: Colors.blue.shade100,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          user?.fullName ?? 'User',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 24),
                        
                        // Stats Grid
                        if (_stats != null)
                          GridView.count(
                            crossAxisCount: 2,
                            mainAxisSpacing: 12,
                            crossAxisSpacing: 12,
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            childAspectRatio: 1.3,
                            children: [
                              _buildStatCard(
                                icon: Icons.people,
                                label: 'Total Users',
                                value: _stats!.totalUsers.toString(),
                                color: const Color(0xFF3B82F6),
                              ),
                              _buildStatCard(
                                icon: Icons.work,
                                label: 'Active Projects',
                                value: _stats!.activeProjects.toString(),
                                color: const Color(0xFF9333EA),
                              ),
                              _buildStatCard(
                                icon: Icons.attach_money,
                                label: 'Revenue',
                                value: _stats!.revenue,
                                color: const Color(0xFF10B981),
                              ),
                              _buildStatCard(
                                icon: Icons.trending_up,
                                label: 'Growth',
                                value: _stats!.growth,
                                color: const Color(0xFFF97316),
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
          
          // Recent Activity
          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Recent Activity',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 16),
                  
                  if (_isLoading)
                    Column(
                      children: List.generate(
                        3,
                        (index) => Container(
                          height: 80,
                          margin: const EdgeInsets.only(bottom: 12),
                          decoration: BoxDecoration(
                            color: Colors.grey[300],
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                      ),
                    )
                  else
                    ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: _activities.length,
                      itemBuilder: (context, index) {
                        final activity = _activities[index];
                        return Card(
                          margin: const EdgeInsets.only(bottom: 12),
                          child: InkWell(
                            onTap: () {
                              // Handle tap
                            },
                            borderRadius: BorderRadius.circular(12),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Row(
                                children: [
                                  CircleAvatar(
                                    radius: 24,
                                    backgroundColor: _getActivityColor(activity.type),
                                    child: Icon(
                                      _getActivityIcon(activity.type),
                                      color: Colors.white,
                                    ),
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          activity.message,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          _formatTime(activity.timestamp),
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.grey.shade600,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  
                  const SizedBox(height: 24),
                  
                  // Quick Actions
                  Text(
                    'Quick Actions',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 16),
                  
                  GridView.count(
                    crossAxisCount: 3,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      _buildQuickAction(
                        icon: Icons.people,
                        label: 'Users',
                        color: const Color(0xFF3B82F6),
                      ),
                      _buildQuickAction(
                        icon: Icons.work,
                        label: 'Projects',
                        color: const Color(0xFF9333EA),
                      ),
                      _buildQuickAction(
                        icon: Icons.security,
                        label: 'Security',
                        color: const Color(0xFF10B981),
                      ),
                    ],
                  ),
                ],
              ),
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
    return Card(
      color: Colors.white.withOpacity(0.95),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              radius: 20,
              backgroundColor: color,
              child: Icon(icon, color: Colors.white, size: 20),
            ),
            const SizedBox(height: 12),
            Text(
              value,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                color: Colors.grey.shade600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickAction({
    required IconData icon,
    required String label,
    required Color color,
  }) {
    return Card(
      child: InkWell(
        onTap: () {
          // Handle tap
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(
                radius: 24,
                backgroundColor: color,
                child: Icon(icon, color: Colors.white),
              ),
              const SizedBox(height: 8),
              Text(
                label,
                style: const TextStyle(fontSize: 12),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }

  IconData _getActivityIcon(String type) {
    switch (type) {
      case 'login':
        return Icons.login;
      case 'update':
        return Icons.update;
      case 'security':
        return Icons.security;
      default:
        return Icons.circle;
    }
  }

  Color _getActivityColor(String type) {
    switch (type) {
      case 'login':
        return const Color(0xFF3B82F6);
      case 'update':
        return const Color(0xFF9333EA);
      case 'security':
        return const Color(0xFF10B981);
      default:
        return Colors.grey;
    }
  }

  String _formatTime(DateTime timestamp) {
    final now = DateTime.now();
    final diff = now.difference(timestamp);
    
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    return '${diff.inDays}d ago';
  }
}

// Domain Entities
class DashboardStats {
  final int totalUsers;
  final int activeProjects;
  final String revenue;
  final String growth;

  DashboardStats({
    required this.totalUsers,
    required this.activeProjects,
    required this.revenue,
    required this.growth,
  });
}

class Activity {
  final String type;
  final String message;
  final DateTime timestamp;

  Activity({
    required this.type,
    required this.message,
    required this.timestamp,
  });
}
