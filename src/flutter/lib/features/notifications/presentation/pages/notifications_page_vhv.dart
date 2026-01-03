import 'package:flutter/material.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

/// Notifications Page sử dụng VHV Widgets
class NotificationsPageVHV extends StatefulWidget {
  const NotificationsPageVHV({super.key});

  @override
  State<NotificationsPageVHV> createState() => _NotificationsPageVHVState();
}

class _NotificationsPageVHVState extends State<NotificationsPageVHV>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _isLoading = true;
  List<NotificationItem> _allNotifications = [];
  List<NotificationItem> _unreadNotifications = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadNotifications();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadNotifications() async {
    await VHVLoadManager.show(
      context: context,
      loadingText: 'Loading notifications...',
      future: Future.delayed(const Duration(seconds: 1)),
    );

    setState(() {
      _allNotifications = [
        NotificationItem(
          id: '1',
          title: 'Welcome to the app!',
          message: 'Thank you for joining us. Explore all features.',
          timestamp: DateTime.now().subtract(const Duration(minutes: 5)),
          type: 'info',
          isRead: false,
        ),
        NotificationItem(
          id: '2',
          title: 'Security Alert',
          message: 'New login detected from Chrome on Windows',
          timestamp: DateTime.now().subtract(const Duration(hours: 2)),
          type: 'security',
          isRead: false,
        ),
        NotificationItem(
          id: '3',
          title: 'Profile Updated',
          message: 'Your profile information has been updated successfully',
          timestamp: DateTime.now().subtract(const Duration(hours: 5)),
          type: 'success',
          isRead: true,
        ),
        NotificationItem(
          id: '4',
          title: 'New Feature Available',
          message: 'Check out our new dark mode feature!',
          timestamp: DateTime.now().subtract(const Duration(days: 1)),
          type: 'update',
          isRead: true,
        ),
        NotificationItem(
          id: '5',
          title: 'Password Changed',
          message: 'Your password was changed successfully',
          timestamp: DateTime.now().subtract(const Duration(days: 2)),
          type: 'security',
          isRead: true,
        ),
      ];
      _unreadNotifications =
          _allNotifications.where((n) => !n.isRead).toList();
      _isLoading = false;
    });
  }

  void _markAsRead(String id) {
    setState(() {
      final index = _allNotifications.indexWhere((n) => n.id == id);
      if (index != -1) {
        _allNotifications[index] = _allNotifications[index].copyWith(isRead: true);
        _unreadNotifications =
            _allNotifications.where((n) => !n.isRead).toList();
      }
    });
  }

  void _markAllAsRead() {
    setState(() {
      _allNotifications = _allNotifications
          .map((n) => n.copyWith(isRead: true))
          .toList();
      _unreadNotifications = [];
    });
    VHVToast.show(
      context: context,
      message: 'All notifications marked as read',
      type: VHVToastType.success,
    );
  }

  @override
  Widget build(BuildContext context) {
    return VHVScaffold(
      body: CustomScrollView(
        slivers: [
          // App Bar với Gradient
          VHVSliverAppBar(
            expandedHeight: 180,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Color(0xFFF59E0B),
                      Color(0xFFF97316),
                      Color(0xFFEC4899),
                    ],
                  ),
                ),
                child: SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        const VHVText(
                          'Notifications',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            VHVAvatar(
                              radius: 8,
                              backgroundColor: Colors.white,
                              child: VHVText(
                                '${_unreadNotifications.length}',
                                style: const TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            VHVText(
                              '${_unreadNotifications.length} unread',
                              style: const TextStyle(
                                color: Colors.white70,
                                fontSize: 14,
                              ),
                            ),
                            const Spacer(),
                            if (_unreadNotifications.isNotEmpty)
                              VHVTextButton(
                                onPressed: _markAllAsRead,
                                child: const VHVText(
                                  'Mark all as read',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w600,
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

          // Tab Bar
          SliverPersistentHeader(
            pinned: true,
            delegate: _SliverTabBarDelegate(
              VHVTabBar(
                controller: _tabController,
                tabs: const [
                  VHVTab(text: 'All'),
                  VHVTab(text: 'Unread'),
                ],
              ),
            ),
          ),

          // Notifications List
          SliverFillRemaining(
            child: _isLoading
                ? VHVShimmer(
                    child: Column(
                      children: List.generate(
                        5,
                        (index) => VHVShimmerItem(
                          height: 100,
                          margin: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 8,
                          ),
                        ),
                      ),
                    ),
                  )
                : TabBarView(
                    controller: _tabController,
                    children: [
                      _buildNotificationsList(_allNotifications),
                      _buildNotificationsList(_unreadNotifications),
                    ],
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationsList(List<NotificationItem> notifications) {
    if (notifications.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            VHVAvatar(
              radius: 48,
              backgroundColor: Colors.grey.shade100,
              child: Icon(
                Icons.notifications_none,
                size: 56,
                color: Colors.grey.shade400,
              ),
            ),
            const SizedBox(height: 16),
            VHVText(
              'No notifications',
              style: TextStyle(
                fontSize: 18,
                color: Colors.grey.shade600,
              ),
            ),
          ],
        ),
      );
    }

    return VHVListView(
      padding: const EdgeInsets.all(16),
      itemCount: notifications.length,
      itemBuilder: (context, index) {
        final notification = notifications[index];
        return VHVCard(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          backgroundColor: notification.isRead
              ? Colors.white
              : Colors.blue.shade50,
          onTap: () => _markAsRead(notification.id),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              VHVAvatar(
                radius: 24,
                backgroundColor: _getNotificationColor(notification.type),
                child: Icon(
                  _getNotificationIcon(notification.type),
                  color: Colors.white,
                  size: 24,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: VHVText(
                            notification.title,
                            style: TextStyle(
                              fontWeight: notification.isRead
                                  ? FontWeight.w500
                                  : FontWeight.bold,
                            ),
                          ),
                        ),
                        if (!notification.isRead)
                          VHVAvatar(
                            radius: 4,
                            backgroundColor: const Color(0xFF3B82F6),
                          ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    VHVText(
                      notification.message,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey.shade700,
                      ),
                    ),
                    const SizedBox(height: 8),
                    VHVText(
                      _formatTime(notification.timestamp),
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade500,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  IconData _getNotificationIcon(String type) {
    switch (type) {
      case 'security':
        return Icons.security;
      case 'success':
        return Icons.check_circle;
      case 'update':
        return Icons.new_releases;
      default:
        return Icons.info;
    }
  }

  Color _getNotificationColor(String type) {
    switch (type) {
      case 'security':
        return const Color(0xFFF97316);
      case 'success':
        return const Color(0xFF10B981);
      case 'update':
        return const Color(0xFF9333EA);
      default:
        return const Color(0xFF3B82F6);
    }
  }

  String _formatTime(DateTime timestamp) {
    final now = DateTime.now();
    final diff = now.difference(timestamp);

    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    if (diff.inDays < 7) return '${diff.inDays}d ago';
    return '${timestamp.day}/${timestamp.month}/${timestamp.year}';
  }
}

// Sliver Tab Bar Delegate
class _SliverTabBarDelegate extends SliverPersistentHeaderDelegate {
  final VHVTabBar tabBar;

  _SliverTabBarDelegate(this.tabBar);

  @override
  double get minExtent => 48;

  @override
  double get maxExtent => 48;

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return Container(
      color: Colors.white,
      child: tabBar,
    );
  }

  @override
  bool shouldRebuild(_SliverTabBarDelegate oldDelegate) => false;
}

// Notification Item Model
class NotificationItem {
  final String id;
  final String title;
  final String message;
  final DateTime timestamp;
  final String type;
  final bool isRead;

  NotificationItem({
    required this.id,
    required this.title,
    required this.message,
    required this.timestamp,
    required this.type,
    required this.isRead,
  });

  NotificationItem copyWith({
    String? id,
    String? title,
    String? message,
    DateTime? timestamp,
    String? type,
    bool? isRead,
  }) {
    return NotificationItem(
      id: id ?? this.id,
      title: title ?? this.title,
      message: message ?? this.message,
      timestamp: timestamp ?? this.timestamp,
      type: type ?? this.type,
      isRead: isRead ?? this.isRead,
    );
  }
}
