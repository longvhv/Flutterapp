import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';

// Events
abstract class LanguageEvent extends Equatable {
  const LanguageEvent();

  @override
  List<Object?> get props => [];
}

class LanguageChanged extends LanguageEvent {
  final String languageCode;

  const LanguageChanged({required this.languageCode});

  @override
  List<Object?> get props => [languageCode];
}

// States
class LanguageState extends Equatable {
  final String languageCode;

  const LanguageState({this.languageCode = 'en'});

  @override
  List<Object?> get props => [languageCode];
}

// Bloc
class LanguageBloc extends HydratedBloc<LanguageEvent, LanguageState> {
  LanguageBloc() : super(const LanguageState()) {
    on<LanguageChanged>(_onLanguageChanged);
  }

  void _onLanguageChanged(
    LanguageChanged event,
    Emitter<LanguageState> emit,
  ) {
    emit(LanguageState(languageCode: event.languageCode));
  }

  @override
  LanguageState? fromJson(Map<String, dynamic> json) {
    try {
      return LanguageState(languageCode: json['languageCode'] ?? 'en');
    } catch (_) {
      return null;
    }
  }

  @override
  Map<String, dynamic>? toJson(LanguageState state) {
    return {'languageCode': state.languageCode};
  }
}
