import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className = '', onKeyPress, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        flex-1 px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all
        ${className}
      `}
      onKeyPress={onKeyPress}
      {...props}
    />
  );
};

export default Input;