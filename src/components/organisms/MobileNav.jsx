import React from 'react';
import MenuItem from '../molecules/MenuItem';

const MobileNav = ({ sidebarItems, activeTab, onSidebarItemClick }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-surface-200 z-40">
      <div className="flex items-center justify-around py-2">
        {sidebarItems.slice(0, 4).map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onClick={onSidebarItemClick}
            isActive={activeTab === item.id}
          />
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;