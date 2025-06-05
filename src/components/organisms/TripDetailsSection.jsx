import React from 'react';
import TripInfoCard from '../molecules/TripInfoCard';
import Button from '../atoms/Button';

const TripDetailsSection = ({ currentTrip, onPlanTripClick, onLastMinuteClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-surface-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <TripInfoCard currentTrip={currentTrip} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onPlanTripClick}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            icon="Plus"
          >
            {currentTrip ? 'New Trip' : 'Plan Trip'}
          </Button>

          {currentTrip && (
            <Button
              onClick={onLastMinuteClick}
              className="bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-yellow-500 transition-colors"
              icon="Clock"
            >
              Last Minute
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetailsSection;