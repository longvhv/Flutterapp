import React from 'react';
import { VHVSafeArea } from './VHVSafeArea';

interface VHVScaffoldProps {
  appBar?: React.ReactNode;
  body: React.ReactNode;
  floatingActionButton?: React.ReactNode;
  floatingActionButtonLocation?: 'endFloat' | 'centerFloat' | 'startFloat' | 'endDocked' | 'centerDocked';
  drawer?: React.ReactNode;
  endDrawer?: React.ReactNode;
  bottomNavigationBar?: React.ReactNode;
  bottomSheet?: React.ReactNode;
  backgroundColor?: string;
  resizeToAvoidBottomInset?: boolean;
  extendBody?: boolean;
  extendBodyBehindAppBar?: boolean;
  className?: string;
}

export const VHVScaffold: React.FC<VHVScaffoldProps> = ({
  appBar,
  body,
  floatingActionButton,
  floatingActionButtonLocation = 'endFloat',
  drawer,
  endDrawer,
  bottomNavigationBar,
  bottomSheet,
  backgroundColor = '#FFFFFF',
  resizeToAvoidBottomInset = true,
  extendBody = false,
  extendBodyBehindAppBar = false,
  className = '',
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [endDrawerOpen, setEndDrawerOpen] = React.useState(false);

  const fabPositionMap = {
    endFloat: 'bottom-4 right-4',
    centerFloat: 'bottom-4 left-1/2 -translate-x-1/2',
    startFloat: 'bottom-4 left-4',
    endDocked: 'bottom-0 right-4',
    centerDocked: 'bottom-0 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={`relative flex flex-col h-screen overflow-hidden dark:bg-gray-900 ${className}`}
      style={{ backgroundColor }}
    >
      {/* Drawer */}
      {drawer && (
        <div
          className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {drawer}
        </div>
      )}

      {/* End Drawer */}
      {endDrawer && (
        <div
          className={`fixed inset-y-0 right-0 z-40 transform transition-transform duration-300 ${
            endDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {endDrawer}
        </div>
      )}

      {/* Overlay */}
      {(drawerOpen || endDrawerOpen) && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => {
            setDrawerOpen(false);
            setEndDrawerOpen(false);
          }}
        />
      )}

      {/* AppBar */}
      {appBar && !extendBodyBehindAppBar && (
        <div className="flex-shrink-0 z-20">
          {appBar}
        </div>
      )}

      {/* Body */}
      <div className={`flex-1 overflow-auto ${extendBodyBehindAppBar ? 'absolute inset-0' : ''}`}>
        {extendBody ? (
          body
        ) : (
          <VHVSafeArea>
            {body}
          </VHVSafeArea>
        )}
      </div>

      {/* AppBar (if extended behind) */}
      {appBar && extendBodyBehindAppBar && (
        <div className="absolute top-0 left-0 right-0 z-20">
          {appBar}
        </div>
      )}

      {/* Bottom Navigation Bar */}
      {bottomNavigationBar && (
        <div className="flex-shrink-0 z-20">
          {bottomNavigationBar}
        </div>
      )}

      {/* Floating Action Button */}
      {floatingActionButton && (
        <div className={`fixed z-30 ${fabPositionMap[floatingActionButtonLocation]}`}>
          {floatingActionButton}
        </div>
      )}

      {/* Bottom Sheet */}
      {bottomSheet && (
        <div className="fixed bottom-0 left-0 right-0 z-30">
          {bottomSheet}
        </div>
      )}
    </div>
  );
};
