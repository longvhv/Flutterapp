import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String id;
  final String email;
  final String fullName;
  final String? phoneNumber;
  final String? bio;
  final String? avatar;

  const User({
    required this.id,
    required this.email,
    required this.fullName,
    this.phoneNumber,
    this.bio,
    this.avatar,
  });

  User copyWith({
    String? id,
    String? email,
    String? fullName,
    String? phoneNumber,
    String? bio,
    String? avatar,
  }) {
    return User(
      id: id ?? this.id,
      email: email ?? this.email,
      fullName: fullName ?? this.fullName,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      bio: bio ?? this.bio,
      avatar: avatar ?? this.avatar,
    );
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      fullName: json['fullName'],
      phoneNumber: json['phoneNumber'],
      bio: json['bio'],
      avatar: json['avatar'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'fullName': fullName,
      'phoneNumber': phoneNumber,
      'bio': bio,
      'avatar': avatar,
    };
  }

  @override
  List<Object?> get props => [id, email, fullName, phoneNumber, bio, avatar];
}
