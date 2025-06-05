import React from 'react';
import SectionHeader from '../molecules/SectionHeader';
import Sidebar from '../organisms/Sidebar';
import MobileNav from '../organisms/MobileNav';

const PageTemplate = ({
  children,
  activeTab,
  isSidebarOpen,
  sidebarItems,
  onSidebarItemClick,
  onToggleSidebar,
  quickActions,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      <SectionHeader
        showMenuButton={true}
        onMenuButtonClick={onToggleSidebar}
        quickActions={quickActions}
      />

      <div className="flex max-w-7xl mx-auto">
        <Sidebar
          isOpen={isSidebarOpen}
          sidebarItems={sidebarItems}
          activeTab={activeTab}
          onSidebarItemClick={onSidebarItemClick}
          onCloseOverlay={onToggleSidebar}
        />

        <main className="flex-1 min-h-[calc(100vh-4rem)] lg:border-l-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      <MobileNav
        sidebarItems={sidebarItems}
        activeTab={activeTab}
        onSidebarItemClick={onSidebarItemClick}
      />
    </div>
  );
};

export default PageTemplate;