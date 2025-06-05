import React from 'react';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import ProgressBarCircle from '../molecules/ProgressBarCircle';

const ProgressSection = ({ currentList, progress }) => {
  const getProgressMessage = () => {
    if (!currentList?.items?.length) return '';
    if (progress === 0) {
      return "Ready to start packing? Check off items as you go!";
    } else if (progress > 0 && progress < 50) {
      return "Great start! Keep going to reach the halfway point.";
    } else if (progress >= 50 && progress < 100) {
      return "You're more than halfway there! Almost ready to go.";
    } else if (progress === 100) {
      return "Perfect! You're all packed and ready for your trip! ✈️";
    }
    return '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-surface-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Title level={3} className="text-lg font-semibold text-surface-800 mb-1">Packing Progress</Title>
          <Text as="p" className="text-surface-600">
            {currentList.items.filter(item => item.isPacked).length} of {currentList.items.length} items packed
          </Text>
        </div>
        <ProgressBarCircle progress={progress} />
      </div>

      <div className="bg-surface-50 rounded-xl p-4">
        <Text as="p" className={`text-surface-600 ${progress === 100 ? 'text-secondary font-medium' : ''}`}>
          {getProgressMessage()}
        </Text>
      </div>
    </div>
  );
};

export default ProgressSection;