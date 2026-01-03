# 🚀 VHV Enterprise App

Enterprise-grade mobile application built with Flutter and VHV Widgets, featuring Material Design principles, gradient effects, and 14 core features.

![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?logo=flutter)
![Dart](https://img.shields.io/badge/Dart-3.x-0175C2?logo=dart)
![Android](https://img.shields.io/badge/Android-7.0%2B-3DDC84?logo=android)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🔐 Authentication
- **Login** - Email/password authentication with remember me
- **Register** - Account creation with validation
- **Forgot Password** - Password reset flow with email verification

### 📊 Dashboard
- **Home Screen** - Stats cards, activity feed, quick actions
- **Real-time Data** - Live updates with shimmer loading
- **Gradient Design** - Beautiful 3-color gradients

### 🔔 Notifications
- **Notification Center** - Categorized notifications
- **Tab Views** - All/Unread filtering
- **Mark as Read** - Individual and bulk actions

### ⚙️ Settings & Profile
- **Profile Management** - Edit profile with avatar
- **Change Password** - Password strength validation
- **Device Management** - View and remove devices
- **Privacy Settings** - Control privacy and security
- **Language Selection** - Support for 8 languages

### 💬 Support
- **Help Center** - Categorized help articles
- **FAQ** - Searchable Q&A with categories
- **What's New** - Version history and features

---

## 🎨 Design

### Material Design Principles
- ✅ Gradient backgrounds (3-color linear gradients)
- ✅ Elevation shadows and rounded corners
- ✅ Smooth animations (hover scale 1.02, tap scale 0.98)
- ✅ Bottom navigation with VHV widgets
- ✅ Sliver app bars with collapsing headers

### Color Palette
```dart
Primary Blue:   #3B82F6
Purple:         #9333EA
Pink:           #EC4899
Green:          #10B981
Orange:         #F97316
Yellow:         #F59E0B
```

### VHV Widgets (33 Components)
- **Form & Input** (10): VHVForm, VHVTextField, VHVButton, etc.
- **Layout** (8): VHVCard, VHVGridView, VHVListView, etc.
- **Navigation** (4): VHVBottomNavigationBar, VHVTabBar, etc.
- **Display** (7): VHVAvatar, VHVChip, VHVText, etc.
- **Feedback** (4): VHVToast, VHVDialog, VHVLoadManager, VHVShimmer

---

## 🚀 Quick Start

### Prerequisites
- Flutter SDK 3.x or higher
- Dart 3.x or higher
- Android Studio or VS Code
- Android SDK (API 24+)

### Installation

```bash
# Clone repository
git clone https://github.com/your-repo/vhv-enterprise-app.git
cd vhv-enterprise-app/flutter

# Install dependencies
flutter pub get

# Run app (debug)
flutter run

# Run with specific flavor
flutter run --flavor dev
```

### Build

```bash
# Debug APK
flutter build apk --debug

# Release APK (split per architecture)
flutter build apk --release --split-per-abi

# App Bundle (for Google Play)
flutter build appbundle --release

# With specific flavor
flutter build apk --release --flavor prod
```

---

## 📦 Project Structure

```
flutter/
├── lib/
│   ├── main.dart                          # App entry point
│   ├── core/
│   │   ├── routes/
│   │   │   └── app_router.dart           # Navigation setup
│   │   ├── services/
│   │   │   ├── firebase_service.dart     # FCM service
│   │   │   └── notification_service.dart # Local notifications
│   │   └── widgets/
│   │       └── vhv_bottom_nav.dart       # Bottom navigation
│   └── features/
│       ├── auth/                          # Authentication (3 pages)
│       ├── home/                          # Dashboard (1 page)
│       ├── notifications/                 # Notifications (1 page)
│       ├── settings/                      # Settings (1 page)
│       ├── profile/                       # Profile (2 pages)
│       ├── devices/                       # Devices (1 page)
│       ├── privacy/                       # Privacy (1 page)
│       ├── language/                      # Language (1 page)
│       └── help/                          # Help (3 pages)
├── android/                               # Android configuration
├── assets/                                # App assets
├── pubspec.yaml                           # Dependencies
└── README.md                              # This file
```

---

## 🔧 Configuration

### Build Flavors

We have 3 build flavors configured:

#### Development
```bash
flutter run --flavor dev
# Package: com.vhvplatform.enterprise_app.dev
# App Name: "VHV App (Dev)"
```

#### Staging
```bash
flutter run --flavor staging
# Package: com.vhvplatform.enterprise_app.staging
# App Name: "VHV App (Staging)"
```

#### Production
```bash
flutter run --flavor prod
# Package: com.vhvplatform.enterprise_app
# App Name: "VHV App"
```

### Android Build

See detailed build guide: [android/BUILD_GUIDE.md](android/BUILD_GUIDE.md)

#### Generate Release Keystore
```bash
keytool -genkey -v -keystore ~/upload-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

#### Configure Signing
```bash
cp android/key.properties.example android/key.properties
# Edit key.properties with your keystore details
```

---

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project: "VHV Enterprise App"
3. Add Android app with package: `com.vhvplatform.enterprise_app`

### 2. Download Configuration
```bash
# Download google-services.json from Firebase Console
# Place in: android/app/google-services.json
```

### 3. Initialize in Code
```dart
// Already configured in lib/core/services/firebase_service.dart
await Firebase.initializeApp();
await FirebaseService().initialize();
```

See complete guide: [android/FIREBASE_SETUP.md](android/FIREBASE_SETUP.md)

---

## 📱 App Icons & Splash Screen

### Generate Placeholder Icons
```bash
cd assets/icon
python3 create_icons.py
cd ../..
```

### Generate Icons for Android
```bash
flutter pub run flutter_launcher_icons
```

### Generate Splash Screen
```bash
flutter pub run flutter_native_splash:create
```

See guides:
- [assets/icon/README.md](assets/icon/README.md)
- [assets/splash/README.md](assets/splash/README.md)

---

## 📸 Screenshots

### Take Screenshots Automatically
```bash
# Linux/Mac
chmod +x take_screenshots.sh
./take_screenshots.sh

# Windows
take_screenshots.bat
```

### Manual Screenshots
1. Build release app: `flutter run --release`
2. Navigate to each screen
3. Take screenshot (Power + Volume Down)
4. Add device frames at [appure.io](https://appure.io/)

See guide: [assets/screenshots/README.md](assets/screenshots/README.md)

---

## 🧪 Testing

```bash
# Run all tests
flutter test

# Run specific test
flutter test test/features/auth/login_test.dart

# Run with coverage
flutter test --coverage

# Integration tests
flutter test integration_test/
```

---

## 📊 Dependencies

### Core
- `flutter` - Flutter SDK
- `vhv_widgets` - VHV Widgets library (GitHub)

### State Management
- `flutter_bloc` ^8.1.3 - BLoC pattern
- `equatable` ^2.0.5 - Value equality

### Navigation
- `go_router` ^12.0.0 - Declarative routing

### Firebase
- `firebase_core` ^2.24.2 - Firebase core
- `firebase_messaging` ^14.7.9 - Push notifications
- `firebase_analytics` ^10.8.0 - Analytics

### Utilities
- `flutter_local_notifications` ^16.3.0 - Local notifications
- `http` ^1.1.0 - HTTP client
- `shared_preferences` ^2.2.2 - Local storage
- `intl` ^0.18.1 - Internationalization

### Dev Tools
- `flutter_launcher_icons` ^0.13.1 - Icon generator
- `flutter_native_splash` ^2.3.8 - Splash screen generator

---

## 📚 Documentation

### Main Guides
- [FINAL_SETUP_SUMMARY.md](FINAL_SETUP_SUMMARY.md) - Complete setup summary
- [SETUP_COMPLETE_ALL.md](SETUP_COMPLETE_ALL.md) - Detailed overview
- [ANDROID_BUILD_READY.md](ANDROID_BUILD_READY.md) - Quick start (Vietnamese)

### Android Build
- [android/BUILD_GUIDE.md](android/BUILD_GUIDE.md) - Complete build guide
- [android/SETUP_COMPLETE.md](android/SETUP_COMPLETE.md) - Config summary

### Firebase
- [android/FIREBASE_SETUP.md](android/FIREBASE_SETUP.md) - FCM setup guide

### VHV Widgets
- [MIGRATION_COMPLETE.md](MIGRATION_COMPLETE.md) - Migration summary
- [USAGE_VHV_WIDGETS.md](USAGE_VHV_WIDGETS.md) - Widget usage
- [lib/core/widgets/vhv_widgets_mapping.md](lib/core/widgets/vhv_widgets_mapping.md) - Component mapping

### Assets
- [assets/icon/README.md](assets/icon/README.md) - App icon guide
- [assets/splash/README.md](assets/splash/README.md) - Splash screen guide
- [assets/screenshots/README.md](assets/screenshots/README.md) - Screenshot guide

---

## 🛠️ Development Commands

```bash
# Run app
flutter run
flutter run --flavor dev

# Build APK
flutter build apk --debug
flutter build apk --release --split-per-abi

# Build App Bundle
flutter build appbundle --release

# Generate icons
flutter pub run flutter_launcher_icons

# Generate splash
flutter pub run flutter_native_splash:create

# Analyze code
flutter analyze

# Format code
flutter format lib/

# Clean build
flutter clean
flutter pub get

# Check dependencies
flutter pub outdated
```

---

## 🔐 Security

### Protected Files (Never Commit)
- ❌ `android/key.properties`
- ❌ `android/app/google-services.json`
- ❌ `*.jks` / `*.keystore` files
- ❌ API keys and secrets

### Already Configured
- ✅ `.gitignore` for all sensitive files
- ✅ ProGuard obfuscation for release builds
- ✅ Debug vs Release keystores separated

---

## 📱 Device Compatibility

### Android
- **Minimum:** Android 7.0 (API 24)
- **Target:** Android 14 (API 34)
- **Architectures:** ARM 32-bit, ARM 64-bit, x86 64-bit

### Screen Sizes
- Phone (all sizes)
- 7" Tablet
- 10" Tablet

---

## 🌍 Localization

Currently showing UI for 8 languages:
- 🇺🇸 English (en-US)
- 🇻🇳 Vietnamese (vi-VN)
- 🇪🇸 Spanish (es-ES)
- 🇫🇷 French (fr-FR)
- 🇩🇪 German (de-DE)
- 🇯🇵 Japanese (ja-JP)
- 🇰🇷 Korean (ko-KR)
- 🇨🇳 Chinese (zh-CN)

Add more in: `lib/features/language/presentation/pages/language_page_vhv.dart`

---

## 🚢 Deployment

### Google Play Store

1. **Prepare Release**
   ```bash
   flutter build appbundle --release --flavor prod
   ```

2. **Upload to Play Console**
   - Go to [Google Play Console](https://play.google.com/console)
   - Upload `app-prod-release.aab`
   - Fill in store listing details
   - Submit for review

### Internal Testing
```bash
# Build APK for testing
flutter build apk --release --split-per-abi --flavor prod

# Install on device
adb install build/app/outputs/flutter-apk/app-arm64-v8a-release.apk
```

---

## 🐛 Troubleshooting

### Build Issues
```bash
flutter clean
flutter pub get
cd android && ./gradlew clean && cd ..
flutter build apk
```

### Gradle Issues
```bash
cd android
./gradlew clean
./gradlew build --stacktrace
```

### Firebase Issues
- Verify `google-services.json` is in `android/app/`
- Check package name matches Firebase Console
- Run `flutter pub get`

### Icon/Splash Issues
```bash
flutter clean
flutter pub get
flutter pub run flutter_launcher_icons
flutter pub run flutter_native_splash:create
```

---

## 📞 Support

### Issues & Bugs
- Check [Documentation](#-documentation) first
- Run `flutter doctor -v` to check setup
- Check `flutter logs` for errors

### Contributing
Pull requests are welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 Roadmap

### v1.0.0 (Current)
- ✅ 14 core features
- ✅ VHV Widgets integration
- ✅ Android build configuration
- ✅ Firebase Cloud Messaging

### v1.1.0 (Planned)
- [ ] iOS support
- [ ] Dark mode
- [ ] Biometric authentication
- [ ] Offline mode

### v1.2.0 (Future)
- [ ] Real-time chat
- [ ] File uploads
- [ ] Advanced analytics
- [ ] Multi-language content

---

## 👥 Contributors

- **Your Name** - Initial work

---

## 🙏 Acknowledgments

- [Flutter Team](https://flutter.dev/) - Amazing framework
- [VHV Platform](https://github.com/vhvplatform) - VHV Widgets library
- [Firebase](https://firebase.google.com/) - Backend services
- [Material Design](https://material.io/) - Design guidelines

---

## 📈 Stats

- **14 Features** implemented
- **33 VHV Widgets** used
- **~3,500 lines** of Dart code
- **12 Documentation** files
- **3 Build flavors** configured
- **100% Ready** for production

---

**Made with ❤️ using Flutter & VHV Widgets**

**Happy Coding! 🚀**
