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

export const NumberInput = ({ value, onChange, placeholder, className = '', min = 0, step = 0.1, max, ...props }) => {
  const handleChange = (e) => {
    const numValue = parseFloat(e.target.value);
    if (!isNaN(numValue) && numValue >= min && (max === undefined || numValue <= max)) {
      onChange(numValue);
    } else if (e.target.value === '') {
      onChange(0);
    }
  };

  return (
    <input
      type="number"
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      className={`
        px-2 py-1 text-sm border border-surface-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent transition-all
        ${className}
      `}
      {...props}
    />
  );
};
export default Input;