# 🔧 Android Build Configuration Guide

## 📋 Prerequisites

- Flutter SDK installed
- Android Studio or Android SDK installed
- JDK 11 or higher
- Gradle (comes with Flutter)

## 🚀 Quick Start

### 1. Setup Flutter SDK Path

Tự động khi chạy `flutter` commands, hoặc thêm vào `android/local.properties`:

```properties
flutter.sdk=/path/to/flutter/sdk
```

### 2. Debug Build (No keystore needed)

```bash
cd flutter

# Clean build
flutter clean
flutter pub get

# Run on device
flutter run

# Build debug APK
flutter build apk --debug

# Build debug APK for specific flavor
flutter build apk --debug --flavor dev
```

**Output:** `build/app/outputs/flutter-apk/app-debug.apk`

---

## 🔐 Release Build Setup

### Step 1: Generate Keystore

```bash
keytool -genkey -v -keystore ~/upload-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

**Prompts:**
- Enter keystore password: `YourStrongPassword123!`
- Re-enter password: `YourStrongPassword123!`
- Enter key password: `YourStrongPassword123!` (or press Enter to use same)
- What is your first and last name?: `Your Name`
- What is the name of your organizational unit?: `Development`
- What is the name of your organization?: `VHV Platform`
- What is the name of your City or Locality?: `Hanoi`
- What is the name of your State or Province?: `Vietnam`
- What is the two-letter country code for this unit?: `VN`
- Is CN=..., correct?: `yes`

### Step 2: Configure Key Properties

Copy `key.properties.example` to `key.properties`:

```bash
cp android/key.properties.example android/key.properties
```

Edit `android/key.properties`:

```properties
storePassword=YourStrongPassword123!
keyPassword=YourStrongPassword123!
keyAlias=upload
storeFile=/Users/yourname/upload-keystore.jks
```

⚠️ **IMPORTANT:** Add `key.properties` to `.gitignore` (already configured)

### Step 3: Build Release APK

```bash
# Build release APK
flutter build apk --release

# Build release APK for specific flavor
flutter build apk --release --flavor prod

# Build split APKs per architecture (smaller size)
flutter build apk --release --split-per-abi
```

**Outputs:**
- Universal: `build/app/outputs/flutter-apk/app-release.apk`
- Split: `build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk`
- Split: `build/app/outputs/flutter-apk/app-arm64-v8a-release.apk`
- Split: `build/app/outputs/flutter-apk/app-x86_64-release.apk`

### Step 4: Build App Bundle (for Google Play)

```bash
# Build release AAB
flutter build appbundle --release

# Build AAB for specific flavor
flutter build appbundle --release --flavor prod
```

**Output:** `build/app/outputs/bundle/release/app-release.aab`

---

## 🎯 Build Flavors

We have 3 flavors configured:

### 1. **Dev** (Development)
```bash
flutter build apk --flavor dev
```
- Package: `com.vhvplatform.enterprise_app.dev`
- App Name: "VHV App (Dev)"
- Icon: Same as prod (can be customized)

### 2. **Staging** (Testing)
```bash
flutter build apk --flavor staging
```
- Package: `com.vhvplatform.enterprise_app.staging`
- App Name: "VHV App (Staging)"
- Icon: Same as prod (can be customized)

### 3. **Prod** (Production)
```bash
flutter build apk --flavor prod
```
- Package: `com.vhvplatform.enterprise_app`
- App Name: "VHV App"
- Default production build

---

## 📦 Build Variants

### Debug Builds
- Signing: Debug keystore (auto-generated)
- Minification: Disabled
- Package suffix: `.debug`
- Debuggable: Yes

### Release Builds
- Signing: Your upload keystore
- Minification: Enabled (ProGuard)
- Shrink resources: Enabled
- Debuggable: No
- Optimized for size and performance

### Profile Builds
```bash
flutter build apk --profile
```
- Same as debug but with performance profiling enabled

---

## 🛠️ Build Commands Cheat Sheet

```bash
# Clean build artifacts
flutter clean

# Get dependencies
flutter pub get

# Analyze code
flutter analyze

# Run tests
flutter test

# Debug on device
flutter run

# Debug with flavor
flutter run --flavor dev

# Hot reload (in running app)
# Press 'r' in terminal

# Hot restart (in running app)
# Press 'R' in terminal

# Build debug APK
flutter build apk --debug

# Build release APK (universal)
flutter build apk --release

# Build release APK (split per ABI - smaller)
flutter build apk --release --split-per-abi

# Build release App Bundle
flutter build appbundle --release

