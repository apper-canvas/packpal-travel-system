import React from 'react';

const Select = ({ value, onChange, options, className = '', ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`
        w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all
        ${className}
      `}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;