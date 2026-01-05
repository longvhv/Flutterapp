# VHV Components Library - Web Version

**Enterprise-grade React components mapped from Flutter VHV Widgets**

**Total: 158 Components** ✅ (100% mapped to vhv_widgets Flutter library)

---

## 📦 Component Categories

| Category | Count | Status |
|----------|-------|--------|
| Layout | 27 | ✅ |
| Input | 21 | ✅ |
| Display | 15 | ✅ |
| Feedback | 13 | ✅ |
| Interaction | 8 | ✅ |
| Transition | 8 | ✅ |
| Navigation | 8 | ✅ |
| Button | 7 | ✅ |
| Utility | 7 | ✅ |
| Advanced | 6 | ✅ |
| Animation | 5 | ✅ |
| Cupertino | 4 | ✅ |
| Decorative | 4 | ✅ |
| Material | 3 | ✅ |
| Transform | 3 | ✅ |
| Basic | 3 | ✅ |
| Form | 2 | ✅ |
| Builder | 2 | ✅ |
| Async | 2 | ✅ |
| Structure | 2 | ✅ |
| Container | 1 | ✅ |
| Theme | 1 | ✅ |
| Other | 1 | ✅ |
| **TOTAL** | **158** | **100%** |

> **Note**: Removed 27 components that don't exist in vhv_widgets Flutter library.  
> Use shadcn/ui or custom implementations for: Accordion, Breadcrumb, Calendar, Carousel, etc.

---

## 📦 Components

### Layout Components

#### VHVAppBar
Top app bar with back button, menu, title, and actions.
```tsx
<VHVAppBar
  title="Dashboard"
  showBackButton={false}
  showMenuButton={true}
  onMenuClick={() => {}}
  variant="gradient"
  actions={[<VHVIconButton icon={Bell} />]}
/>
```

#### VHVBottomNav
Bottom navigation bar with icons and labels.
```tsx
<VHVBottomNav
  items={navItems}
  activeId="dashboard"
  onChange={(id) => setActiveTab(id)}
  variant="gradient"
/>
```

---

### Button Components

#### VHVButton
Primary button component with multiple variants.
```tsx
<VHVButton
  variant="primary"
  size="medium"
  leftIcon={<Plus size={20} />}
  onClick={() => {}}
  fullWidth
>
  Create New
</VHVButton>
```

**Variants:**
- `primary` - Blue button
- `secondary` - Purple button
- `outline` - Outlined button
- `text` - Text-only button
- `gradient` - Gradient button

**Sizes:** `small` | `medium` | `large`

#### VHVIconButton
Icon-only button with badge support.
```tsx
<VHVIconButton
  icon={Bell}
  variant="primary"
  size="medium"
  badge={5}
  onClick={() => {}}
/>
```

---

### Input Components

#### VHVTextField
Text input field with multiple variants.
```tsx
<VHVTextField
  label="Email"
  placeholder="Enter your email"
  type="email"
  variant="outlined"
  required
  error={errors.email}
  helperText="We'll never share your email"
  leftIcon={<Mail size={20} />}
  value={email}
  onChange={(value) => setEmail(value)}
/>
```

**Variants:**
- `outlined` - Outlined input
- `filled` - Filled background
- `underlined` - Bottom border only

**Features:**
- Password visibility toggle
- Character counter
- Icon support (left/right)
- Error states
- Helper text
- Required indicator

#### VHVSwitch
Toggle switch component.
```tsx
<VHVSwitch
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark Mode"
  color="primary"
/>
```

---

### Display Components

#### VHVCard
Card container with variants.
```tsx
<VHVCard
  variant="elevated"
  padding="medium"
  hoverable
  header={<h3>Card Title</h3>}
  footer={<VHVButton variant="text">Action</VHVButton>}
>
  Card content here
</VHVCard>
```

**Variants:**
- `default` - Plain white card
- `outlined` - Card with border
- `elevated` - Card with shadow
- `gradient` - Gradient background

#### VHVChip
Chip/tag component.
```tsx
<VHVChip
  label="Active"
  variant="filled"
  color="success"
  icon={<CheckCircle size={16} />}
  onDelete={() => {}}
/>
```

**Colors:** `default` | `primary` | `secondary` | `success` | `warning` | `error`

**Variants:** `filled` | `outlined` | `light`

#### VHVBadge
Badge component for notifications.
```tsx
<VHVBadge content={5} color="error">
  <Bell size={24} />
</VHVBadge>

<VHVBadge variant="dot" color="success">
  <Avatar />
</VHVBadge>
```

#### VHVAvatar
User avatar component.
```tsx
<VHVAvatar
  src="/avatar.jpg"
  alt="User"
  size="large"
  variant="circular"
  fallbackText="John Doe"
  border
/>
```

**Sizes:** `small` | `medium` | `large` | `xlarge`

