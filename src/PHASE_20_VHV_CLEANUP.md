# Phase 20: VHV Components Cleanup - Loại bỏ components không tồn tại trong vhv_widgets

## 🎯 Mục tiêu

Loại bỏ các VHV components bên web mà không có tương ứng trong thư viện `vhv_widgets` Flutter, thay thế bằng các components có sẵn từ shadcn/ui hoặc HTML/React chuẩn.

## 📊 Danh sách VHV Widgets có trong vhv_widgets Flutter

Dựa trên file `/flutter/lib/core/widgets/vhv_widgets_mapping.md` và `/flutter/USAGE_VHV_WIDGETS.md`, các widgets ĐƯỢC HỖ TRỢ:

### Form & Input (17 widgets)
✅ VHVForm  
✅ VHVTextField  
✅ VHVTextFormField  
✅ VHVTextArea  
✅ VHVCheckbox  
✅ VHVSwitch  
✅ VHVRadio  
✅ VHVSelect (VHVDropdown)  
✅ VHVSlider  
✅ VHVRangeSlider  
✅ VHVColorPicker  
✅ VHVDatePicker  
✅ VHVTimePicker  
✅ VHVOTPInput  
✅ VHVFileInput (VHVImagePicker)  
✅ VHVMultiSelect  
✅ VHVSearchBar  
✅ VHVAutocomplete  
✅ VHVChipInput  
✅ VHVDropdownButton  
✅ VHVPopupMenuButton  
✅ VHVRating  

### Layout (25 widgets)
✅ VHVContainer  
✅ VHVCard  
✅ VHVRow  
✅ VHVColumn  
✅ VHVGridView  
✅ VHVListView  
✅ VHVStack  
✅ VHVCenter  
✅ VHVPadding  
✅ VHVSizedBox  
✅ VHVSpacer  
✅ VHVExpanded  
✅ VHVFlexible  
✅ VHVAlign  
✅ VHVPositioned  
✅ VHVConstrainedBox  
✅ VHVAspectRatio  
✅ VHVFractionallySizedBox  
✅ VHVLimitedBox  
✅ VHVIntrinsicHeight  
✅ VHVIntrinsicWidth  
✅ VHVFittedBox  
✅ VHVWrap  
✅ VHVIndexedStack  
✅ VHVFlex  
✅ VHVOffstage  
✅ VHVOverflow  
✅ VHVOverflowBox  
✅ VHVBaseline  

### Structure & Navigation (11 widgets)
✅ VHVScaffold  
✅ VHVAppBar  
✅ VHVSliverAppBar  
✅ VHVBottomNavigationBar  
✅ VHVBottomNavigationBarItem  
✅ VHVDrawer  
✅ VHVTabBar  
✅ VHVTab  
✅ VHVTabBarView  
✅ VHVTabs  
✅ VHVPageView  
✅ VHVHero  
✅ VHVWillPopScope  

### Button Components (8 widgets)
✅ VHVButton  
✅ VHVTextButton  
✅ VHVElevatedButton  
✅ VHVOutlinedButton  
✅ VHVIconButton  
✅ VHVFAB (VHVFloatingActionButton)  
✅ VHVSpeedDial  

### Display Components (14 widgets)
✅ VHVText  
✅ VHVRichText  
✅ VHVIcon  
✅ VHVImage  
✅ VHVNetworkImage  
✅ VHVAvatar  
✅ VHVCircleAvatar  
✅ VHVBadge  
✅ VHVChip  
✅ VHVChipGroup  
✅ VHVListTile  
✅ VHVCheckboxListTile  
✅ VHVSwitchListTile  
✅ VHVRadioListTile  
✅ VHVExpansionTile  
✅ VHVExpansionPanelList  
✅ VHVTooltip  
✅ VHVStepper  
✅ VHVDataTable  

### Feedback Components (11 widgets)
✅ VHVToast  
✅ VHVDialog  
✅ VHVSimpleDialog  
✅ VHVAlert  
✅ VHVLoadManager  
✅ VHVShimmer  
✅ VHVSkeleton  
✅ VHVEmptyState  
✅ VHVLoader  
✅ VHVProgressBar  
✅ VHVCircularProgress  
✅ VHVLinearProgressIndicator  
✅ VHVCircularProgressIndicator  
✅ VHVMenu  

