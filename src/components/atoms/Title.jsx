import React from 'react';

const Title = ({ children, level = 1, className = '', ...props }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
};

export default Title;