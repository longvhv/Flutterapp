# 📱 App Screenshots for Google Play Store

## 📸 Screenshot Requirements

### Google Play Store Requirements

#### Phone Screenshots (Required)
- **Minimum:** 2 screenshots
- **Maximum:** 8 screenshots
- **Format:** JPEG or 24-bit PNG (no alpha)
- **Dimensions:** 
  - **Minimum:** 320px on shortest side
  - **Maximum:** 3840px on longest side
  - **Aspect ratio:** 16:9 to 9:16
- **Recommended:** 1080x1920px (portrait) or 1920x1080px (landscape)

#### 7-inch Tablet (Optional)
- Same as phone requirements
- Recommended: 1200x1920px

#### 10-inch Tablet (Optional)
- Same as phone requirements
- Recommended: 1600x2560px

### Best Practices

1. **Show actual app features** - Not marketing graphics
2. **Use device frames** - Makes screenshots look professional
3. **Localize** - Provide screenshots for each language
4. **Highlight features** - Show main features across screenshots
5. **High quality** - Use actual device screenshots, not emulators
6. **Consistent** - Same device frame and style

---

## 🎨 Recommended Tools

### Screenshot Tools

1. **Android Device**
   - Use physical device (best quality)
   - Power + Volume Down
   - adb shell screencap -p /sdcard/screenshot.png

2. **Android Studio Emulator**
   - Use high-resolution emulator
   - Camera icon in toolbar
   - Or: Tools → Device Manager → Screenshot

3. **Flutter Screenshot Package**
   ```bash
   flutter pub add screenshot
   ```

### Frame Tools

1. **Appure** - https://appure.io/ (Free)
2. **Shots.so** - https://shots.so/ (Free)
3. **MockuPhone** - https://mockuphone.com/ (Free)
4. **Previewed** - https://previewed.app/ (Paid)

### Editing Tools

1. **Canva** - https://canva.com (Free tier available)
2. **Figma** - https://figma.com (Free tier available)
3. **Photoshop** - Professional editing
4. **GIMP** - Free alternative to Photoshop

---

## 📐 Screenshot Template Sizes

### Phone (Portrait)
- **1080x1920px** - Full HD (recommended)
- **1440x2560px** - QHD
- **1242x2688px** - iPhone 11 Pro Max (for reference)

### Phone (Landscape)
- **1920x1080px** - Full HD
- **2560x1440px** - QHD

### 7-inch Tablet
- **1200x1920px** - Portrait
- **1920x1200px** - Landscape

### 10-inch Tablet
- **1600x2560px** - Portrait
- **2560x1600px** - Landscape

---

## 🎯 Screenshot Checklist

For our VHV Enterprise App, create screenshots showing:

### Screenshot 1: Login/Home Screen
- ✅ App logo clearly visible
- ✅ Clean, professional UI
- ✅ Gradient backgrounds

### Screenshot 2: Dashboard
- ✅ Stats cards with data
- ✅ Activity feed
- ✅ Quick actions

### Screenshot 3: Notifications
- ✅ Notification list
- ✅ Badge indicators
- ✅ Categories

### Screenshot 4: Profile/Settings
- ✅ User profile
- ✅ Settings options
- ✅ Professional layout

### Screenshot 5: Features Showcase
- ✅ Multiple features in one view
- ✅ Rich UI components
- ✅ Material Design

### Screenshot 6: Security Features
- ✅ Two-factor authentication
- ✅ Device management
- ✅ Privacy settings

### Screenshot 7: Help & Support
- ✅ Help center
- ✅ FAQ
- ✅ Support options

### Screenshot 8: What's New
- ✅ Version history
- ✅ New features
- ✅ Updates

---

## 🚀 How to Take Screenshots

### Method 1: Manual (Recommended for Quality)

```bash
# 1. Build and run app
flutter run --release

# 2. Navigate to screen you want to capture

# 3. Take screenshot from device
# Android: Power + Volume Down

# 4. Pull screenshot from device
adb pull /sdcard/Pictures/Screenshots/screenshot.png ./screenshots/raw/

# 5. Add device frame using online tool
```

### Method 2: Automated with Flutter

Create `screenshot_test.dart`:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:screenshot/screenshot.dart';

void main() {
  testWidgets('Take screenshots', (WidgetTester tester) async {
    final controller = ScreenshotController();
    
    // Build your widget
    await tester.pumpWidget(MyApp());
    
    // Navigate to screen
    await tester.tap(find.byKey(Key('login_button')));
    await tester.pumpAndSettle();
    
    // Take screenshot
    final image = await controller.capture();
    // Save image
  });
}
```

### Method 3: Integration Test

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  testWidgets('Screenshot tour', (tester) async {
    // 1. Launch app
    app.main();
    await tester.pumpAndSettle();
    
    // 2. Take login screenshot
    await tester.takeScreenshot('01-login');
    
    // 3. Login
    await tester.tap(find.text('Login'));
    await tester.pumpAndSettle();
    
    // 4. Take dashboard screenshot
    await tester.takeScreenshot('02-dashboard');
    
    // Continue for all screens...
  });
}
```

