import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const NavItem = ({ item, onClick, activeTabId }) => {
  const isActive = item.id === activeTabId;
  const className = `
    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
    ${item.active && isActive
      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-l-4 border-primary'
      : item.active
        ? 'hover:bg-surface-50 text-surface-700'
        : 'text-surface-400 cursor-not-allowed'
    }
  `;
  const iconClassName = `h-5 w-5 ${
    item.active && isActive ? 'text-primary' :
    item.active ? 'text-surface-600' : 'text-surface-300'
  }`;

  return (
    <motion.button
      key={item.id}
      onClick={() => onClick(item)}
      className={className}
      whileHover={item.active ? { scale: 1.02 } : {}}
      whileTap={item.active ? { scale: 0.98 } : {}}
    >
      <Icon name={item.icon} className={iconClassName} />
      <div className="flex-1">
        <Text as="span" className="font-medium">{item.label}</Text>
        {!item.active && (
          <Text as="p" className="text-xs text-surface-400 mt-1">{item.placeholder}</Text>
        )}
      </div>
    </motion.button>
  );
};

export default NavItem;