import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const Button = ({ children, onClick, className = '', disabled = false, icon, whileHover, whileTap, ...props }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        flex items-center justify-center space-x-2 
        ${className} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      disabled={disabled}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {icon && <Icon name={icon} className="h-5 w-5" />}
      {children}
    </motion.button>
  );
};

export default Button;