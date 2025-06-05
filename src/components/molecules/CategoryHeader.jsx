import React from 'react';
import Icon from '../atoms/Icon';
import Title from '../atoms/Title';
import Text from '../atoms/Text';

const CategoryHeader = ({ icon, label, packedCount, totalCount, colorClass }) => {
  return (
    <div className={`bg-${colorClass} p-4`}>
      <div className="flex items-center space-x-3">
        <Icon name={icon} className="h-5 w-5 text-surface-700" />
        <Title level={4} className="font-semibold text-surface-800">{label}</Title>
        <Text as="span" className="bg-white/80 text-surface-600 text-sm px-2 py-1 rounded-full">
          {packedCount}/{totalCount}
        </Text>
      </div>
    </div>
  );
};

export default CategoryHeader;