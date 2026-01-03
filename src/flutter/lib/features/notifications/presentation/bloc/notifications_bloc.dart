import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

import '../../domain/entities/notification.dart';

// Events
abstract class NotificationsEvent extends Equatable {
  const NotificationsEvent();

  @override
  List<Object?> get props => [];
}

class NotificationsLoadRequested extends NotificationsEvent {}

class NotificationMarkAsRead extends NotificationsEvent {
  final String id;

  const NotificationMarkAsRead({required this.id});

  @override
  List<Object?> get props => [id];
}

class NotificationsMarkAllAsRead extends NotificationsEvent {}

class NotificationDelete extends NotificationsEvent {
  final String id;

  const NotificationDelete({required this.id});

  @override
  List<Object?> get props => [id];
}

// States
abstract class NotificationsState extends Equatable {
  const NotificationsState();

  @override
  List<Object?> get props => [];
}

class NotificationsInitial extends NotificationsState {}

class NotificationsLoading extends NotificationsState {}

class NotificationsLoaded extends NotificationsState {
  final List<NotificationModel> notifications;

  const NotificationsLoaded({required this.notifications});

  int get unreadCount => notifications.where((n) => !n.read).length;

  @override
  List<Object?> get props => [notifications];
}

class NotificationsError extends NotificationsState {
  final String message;

  const NotificationsError({required this.message});

  @override
  List<Object?> get props => [message];
}

// Bloc
class NotificationsBloc extends Bloc<NotificationsEvent, NotificationsState> {
  NotificationsBloc() : super(NotificationsInitial()) {
    on<NotificationsLoadRequested>(_onNotificationsLoadRequested);
    on<NotificationMarkAsRead>(_onNotificationMarkAsRead);
    on<NotificationsMarkAllAsRead>(_onNotificationsMarkAllAsRead);
    on<NotificationDelete>(_onNotificationDelete);
  }

  Future<void> _onNotificationsLoadRequested(
    NotificationsLoadRequested event,
    Emitter<NotificationsState> emit,
  ) async {
    emit(NotificationsLoading());
    
    try {
      // TODO: Replace with actual API call
      await Future.delayed(const Duration(milliseconds: 500));
      
      final notifications = [
        NotificationModel(
          id: '1',
          title: 'Welcome!',
          message: 'Welcome to our platform. Get started by exploring the dashboard.',
          type: NotificationType.info,
          read: false,
          createdAt: DateTime.now(),
        ),
        NotificationModel(
          id: '2',
          title: 'New feature available',
          message: 'Check out our new analytics dashboard with advanced reporting.',
          type: NotificationType.feature,
          read: false,
          createdAt: DateTime.now().subtract(const Duration(hours: 1)),
        ),
        NotificationModel(
          id: '3',
          title: 'Security update',
          message: 'Your password was changed successfully.',
          type: NotificationType.security,
          read: true,
          createdAt: DateTime.now().subtract(const Duration(days: 1)),
        ),
      ];
      
      emit(NotificationsLoaded(notifications: notifications));
    } catch (e) {
      emit(const NotificationsError(message: 'Failed to load notifications'));
    }
  }

  void _onNotificationMarkAsRead(
    NotificationMarkAsRead event,
    Emitter<NotificationsState> emit,
  ) {
    if (state is NotificationsLoaded) {
      final currentState = state as NotificationsLoaded;
      final updatedNotifications = currentState.notifications.map((n) {
        if (n.id == event.id) {
          return n.copyWith(read: true);
        }
        return n;
      }).toList();
      
      emit(NotificationsLoaded(notifications: updatedNotifications));
    }
  }

  void _onNotificationsMarkAllAsRead(
    NotificationsMarkAllAsRead event,
    Emitter<NotificationsState> emit,
  ) {
    if (state is NotificationsLoaded) {
      final currentState = state as NotificationsLoaded;
      final updatedNotifications = currentState.notifications
          .map((n) => n.copyWith(read: true))
          .toList();
      
      emit(NotificationsLoaded(notifications: updatedNotifications));
    }
  }

  void _onNotificationDelete(
    NotificationDelete event,
    Emitter<NotificationsState> emit,
  ) {
    if (state is NotificationsLoaded) {
      final currentState = state as NotificationsLoaded;
      final updatedNotifications = currentState.notifications
          .where((n) => n.id != event.id)
          .toList();
      
      emit(NotificationsLoaded(notifications: updatedNotifications));
    }
  }
}
