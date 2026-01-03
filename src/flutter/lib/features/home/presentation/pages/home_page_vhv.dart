import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

import '../../../auth/presentation/bloc/auth_bloc.dart';
import '../../domain/entities/dashboard_stats.dart';

/// Home Page sử dụng VHV Widgets
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
    // Sử dụng VHV Load Manager
    await VHVLoadManager.show(
      context: context,
      loadingText: 'Loading dashboard...',
      future: Future.delayed(const Duration(seconds: 1)),
    );

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

  @override
  Widget build(BuildContext context) {
    final user = context.select((AuthBloc bloc) {
      final state = bloc.state;
      return state is AuthAuthenticated ? state.user : null;
    });

    return VHVScaffold(
      body: CustomScrollView(
        slivers: [
          // Header với Gradient - Sử dụng VHV AppBar
          VHVSliverAppBar(
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
                        VHVText(
                          'Welcome back',
                          style: TextStyle(
                            color: Colors.blue.shade100,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(height: 4),
                        VHVText(
                          user?.fullName ?? 'User',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 24),
                        
                        // Stats Grid - Sử dụng VHV Grid
                        if (_stats != null)
                          VHVGridView(
                            crossAxisCount: 2,
                            mainAxisSpacing: 12,
                            crossAxisSpacing: 12,
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
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
          
          // Recent Activity - Sử dụng VHV List
          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  VHVText(
                    'Recent Activity',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 16),
                  
                  if (_isLoading)
                    VHVShimmer(
                      child: Column(
                        children: List.generate(
                          3,
                          (index) => VHVShimmerItem(
                            height: 80,
                            margin: const EdgeInsets.only(bottom: 12),
                          ),
                        ),
                      ),
                    )
                  else
                    VHVListView(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: _activities.length,
                      itemBuilder: (context, index) {
                        final activity = _activities[index];
                        return VHVCard(
                          margin: const EdgeInsets.only(bottom: 12),
                          padding: const EdgeInsets.all(16),
                          onTap: () {
                            // Handle tap
                          },
                          child: Row(
                            children: [
                              VHVAvatar(
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
                                    VHVText(
                                      activity.message,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    VHVText(
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
                        );
                      },
                    ),
                  
                  const SizedBox(height: 24),
                  
                  // Quick Actions
                  VHVText(
                    'Quick Actions',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 16),
                  
                  VHVGridView(
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
    return VHVCard(
      padding: const EdgeInsets.all(16),
      backgroundColor: Colors.white.withOpacity(0.95),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          VHVAvatar(
            radius: 20,
            backgroundColor: color,
            child: Icon(icon, color: Colors.white, size: 20),
          ),
          const SizedBox(height: 12),
          VHVText(
            value,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          VHVText(
            label,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey.shade600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickAction({
    required IconData icon,
    required String label,
    required Color color,
  }) {
    return VHVCard(
      padding: const EdgeInsets.all(16),
      onTap: () {
        // Handle tap
      },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          VHVAvatar(
            radius: 24,
            backgroundColor: color,
            child: Icon(icon, color: Colors.white),
          ),
          const SizedBox(height: 8),
          VHVText(
            label,
            style: const TextStyle(fontSize: 12),
            textAlign: TextAlign.center,
          ),
        ],
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
