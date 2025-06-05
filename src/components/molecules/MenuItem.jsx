import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const MenuItem = ({ item, onClick, isActive }) => {
  return (
    <motion.button
      onClick={() => onClick(item)}
      className={`
        w-full flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors
        ${isActive
          ? 'text-primary'
          : item.active
            ? 'text-surface-600 hover:text-primary'
            : 'text-surface-300'
        }
      `}
      disabled={!item.active}
    >
      <Icon name={item.icon} className="h-5 w-5" />
      <Text as="span" className="text-xs font-medium">{item.label}</Text>
    </motion.button>
  );
};

export default MenuItem;