### Interaction Components (8 widgets)
✅ VHVGestureDetector  
✅ VHVInkWell  
✅ VHVAbsorbPointer  
✅ VHVIgnorePointer  
✅ VHVInteractiveViewer  
✅ VHVDismissible  
✅ VHVDraggable  
✅ VHVDragTarget  

### Animation Components (15 widgets)
✅ VHVAnimatedOpacity  
✅ VHVAnimatedContainer  
✅ VHVAnimatedPadding  
✅ VHVAnimatedSwitcher  
✅ VHVAnimatedList  
✅ VHVAnimatedPhysicalModel  
✅ VHVSlideTransition  
✅ VHVFadeTransition  
✅ VHVScaleTransition  
✅ VHVRotationTransition  
✅ VHVPositionedTransition  
✅ VHVSizeTransition  
✅ VHVAlignTransition  
✅ VHVDecoratedBoxTransition  

### Transform Components (3 widgets)
✅ VHVTransform  
✅ VHVRotatedBox  
✅ VHVOpacity  

### Async Builders (2 widgets)
✅ VHVFutureBuilder  
✅ VHVStreamBuilder  

### Material Components (4 widgets)
✅ VHVMaterial  
✅ VHVPhysicalModel  
✅ VHVDecoratedBox  
✅ VHVClipRRect, VHVClipOval, VHVClipRect  

### Cupertino/iOS Components (4 widgets)
✅ VHVCupertinoButton  
✅ VHVCupertinoSwitch  
✅ VHVCupertinoActivityIndicator  
✅ VHVCupertinoNavigationBar  

### Utility Components (11 widgets)
✅ VHVDivider  
✅ VHVVisibility  
✅ VHVSafeArea  
✅ VHVMediaQuery  
✅ VHVReorderableListView  
✅ VHVBuilder  
✅ VHVLayoutBuilder  
✅ VHVNotificationListener  
✅ VHVCustomPaint  
✅ VHVRepaintBoundary  
✅ VHVSemantics  
✅ VHVPlaceholder  
✅ VHVRefreshControl  

### Theme & Form
✅ VHVThemeProvider  
✅ VHVGradientContainer  

**Tổng cộng: ~140 widgets được hỗ trợ trong vhv_widgets**

---

## ❌ Danh sách Components CẦN LOẠI BỎ (không có trong vhv_widgets)

### 1. Navigation/Layout Components
❌ **VHVAccordion** → Thay bằng `Accordion` từ `/components/ui/accordion.tsx`  
❌ **VHVBreadcrumb** → Thay bằng `Breadcrumb` từ `/components/ui/breadcrumb.tsx`  
❌ **VHVBottomAppBar** → Thay bằng `VHVBottomNavigationBar` hoặc custom bottom bar  
❌ **VHVBottomNav** → Đã có `VHVBottomNavigationBar` (duplicate)  
❌ **VHVNavigationRail** → Thay bằng `Sidebar` từ `/components/ui/sidebar.tsx`  
❌ **VHVBackButton** → Thay bằng `Button` với icon `ArrowLeft` từ lucide-react  

### 2. Overlay/Modal Components
❌ **VHVBackdrop** → Thay bằng `<div>` với class backdrop  
❌ **VHVBottomSheet** → Thay bằng `Sheet` từ `/components/ui/sheet.tsx`  
❌ **VHVBanner** → Có thể giữ nếu cần, hoặc thay bằng `Alert`  

### 3. Input/Selection Components
❌ **VHVCalendar** → Thay bằng `Calendar` từ `/components/ui/calendar.tsx`  
❌ **VHVSegmentedControl** → Thay bằng `ToggleGroup` từ `/components/ui/toggle-group.tsx`  

