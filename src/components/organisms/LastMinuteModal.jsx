import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import LastMinuteReminder from '../molecules/LastMinuteReminder';

const LastMinuteModal = ({ isOpen, onClose, reminders, onToggleReminder }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Title level={3} className="text-xl font-bold text-surface-800">Last-Minute Checklist</Title>
                <Button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                  icon="X"
                  iconClassName="h-5 w-5 text-surface-500"
                />
              </div>

              <div className="space-y-4">
                {reminders?.map((reminder) => (
                  <LastMinuteReminder
                    key={reminder.id}
                    reminder={reminder}
                    onToggle={onToggleReminder}
                  />
                ))}
              </div>

              <div className="mt-6 p-4 bg-surface-50 rounded-xl">
                <div className="flex items-center space-x-2 text-surface-600">
                  <Icon name="Clock" className="h-5 w-5" />
                  <Text as="span" className="font-medium">Departure in:</Text>
                  <Text as="span" className="text-primary font-bold">2 hours 30 minutes</Text>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LastMinuteModal;