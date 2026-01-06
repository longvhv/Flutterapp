# Material/Cupertino Widgets Migration

## 🎯 Chuyển đổi từ VHV Widgets sang Material/Cupertino Widgets

### ✅ Mapping Table

| VHV Widget | Material/Cupertino Equivalent | Notes |
|-----------|------------------------------|-------|
| `VHVCard` | `Card` | Dùng `Card` với `shape`, `elevation`, `child` |
| `VHVText` | `Text` | Direct replacement |
| `VHVAvatar` | `CircleAvatar` | Dùng `CircleAvatar` với `backgroundImage` hoặc `child` |
| `VHVChip` | `Chip` | Direct replacement với `label`, `backgroundColor` |
| `VHVToast` | `ScaffoldMessenger.showSnackBar` | Utility method thay vì widget |
| `VHVIconButton` | `IconButton` | Direct replacement |
| `VHVTextField` | `TextFormField` | Dùng `TextFormField` với `decoration: InputDecoration` |
| `VHVGridView` | `GridView` | Direct replacement |
| `VHVListView` | `ListView` | Direct replacement |
| `VHVButton` | `ElevatedButton` / `TextButton` | Dùng `ElevatedButton` cho primary, `TextButton` cho secondary |
| `VHVBottomNavigationBarItem` | `BottomNavigationBarItem` | Direct replacement |
| `VHVAnimatedContainer` | `AnimatedContainer` | Direct replacement |
| `VHVCheckbox` | `Checkbox` | Direct replacement |
| `VHVExpansionTile` | `ExpansionTile` | Direct replacement |
| `VHVToastType` | N/A | Dùng color trong SnackBar thay thế |

### 📝 API Changes

#### 1. VHVToast → SnackBar

**Before (VHV):**
```dart
VHVToast.show(
  context: context,
  message: 'Success!',
  type: VHVToastType.success,
);
```

**After (Material):**
```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Success!'),
    backgroundColor: Colors.green,
    behavior: SnackBarBehavior.floating,
  ),
);
```

#### 2. VHVCard → Card

**Before (VHV):**
```dart
VHVCard(
  padding: EdgeInsets.all(24),
  borderRadius: BorderRadius.circular(24),
  elevation: 30,
  child: child,
)
```

**After (Material):**
```dart
Card(
  elevation: 30,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(24),
  ),
  child: Padding(
    padding: EdgeInsets.all(24),
    child: child,
  ),
)
```

#### 3. VHVTextField → TextFormField

**Before (VHV):**
```dart
VHVTextField(
  controller: controller,
  label: 'Email',
  prefixIcon: Icon(Icons.email),
  validator: validator,
)
```

**After (Material):**
```dart
TextFormField(
  controller: controller,
  decoration: InputDecoration(
    labelText: 'Email',
    prefixIcon: Icon(Icons.email),
    border: OutlineInputBorder(),
  ),
  validator: validator,
)
```

#### 4. VHVButton → ElevatedButton với Gradient

**Before (VHV):**
```dart
VHVButton(
  onPressed: onPressed,
  width: double.infinity,
  height: 56,
  gradient: LinearGradient(colors: [...]),
  child: VHVText('Submit'),
)
```

**After (Material):**
```dart
Container(
  width: double.infinity,
  height: 56,
  decoration: BoxDecoration(
    gradient: LinearGradient(colors: [...]),
    borderRadius: BorderRadius.circular(12),
  ),
  child: ElevatedButton(
    onPressed: onPressed,
    style: ElevatedButton.styleFrom(
      backgroundColor: Colors.transparent,
      shadowColor: Colors.transparent,
    ),
    child: Text('Submit'),
  ),
)
```

#### 5. VHVCheckbox → Checkbox

**Before (VHV):**
```dart
VHVCheckbox(
  value: value,
  onChanged: onChanged,
)
```

**After (Material):**
```dart
Checkbox(
  value: value,
  onChanged: onChanged,
)
```

#### 6. VHVAvatar → CircleAvatar

**Before (VHV):**
```dart
VHVAvatar(
  radius: 24,
  imageUrl: url,
  backgroundColor: color,
)
```

**After (Material):**
```dart
CircleAvatar(
  radius: 24,
  backgroundImage: NetworkImage(url),
  backgroundColor: color,
)
```

#### 7. VHVListView → ListView

**Before (VHV):**
```dart
VHVListView(
  itemCount: count,
  itemBuilder: (context, index) => widget,
)
```

**After (Material):**
```dart
ListView.builder(
  itemCount: count,
  itemBuilder: (context, index) => widget,
)
```

#### 8. VHVGridView → GridView

**Before (VHV):**
```dart
VHVGridView(
  crossAxisCount: 2,
  mainAxisSpacing: 12,
  crossAxisSpacing: 12,
  children: [...],
)
```