### 4. Display/Content Components
❌ **VHVCarousel** → Thay bằng `Carousel` từ `/components/ui/carousel.tsx`  
❌ **VHVCodeBlock** → Thay bằng `<pre><code>` với syntax highlighting  
❌ **VHVMarkdown** → Thay bằng `react-markdown` library  
❌ **VHVTimeline** → Tạo custom component với `<div>` và CSS  
❌ **VHVImageGallery** → Tạo custom với `VHVImage` + modal  

### 5. List/Grid Components
❌ **VHVMasonry** → Thay bằng `react-responsive-masonry` package  
❌ **VHVInfiniteScroll** → Tạo custom với IntersectionObserver  
❌ **VHVVirtualList** → Thay bằng `react-window` package  
❌ **VHVReorderableList** → Merge với `VHVReorderableListView`  

### 6. Advanced Components
❌ **VHVKanban** → Tạo custom với `react-dnd` package  
❌ **VHVTreeView** → Tạo custom hoặc dùng library  
❌ **VHVTransferList** → Tạo custom component  

### 7. Utility Components
❌ **VHVDropzone** → Thay bằng custom `<input type="file">` với drag & drop  
❌ **VHVScrollbar** → Thay bằng `ScrollArea` từ `/components/ui/scroll-area.tsx`  
❌ **VHVPagination** → Thay bằng `Pagination` từ `/components/ui/pagination.tsx`  
❌ **VHVRefreshIndicator** → Merge với `VHVRefreshControl`  

**Tổng cộng: 27 components cần loại bỏ**

---

## 🔄 Action Plan

### Bước 1: Xóa files không cần thiết
Loại bỏ các file VHV components không có trong vhv_widgets:

```bash
# Navigation/Layout
/components/vhv/VHVAccordion.tsx
/components/vhv/VHVBreadcrumb.tsx
/components/vhv/VHVBottomAppBar.tsx
/components/vhv/VHVBottomNav.tsx (duplicate)
/components/vhv/VHVNavigationRail.tsx
/components/vhv/VHVBackButton.tsx

# Overlay/Modal
/components/vhv/VHVBackdrop.tsx
/components/vhv/VHVBottomSheet.tsx
/components/vhv/VHVBanner.tsx (optional - có thể giữ)

# Input/Selection
/components/vhv/VHVCalendar.tsx
/components/vhv/VHVSegmentedControl.tsx

# Display/Content
/components/vhv/VHVCarousel.tsx
/components/vhv/VHVCodeBlock.tsx
/components/vhv/VHVMarkdown.tsx
/components/vhv/VHVTimeline.tsx
/components/vhv/VHVImageGallery.tsx

# List/Grid
/components/vhv/VHVMasonry.tsx
/components/vhv/VHVInfiniteScroll.tsx
/components/vhv/VHVVirtualList.tsx
/components/vhv/VHVReorderableList.tsx

# Advanced
/components/vhv/VHVKanban.tsx
/components/vhv/VHVTreeView.tsx
/components/vhv/VHVTransferList.tsx

# Utility
/components/vhv/VHVDropzone.tsx
/components/vhv/VHVScrollbar.tsx
/components/vhv/VHVPagination.tsx
/components/vhv/VHVRefreshIndicator.tsx
```

### Bước 2: Update index.ts
Loại bỏ các exports không còn tồn tại từ `/components/vhv/index.ts`

### Bước 3: Kiểm tra usage
Tìm kiếm các pages/components đang sử dụng các VHV components bị loại bỏ và thay thế chúng.

### Bước 4: Update documentation
Cập nhật các file markdown để phản ánh thay đổi.

---

## ✅ Kết quả mong đợi

- **Web components**: Chỉ còn ~140 VHV components tương đồng 100% với Flutter vhv_widgets
- **Mapping 1:1**: Mọi VHV component web đều có tương ứng exact trong Flutter
- **Clean codebase**: Loại bỏ duplicate và unused components
- **Better maintainability**: Dễ dàng sync giữa web và Flutter

---

## 📝 Components được giữ lại (140 components)

Tất cả các components trong danh sách ✅ ở trên sẽ được giữ lại và maintain.

---

## 🎯 Status: READY TO EXECUTE

Sẵn sàng để thực hiện cleanup theo action plan trên.
