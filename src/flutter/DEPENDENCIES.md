# 📦 Dependencies Guide

## Overview

This project uses **60+ Flutter packages** for a production-ready enterprise application.

---

## 🔧 Environment

```yaml
SDK: '>=3.8.0 <4.0.0'
Flutter: '>=3.38.0'
```

---

## 📚 Dependencies Breakdown

### 🎨 VHV Widgets & UI
| Package | Version | Purpose |
|---------|---------|---------|
| `vhv_widgets` | GitHub | VHV Platform widget library |
| `material_design_icons_flutter` | ^7.0.7296 | Material Design icons |
| `flutter_svg` | ^2.0.10+1 | SVG rendering |
| `cupertino_icons` | ^1.0.8 | iOS-style icons |

### 🖼️ Images & Caching
| Package | Version | Purpose |
|---------|---------|---------|
| `cached_network_image` | ^3.4.1 | Network image caching |

### ✨ Animations & Effects
| Package | Version | Purpose |
|---------|---------|---------|
| `shimmer` | ^3.0.0 | Shimmer loading effect |
| `lottie` | ^3.1.2 | Lottie animations |
| `animate_do` | ^3.2.0 | Pre-built animations |
| `flutter_animate` | ^4.4.0 | Advanced animations |

### 🏗️ State Management - BLoC
| Package | Version | Purpose |
|---------|---------|---------|
| `flutter_bloc` | ^8.1.6 | BLoC for Flutter |
| `bloc` | ^8.1.4 | Core BLoC library |
| `bloc_concurrency` | ^0.2.5 | Concurrent event handling |
| `equatable` | ^2.0.5 | Value equality |
| `hydrated_bloc` | ^9.1.5 | Persistent BLoC state |
| `replay_bloc` | ^0.2.7 | Time-travel debugging |

### 🏗️ State Management - Riverpod
| Package | Version | Purpose |
|---------|---------|---------|
| `flutter_riverpod` | ^2.6.1 | Riverpod state management |

### 🧭 Navigation
| Package | Version | Purpose |
|---------|---------|---------|
| `go_router` | ^14.2.7 | Declarative routing |

### 💾 Local Storage
| Package | Version | Purpose |
|---------|---------|---------|
| `shared_preferences` | ^2.3.2 | Simple key-value storage |
| `hive` | ^2.2.3 | Fast NoSQL database |
| `hive_flutter` | ^1.1.0 | Hive Flutter integration |
| `flutter_secure_storage` | ^9.2.2 | Encrypted storage |

### 🌐 Networking
| Package | Version | Purpose |
|---------|---------|---------|
| `http` | ^1.2.2 | HTTP client |
| `dio` | ^5.7.0 | Advanced HTTP client |
| `connectivity_plus` | ^6.1.0 | Network connectivity |

### 📝 Forms & Validation
| Package | Version | Purpose |
|---------|---------|---------|
| `flutter_form_builder` | ^10.2.0 | Form builder |
| `form_builder_validators` | ^11.0.0 | Form validators |

### 🌍 Internationalization
| Package | Version | Purpose |
|---------|---------|---------|
| `intl` | ^0.20.2 | Internationalization |
| `flutter_localized_locales` | ^2.0.0 | Locale names |

### 🔐 Security & Authentication
| Package | Version | Purpose |
|---------|---------|---------|
| `local_auth` | ^2.3.0 | Biometric authentication |

### 📱 Device Info
| Package | Version | Purpose |
|---------|---------|---------|
| `device_info_plus` | ^11.1.0 | Device information |
| `package_info_plus` | ^8.1.0 | Package information |

### 🔗 Utilities
| Package | Version | Purpose |
|---------|---------|---------|
| `url_launcher` | ^6.3.1 | Launch URLs |
| `share_plus` | ^10.1.2 | Share content |
| `path_provider` | ^2.1.5 | File paths |

### 📸 Media Pickers
| Package | Version | Purpose |
|---------|---------|---------|
| `image_picker` | ^1.1.2 | Pick images |
| `file_picker` | ^8.1.4 | Pick files |
| `permission_handler` | ^11.3.1 | Handle permissions |

### 📊 Charts & Visualizations
| Package | Version | Purpose |
|---------|---------|---------|
| `fl_chart` | ^0.69.0 | Beautiful charts |

