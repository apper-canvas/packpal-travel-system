import React from 'react';
import NavItem from '../molecules/NavItem';

const Sidebar = ({ isOpen, sidebarItems, activeTab, onSidebarItemClick, onCloseOverlay }) => {
  return (
    <>
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white/90 backdrop-blur-md border-r border-surface-200 transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 lg:p-6 pt-20 lg:pt-6">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                onClick={onSidebarItemClick}
                activeTabId={activeTab}
              />
            ))}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={onCloseOverlay}
        />
      )}
    </>
  );
};

export default Sidebar;