import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon is in src/components/ApperIcon.jsx

const Icon = ({ name, className = '' }) => {
  return <ApperIcon name={name} className={className} />;
};

export default Icon;