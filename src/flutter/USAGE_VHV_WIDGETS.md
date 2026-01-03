# Hướng dẫn sử dụng VHV Widgets trong dự án

## 📦 Cài đặt

Đã được cấu hình trong `pubspec.yaml`:

```yaml
dependencies:
  vhv_widgets:
    git:
      url: https://github.com/vhvplatform/flutter-vhv_widgets.git
```

## 🎯 Sử dụng trong dự án

### 1. Import

```dart
import 'package:vhv_widgets/vhv_widgets.dart';
```

### 2. Các trang đã sử dụng VHV Widgets

#### ✅ Authentication (Priority 1)
- **Login Page** - `/lib/features/auth/presentation/pages/login_page_vhv.dart`
  - VHVForm, VHVTextField, VHVButton, VHVCheckbox, VHVToast, VHVCard, VHVText, VHVAnimatedContainer
- **Register Page** - `/lib/features/auth/presentation/pages/register_page_vhv.dart`
  - VHVForm, VHVTextField, VHVButton, VHVCheckbox, VHVToast, VHVCard
- **Forgot Password Page** - `/lib/features/auth/presentation/pages/forgot_password_page_vhv.dart`
  - VHVForm, VHVTextField, VHVButton, VHVToast, VHVAvatar, VHVLoadManager

#### ✅ Main Features (Priority 2)
- **Home Page** - `/lib/features/home/presentation/pages/home_page_vhv.dart`
  - VHVSliverAppBar, VHVGridView, VHVCard, VHVListView, VHVAvatar, VHVShimmer, VHVLoadManager
- **Notifications Page** - `/lib/features/notifications/presentation/pages/notifications_page_vhv.dart`
  - VHVSliverAppBar, VHVTabBar, VHVTab, VHVListView, VHVCard, VHVAvatar, VHVChip, VHVShimmer
- **Settings Page** - `/lib/features/settings/presentation/pages/settings_page_vhv.dart`
  - VHVSliverAppBar, VHVCard, VHVListTile, VHVSwitch, VHVButton, VHVDialog

#### ✅ Profile (Priority 3)
- **Profile Page** - `/lib/features/profile/presentation/pages/profile_page_vhv.dart`
  - VHVSliverAppBar, VHVAvatar, VHVForm, VHVTextField, VHVTextArea, VHVButton, VHVGridView
- **Change Password Page** - `/lib/features/profile/presentation/pages/change_password_page_vhv.dart`
  - VHVForm, VHVTextField, VHVButton, VHVCard, VHVLoadManager, VHVToast

#### ✅ Settings (Priority 4)
- **Devices Page** - `/lib/features/devices/presentation/pages/devices_page_vhv.dart`
  - VHVListView, VHVCard, VHVAvatar, VHVChip, VHVDialog, VHVShimmer, VHVLoadManager
- **Privacy Page** - `/lib/features/privacy/presentation/pages/privacy_page_vhv.dart`
  - VHVCard, VHVListTile, VHVSwitch, VHVDialog, VHVAvatar
- **Language Page** - `/lib/features/language/presentation/pages/language_page_vhv.dart`
  - VHVListView, VHVCard, VHVTextField, VHVButton, VHVToast

#### ✅ Support (Priority 5)
- **Help Center Page** - `/lib/features/help/presentation/pages/help_center_page_vhv.dart`
  - VHVTextField, VHVGridView, VHVListView, VHVCard, VHVAvatar, VHVDialog, VHVToast
- **FAQ Page** - `/lib/features/help/presentation/pages/faq_page_vhv.dart`
  - VHVTextField, VHVExpansionTile, VHVCard, VHVAvatar, VHVChip, VHVFloatingActionButton
- **What's New Page** - `/lib/features/help/presentation/pages/whats_new_page_vhv.dart`
  - VHVCard, VHVAvatar, VHVChip, VHVText

#### ✅ Navigation
- **Bottom Navigation** - `/lib/core/widgets/vhv_bottom_nav.dart`
  - VHVBottomNavigationBar, VHVBottomNavigationBarItem

## ✅ Status: HOÀN THÀNH 100%

**Tất cả 14 tính năng đã được migrate sang VHV Widgets:**
- [x] Login
- [x] Register  
- [x] Forgot Password
- [x] Dashboard/Home
- [x] Notifications
- [x] Settings
- [x] Profile
- [x] Change Password
- [x] Devices
- [x] Privacy & Security
- [x] Language
- [x] Help Center
- [x] FAQ
- [x] What's New
- [x] Bottom Navigation

## 📋 VHV Widgets được sử dụng

### Form & Input (10 widgets)
- ✅ VHVForm
- ✅ VHVTextField
- ✅ VHVTextArea
- ✅ VHVCheckbox
- ✅ VHVSwitch
- ✅ VHVButton
- ✅ VHVTextButton
- ✅ VHVIconButton
- ✅ VHVFloatingActionButton
- ✅ VHVExpansionTile

### Layout (8 widgets)
- ✅ VHVScaffold
- ✅ VHVCard
- ✅ VHVGridView
- ✅ VHVListView
- ✅ VHVListTile
- ✅ VHVSliverAppBar
- ✅ VHVAppBar
- ✅ VHVContainer

### Navigation (4 widgets)
- ✅ VHVBottomNavigationBar
- ✅ VHVBottomNavigationBarItem
- ✅ VHVTabBar
- ✅ VHVTab

### Display (7 widgets)
- ✅ VHVText
- ✅ VHVAvatar
- ✅ VHVChip
- ✅ VHVAnimatedContainer
- ✅ VHVImage
- ✅ VHVNetworkImage
- ✅ VHVIcon

### Feedback (4 widgets)
- ✅ VHVToast
- ✅ VHVDialog
- ✅ VHVLoadManager
- ✅ VHVShimmer / VHVShimmerItem

**Tổng cộng: 33 VHV Widgets được sử dụng**

## 🛠️ Template cho các trang mới

```dart
import 'package:flutter/material.dart';
import 'package:vhv_widgets/vhv_widgets.dart';

class MyPageVHV extends StatefulWidget {
  const MyPageVHV({super.key});

  @override
  State<MyPageVHV> createState() => _MyPageVHVState();
}

class _MyPageVHVState extends State<MyPageVHV> {
  @override
  Widget build(BuildContext context) {
    return VHVScaffold(
      appBar: VHVAppBar(
        title: VHVText('Page Title'),
        leading: VHVIconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: VHVContainer(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            VHVCard(
              child: VHVText('Content'),
            ),
            VHVButton(
              onPressed: () {},
              child: VHVText('Action'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## 📚 Widget Mapping Reference

Chi tiết mapping xem tại: `/lib/core/widgets/vhv_widgets_mapping.md`