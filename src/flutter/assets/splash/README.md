# Splash Screen Assets

## 🌅 Splash Screen Configuration

Place your splash screen logo in this directory.

### Required File
- **splash_logo.png** (512x512px or larger) - Logo displayed during app launch

## 🎨 Design Guidelines

### Size & Format
- **Recommended:** 512x512px or 1024x1024px
- **Format:** PNG with transparency
- **Color:** Your brand colors
- **Background:** Transparent (background color set in config)

### Design Tips
1. **Keep it simple** - Logo should be recognizable at any size
2. **Use transparency** - Background color is set separately
3. **Center-aligned** - Logo will be centered on splash screen
4. **High resolution** - Use @3x size for sharpness
5. **Test on devices** - Check on different screen sizes

## 🎨 Current Configuration

In `pubspec.yaml`:
```yaml
flutter_native_splash:
  color: "#3B82F6"  # Background color (blue)
  image: "assets/splash/splash_logo.png"
  android_12: true  # Android 12+ splash API
```

## 🛠️ Generate Splash Screens

After placing your splash logo, run:

```bash
flutter pub get
flutter pub run flutter_native_splash:create
```

This will:
- ✅ Generate splash screens for all densities
- ✅ Configure Android 12+ splash API
- ✅ Update drawable resources
- ✅ Set background color

## 🔄 Remove Splash Screens

To remove generated splash screens:

```bash
flutter pub run flutter_native_splash:remove
```

## 📱 Preview

Splash screen will show:
1. **Background:** Blue (#3B82F6)
2. **Logo:** Your splash_logo.png (centered)
3. **Duration:** ~1-2 seconds (native loading time)

## ✨ Android 12+ Features

- ✅ Animated icon (if provided)
- ✅ Branding image support
- ✅ System-managed duration
- ✅ Smooth transition to app

## 🎯 Current Placeholder

We've created a placeholder logo:
- Simple "V" letter design
- Blue gradient theme
- Matches app icon style

**Replace with your actual brand logo!**
