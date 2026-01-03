import 'package:equatable/equatable.dart';

class DashboardStats extends Equatable {
  final int totalUsers;
  final int activeProjects;
  final String revenue;
  final String growth;

  const DashboardStats({
    required this.totalUsers,
    required this.activeProjects,
    required this.revenue,
    required this.growth,
  });

  @override
  List<Object?> get props => [totalUsers, activeProjects, revenue, growth];
}

class Activity extends Equatable {
  final String type;
  final String message;
  final DateTime timestamp;

  const Activity({
    required this.type,
    required this.message,
    required this.timestamp,
  });

  @override
  List<Object?> get props => [type, message, timestamp];
}