### 📱 QR Code
| Package | Version | Purpose |
|---------|---------|---------|
| `qr_flutter` | ^4.1.0 | Generate QR codes |
| `mobile_scanner` | ^5.2.3 | Scan QR codes |

### 📅 Calendar
| Package | Version | Purpose |
|---------|---------|---------|
| `table_calendar` | ^3.1.2 | Calendar widget |

### 📄 Markdown
| Package | Version | Purpose |
|---------|---------|---------|
| `flutter_markdown` | ^0.7.3+1 | Markdown rendering |

### 🎯 UI Interactions
| Package | Version | Purpose |
|---------|---------|---------|
| `pull_to_refresh` | ^2.0.0 | Pull-to-refresh |
| `fluttertoast` | ^8.2.4 | Toast messages |
| `awesome_dialog` | ^3.2.0 | Beautiful dialogs |
| `modal_bottom_sheet` | ^2.1.1 | Bottom sheets |
| `carousel_slider` | ^5.0.0 | Carousel slider |

### 📑 PDF
| Package | Version | Purpose |
|---------|---------|---------|
| `pdf` | ^3.11.0 | Generate PDFs |
| `printing` | ^5.13.0 | Print PDFs |

### 🔥 Firebase
| Package | Version | Purpose |
|---------|---------|---------|
| `firebase_core` | ^2.24.2 | Firebase core |
| `firebase_messaging` | ^14.7.9 | Push notifications |
| `firebase_analytics` | ^10.8.0 | Analytics |

### 🔔 Notifications
| Package | Version | Purpose |
|---------|---------|---------|
| `flutter_local_notifications` | ^16.3.0 | Local notifications |

### 🪵 Logging
| Package | Version | Purpose |
|---------|---------|---------|
| `logger` | ^2.4.0 | Advanced logging |

### 🧪 Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `flutter_test` | SDK | Testing framework |
| `flutter_lints` | ^6.0.0 | Linting rules |

---

## 🚀 Installation

```bash
# Install all dependencies
flutter pub get

# Update dependencies
flutter pub upgrade

# Check outdated packages
flutter pub outdated

# Analyze dependencies
flutter pub deps
```

---

## 📋 Removed Dependencies

The following packages were **removed** from the original setup:

- ❌ `build_runner` - Code generation (not needed)
- ❌ `hive_generator` - Hive code gen (not using)
- ❌ `freezed` - Code generation (not needed)
- ❌ `freezed_annotation` - Freezed annotations
- ❌ `rxdart` - Reactive programming (using BLoC)
- ❌ `json_serializable` - JSON serialization (not needed)
- ❌ `mockito` - Mocking (not in current scope)
- ❌ `mocktail` - Mocking (not in current scope)
- ❌ `flutter_launcher_icons` - Icon generation (manual now)
- ❌ `flutter_native_splash` - Splash generation (manual now)
- ❌ `very_good_analysis` - Strict linting (using flutter_lints)

---

## 🔄 Migration Notes

### From Old Setup to New

**State Management:**
- ✅ Kept: `flutter_bloc`, `bloc`, `equatable`
- ✅ Added: `hydrated_bloc`, `replay_bloc`, `bloc_concurrency`
- ✅ Added: `flutter_riverpod` (alternative option)

**Networking:**
- ✅ Kept: `http`
- ✅ Added: `dio` (advanced features)
- ✅ Added: `connectivity_plus` (network status)

**Storage:**
- ✅ Kept: `shared_preferences`, `hive`
- ✅ Added: `flutter_secure_storage` (encrypted)

**UI/UX:**
- ✅ Added: `shimmer`, `lottie`, `animate_do`, `flutter_animate`
- ✅ Added: `awesome_dialog`, `modal_bottom_sheet`
- ✅ Added: `pull_to_refresh`, `carousel_slider`

**Forms:**
- ✅ Added: `flutter_form_builder`, `form_builder_validators`

**Features:**
- ✅ Added: `fl_chart` (charts)
- ✅ Added: `qr_flutter`, `mobile_scanner` (QR codes)
- ✅ Added: `table_calendar` (calendar)
- ✅ Added: `pdf`, `printing` (PDF generation)
- ✅ Added: `local_auth` (biometrics)

---

## 📊 Package Statistics

