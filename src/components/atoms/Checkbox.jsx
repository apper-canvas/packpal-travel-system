import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const Checkbox = ({ checked, onChange, className = '' }) => {
  return (
    <motion.button
      onClick={onChange}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200
        ${checked
          ? 'bg-secondary border-secondary text-white'
          : 'border-surface-300 hover:border-secondary'
        }
        ${className}
      `}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Icon name="Check" className="h-4 w-4" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default Checkbox;