import React from 'react';
import { motion } from 'framer-motion';
import Text from '../atoms/Text';

const ProgressBarCircle = ({ progress }) => {
  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
        <path
          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <path
          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          strokeDasharray={`${progress}, 100`}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Text as="span" className="text-lg font-bold text-surface-800">{progress}%</Text>
      </div>
      {progress === 100 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-2xl absolute -right-6 top-1/2 -translate-y-1/2"
        >
          🎉
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBarCircle;