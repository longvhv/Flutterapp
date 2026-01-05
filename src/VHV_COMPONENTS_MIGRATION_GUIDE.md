# VHV Components Migration Guide

**Migration từ 185 → 158 components** (Phase 20 Cleanup)

## 🎯 Overview

Phase 20 đã loại bỏ 27 VHV components không có tương ứng trong thư viện `vhv_widgets` Flutter. Document này hướng dẫn cách migrate từ các components đã bị loại bỏ sang alternatives.

---

## 📋 Migration Table

| Removed Component | Replacement | Package/Location |
|------------------|-------------|------------------|
| VHVAccordion | Accordion | `/components/ui/accordion.tsx` (shadcn/ui) |
| VHVBreadcrumb | Breadcrumb | `/components/ui/breadcrumb.tsx` (shadcn/ui) |
| VHVBottomAppBar | VHVBottomNavigationBar | `/components/vhv/VHVBottomNavigationBar.tsx` |
| VHVBottomNav | VHVBottomNavigationBar | `/components/vhv/VHVBottomNavigationBar.tsx` |
| VHVNavigationRail | Sidebar | `/components/ui/sidebar.tsx` (shadcn/ui) |
| VHVBackButton | Button + ArrowLeft | Standard Button with icon |
| VHVBackdrop | div | Custom div with backdrop class |
| VHVBottomSheet | Sheet | `/components/ui/sheet.tsx` (shadcn/ui) |
| VHVBanner | Alert | `/components/vhv/VHVAlert.tsx` or `/components/ui/alert.tsx` |
| VHVCalendar | Calendar | `/components/ui/calendar.tsx` (shadcn/ui) |
| VHVSegmentedControl | ToggleGroup | `/components/ui/toggle-group.tsx` (shadcn/ui) |
| VHVCarousel | Carousel | `/components/ui/carousel.tsx` (shadcn/ui) |
| VHVCodeBlock | pre/code | HTML with syntax highlighter |
| VHVMarkdown | ReactMarkdown | `react-markdown` npm package |
| VHVTimeline | Custom | Custom div/CSS implementation |
| VHVImageGallery | Custom | VHVImage + Dialog |
| VHVMasonry | Masonry | `react-responsive-masonry` npm package |
| VHVInfiniteScroll | Custom | IntersectionObserver API |
| VHVVirtualList | VirtualList | `react-window` npm package |
| VHVReorderableList | VHVReorderableListView | `/components/vhv/VHVReorderableListView.tsx` |
| VHVKanban | Custom | `react-dnd` npm package |
| VHVTreeView | Custom | Custom or library |
| VHVTransferList | Custom | Custom component |
| VHVDropzone | Custom | Input file + drag & drop |
| VHVScrollbar | ScrollArea | `/components/ui/scroll-area.tsx` (shadcn/ui) |
| VHVPagination | Pagination | `/components/ui/pagination.tsx` (shadcn/ui) |
| VHVRefreshIndicator | VHVRefreshControl | `/components/vhv/VHVRefreshControl.tsx` |

---

## 🔄 Migration Examples

### 1. VHVAccordion → Accordion (shadcn/ui)

**Before:**
```tsx
import { VHVAccordion } from '../components/vhv';

<VHVAccordion
  items={[
    { title: 'Item 1', content: 'Content 1' },
    { title: 'Item 2', content: 'Content 2' },
  ]}
/>
```

**After:**
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### 2. VHVBreadcrumb → Breadcrumb (shadcn/ui)

**Before:**
```tsx
import { VHVBreadcrumb } from '../components/vhv';

<VHVBreadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' },
  ]}
/>
```

**After:**
```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/ui/breadcrumb';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Settings</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

### 3. VHVBottomNav → VHVBottomNavigationBar

**Before:**
```tsx
import { VHVBottomNav } from '../components/vhv';

<VHVBottomNav
  items={navItems}
  activeId="home"
  onChange={setActiveTab}
/>
```

**After:**
```tsx
import { VHVBottomNavigationBar } from '../components/vhv';

<VHVBottomNavigationBar
  items={navItems.map(item => ({
    icon: item.icon,
    label: item.label,
    id: item.id,
  }))}
  currentIndex={navItems.findIndex(i => i.id === activeTab)}
  onTap={(index) => setActiveTab(navItems[index].id)}
/>
```

---

### 4. VHVBackButton → Button with ArrowLeft

**Before:**
```tsx
import { VHVBackButton } from '../components/vhv';

<VHVBackButton onClick={() => navigate(-1)} />
```

**After:**
```tsx
import { VHVButton } from '../components/vhv';
import { ArrowLeft } from 'lucide-react';

<VHVButton
  variant="text"
  leftIcon={<ArrowLeft size={20} />}
  onClick={() => navigate(-1)}
>
  Back
</VHVButton>

// Or icon button only:
import { VHVIconButton } from '../components/vhv';
<VHVIconButton icon={ArrowLeft} onClick={() => navigate(-1)} />
```

---

### 5. VHVBottomSheet → Sheet (shadcn/ui)

**Before:**
```tsx
import { VHVBottomSheet } from '../components/vhv';

<VHVBottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Settings"
>
  <div>Content here</div>
</VHVBottomSheet>
```

**After:**
```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../components/ui/sheet';

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
    </SheetHeader>
    <div>Content here</div>
  </SheetContent>
