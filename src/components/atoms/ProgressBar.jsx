import React from 'react';

const ProgressBar = ({ progress, className = '' }) => {
  return (
    <div className={`relative w-full h-2 bg-surface-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;