import 'package:flutter/material.dart';
import 'package:vhv_widgets/vhv_widgets.dart';
import 'package:go_router/go_router.dart';

/// Sử dụng trực tiếp VHV Bottom Navigation Bar
class VHVBottomNavScaffold extends StatefulWidget {
  final Widget child;

  const VHVBottomNavScaffold({
    super.key,
    required this.child,
  });

  @override
  State<VHVBottomNavScaffold> createState() => _VHVBottomNavScaffoldState();
}

class _VHVBottomNavScaffoldState extends State<VHVBottomNavScaffold> {
  int _currentIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _currentIndex = index;
    });

    switch (index) {
      case 0:
        context.go('/home');
        break;
      case 1:
        context.go('/notifications');
        break;
      case 2:
        context.go('/settings');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.child,
      // Sử dụng VHV Bottom Navigation Bar trực tiếp từ thư viện
      bottomNavigationBar: VHVBottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: _onItemTapped,
        items: const [
          VHVBottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home),
            label: 'Home',
          ),
          VHVBottomNavigationBarItem(
            icon: Icon(Icons.notifications_outlined),
            activeIcon: Icon(Icons.notifications),
            label: 'Notifications',
          ),
          VHVBottomNavigationBarItem(
            icon: Icon(Icons.settings_outlined),
            activeIcon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
        type: VHVBottomNavigationBarType.fixed,
        selectedFontSize: 12,
        unselectedFontSize: 12,
        elevation: 8,
      ),
    );
  }
}
