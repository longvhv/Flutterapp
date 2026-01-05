import React, { useState } from 'react';
import {
  VHVAppBar,
  VHVButton,
  VHVCard,
  VHVTextField,
  VHVSwitch,
  VHVCheckbox,
  VHVRadio,
  VHVSelect,
  VHVDialog,
  VHVDrawer,
  VHVTabs,
  VHVLoader,
  VHVSkeleton,
  VHVSkeletonCard,
  VHVSkeletonList,
  VHVEmptyState,
  VHVProgressBar,
  VHVCircularProgress,
  useSnackbar,
} from '../components/vhv';
import {
  Bell,
  Settings,
  Home,
  User,
  Mail,
  Plus,
  Inbox,
  Search,
} from 'lucide-react';

export const AllComponentsShowcase: React.FC = () => {
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [indeterminate, setIndeterminate] = useState(true);
  const [gender, setGender] = useState('male');
  const [country, setCountry] = useState('us');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showLoader, setShowLoader] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  
  const snackbar = useSnackbar();

  const selectOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'vn', label: 'Vietnam' },
    { value: 'jp', label: 'Japan', disabled: true },
  ];

  const radioOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Home size={16} />,
      content: (
        <VHVCard variant="elevated">
          <h3 className="text-lg font-semibold mb-2">Overview Tab</h3>
          <p className="text-gray-600 dark:text-gray-400">
            This is the overview tab content. You can put any content here.
          </p>
        </VHVCard>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User size={16} />,
      badge: 3,
      content: (
        <VHVCard variant="elevated">
          <h3 className="text-lg font-semibold mb-2">Profile Tab</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Profile settings and information.
          </p>
        </VHVCard>
      ),
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <Mail size={16} />,
      badge: 12,
      content: (
        <VHVCard variant="elevated">
          <h3 className="text-lg font-semibold mb-2">Messages Tab</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your messages and notifications.
          </p>
        </VHVCard>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <VHVAppBar
        title="All Components"
        variant="gradient"
        actions={[
          <button
            key="bell"
            onClick={() => snackbar.showInfo('You have 5 new notifications')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Bell size={24} className="text-white" />
          </button>,
          <button
            key="settings"
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Settings size={24} className="text-white" />
          </button>,
        ]}
      />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Dialog & Drawer */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Dialog & Drawer
          </h2>
          <div className="flex flex-wrap gap-3">
            <VHVButton variant="primary" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </VHVButton>
            <VHVButton variant="secondary" onClick={() => setDrawerOpen(true)}>
              Open Drawer
            </VHVButton>
          </div>
        </VHVCard>

        {/* Checkboxes */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Checkboxes
          </h2>
          <div className="space-y-4">
            <VHVCheckbox
              checked={newsletter}
              onChange={setNewsletter}
              label="Subscribe to newsletter"
              color="primary"
            />
            <VHVCheckbox
              checked={notifications}
              onChange={setNotifications}
              label="Enable notifications"
              color="secondary"
            />
            <VHVCheckbox
              checked={indeterminate}
              indeterminate={indeterminate}
              onChange={setIndeterminate}
              label="Indeterminate state"
              color="success"
            />
            <VHVCheckbox
              checked={true}
              onChange={() => {}}
              label="Disabled checkbox"
              disabled
            />
          </div>
        </VHVCard>

        {/* Radio Buttons */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Radio Buttons
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                Vertical
              </h4>
              <VHVRadio
                name="gender"
                options={radioOptions}
                value={gender}
                onChange={setGender}
                color="primary"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                Horizontal
              </h4>
              <VHVRadio
                name="gender2"
                options={radioOptions}
                value={gender}
                onChange={setGender}
                color="secondary"
                orientation="horizontal"
              />
            </div>
          </div>
        </VHVCard>

        {/* Select Dropdown */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Select Dropdown
          </h2>
          <div className="space-y-4">
            <VHVSelect
              label="Country"
              options={selectOptions}
              value={country}
              onChange={setCountry}
              placeholder="Select your country"
              fullWidth
            />
            <VHVSelect
              label="Disabled Select"
              options={selectOptions}
              value="us"
              onChange={() => {}}
              disabled
              fullWidth
            />
            <VHVSelect
              label="Error State"
              options={selectOptions}
              value=""
              onChange={setCountry}
              error="Please select a country"
              fullWidth
            />
          </div>
        </VHVCard>

        {/* Tabs */}
        <VHVCard variant="elevated" padding="none">
          <div className="p-6 pb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tabs</h2>
          </div>
          <div className="p-6">
            <VHVTabs tabs={tabs} defaultActiveId="overview" variant="pills" fullWidth />
          </div>
        </VHVCard>

        {/* Loaders */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Loaders
          </h2>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-8">
              <VHVLoader variant="spinner" size="small" />
              <VHVLoader variant="spinner" size="medium" />
              <VHVLoader variant="spinner" size="large" />
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <VHVLoader variant="dots" color="text-purple-600" />
              <VHVLoader variant="pulse" color="text-green-600" />
              <VHVLoader variant="bars" color="text-orange-600" />
            </div>
            <VHVLoader variant="spinner" text="Loading data..." />
            <div className="flex gap-3">
              <VHVButton
                variant="primary"
                onClick={() => {
                  setShowLoader(true);
                  setTimeout(() => setShowLoader(false), 2000);
                }}
              >
                Show Fullscreen Loader
              </VHVButton>
            </div>
          </div>
        </VHVCard>

        {/* Skeleton Loaders */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Skeleton Loaders
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                Basic Skeletons
              </h4>
              <div className="space-y-2">
                <VHVSkeleton variant="text" />
                <VHVSkeleton variant="text" width="80%" />
                <VHVSkeleton variant="text" width="60%" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                Circular & Rounded
              </h4>
              <div className="flex items-center gap-4">
                <VHVSkeleton variant="circular" width="48px" height="48px" />
                <VHVSkeleton variant="rounded" width="120px" height="48px" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                Animation Types
              </h4>
              <div className="space-y-2">
                <VHVSkeleton variant="text" animation="pulse" />
                <VHVSkeleton variant="text" animation="wave" />
                <VHVSkeleton variant="text" animation="none" />
              </div>
            </div>

            <VHVButton
              variant="outline"
              onClick={() => {
                setShowSkeleton(true);
                setTimeout(() => setShowSkeleton(false), 3000);
              }}
            >
              Show Skeleton Templates
            </VHVButton>
          </div>
        </VHVCard>

        {showSkeleton && (
          <VHVCard variant="elevated">
            <VHVSkeletonCard />
            <VHVSkeletonList items={3} />
          </VHVCard>
        )}

        {/* Progress Bars */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Progress Indicators
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                Linear Progress
              </h4>
              <VHVProgressBar value={25} showLabel color="primary" className="mb-3" />
              <VHVProgressBar value={50} showLabel color="secondary" className="mb-3" />
              <VHVProgressBar value={75} showLabel color="success" className="mb-3" />
              <VHVProgressBar value={90} showLabel color="warning" striped animated />
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                Circular Progress
              </h4>
              <div className="flex flex-wrap gap-6">
                <VHVCircularProgress value={25} color="primary" />
                <VHVCircularProgress value={50} color="secondary" />
                <VHVCircularProgress value={75} color="success" />
                <VHVCircularProgress value={100} color="error" size={80} />
              </div>
            </div>
          </div>
        </VHVCard>

        {/* Empty State */}
        <VHVCard variant="elevated">
          <VHVEmptyState
            icon={Inbox}
            title="No messages yet"
            description="When you receive messages, they will appear here"
            actionLabel="Compose Message"
            onAction={() => snackbar.showInfo('Opening compose dialog...')}
          />
        </VHVCard>

        {/* Snackbar Examples */}
        <VHVCard variant="elevated">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Snackbars / Toasts
          </h2>
          <div className="flex flex-wrap gap-3">
            <VHVButton
              variant="primary"
              onClick={() => snackbar.showSuccess('Operation completed successfully!')}
            >
              Success
            </VHVButton>
            <VHVButton
              variant="secondary"
              onClick={() => snackbar.showError('An error occurred. Please try again.')}
            >
              Error
            </VHVButton>
            <VHVButton
              variant="outline"
              onClick={() => snackbar.showWarning('This action cannot be undone!')}
            >
              Warning
            </VHVButton>
            <VHVButton
              variant="text"
              onClick={() => snackbar.showInfo('This is an informational message')}
            >
              Info
            </VHVButton>
            <VHVButton
              variant="gradient"
              onClick={() =>
                snackbar.showSnackbar('Action required', 'info', 0, {
                  label: 'Undo',
                  onClick: () => snackbar.showSuccess('Action undone'),
                })
              }
            >
              With Action
            </VHVButton>
          </div>
        </VHVCard>
      </div>

      {/* Dialog */}
      <VHVDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Confirm Action"
        size="medium"
        actions={
          <>
            <VHVButton variant="text" onClick={() => setDialogOpen(false)}>
              Cancel
            </VHVButton>
            <VHVButton
              variant="primary"
              onClick={() => {
                snackbar.showSuccess('Action confirmed!');
                setDialogOpen(false);
              }}
            >
              Confirm
            </VHVButton>
          </>
        }
      >
        <p className="text-gray-600 dark:text-gray-400">
          Are you sure you want to proceed with this action? This cannot be undone.
        </p>
        <VHVTextField
          label="Reason"
          placeholder="Enter a reason (optional)"
          variant="outlined"
          value={email}
          onChange={setEmail}
          className="mt-4"
          fullWidth
        />
      </VHVDialog>

      {/* Drawer */}
      <VHVDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="right"
        title="Settings"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              <VHVSwitch
                checked={darkMode}
                onChange={setDarkMode}
                label="Dark Mode"
                color="primary"
              />
              <VHVSwitch
                checked={notifications}
                onChange={setNotifications}
                label="Push Notifications"
                color="secondary"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <VHVTextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={setEmail}
              leftIcon={<Mail size={20} />}
              fullWidth
            />
          </div>

          <VHVButton variant="primary" fullWidth leftIcon={<Plus size={20} />}>
            Save Changes
          </VHVButton>
        </div>
      </VHVDrawer>

      {/* Fullscreen Loader */}
      {showLoader && <VHVLoader variant="spinner" fullscreen text="Processing..." />}
    </div>
  );
};