| Category | Count |
|----------|-------|
| VHV & UI | 4 |
| Images & Caching | 1 |
| Animations | 4 |
| State Management | 8 |
| Navigation | 1 |
| Storage | 4 |
| Networking | 3 |
| Forms | 2 |
| i18n | 2 |
| Security | 1 |
| Device Info | 2 |
| Utilities | 3 |
| Media Pickers | 3 |
| Charts | 1 |
| QR Code | 2 |
| Calendar | 1 |
| Markdown | 1 |
| UI Interactions | 5 |
| PDF | 2 |
| Firebase | 3 |
| Notifications | 1 |
| Logging | 1 |
| **Total** | **55+** |

---

## 🔧 Common Commands

### Dependency Management
```bash
# Get dependencies
flutter pub get

# Upgrade all to latest compatible
flutter pub upgrade

# Upgrade specific package
flutter pub upgrade package_name

# Add new package
flutter pub add package_name

# Remove package
flutter pub remove package_name

# Check for outdated packages
flutter pub outdated

# Clean and reinstall
flutter clean
flutter pub get
```

### Dependency Analysis
```bash
# Show dependency tree
flutter pub deps

# Show direct dependencies only
flutter pub deps --no-dev

# Check for dependency conflicts
flutter pub deps --style=compact
```

### Version Constraints
```bash
# Use exact version
package_name: 1.2.3

# Use compatible version (^)
package_name: ^1.2.3  # >=1.2.3 <2.0.0

# Use range
package_name: '>=1.0.0 <2.0.0'

# Use latest
package_name: any  # Not recommended!
```

---

## 🐛 Troubleshooting

### Dependency Conflicts

```bash
# Clear pub cache
flutter pub cache clean
flutter pub cache repair

# Remove pubspec.lock and reinstall
rm pubspec.lock
flutter pub get

# Force upgrade all
flutter pub upgrade --major-versions
```

### Version Issues

```bash
# Check Flutter version
flutter --version

# Upgrade Flutter
flutter upgrade

# Check SDK compatibility
flutter doctor -v
```

### Build Issues

```bash
# Clean and rebuild
flutter clean
flutter pub get
flutter build apk
```

---

## 📚 Documentation Links

### State Management
- [BLoC Documentation](https://bloclibrary.dev/)
- [Riverpod Documentation](https://riverpod.dev/)

### UI Libraries
- [Material Design Icons](https://materialdesignicons.com/)
- [Lottie Files](https://lottiefiles.com/)
- [FL Chart](https://pub.dev/packages/fl_chart)

### Networking
- [Dio Documentation](https://pub.dev/packages/dio)
- [HTTP Package](https://pub.dev/packages/http)

### Storage
- [Hive Documentation](https://docs.hivedb.dev/)
- [Secure Storage](https://pub.dev/packages/flutter_secure_storage)

### Firebase
- [FlutterFire](https://firebase.flutter.dev/)
- [Firebase Console](https://console.firebase.google.com/)

---

## ✅ Best Practices

### 1. Version Pinning
```yaml
# Good - allows minor updates
package_name: ^1.2.3

# Bad - allows any version
package_name: any

# Use when needed - exact version
package_name: 1.2.3
```

### 2. Regular Updates
```bash
# Check monthly
flutter pub outdated

# Update gradually
flutter pub upgrade --dry-run
flutter pub upgrade
```

### 3. Dependency Audit
```bash
# Before production release
flutter pub outdated
flutter analyze
flutter test
```

### 4. Lock File
- ✅ Commit `pubspec.lock` to ensure consistent builds
- ✅ Update regularly but test thoroughly
- ✅ Review lock file changes in PRs

---

## 🎯 Next Steps

### Immediate
1. ✅ Run `flutter pub get`
2. ✅ Test app builds successfully
3. ✅ Verify all imports work

### Short Term
4. 📚 Review package documentation
5. 🧪 Test new features (charts, QR, PDF)
6. 🎨 Integrate new UI components

### Long Term
7. 📊 Monitor package updates
8. 🔄 Migrate to newer versions when stable
9. 🧹 Remove unused packages

---

## 📞 Support

### Issues?
1. Check package documentation
2. Search pub.dev issues
3. Review GitHub issues
4. Ask on Stack Overflow

### Useful Links
- [pub.dev](https://pub.dev/) - Package repository
- [Flutter Packages](https://docs.flutter.dev/packages-and-plugins)
- [Dart Packages](https://dart.dev/guides/packages)

---

**📦 Dependencies updated and ready to use!**

**Happy Coding! 🚀**
