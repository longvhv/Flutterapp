# 🚀 Android Build Configuration - Complete Setup

## ✅ Setup Complete!

All Android build configuration has been set up successfully.

---

## 📦 What's Configured

### 1. ✅ Gradle Configuration
- **build.gradle** - Root level with Kotlin 1.9.22 & Firebase
- **app/build.gradle** - Complete with flavors, signing, ProGuard
- **gradle.properties** - Optimized build settings
- **settings.gradle** - Plugin management

### 2. ✅ Build Flavors (3)
- **dev** - Development environment
- **staging** - Staging environment  
- **prod** - Production environment

### 3. ✅ Build Types
- **debug** - Debug builds with debug keystore
- **release** - Release builds with ProGuard & signing

### 4. ✅ Security & Obfuscation
- **ProGuard** rules configured
- **R8** full mode enabled
- **Resource shrinking** enabled
- **Code optimization** enabled

### 5. ✅ App Configuration
- **AndroidManifest.xml** - Complete with permissions
- **MainActivity.kt** - Kotlin with native channels
- **Styles** - Material Design themes
- **Colors** - App color palette
- **Resources** - Launch screen, icons, XML configs

### 6. ✅ Build Scripts
- **build-android.sh** - Bash script (Linux/Mac)
- **build-android.bat** - Batch script (Windows)

---

## 📁 File Structure

```
android/
├── app/
│   ├── build.gradle ✅                    # App-level Gradle config
│   ├── proguard-rules.pro ✅              # ProGuard rules
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml ✅     # App manifest
│           ├── kotlin/
│           │   └── .../MainActivity.kt ✅  # Main activity
│           └── res/
│               ├── drawable/
│               │   ├── launch_background.xml ✅
│               │   └── ic_notification.xml ✅
│               ├── values/
│               │   ├── styles.xml ✅
│               │   └── colors.xml ✅
│               └── xml/
│                   ├── file_paths.xml ✅
│                   ├── backup_rules.xml ✅
│                   └── data_extraction_rules.xml ✅
├── build.gradle ✅                        # Root-level Gradle
├── gradle.properties ✅                   # Gradle properties
├── settings.gradle ✅                     # Settings
├── key.properties.example ✅              # Keystore template
└── build-android.sh/.bat ✅               # Build scripts
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
flutter pub get
```

### 2. Run Debug Build
```bash
# Default (dev flavor)
flutter run

# Specific flavor
flutter run --flavor dev
flutter run --flavor staging
flutter run --flavor prod
```

### 3. Build APK
```bash
# Debug APK
flutter build apk --debug --flavor dev

# Release APK (requires keystore)
flutter build apk --release --flavor prod --split-per-abi
```

### 4. Build App Bundle
```bash
flutter build appbundle --release --flavor prod
```

---

## 🔑 Keystore Setup (Required for Release)

### Generate Keystore

```bash
keytool -genkey -v -keystore ~/upload-keystore.jks \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -alias upload
```

### Configure Signing

1. Copy example:
```bash
cp android/key.properties.example android/key.properties
```

2. Edit `android/key.properties`:
```properties
storeFile=/absolute/path/to/upload-keystore.jks
storePassword=your_store_password
keyAlias=upload
keyPassword=your_key_password
```

3. **IMPORTANT:** Never commit `key.properties` or keystore files!

---

## 🎯 Build Flavors

### Dev Flavor
```bash
flutter run --flavor dev
flutter build apk --flavor dev
```
- Package: `com.vhvplatform.enterprise_app.dev`
- App Name: "VHV App (Dev)"
- API: https://dev-api.vhvplatform.com
- Icon: Green theme

### Staging Flavor
```bash
flutter run --flavor staging
flutter build apk --flavor staging
```
- Package: `com.vhvplatform.enterprise_app.staging`
- App Name: "VHV App (Staging)"
- API: https://staging-api.vhvplatform.com
- Icon: Orange theme

### Prod Flavor
```bash
flutter run --flavor prod
flutter build apk --flavor prod
```
- Package: `com.vhvplatform.enterprise_app`
- App Name: "VHV App"
- API: https://api.vhvplatform.com
- Icon: Blue theme

---

## 🛠️ Build Scripts

### Linux/Mac

```bash
# Make executable
chmod +x build-android.sh

# Build APK
./build-android.sh apk prod release

# Build App Bundle
./build-android.sh appbundle prod release
```

### Windows

```cmd
REM Build APK
build-android.bat apk prod release

REM Build App Bundle
build-android.bat appbundle prod release
```

### Script Options
```
Usage: ./build-android.sh [build-type] [flavor] [mode]

build-type: apk, appbundle, aab
flavor: dev, staging, prod
mode: debug, release

Examples:
  ./build-android.sh apk dev debug
  ./build-android.sh apk prod release
  ./build-android.sh appbundle prod release
```

---

## 📊 Build Output

### APK Files

**Debug:**
```
build/app/outputs/flutter-apk/
  app-dev-debug.apk
  app-staging-debug.apk
  app-prod-debug.apk
```

**Release (Split):**
```
build/app/outputs/flutter-apk/
  app-arm64-v8a-prod-release.apk    (~20MB) - Modern phones
  app-armeabi-v7a-prod-release.apk  (~18MB) - Older phones
  app-x86_64-prod-release.apk       (~22MB) - Emulators
  app-prod-release.apk              (~55MB) - Universal
```

### App Bundle

**Release:**
```
build/app/outputs/bundle/prodRelease/
  app-prod-release.aab              (~52MB)
```

---

## 🔧 Native Features

### Method Channel

Access native Android features from Flutter:

```dart
// In Flutter
import 'package:flutter/services.dart';

const platform = MethodChannel('com.vhvplatform.enterprise_app/native');

// Get platform version
String version = await platform.invokeMethod('getPlatformVersion');

// Get device info
Map<String, dynamic> deviceInfo = await platform.invokeMethod('getDeviceInfo');

// Get build config
Map<String, dynamic> buildConfig = await platform.invokeMethod('getBuildConfig');
```

### Available Methods

1. **getPlatformVersion** - Returns Android version
2. **getDeviceInfo** - Returns device details
3. **getBuildConfig** - Returns build information

---

## 🔐 Security Features

### ProGuard Rules

Configured for:
- ✅ Flutter
- ✅ VHV Widgets
- ✅ Firebase
- ✅ Kotlin
- ✅ AndroidX
- ✅ Third-party libraries

### Code Obfuscation

```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles ...
    }
}
```

### Resource Optimization

```gradle
android.enableR8.fullMode=true
android.enableResourceOptimizations=true
```

---

## 📱 Permissions

Configured in AndroidManifest.xml:

### Required
- ✅ INTERNET
- ✅ ACCESS_NETWORK_STATE

### Notifications
- ✅ POST_NOTIFICATIONS
- ✅ VIBRATE
- ✅ WAKE_LOCK

### Camera & Storage
- ✅ CAMERA
- ✅ READ_EXTERNAL_STORAGE
- ✅ READ_MEDIA_IMAGES

### Biometric
- ✅ USE_BIOMETRIC
- ✅ USE_FINGERPRINT

---

## 🎨 App Resources

### Launcher Icon
- `@mipmap/ic_launcher` - Main icon
- `@mipmap/ic_launcher_round` - Round icon

### Notification Icon
- `@drawable/ic_notification` - White bell icon

### Launch Screen
- `@drawable/launch_background` - Gradient splash

### Colors
- `@color/primary_blue` - #3B82F6
- `@color/purple` - #9333EA
- `@color/notification_color` - #3B82F6

### Themes
- `LaunchTheme` - App launch theme
- `NormalTheme` - Main app theme

---

## 🔥 Firebase Integration

### Setup

1. Download `google-services.json` from Firebase Console
2. Place in `android/app/google-services.json`
3. Build app

### Flavor Support

For multiple Firebase projects:
```
android/app/src/
  dev/google-services.json
  staging/google-services.json
  prod/google-services.json
```

See: [android/FIREBASE_SETUP.md](FIREBASE_SETUP.md)

---

## 🧪 Testing

### Install APK
```bash
# Install specific ABI
adb install build/app/outputs/flutter-apk/app-arm64-v8a-prod-release.apk

# Install universal
adb install build/app/outputs/flutter-apk/app-prod-release.apk
```

### Test Release Build
```bash
flutter run --release --flavor prod
```

### Check Logs
```bash
# Flutter logs
flutter logs

# Android logs
adb logcat | grep flutter
```

---

## 📊 Build Configuration Details

### Gradle Version
- Android Gradle Plugin: **8.1.4**
- Kotlin: **1.9.22**
- Gradle: **8.0+** (wrapper)

### SDK Versions
- compileSdk: **34**
- targetSdk: **34**
- minSdk: **24** (Android 7.0+)

### Build Features
- ✅ Multi-dex enabled
- ✅ Vector drawables support
- ✅ Build config fields
- ✅ Split APKs by ABI
- ✅ Resource shrinking
- ✅ Code optimization

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clean and rebuild
flutter clean
flutter pub get
flutter build apk
```

### Gradle Issues

```bash
cd android
./gradlew clean
./gradlew build --stacktrace
cd ..
```

### Keystore Issues

- Check paths are absolute in `key.properties`
- Verify passwords are correct
- Ensure keystore file exists

### ProGuard Issues

If app crashes in release:
- Check `proguard-rules.pro`
- Add keep rules for your models
- Test with `flutter run --release`

---

## 📚 Documentation

### Complete Guides
- [BUILD_GUIDE.md](BUILD_GUIDE.md) - Comprehensive build guide
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Firebase setup
- [SETUP_COMPLETE.md](SETUP_COMPLETE.md) - Setup summary

### Quick References
- [Key Properties Example](key.properties.example)
- [ProGuard Rules](app/proguard-rules.pro)
- [Android Manifest](app/src/main/AndroidManifest.xml)

---

## ✅ Verification Checklist

Before releasing:

- [ ] Keystore generated and configured
- [ ] Firebase google-services.json added
- [ ] Release APK builds successfully
- [ ] App installs on physical device
- [ ] All features work in release mode
- [ ] ProGuard doesn't break functionality
- [ ] App icons are customized
- [ ] Package name is correct
- [ ] Version code/name updated
- [ ] Tested on multiple devices

---

## 🎯 Next Steps

### Immediate
1. ✅ Run debug build: `flutter run`
2. ✅ Test all flavors
3. ✅ Verify build scripts work

### Before Release
4. 🔑 Generate release keystore
5. 🔥 Setup Firebase project
6. 🎨 Customize app icons
7. 📸 Take screenshots

### Release
8. 🏗️ Build release APK/AAB
9. 🧪 Test on physical devices
10. 📝 Prepare Play Store listing
11. 🚀 Submit to Google Play

---

## 📞 Support

### Issues?
- Check documentation files
- Run `flutter doctor -v`
- Check `flutter logs`
- Review Gradle build output

### Resources
- [Flutter Build Guide](https://docs.flutter.dev/deployment/android)
- [Android Developer Docs](https://developer.android.com/)
- [Gradle Documentation](https://docs.gradle.org/)

---

**🎉 Android build configuration is complete and production-ready!**

**Build your first APK:**
```bash
flutter build apk --debug --flavor dev
```

**Happy Building! 🚀**