**Variants:** `circular` | `rounded` | `square`

#### VHVListTile
List item component.
```tsx
<VHVListTile
  title="Notifications"
  subtitle="Enable push notifications"
  leading={<Bell size={24} />}
  trailing={<VHVSwitch checked={true} onChange={() => {}} />}
  showArrow
  onClick={() => {}}
/>
```

#### VHVDivider
Divider line component.
```tsx
<VHVDivider variant="default" spacing="medium" />
<VHVDivider variant="dashed" text="OR" />
<VHVDivider orientation="vertical" />
```

---

### Container Components

#### VHVGradientContainer
Gradient background container.
```tsx
<VHVGradientContainer variant="blue-purple" opacity={100}>
  <div className="p-8 text-white">
    Gradient content
  </div>
</VHVGradientContainer>
```

**Variants:**
- `blue-purple`
- `purple-pink`
- `blue-teal`
- `orange-red`
- `green-blue`

---

## 🎨 Design System

### Colors
- **Primary:** Blue (#3B82F6)
- **Secondary:** Purple (#9333EA)
- **Success:** Green (#10B981)
- **Warning:** Yellow (#F59E0B)
- **Error:** Red (#EF4444)

### Spacing
- **Small:** 8px (0.5rem)
- **Medium:** 16px (1rem)
- **Large:** 24px (1.5rem)

### Border Radius
- **Small:** 8px (rounded-lg)
- **Medium:** 12px (rounded-xl)
- **Large:** 16px (rounded-2xl)
- **Full:** 9999px (rounded-full)

### Shadows
- **Small:** shadow-sm
- **Medium:** shadow-md
- **Large:** shadow-lg
- **Extra Large:** shadow-xl

---

## 🚀 Usage

### Import Components
```tsx
import {
  VHVButton,
  VHVCard,
  VHVTextField,
  VHVAppBar,
  VHVBottomNav,
} from './components/vhv';
```

### Example Page
```tsx
import { VHVAppBar, VHVCard, VHVButton } from './components/vhv';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <VHVAppBar
        title="Dashboard"
        variant="gradient"
        showMenuButton
      />
      
      <div className="p-6">
        <VHVCard variant="elevated" hoverable>
          <h2 className="text-xl font-bold mb-4">Welcome</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get started with VHV Components
          </p>
          <VHVButton
            variant="primary"
            leftIcon={<Plus size={20} />}
            fullWidth
          >
            Create New
          </VHVButton>
        </VHVCard>
      </div>
    </div>
  );
}
```

---

## 🎯 Mapping from Flutter

| Flutter Widget | Web Component | Notes |
|---------------|---------------|-------|
| VHVAppBar | VHVAppBar | ✅ Complete |
| VHVButton | VHVButton | ✅ Complete |
| VHVCard | VHVCard | ✅ Complete |
| VHVTextField | VHVTextField | ✅ Complete |
| VHVSwitch | VHVSwitch | ✅ Complete |
| VHVChip | VHVChip | ✅ Complete |
| VHVBadge | VHVBadge | ✅ Complete |
| VHVAvatar | VHVAvatar | ✅ Complete |
| VHVListTile | VHVListTile | ✅ Complete |
| VHVDivider | VHVDivider | ✅ Complete |
| VHVIconButton | VHVIconButton | ✅ Complete |
| VHVBottomNav | VHVBottomNav | ✅ Complete |
| VHVGradientContainer | VHVGradientContainer | ✅ Complete |

---

## 📱 Responsive Design

All components are mobile-first and responsive:
- Touch-friendly sizing
- Responsive spacing
- Mobile-optimized interactions
- Dark mode support

---

## ✨ Features

### Animation
- Motion/React for smooth animations
- Hover effects
- Tap feedback
- Scale transitions

### Accessibility
- ARIA labels
- Keyboard navigation
- Focus states
- Screen reader support

### Dark Mode
- Full dark mode support
- Automatic color adjustments
- Dark mode variants

### Customization
- Tailwind CSS classes
- Custom className prop
- Variant system
- Size system

---

## 🎨 Theming

Components use Tailwind CSS and support:
- Light/Dark mode
- Custom colors via className
- Gradient variants
- Opacity controls

---

## 📚 Best Practices

1. **Consistent spacing:** Use VHV size props (small/medium/large)
2. **Proper variants:** Choose appropriate variant for context
3. **Accessibility:** Always provide labels and alt text
4. **Performance:** Use memo for complex components
5. **Responsive:** Test on mobile and desktop

---

## 🔄 Updates

Components are mapped 1:1 from Flutter widgets for consistency across platforms.

**Last Updated:** January 3, 2026  
**Version:** 1.0.0  
**Flutter Version:** Mapped from VHV Widgets v1.0.0

---

**🎉 Ready to use! Import and start building!**