import React from 'react';
import Icon from '../atoms/Icon';
import Title from '../atoms/Title';
import Text from '../atoms/Text';

const TripInfoCard = ({ currentTrip }) => {
  if (!currentTrip) {
    return (
      <div className="text-center py-8">
        <Icon name="PlusCircle" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
        <Title level={2} className="text-xl font-semibold text-surface-600 mb-2">No trips planned yet</Title>
        <Text as="p" className="text-surface-500">Create your first trip to start packing!</Text>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <Icon name="MapPin" className="h-6 w-6 text-primary" />
        <Title level={2} className="text-2xl font-bold text-surface-800">{currentTrip.destination}</Title>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" className="h-4 w-4" />
          <Text as="span">{new Date(currentTrip.startDate).toLocaleDateString()} - {new Date(currentTrip.endDate).toLocaleDateString()}</Text>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Briefcase" className="h-4 w-4" />
          <Text as="span" className="capitalize">{currentTrip.tripType}</Text>
        </div>
        {currentTrip.weather && (
          <div className="flex items-center space-x-1">
            <Icon name="Thermometer" className="h-4 w-4" />
            <Text as="span">{currentTrip.weather.temperature}°C, {currentTrip.weather.conditions}</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripInfoCard;