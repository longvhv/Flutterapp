import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

/// Devices Page sử dụng VHV Widgets
class DevicesPageVHV extends StatefulWidget {
  const DevicesPageVHV({super.key});

  @override
  State<DevicesPageVHV> createState() => _DevicesPageVHVState();
}

class _DevicesPageVHVState extends State<DevicesPageVHV> {
  bool _isLoading = true;
  List<Device> _devices = [];

  @override
  void initState() {
    super.initState();
    _loadDevices();
  }

  Future<void> _loadDevices() async {
    await VHVLoadManager.show(
      context: context,
      loadingText: 'Loading devices...',
      future: Future.delayed(const Duration(seconds: 1)),
    );

    setState(() {
      _devices = [
        Device(
          id: '1',
          name: 'iPhone 14 Pro',
          type: 'mobile',
          location: 'New York, US',
          lastActive: DateTime.now(),
          isCurrent: true,
        ),
        Device(
          id: '2',
          name: 'MacBook Pro',
          type: 'desktop',
          location: 'New York, US',
          lastActive: DateTime.now().subtract(const Duration(hours: 2)),
          isCurrent: false,
        ),
        Device(
          id: '3',
          name: 'Chrome on Windows',
          type: 'browser',
          location: 'London, UK',
          lastActive: DateTime.now().subtract(const Duration(days: 3)),
          isCurrent: false,
        ),
      ];
      _isLoading = false;
    });
  }

  Future<void> _removeDevice(Device device) async {
    final confirmed = await VHVDialog.show(
      context: context,
      title: 'Remove Device',
      content: 'Are you sure you want to remove ${device.name}?',
      actions: [
        VHVTextButton(
          onPressed: () => Navigator.pop(context, false),
          child: const VHVText('Cancel'),
        ),
        VHVButton(
          onPressed: () => Navigator.pop(context, true),
          backgroundColor: const Color(0xFFEF4444),
          child: const VHVText('Remove', style: TextStyle(color: Colors.white)),
        ),
      ],
    );

    if (confirmed == true) {
      setState(() {
        _devices.removeWhere((d) => d.id == device.id);
      });
      VHVToast.show(
        context: context,
        message: 'Device removed successfully',
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
              Color(0xFF06B6D4),
              Color(0xFF3B82F6),
              Color(0xFF8B5CF6),
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
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const VHVText(
                          'Manage Devices',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        VHVText(
                          '${_devices.length} active devices',
                          style: const TextStyle(
                            color: Colors.white70,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              // Devices List
              Expanded(
                child: Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(24),
                      topRight: Radius.circular(24),
                    ),
                  ),
                  child: _isLoading
                      ? VHVShimmer(
                          child: ListView.builder(
                            padding: const EdgeInsets.all(16),
                            itemCount: 3,
                            itemBuilder: (context, index) {
                              return VHVShimmerItem(
                                height: 120,
                                margin: const EdgeInsets.only(bottom: 16),
                              );
                            },
                          ),
                        )
                      : VHVListView(
                          padding: const EdgeInsets.all(16),
                          itemCount: _devices.length,
                          itemBuilder: (context, index) {
                            final device = _devices[index];
                            return VHVCard(
                              margin: const EdgeInsets.only(bottom: 16),
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      VHVAvatar(
                                        radius: 24,
                                        backgroundColor: _getDeviceColor(device.type).withOpacity(0.1),
                                        child: Icon(
                                          _getDeviceIcon(device.type),
                                          color: _getDeviceColor(device.type),
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
                                                VHVText(
                                                  device.name,
                                                  style: const TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                                if (device.isCurrent) ...[
                                                  const SizedBox(width: 8),
                                                  VHVChip(
                                                    label: 'Current',
                                                    backgroundColor: const Color(0xFF10B981),
                                                    textColor: Colors.white,
                                                    size: VHVChipSize.small,
                                                  ),
                                                ],
                                              ],
                                            ),
                                            const SizedBox(height: 4),
                                            VHVText(
                                              device.type.toUpperCase(),
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Colors.grey.shade600,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      if (!device.isCurrent)
                                        VHVIconButton(
                                          icon: Icon(
                                            Icons.delete_outline,
                                            color: Colors.red.shade400,
                                          ),
                                          onPressed: () => _removeDevice(device),
                                        ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  const Divider(),
                                  const SizedBox(height: 12),
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.location_on_outlined,
                                        size: 16,
                                        color: Colors.grey.shade600,
                                      ),
                                      const SizedBox(width: 4),
                                      VHVText(
                                        device.location,
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey.shade700,
                                        ),
                                      ),
                                      const Spacer(),
                                      Icon(
                                        Icons.access_time,
                                        size: 16,
                                        color: Colors.grey.shade600,
                                      ),
                                      const SizedBox(width: 4),
                                      VHVText(
                                        _formatLastActive(device.lastActive),
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey.shade700,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  IconData _getDeviceIcon(String type) {
    switch (type) {
      case 'mobile':
        return Icons.phone_android;
      case 'desktop':
        return Icons.laptop_mac;
      case 'browser':
        return Icons.language;
      default:
        return Icons.devices;
    }
  }

  Color _getDeviceColor(String type) {
    switch (type) {
      case 'mobile':
        return const Color(0xFF3B82F6);
      case 'desktop':
        return const Color(0xFF8B5CF6);
      case 'browser':
        return const Color(0xFF10B981);
      default:
        return Colors.grey;
    }
  }

  String _formatLastActive(DateTime time) {
    final now = DateTime.now();
    final diff = now.difference(time);

    if (diff.inMinutes < 1) return 'Just now';
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    return '${diff.inDays}d ago';
  }
}

// Device Model
class Device {
  final String id;
  final String name;
  final String type;
  final String location;
  final DateTime lastActive;
  final bool isCurrent;

  Device({
    required this.id,
    required this.name,
    required this.type,
    required this.location,
    required this.lastActive,
    required this.isCurrent,
  });
}