---

## 🎨 Screenshot Framing

### Step 1: Take Raw Screenshot

```bash
# On device or emulator
flutter run --release
# Take screenshots manually
```

### Step 2: Add Device Frame

Use one of these tools:

**Option A: Appure (Recommended)**
1. Go to https://appure.io/
2. Upload screenshots
3. Select device (e.g., Pixel 6)
4. Choose frame style
5. Download framed images

**Option B: Shots.so**
1. Go to https://shots.so/
2. Upload screenshot
3. Customize frame, background
4. Export high-res

**Option C: MockuPhone**
1. Go to https://mockuphone.com/
2. Select device
3. Upload screenshot
4. Download

### Step 3: Add Text Overlays (Optional)

Use Canva or Figma to add:
- Feature titles
- Key benefits
- Call-to-action text

---

## 📝 Naming Convention

```
screenshots/
├── phone/
│   ├── en-US/
│   │   ├── 01-login.png
│   │   ├── 02-dashboard.png
│   │   ├── 03-notifications.png
│   │   ├── 04-profile.png
│   │   ├── 05-settings.png
│   │   ├── 06-security.png
│   │   ├── 07-help.png
│   │   └── 08-whats-new.png
│   └── vi-VN/
│       ├── 01-login.png
│       └── ...
├── tablet-7/
│   └── en-US/
│       └── ...
└── tablet-10/
    └── en-US/
        └── ...
```

---

## 🌍 Localization

Create screenshots for each language:

- **en-US** - English (United States)
- **vi-VN** - Vietnamese (Vietnam)
- **es-ES** - Spanish (Spain)
- **fr-FR** - French (France)
- Add more as needed

---

## ✅ Screenshot Checklist

Before uploading to Play Store:

- [ ] Minimum 2, maximum 8 screenshots
- [ ] 1080x1920px or higher resolution
- [ ] JPEG or PNG format (no alpha for Play Store)
- [ ] Show actual app features
- [ ] Device frames added
- [ ] Text overlays (if using)
- [ ] All screenshots consistent style
- [ ] Localized versions (if supporting multiple languages)
- [ ] No blur or pixelation
- [ ] Proper lighting and contrast
- [ ] File size < 8MB per screenshot
- [ ] Named properly for organization

---

## 🎬 Video Preview (Optional)

Google Play also supports video:

### Requirements
- **Duration:** 30 seconds to 2 minutes
- **Format:** MPEG-4 or WebM
- **Resolution:** Minimum 720p
- **Aspect ratio:** 16:9 or 9:16
- **File size:** Maximum 100MB

### Tools
- **Screen recorder:** AZ Screen Recorder, Mobizen
- **Video editor:** Adobe Premiere, iMovie, DaVinci Resolve
- **Online editor:** Clipchamp, Kapwing

---

## 📊 Play Store Listing Assets

Complete asset list needed:

### Required
- ✅ App icon (512x512px)
- ✅ Feature graphic (1024x500px)
- ✅ Phone screenshots (2-8)

### Optional
- ⬜ 7-inch tablet screenshots
- ⬜ 10-inch tablet screenshots
- ⬜ Promo video (YouTube URL)
- ⬜ TV banner (1280x720px)

---

## 🎨 Feature Graphic Template

Create a 1024x500px graphic showing:
- App logo
- App name
- Key feature highlight
- Brand colors (use our gradient)

Tools:
- Canva template: Search "Google Play feature graphic"
- Figma template: Community templates available

---

## 📱 Example Screenshot Script

Save as `take_screenshots.sh`:

```bash
#!/bin/bash

# Take screenshots of VHV Enterprise App

echo "🚀 Starting VHV Enterprise App..."
flutter run --release &

echo "⏳ Waiting for app to launch..."
sleep 10

echo "📸 Ready to take screenshots!"
echo ""
echo "Manual steps:"
echo "1. Navigate to Login screen - Press Enter when ready"
read
adb exec-out screencap -p > screenshots/raw/01-login.png
echo "✓ Saved 01-login.png"

echo "2. Navigate to Dashboard - Press Enter when ready"
read
adb exec-out screencap -p > screenshots/raw/02-dashboard.png
echo "✓ Saved 02-dashboard.png"

echo "3. Navigate to Notifications - Press Enter when ready"
read
adb exec-out screencap -p > screenshots/raw/03-notifications.png
echo "✓ Saved 03-notifications.png"

# Continue for all screens...

echo "✅ All screenshots captured!"
echo "Next: Add device frames at https://appure.io/"
```

---

## 🎉 You're Ready!

Follow this guide to create professional screenshots for your Play Store listing.

**Next steps:**
1. Take raw screenshots of all key features
2. Add device frames
3. Add text overlays (optional)
4. Localize for target markets
5. Upload to Google Play Console

**Happy Screenshotting! 📸**
