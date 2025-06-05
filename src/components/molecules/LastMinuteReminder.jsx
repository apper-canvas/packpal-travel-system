import React from 'react';
import Text from '../atoms/Text';

const LastMinuteReminder = ({ reminder, onToggle }) => {
  const priorityClasses = {
    critical: 'border-red-500 bg-red-50',
    important: 'border-accent bg-yellow-50',
    normal: 'border-blue-500 bg-blue-50',
  };

  const priorityTextClasses = {
    critical: 'bg-red-100 text-red-700',
    important: 'bg-yellow-100 text-yellow-700',
    normal: 'bg-blue-100 text-blue-700',
  };

  return (
    <div
      className={`
        p-4 rounded-xl border-l-4 
        ${priorityClasses[reminder.priority]}
      `}
    >
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={reminder.isComplete}
          onChange={() => onToggle(reminder.id)}
          className="mt-1 w-5 h-5 text-primary border-surface-300 rounded focus:ring-primary"
        />
        <div className="flex-1">
          <Text as="p" className="font-medium text-surface-800">{reminder.text}</Text>
          <Text as="span" className={`
            text-xs px-2 py-1 rounded-full inline-block mt-1
            ${priorityTextClasses[reminder.priority]}
          `}>
            {reminder.priority}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LastMinuteReminder;