**After (Material):**
```dart
GridView.count(
  crossAxisCount: 2,
  mainAxisSpacing: 12,
  crossAxisSpacing: 12,
  children: [...],
)
```

#### 9. VHVExpansionTile → ExpansionTile

**Before (VHV):**
```dart
VHVExpansionTile(
  title: VHVText('Title'),
  children: [...],
)
```

**After (Material):**
```dart
ExpansionTile(
  title: Text('Title'),
  children: [...],
)
```

#### 10. VHVChip → Chip

**Before (VHV):**
```dart
VHVChip(
  label: 'Tag',
  backgroundColor: color,
  textColor: Colors.white,
)
```

**After (Material):**
```dart
Chip(
  label: Text('Tag', style: TextStyle(color: Colors.white)),
  backgroundColor: color,
)
```

### 🔄 Import Changes

**Before:**
```dart
import 'package:flutter/material.dart';
import 'package:vhv_widgets/vhv_widgets.dart';
```

**After:**
```dart
import 'package:flutter/material.dart';
// Loại bỏ vhv_widgets import
```

### 📦 Cấu trúc Form

**Before (VHV):**
```dart
VHVForm(
  key: _formKey,
  child: Column(
    children: [
      VHVTextField(...),
      VHVButton(...),
    ],
  ),
)
```

**After (Material):**
```dart
Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(...),
      ElevatedButton(...),
    ],
  ),
)
```

### 🎨 Styling

Material widgets có styling khác:

1. **TextFormField** cần `InputDecoration` cho styling
2. **ElevatedButton** cần `ButtonStyle` hoặc `styleFrom`
3. **Card** cần `shape` cho border radius
4. **Chip** cần inline `TextStyle` cho text color

### ✅ Files Migrated

1. ✅ `/flutter/lib/features/auth/presentation/pages/login_page_vhv.dart`
   - VHVCard → Card
   - VHVText → Text
   - VHVTextField → TextFormField
   - VHVButton → ElevatedButton với gradient
   - VHVCheckbox → Checkbox
   - VHVIconButton → IconButton
   - VHVToast → SnackBar
   - VHVAnimatedContainer → AnimatedContainer

### 📋 Remaining Files to Migrate

1. `/flutter/lib/features/auth/presentation/pages/register_page_vhv.dart`
2. `/flutter/lib/features/auth/presentation/pages/forgot_password_page_vhv.dart`
3. `/flutter/lib/features/home/presentation/pages/home_page_vhv.dart`
4. `/flutter/lib/features/profile/presentation/pages/profile_page_vhv.dart`
5. `/flutter/lib/features/profile/presentation/pages/change_password_page_vhv.dart`
6. `/flutter/lib/features/settings/presentation/pages/settings_page_vhv.dart`
7. `/flutter/lib/features/devices/presentation/pages/devices_page_vhv.dart`
8. `/flutter/lib/features/privacy/presentation/pages/privacy_page_vhv.dart`
9. `/flutter/lib/features/language/presentation/pages/language_page_vhv.dart`
10. `/flutter/lib/features/notifications/presentation/pages/notifications_page_vhv.dart`
11. `/flutter/lib/features/help/presentation/pages/faq_page_vhv.dart`
12. `/flutter/lib/features/help/presentation/pages/help_center_page_vhv.dart`
13. `/flutter/lib/features/help/presentation/pages/whats_new_page_vhv.dart`
14. `/flutter/lib/core/widgets/vhv_bottom_nav.dart`

### 🚀 Benefits

1. ✅ **Không phụ thuộc external package** - Chỉ dùng Flutter standard widgets
2. ✅ **Performance tốt hơn** - Material widgets được optimize bởi Flutter team
3. ✅ **Documentation đầy đủ** - Flutter official docs
4. ✅ **Dễ maintain** - Không cần lo về breaking changes từ vhv_widgets
5. ✅ **Smaller bundle size** - Không cần bundle vhv_widgets

### ⚠️ Breaking Changes

1. **VHVToast API** - Phải chuyển sang ScaffoldMessenger
2. **VHVButton gradient** - Cần wrap trong Container với gradient decoration
3. **VHVTextField** - API decoration khác hẳn
4. **VHVCard padding** - Phải wrap child trong Padding widget

### 📝 Migration Checklist

- [x] Map all VHV widgets to Material equivalents
- [x] Update login_page_vhv.dart
- [ ] Update remaining 13 pages
- [ ] Update bottom navigation
- [ ] Remove vhv_widgets dependency from pubspec.yaml
- [ ] Test all features
- [ ] Update documentation

---

**Status**: 🔄 In Progress - 1/15 files migrated (6.7%)
**Last Updated**: January 5, 2026
