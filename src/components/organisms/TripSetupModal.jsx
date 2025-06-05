import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Title from '../atoms/Title';
import TripInputField from '../molecules/TripInputField';

const TripSetupModal = ({ isOpen, onClose, tripForm, onFormChange, onCreateTrip, loading }) => {
  const tripTypeOptions = [
    { value: 'leisure', label: 'Leisure' },
    { value: 'business', label: 'Business' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'family', label: 'Family' },
  ];

  const isFormValid = tripForm.destination && tripForm.startDate && tripForm.endDate;

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
                <Title level={3} className="text-xl font-bold text-surface-800">Plan New Trip</Title>
                <Button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                  icon="X"
                  iconClassName="h-5 w-5 text-surface-500"
                />
              </div>

              <div className="space-y-6">
                <TripInputField
                  label="Destination"
                  type="text"
                  value={tripForm.destination}
                  onChange={(e) => onFormChange('destination', e.target.value)}
                  placeholder="Where are you going?"
                />

                <div className="grid grid-cols-2 gap-4">
                  <TripInputField
                    label="Start Date"
                    type="date"
                    value={tripForm.startDate}
                    onChange={(e) => onFormChange('startDate', e.target.value)}
                  />
                  <TripInputField
                    label="End Date"
                    type="date"
                    value={tripForm.endDate}
                    onChange={(e) => onFormChange('endDate', e.target.value)}
                  />
                </div>

                <TripInputField
                  label="Trip Type"
                  type="select"
                  value={tripForm.tripType}
                  onChange={(e) => onFormChange('tripType', e.target.value)}
                  options={tripTypeOptions}
                />

                <Button
                  onClick={onCreateTrip}
                  disabled={loading || !isFormValid}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? 'Creating Trip...' : 'Create Trip & Generate List'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TripSetupModal;