# Build with specific flavor
flutter build apk --release --flavor prod

# Build with obfuscation
flutter build apk --release --obfuscate --split-debug-info=./debug-info

# Build for specific architecture only
flutter build apk --release --target-platform android-arm64

# Install APK to device
flutter install

# Check APK size
flutter build apk --release --analyze-size
```

---

## 📱 Install & Test

### Install Debug APK
```bash
# Build and install debug
flutter run

# Or manually
adb install build/app/outputs/flutter-apk/app-debug.apk
```

### Install Release APK
```bash
# Build
flutter build apk --release

# Install
adb install build/app/outputs/flutter-apk/app-release.apk

# Or using flutter
flutter install --release
```

### Test Release Build
```bash
# Test on device
flutter run --release

# Test with flavor
flutter run --release --flavor prod
```

---

## 🔍 Troubleshooting

### Issue: Keystore not found
```
Error: storeFile not found
```
**Solution:** Check `key.properties` file path is correct

### Issue: Gradle build failed
```
FAILURE: Build failed with an exception
```
**Solution:**
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
flutter build apk --release
```

### Issue: Out of memory
```
OutOfMemoryError: Java heap space
```
**Solution:** Already configured in `gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4G
```

### Issue: SDK version mismatch
```
Android SDK version mismatch
```
**Solution:** Update `compileSdkVersion` and `targetSdkVersion` in `android/app/build.gradle`

### Issue: App not installing
```
INSTALL_FAILED_UPDATE_INCOMPATIBLE
```
**Solution:** Uninstall old version first:
```bash
adb uninstall com.vhvplatform.enterprise_app
```

---

## 📊 Build Optimization

### Reduce APK Size

1. **Split per ABI:**
```bash
flutter build apk --release --split-per-abi
```

2. **Remove unused code:**
Already enabled in `build.gradle`:
```gradle
minifyEnabled true
shrinkResources true
```

3. **Analyze size:**
```bash
flutter build apk --release --analyze-size
```

### Improve Build Speed

1. **Enable Gradle daemon:** (already enabled in `gradle.properties`)
2. **Increase heap size:** (already set to 4GB)
3. **Use build cache:**
```bash
flutter build apk --release --build-number=1 --build-name=1.0.0
```

---

## 🚀 Publishing to Google Play

### 1. Prepare Release

```bash
# Build App Bundle
flutter build appbundle --release --flavor prod

# Output: build/app/outputs/bundle/prodRelease/app-prod-release.aab
```

### 2. Test Bundle

```bash
# Install using bundletool
bundletool build-apks --bundle=app-release.aab --output=app.apks
bundletool install-apks --apks=app.apks
```

### 3. Upload to Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app or select existing
3. Go to "Release" → "Production"
4. Upload `app-prod-release.aab`
5. Fill in release details
6. Submit for review

### 4. Version Management

Update in `pubspec.yaml`:
```yaml
version: 1.0.0+1  # 1.0.0 = versionName, 1 = versionCode
```

Or pass in build command:
```bash
flutter build appbundle --release --build-number=2 --build-name=1.0.1
```

---

## 📋 Checklist Before Release

- [ ] Update `pubspec.yaml` version
- [ ] Test all features on physical device
- [ ] Test on different Android versions (min API 24)
- [ ] Test with/without internet
- [ ] Verify app permissions
- [ ] Check ProGuard rules (no crashes after minification)
- [ ] Test deep links
- [ ] Verify app icon and splash screen
- [ ] Check app name in launcher
- [ ] Test app bundle before uploading
- [ ] Prepare release notes
- [ ] Take screenshots for Play Store
- [ ] Backup keystore file securely

---

## 🔐 Security Notes

1. **Never commit keystore files** - Already in `.gitignore`
2. **Never commit `key.properties`** - Already in `.gitignore`
3. **Backup keystore securely** - Store in password manager
4. **Use strong passwords** - Minimum 12 characters
5. **Enable Google Play App Signing** - Recommended for production

---

## 📞 Support

If you encounter issues:
1. Check Flutter doctor: `flutter doctor -v`
2. Check Android licenses: `flutter doctor --android-licenses`
3. Clean and rebuild: `flutter clean && flutter pub get`
4. Check logs: `flutter logs` or `adb logcat`

---

## 🎉 Success!

If everything is configured correctly, you should be able to:

✅ Build debug APKs  
✅ Build release APKs  
✅ Build App Bundles  
✅ Install on devices  
✅ Publish to Google Play  

**Happy Building! 🚀**
