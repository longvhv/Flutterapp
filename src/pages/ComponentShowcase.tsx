import React, { useState } from 'react';
import {
  VHVAppBar,
  VHVButton,
  VHVCard,
  VHVTextField,
  VHVSwitch,
  VHVChip,
  VHVBadge,
  VHVAvatar,
  VHVListTile,
  VHVDivider,
  VHVIconButton,
  VHVGradientContainer,
} from '../components/vhv';
import {
  Bell,
  Mail,
  User,
  Heart,
  Star,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export const ComponentShowcase: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* App Bar */}
      <VHVAppBar
        title="VHV Components"
        variant="gradient"
        actions={[
          <VHVBadge key="notif" content={5} color="error">
            <VHVIconButton icon={Bell} variant="text" />
          </VHVBadge>,
          <VHVIconButton key="settings" icon={Settings} variant="text" />,
        ]}
      />
      
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Buttons Section */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Buttons</h2>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <VHVButton variant="primary">Primary</VHVButton>
              <VHVButton variant="secondary">Secondary</VHVButton>
              <VHVButton variant="outline">Outline</VHVButton>
              <VHVButton variant="text">Text</VHVButton>
              <VHVButton variant="gradient">Gradient</VHVButton>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <VHVButton variant="primary" size="small">Small</VHVButton>
              <VHVButton variant="primary" size="medium">Medium</VHVButton>
              <VHVButton variant="primary" size="large">Large</VHVButton>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <VHVButton variant="primary" leftIcon={<Plus size={20} />}>
                Create New
              </VHVButton>
              <VHVButton variant="secondary" rightIcon={<Mail size={20} />}>
                Send Email
              </VHVButton>
              <VHVButton variant="primary" loading>
                Loading...
              </VHVButton>
              <VHVButton variant="outline" disabled>
                Disabled
              </VHVButton>
            </div>
            
            <VHVButton variant="gradient" fullWidth leftIcon={<Star size={20} />}>
              Full Width Button
            </VHVButton>
          </div>
        </VHVCard>
        
        {/* Icon Buttons */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Icon Buttons</h2>
          
          <div className="flex flex-wrap gap-3">
            <VHVIconButton icon={Bell} variant="default" />
            <VHVIconButton icon={Heart} variant="primary" />
            <VHVIconButton icon={Star} variant="secondary" />
            <VHVIconButton icon={Mail} variant="outlined" />
            <VHVIconButton icon={Settings} variant="text" />
          </div>
          
          <VHVDivider spacing="medium" />
          
          <div className="flex flex-wrap gap-3">
            <VHVIconButton icon={Bell} size="small" />
            <VHVIconButton icon={Bell} size="medium" />
            <VHVIconButton icon={Bell} size="large" />
          </div>
          
          <VHVDivider spacing="medium" />
          
          <div className="flex flex-wrap gap-3">
            <VHVIconButton icon={Bell} badge={3} variant="primary" />
            <VHVIconButton icon={Mail} badge={99} variant="secondary" />
            <VHVIconButton icon={Settings} badge={1} variant="outlined" />
          </div>
        </VHVCard>
        
        {/* Text Fields */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Text Fields</h2>
          
          <div className="space-y-6">
            <VHVTextField
              label="Email"
              placeholder="Enter your email"
              type="email"
              variant="outlined"
              leftIcon={<Mail size={20} />}
              value={email}
              onChange={setEmail}
              required
            />
            
            <VHVTextField
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="outlined"
              value={password}
              onChange={setPassword}
              helperText="At least 8 characters"
              required
            />
            
            <VHVTextField
              label="Search"
              placeholder="Search..."
              variant="filled"
              leftIcon={<Search size={20} />}
              rightIcon={<Filter size={20} />}
            />
            
            <VHVTextField
              label="Bio"
              placeholder="Tell us about yourself"
              variant="outlined"
              rows={4}
              maxLength={200}
            />
            
            <VHVTextField
              label="Disabled"
              variant="outlined"
              value="Disabled field"
              disabled
            />
            
            <VHVTextField
              label="Error State"
              variant="outlined"
              error="This field is required"
              value=""
            />
          </div>
        </VHVCard>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VHVCard variant="default" padding="medium">
            <h3 className="text-lg font-semibold mb-2">Default Card</h3>
            <p className="text-gray-600 dark:text-gray-400">Plain white card</p>
          </VHVCard>
          
          <VHVCard variant="outlined" padding="medium">
            <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
            <p className="text-gray-600 dark:text-gray-400">Card with border</p>
          </VHVCard>
          
          <VHVCard variant="elevated" padding="medium" hoverable>
            <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
            <p className="text-gray-600 dark:text-gray-400">Hover to see effect</p>
          </VHVCard>
          
          <VHVCard variant="gradient" padding="medium">
            <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
            <p className="text-gray-600 dark:text-gray-400">Subtle gradient</p>
          </VHVCard>
        </div>
        
        {/* Card with Header/Footer */}
        <VHVCard
          variant="elevated"
          header={
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Card with Header & Footer</h3>
              <VHVChip label="New" color="primary" variant="light" />
            </div>
          }
          footer={
            <div className="flex gap-3">
              <VHVButton variant="text" size="small">Cancel</VHVButton>
              <VHVButton variant="primary" size="small">Save</VHVButton>
            </div>
          }
        >
          <p className="text-gray-600 dark:text-gray-400">
            This card has a header and footer section separated by dividers.
          </p>
        </VHVCard>
        
        {/* Chips */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Chips</h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Filled</h4>
              <div className="flex flex-wrap gap-2">
                <VHVChip label="Default" variant="filled" color="default" />
                <VHVChip label="Primary" variant="filled" color="primary" />
                <VHVChip label="Secondary" variant="filled" color="secondary" />
                <VHVChip label="Success" variant="filled" color="success" />
                <VHVChip label="Warning" variant="filled" color="warning" />
                <VHVChip label="Error" variant="filled" color="error" />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Outlined</h4>
              <div className="flex flex-wrap gap-2">
                <VHVChip label="Default" variant="outlined" color="default" />
                <VHVChip label="Primary" variant="outlined" color="primary" />
                <VHVChip label="Secondary" variant="outlined" color="secondary" />
                <VHVChip label="Success" variant="outlined" color="success" />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Light</h4>
              <div className="flex flex-wrap gap-2">
                <VHVChip label="Primary" variant="light" color="primary" />
                <VHVChip label="Secondary" variant="light" color="secondary" />
                <VHVChip label="Success" variant="light" color="success" />
                <VHVChip label="Warning" variant="light" color="warning" />
                <VHVChip label="Error" variant="light" color="error" />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">With Icons & Delete</h4>
              <div className="flex flex-wrap gap-2">
                <VHVChip
                  label="Active"
                  variant="filled"
                  color="success"
                  icon={<CheckCircle size={16} />}
                />
                <VHVChip
                  label="Warning"
                  variant="filled"
                  color="warning"
                  icon={<AlertCircle size={16} />}
                />
                <VHVChip
                  label="Deletable"
                  variant="outlined"
                  color="primary"
                  onDelete={() => alert('Deleted!')}
                />
              </div>
            </div>
          </div>
        </VHVCard>
        
        {/* Badges */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Badges</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Number Badges</h4>
              <div className="flex flex-wrap gap-6">
                <VHVBadge content={5} color="error">
                  <Bell size={32} className="text-gray-700 dark:text-gray-300" />
                </VHVBadge>
                <VHVBadge content={99} color="primary">
                  <Mail size={32} className="text-gray-700 dark:text-gray-300" />
                </VHVBadge>
                <VHVBadge content={999} max={99} color="secondary">
                  <Star size={32} className="text-gray-700 dark:text-gray-300" />
                </VHVBadge>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Dot Badges</h4>
              <div className="flex flex-wrap gap-6">
                <VHVBadge variant="dot" color="success">
                  <VHVAvatar fallbackText="John Doe" size="large" />
                </VHVBadge>
                <VHVBadge variant="dot" color="error" position="top-right">
                  <VHVAvatar fallbackText="Jane Smith" size="large" />
                </VHVBadge>
                <VHVBadge variant="dot" color="warning" position="bottom-right">
                  <VHVAvatar fallbackText="Bob Wilson" size="large" />
                </VHVBadge>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Standalone Badges</h4>
              <div className="flex flex-wrap gap-2">
                <VHVBadge content="New" color="primary" />
                <VHVBadge content="Hot" color="error" />
                <VHVBadge content="Beta" color="warning" />
                <VHVBadge content="Pro" color="success" />
              </div>
            </div>
          </div>
        </VHVCard>
        
        {/* Avatars */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Avatars</h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Sizes</h4>
              <div className="flex flex-wrap items-center gap-4">
                <VHVAvatar fallbackText="John Doe" size="small" />
                <VHVAvatar fallbackText="Jane Smith" size="medium" />
                <VHVAvatar fallbackText="Bob Wilson" size="large" />
                <VHVAvatar fallbackText="Alice Brown" size="xlarge" />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Variants</h4>
              <div className="flex flex-wrap items-center gap-4">
                <VHVAvatar fallbackText="Circular" variant="circular" size="large" />
                <VHVAvatar fallbackText="Rounded" variant="rounded" size="large" />
                <VHVAvatar fallbackText="Square" variant="square" size="large" />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Colors</h4>
              <div className="flex flex-wrap items-center gap-4">
                <VHVAvatar fallbackText="Blue" color="bg-blue-600" size="large" />
                <VHVAvatar fallbackText="Purple" color="bg-purple-600" size="large" />
                <VHVAvatar fallbackText="Green" color="bg-green-600" size="large" />
                <VHVAvatar fallbackText="Red" color="bg-red-600" size="large" />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">With Border</h4>
              <div className="flex flex-wrap items-center gap-4">
                <VHVAvatar fallbackText="John" size="large" border />
                <VHVAvatar fallbackText="Jane" size="large" color="bg-purple-600" border />
                <VHVAvatar size="large" border />
              </div>
            </div>
          </div>
        </VHVCard>
        
        {/* List Tiles */}
        <VHVCard variant="elevated" padding="none">
          <div className="p-6 pb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">List Tiles</h2>
          </div>
          
          <VHVListTile
            title="Notifications"
            subtitle="Enable push notifications"
            leading={<Bell size={24} className="text-blue-600" />}
            trailing={<VHVSwitch checked={notifications} onChange={setNotifications} />}
          />
          
          <VHVListTile
            title="Dark Mode"
            subtitle="Switch between light and dark theme"
            leading={<Settings size={24} className="text-purple-600" />}
            trailing={<VHVSwitch checked={darkMode} onChange={setDarkMode} color="secondary" />}
          />
          
          <VHVListTile
            title="Account Settings"
            subtitle="Manage your account"
            leading={<User size={24} className="text-green-600" />}
            showArrow
            onClick={() => alert('Navigate to Account')}
          />
          
          <VHVListTile
            title="Email Preferences"
            subtitle="john.doe@example.com"
            leading={<Mail size={24} className="text-orange-600" />}
            showArrow
            onClick={() => alert('Navigate to Email')}
            divider={false}
          />
        </VHVCard>
        
        {/* Switches */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Switches</h2>
          
          <div className="space-y-4">
            <VHVSwitch
              checked={notifications}
              onChange={setNotifications}
              label="Enable Notifications"
              color="primary"
            />
            <VHVSwitch
              checked={darkMode}
              onChange={setDarkMode}
              label="Dark Mode"
              color="secondary"
            />
            <VHVSwitch
              checked={true}
              onChange={() => {}}
              label="Auto-save (Disabled)"
              color="success"
              disabled
            />
          </div>
        </VHVCard>
        
        {/* Dividers */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Dividers</h2>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Default</h4>
              <VHVDivider variant="default" />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Dashed</h4>
              <VHVDivider variant="dashed" />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Dotted</h4>
              <VHVDivider variant="dotted" />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">With Text</h4>
              <VHVDivider variant="default" text="OR" />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Vertical</h4>
              <div className="flex items-center gap-4 h-24">
                <span>Left</span>
                <VHVDivider orientation="vertical" />
                <span>Middle</span>
                <VHVDivider orientation="vertical" variant="dashed" />
                <span>Right</span>
              </div>
            </div>
          </div>
        </VHVCard>
        
        {/* Gradient Container */}
        <VHVCard variant="elevated" padding="none">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Gradient Containers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-0">
            <VHVGradientContainer variant="blue-purple" className="p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Blue Purple</h3>
              <p className="text-white/90">Beautiful gradient background</p>
            </VHVGradientContainer>
            
            <VHVGradientContainer variant="purple-pink" className="p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Purple Pink</h3>
              <p className="text-white/90">Vibrant color combination</p>
            </VHVGradientContainer>
            
            <VHVGradientContainer variant="blue-teal" className="p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Blue Teal</h3>
              <p className="text-white/90">Cool ocean colors</p>
            </VHVGradientContainer>
            
            <VHVGradientContainer variant="orange-red" className="p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Orange Red</h3>
              <p className="text-white/90">Warm sunset gradient</p>
            </VHVGradientContainer>
          </div>
        </VHVCard>
      </div>
    </div>
  );
};