</Sheet>
```

---

### 6. VHVCalendar → Calendar (shadcn/ui)

**Before:**
```tsx
import { VHVCalendar } from '../components/vhv';

<VHVCalendar
  value={date}
  onChange={setDate}
  minDate={new Date()}
/>
```

**After:**
```tsx
import { Calendar } from '../components/ui/calendar';

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={{ before: new Date() }}
/>
```

---

### 7. VHVCarousel → Carousel (shadcn/ui)

**Before:**
```tsx
import { VHVCarousel } from '../components/vhv';

<VHVCarousel
  items={images.map(img => <img src={img} />)}
  autoplay
/>
```

**After:**
```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

<Carousel opts={{ loop: true }}>
  <CarouselContent>
    {images.map((img, idx) => (
      <CarouselItem key={idx}>
        <img src={img} />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

---

### 8. VHVMarkdown → react-markdown

**Before:**
```tsx
import { VHVMarkdown } from '../components/vhv';

<VHVMarkdown content={markdownText} />
```

**After:**
```tsx
import ReactMarkdown from 'react-markdown';

<ReactMarkdown>{markdownText}</ReactMarkdown>

// With syntax highlighting:
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

<ReactMarkdown
  components={{
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }}
>
  {markdownText}
</ReactMarkdown>
```

---

### 9. VHVMasonry → react-responsive-masonry

**Before:**
```tsx
import { VHVMasonry } from '../components/vhv';

<VHVMasonry columns={3} gap={16}>
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</VHVMasonry>
```

**After:**
```tsx
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
  <Masonry gutter="16px">
    {items.map(item => <Card key={item.id}>{item.content}</Card>)}
  </Masonry>
</ResponsiveMasonry>
```

---

### 10. VHVPagination → Pagination (shadcn/ui)

**Before:**
```tsx
import { VHVPagination } from '../components/vhv';

<VHVPagination
  total={100}
  current={page}
  pageSize={10}
  onChange={setPage}
/>
```

**After:**
```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious onClick={() => setPage(p => p - 1)} />
    </PaginationItem>
    {Array.from({ length: totalPages }, (_, i) => (
      <PaginationItem key={i}>
        <PaginationLink
          onClick={() => setPage(i + 1)}
          isActive={page === i + 1}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationNext onClick={() => setPage(p => p + 1)} />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

---

### 11. VHVSegmentedControl → ToggleGroup (shadcn/ui)

**Before:**
```tsx
import { VHVSegmentedControl } from '../components/vhv';

<VHVSegmentedControl
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
  ]}
/>
```

**After:**
```tsx
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';

<ToggleGroup type="single" value={view} onValueChange={setView}>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>
```

---

### 12. VHVInfiniteScroll → IntersectionObserver

**Before:**
```tsx
import { VHVInfiniteScroll } from '../components/vhv';

<VHVInfiniteScroll
  loadMore={loadMore}
  hasMore={hasMore}
  loader={<Spinner />}
>
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</VHVInfiniteScroll>
```

**After:**
```tsx
import { useEffect, useRef } from 'react';

function InfiniteList() {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div>
      {items.map(item => <Card key={item.id}>{item.content}</Card>)}
      {hasMore && (
        <div ref={loadMoreRef} className="py-4 text-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
```

---

## 📦 Required NPM Packages

Install these packages if you need the functionality:

```bash
# Markdown rendering
npm install react-markdown react-syntax-highlighter
npm install --save-dev @types/react-syntax-highlighter

# Masonry layout
npm install react-responsive-masonry

# Virtual lists (performance)
npm install react-window
npm install --save-dev @types/react-window

# Drag and drop (for Kanban)
npm install react-dnd react-dnd-html5-backend
npm install --save-dev @types/react-dnd
```

---

## ✅ Migration Checklist

- [ ] Identify all usages of removed components
- [ ] Replace with suggested alternatives
- [ ] Install required npm packages
- [ ] Update imports
- [ ] Test functionality
- [ ] Update TypeScript types
- [ ] Verify responsive behavior
- [ ] Check dark mode compatibility
- [ ] Update documentation

---

## 🎯 Benefits of Migration

1. **100% Flutter Mapping** - All VHV components now map 1:1 with Flutter widgets
2. **Better Performance** - Shadcn/ui components are optimized
3. **Standard Patterns** - Use widely-adopted libraries
4. **Smaller Bundle** - Remove unused components
5. **Easier Maintenance** - Fewer custom components to maintain

---

## 🆘 Need Help?

If you encounter issues during migration:

1. Check the [shadcn/ui documentation](https://ui.shadcn.com)
2. Review VHV component examples in `/pages/ComponentShowcase.tsx`
3. Refer to VHV README at `/components/vhv/README.md`
4. Check Flutter mapping guide at `/flutter/lib/core/widgets/vhv_widgets_mapping.md`

---

## 📝 Summary

**Total removed:** 27 components  
**Total remaining:** 158 components  
**Mapping accuracy:** 100% with Flutter vhv_widgets

All removed components have suitable replacements using either:
- Shadcn/ui components (recommended)
- Standard npm packages
- Custom implementations using VHV primitives

---

**Last Updated:** January 5, 2026  
**Phase:** 20 - VHV Components Cleanup  
**Status:** ✅ Complete
