import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Label from '../atoms/Label';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import { clothingSuggestionService } from '@/services';

const SmartSuggestions = ({ isOpen, onClose, onApplySuggestions, currentTrip }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    duration: currentTrip?.duration || '',
    hasLaundry: '',
    laundryFrequency: 3
  });
  const [preferences, setPreferences] = useState({
    clothingStyle: 'average',
    activityLevel: 'moderate',
    climate: 'mixed'
  });
  const [suggestions, setSuggestions] = useState(null);
  const [adjustedSuggestions, setAdjustedSuggestions] = useState({});

  const clothingStyleOptions = [
    { value: 'minimalist', label: 'Minimalist (Pack Light)' },
    { value: 'average', label: 'Average (Balanced)' },
    { value: 'overpacker', label: 'Over-packer (Extra Items)' }
  ];

  const activityLevelOptions = [
    { value: 'relaxing', label: 'Mostly Relaxing' },
    { value: 'moderate', label: 'Moderate Activity' },
    { value: 'active', label: 'Very Active' }
  ];

  const climateOptions = [
    { value: 'hot', label: 'Hot Climate' },
    { value: 'cold', label: 'Cold Climate' },
    { value: 'mixed', label: 'Mixed Climate' }
  ];

  const laundryOptions = [
    { value: 'yes', label: 'Yes, laundry available' },
    { value: 'no', label: 'No laundry available' }
  ];

  const handleCalculateSuggestions = async () => {
    // Validation
    if (!tripData.duration || tripData.duration < 1) {
      toast.error('Please enter a valid trip duration');
      return;
    }
    if (!tripData.hasLaundry) {
      toast.error('Please specify laundry availability');
      return;
    }

    setLoading(true);
    try {
      const result = await clothingSuggestionService.calculateSuggestions({
        ...tripData,
        ...preferences,
        duration: parseInt(tripData.duration)
      });
      setSuggestions(result);
      setAdjustedSuggestions({});
      setStep(2);
    } catch (error) {
      toast.error('Failed to calculate suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!suggestions) return;
    
    setLoading(true);
    try {
      const finalSuggestions = { ...suggestions.items, ...adjustedSuggestions };
      await onApplySuggestions(finalSuggestions, suggestions.reasoning);
      toast.success('Suggestions applied to your packing list!');
      onClose();
    } catch (error) {
      toast.error('Failed to apply suggestions');
    } finally {
      setLoading(false);
    }
  };

  const adjustQuantity = (category, newQuantity) => {
    setAdjustedSuggestions(prev => ({
      ...prev,
      [category]: Math.max(0, newQuantity)
    }));
  };

  const resetForm = () => {
    setStep(1);
    setSuggestions(null);
    setAdjustedSuggestions({});
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-surface-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Lightbulb" className="h-6 w-6 text-primary" />
                <Title level={3}>Smart Packing Suggestions</Title>
              </div>
              <Button
                onClick={onClose}
                className="p-2 text-surface-400 hover:text-surface-600 rounded-lg hover:bg-surface-100"
                icon="X"
              />
            </div>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Text className="text-surface-600 mb-4">
                    Let's gather some information about your trip to provide personalized packing suggestions.
                  </Text>
                </div>

                {/* Trip Details */}
                <div className="space-y-4">
                  <Title level={4} className="text-surface-800">Trip Details</Title>
                  
                  <div>
                    <Label>Trip Duration (days)</Label>
                    <Input
                      type="number"
                      value={tripData.duration}
                      onChange={(e) => setTripData(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="Enter number of days"
                      min="1"
                    />
                  </div>

                  <div>
                    <Label>Laundry Facilities Available?</Label>
                    <Select
                      value={tripData.hasLaundry}
                      onChange={(e) => setTripData(prev => ({ ...prev, hasLaundry: e.target.value }))}
                      options={laundryOptions}
                    />
                  </div>

                  {tripData.hasLaundry === 'yes' && (
                    <div>
                      <Label>How often will you do laundry? (every X days)</Label>
                      <Input
                        type="number"
                        value={tripData.laundryFrequency}
                        onChange={(e) => setTripData(prev => ({ ...prev, laundryFrequency: parseInt(e.target.value) || 3 }))}
                        min="1"
                        max="14"
                      />
                    </div>
                  )}
                </div>

                {/* Preferences */}
                <div className="space-y-4">
                  <Title level={4} className="text-surface-800">Your Preferences</Title>
                  
                  <div>
                    <Label>Packing Style</Label>
                    <Select
                      value={preferences.clothingStyle}
                      onChange={(e) => setPreferences(prev => ({ ...prev, clothingStyle: e.target.value }))}
                      options={clothingStyleOptions}
                    />
                  </div>

                  <div>
                    <Label>Activity Level</Label>
                    <Select
                      value={preferences.activityLevel}
                      onChange={(e) => setPreferences(prev => ({ ...prev, activityLevel: e.target.value }))}
                      options={activityLevelOptions}
                    />
                  </div>

                  <div>
                    <Label>Climate</Label>
                    <Select
                      value={preferences.climate}
                      onChange={(e) => setPreferences(prev => ({ ...prev, climate: e.target.value }))}
                      options={climateOptions}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    onClick={onClose}
                    className="px-6 py-3 border border-surface-300 text-surface-600 rounded-xl hover:bg-surface-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCalculateSuggestions}
                    disabled={loading}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    icon={loading ? "Loader" : "Calculator"}
                  >
                    {loading ? 'Calculating...' : 'Get Suggestions'}
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && suggestions && (
              <div className="space-y-6">
                <div>
                  <Text className="text-surface-600 mb-4">
                    Based on your {tripData.duration}-day trip preferences, here are our smart packing suggestions:
                  </Text>
                </div>

                {/* Reasoning */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <Title level={5} className="text-blue-800 mb-2">Why these suggestions?</Title>
                  <Text className="text-blue-700 text-sm">
                    {suggestions.reasoning}
                  </Text>
                </div>

                {/* Suggestions by Category */}
                <div className="space-y-4">
                  <Title level={4} className="text-surface-800">Recommended Quantities</Title>
                  
                  {Object.entries(suggestions.items).map(([category, quantity]) => {
                    const adjustedQuantity = adjustedSuggestions[category] ?? quantity;
                    const categoryLabels = {
                      shirts: '👕 Shirts/Tops',
                      pants: '👖 Pants/Bottoms',
                      underwear: '🩲 Underwear',
                      socks: '🧦 Socks',
                      sweaters: '🧥 Sweaters/Jackets',
                      sleepwear: '🌙 Sleepwear'
                    };

                    return (
                      <div key={category} className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                        <div className="flex-1">
                          <Text className="font-medium text-surface-800">
                            {categoryLabels[category] || category}
                          </Text>
                          <Text className="text-sm text-surface-500">
                            Suggested: {quantity} items
                          </Text>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => adjustQuantity(category, adjustedQuantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-300 text-surface-600 hover:bg-surface-100"
                            disabled={adjustedQuantity <= 0}
                          >
                            -
                          </Button>
                          <Text className="w-12 text-center font-medium">
                            {adjustedQuantity}
                          </Text>
                          <Button
                            onClick={() => adjustQuantity(category, adjustedQuantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-300 text-surface-600 hover:bg-surface-100"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between space-x-3 pt-4">
                  <Button
                    onClick={resetForm}
                    className="px-6 py-3 border border-surface-300 text-surface-600 rounded-xl hover:bg-surface-50"
                    icon="ArrowLeft"
                  >
                    Back
                  </Button>
                  <div className="flex space-x-3">
                    <Button
                      onClick={onClose}
                      className="px-6 py-3 border border-surface-300 text-surface-600 rounded-xl hover:bg-surface-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleApply}
                      disabled={loading}
                      className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      icon={loading ? "Loader" : "Check"}
                    >
                      {loading ? 'Applying...' : 'Apply to Packing List'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SmartSuggestions;