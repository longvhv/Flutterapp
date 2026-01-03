# VHV Widgets Mapping Guide

## Hướng dẫn sử dụng VHV Widgets từ thư viện

Thư viện `vhv_widgets` cung cấp các widget cơ bản đã được tối ưu. Dưới đây là mapping từ các component web sang VHV Widgets.

## 📦 Import

```dart
import 'package:vhv_widgets/vhv_widgets.dart';
```

## 🗺️ Widget Mapping

### 1. **Layout Components**

| Web Component | VHV Widget | Usage |
|--------------|------------|-------|
| `<div>` container | `VHVContainer` | Layout container |
| `<section>` | `VHVCard` | Card/Section |
| Flexbox | `VHVRow`, `VHVColumn` | Flex layout |
| Grid | `VHVGridView` | Grid layout |

```dart
// Card
VHVCard(
  padding: EdgeInsets.all(16),
  borderRadius: BorderRadius.circular(12),
  child: VHVText('Content'),
)

// Grid
VHVGridView(
  crossAxisCount: 2,
  mainAxisSpacing: 12,
  crossAxisSpacing: 12,
  children: [...],
)
```

### 2. **Form Components**

| Web Component | VHV Widget | Usage |
|--------------|------------|-------|
| `<form>` | `VHVForm` | Form wrapper |
| `<input type="text">` | `VHVTextField` | Text input |
| `<input type="email">` | `VHVTextField` | Email input |
| `<input type="password">` | `VHVTextField` | Password input |
| `<input type="checkbox">` | `VHVCheckbox` | Checkbox |
| `<input type="radio">` | `VHVRadio` | Radio button |
| `<select>` | `VHVDropdown` | Dropdown |
| `<textarea>` | `VHVTextArea` | Text area |

```dart
// Text Field
VHVTextField(
  controller: _controller,
  label: 'Email',
  prefixIcon: Icon(Icons.email),
  validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
)

// Checkbox
VHVCheckbox(
  value: _checked,
  onChanged: (value) => setState(() => _checked = value),
)
```

### 3. **Button Components**

| Web Component | VHV Widget | Usage |
|--------------|------------|-------|
| `<button>` | `VHVButton` | Primary button |
| `<button>` (text) | `VHVTextButton` | Text button |
| `<button>` (icon) | `VHVIconButton` | Icon button |

```dart
// Primary Button
VHVButton(
  onPressed: () {},
  gradient: LinearGradient(colors: [Colors.blue, Colors.purple]),
  child: VHVText('Sign In'),
)

// Icon Button
VHVIconButton(
  icon: Icon(Icons.menu),
  onPressed: () {},
)
```

### 4. **Navigation Components**

| Web Component | VHV Widget | Usage |
|--------------|------------|-------|
| Bottom Nav | `VHVBottomNavigationBar` | Bottom navigation |
| App Bar | `VHVAppBar`, `VHVSliverAppBar` | Top bar |
| Drawer | `VHVDrawer` | Side menu |
| Tab Bar | `VHVTabBar` | Tabs |

```dart
// Bottom Navigation
VHVBottomNavigationBar(
  currentIndex: _index,
  onTap: (index) => setState(() => _index = index),
  items: [
    VHVBottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
  ],
)
```

### 5. **Text & Typography**

| Web Component | VHV Widget | Usage |
|--------------|------------|-------|
| `<h1>`, `<h2>`, etc | `VHVText` | Text with style |
| `<p>` | `VHVText` | Paragraph |
| `<span>` | `VHVText` | Inline text |

```dart
VHVText(
  'Hello World',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
  ),
)
```

### 6. **Media Components**

| Web Component | VHV Widget | Usage |
|--------------|------------|-------|
| `<img>` | `VHVImage`, `VHVNetworkImage` | Image |
| Avatar | `VHVAvatar` | User avatar |
| Video | `VHVVideoPlayer` | Video player |
| Audio | `VHVAudioPlayer` | Audio player |

```dart
// Avatar
VHVAvatar(
  radius: 24,
  imageUrl: 'https://...',
  fallback: Icon(Icons.person),
)

// Network Image
VHVNetworkImage(
  imageUrl: 'https://...',
  fit: BoxFit.cover,
  placeholder: VHVShimmer(),
)
```

### 7. **List Components**

| Web Component | VHV Widget | Usage |
|--------------|------------|-------|
| `<ul>`, `<ol>` | `VHVListView` | List |
| List item | `VHVListTile` | List item |

```dart
VHVListView(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return VHVListTile(
      leading: Icon(Icons.person),
      title: VHVText(items[index].title),
      subtitle: VHVText(items[index].subtitle),
      onTap: () {},
    );
  },
)
```

### 8. **Feedback Components**

| Web Component | VHV Widget | Usage |
|--------------|------------|-------|
| Toast/Snackbar | `VHVToast` | Toast message |
| Dialog | `VHVDialog` | Modal dialog |
| Alert | `VHVAlert` | Alert box |
| Loading | `VHVLoadManager` | Loading indicator |
| Shimmer | `VHVShimmer` | Loading skeleton |

```dart
// Toast
VHVToast.show(
  context: context,
  message: 'Success!',
  type: VHVToastType.success,
)

// Loading
await VHVLoadManager.show(
  context: context,
  loadingText: 'Loading...',
  future: apiCall(),
)

// Dialog
VHVDialog.show(
  context: context,
  title: 'Confirm',
  content: 'Are you sure?',
  actions: [
    VHVButton(child: VHVText('Cancel')),
    VHVButton(child: VHVText('OK')),
  ],
)
```

### 9. **Animation Components**

| Web Component | VHV Widget | Usage |
|--------------|------------|-------|
| Fade | `VHVFadeAnimation` | Fade effect |
| Scale | `VHVScaleAnimation` | Scale effect |
| Slide | `VHVSlideAnimation` | Slide effect |
| Animated Container | `VHVAnimatedContainer` | Animated box |

```dart
VHVAnimatedContainer(
  duration: Duration(milliseconds: 300),
  curve: Curves.easeInOut,
  width: _expanded ? 200 : 100,
  height: _expanded ? 200 : 100,
)
```

### 10. **Utility Components**

| Feature | VHV Widget | Usage |
|---------|------------|-------|
| Camera | `VHVCamera` | Camera capture |
| OTP Input | `VHVOTPInput` | OTP field |
| Image Picker | `VHVImagePicker` | Pick image |
| Date Picker | `VHVDatePicker` | Pick date |

```dart
// OTP Input
VHVOTPInput(
  length: 6,
  onCompleted: (code) {
    print('OTP: $code');
  },
)

// Image Picker
final image = await VHVImagePicker.pick(
  context: context,
  source: VHVImageSource.camera,
);
```

## 🎨 Theme Integration

VHV Widgets tự động sử dụng theme từ `ThemeData`:

```dart
MaterialApp(
  theme: ThemeData(
    primaryColor: Color(0xFF3B82F6),
    colorScheme: ColorScheme.fromSeed(
      seedColor: Color(0xFF3B82F6),
    ),
  ),
  // VHV Widgets sẽ tự động adapt với theme
)
```

## 📱 Responsive Design

VHV Widgets hỗ trợ responsive:

```dart
VHVResponsiveBuilder(
  mobile: (context) => MobileLayout(),
  tablet: (context) => TabletLayout(),
  desktop: (context) => DesktopLayout(),
)
```

## ✅ Best Practices

1. **Always use VHV widgets thay vì Material widgets khi có sẵn**
2. **Sử dụng VHVForm cho tất cả forms**
3. **Sử dụng VHVLoadManager cho loading states**
4. **Sử dụng VHVToast thay vì ScaffoldMessenger**
5. **Sử dụng VHVNetworkImage thay vì Image.network**

## 🔄 Migration từ Material Widgets

```dart
// ❌ Before (Material)
TextField(
  controller: controller,
  decoration: InputDecoration(labelText: 'Email'),
)

// ✅ After (VHV)
VHVTextField(
  controller: controller,
  label: 'Email',
)

// ❌ Before (Material)
ElevatedButton(
  onPressed: () {},
  child: Text('Submit'),
)

// ✅ After (VHV)
VHVButton(
  onPressed: () {},
  child: VHVText('Submit'),
)
```

## 📚 Resources

- GitHub: https://github.com/vhvplatform/flutter-vhv_widgets
- Documentation: Check README.md in repository
- Examples: See example folder in package
