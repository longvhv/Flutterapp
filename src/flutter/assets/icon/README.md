# App Icon Assets

## 📱 Required Icon Files

Place your app icons in this directory:

### Production Icon
- **app_icon.png** (1024x1024px) - Main app icon for production
- **app_icon_foreground.png** (1024x1024px) - Adaptive icon foreground

### Development Icons
- **app_icon_dev.png** (1024x1024px) - Dev flavor icon (green theme)
- **app_icon_staging.png** (1024x1024px) - Staging flavor icon (orange theme)

## 🎨 Icon Design Guidelines

### Size Requirements
- **1024x1024px** - Base size for all icons
- **PNG format** with transparency
- **RGB color mode**

### Android Adaptive Icons
- **Foreground:** Content should be in safe zone (66% center)
- **Background:** Solid color defined in pubspec.yaml
- **Icon will be masked** to different shapes (circle, squircle, rounded square)

### Design Tips
1. Keep important content in the **safe zone** (center 66%)
2. Use **high contrast** colors
3. Avoid **fine details** that won't be visible at small sizes
4. Test on **multiple devices** and launchers
5. Different colors for different flavors:
   - **Prod:** Blue (#3B82F6)
   - **Dev:** Green (#10B981)
   - **Staging:** Orange (#F59E0B)

## 🛠️ Generate Icons

After placing your icon files, run:

```bash
flutter pub get
flutter pub run flutter_launcher_icons
```

This will generate all required icon sizes for Android.

## 📐 Template Sizes

Icons will be generated in these sizes:
- **mipmap-mdpi:** 48x48px
- **mipmap-hdpi:** 72x72px
- **mipmap-xhdpi:** 96x96px
- **mipmap-xxhdpi:** 144x144px
- **mipmap-xxxhdpi:** 192x192px

## 🎯 Current Placeholders

We've created placeholder icons for you to replace:
- ✅ Simple gradient designs
- ✅ Flavor-specific colors
- ✅ Letter "V" logo

**Replace these with your actual brand icons!**
