import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

const TripInputField = ({ label, type, value, onChange, placeholder, options }) => {
  return (
    <div>
      <Label>{label}</Label>
      {type === 'select' ? (
        <Select
          value={value}
          onChange={onChange}
          options={options}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default TripInputField;