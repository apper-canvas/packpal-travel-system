import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Text from '../atoms/Text';
import Title from '../atoms/Title';
import Icon from '../atoms/Icon';
import { packingListService } from '../../services';

const WeightCalculator = ({ listId, items }) => {
  const [weightData, setWeightData] = useState({
    totalWeight: 0,
    packedWeight: 0,
    unpackedWeight: 0
  });
  const [unit, setUnit] = useState('kg'); // kg or lbs
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listId) {
      calculateWeights();
    }
  }, [listId, items]);

  const calculateWeights = async () => {
    try {
      setLoading(true);
      const weights = await packingListService.calculateTotalWeight(listId);
      setWeightData(weights);
    } catch (error) {
      console.error('Error calculating weights:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertWeight = (weightInGrams) => {
    if (unit === 'lbs') {
      return (weightInGrams / 453.592).toFixed(1);
    }
    return (weightInGrams / 1000).toFixed(1);
  };

  const getWeightStatus = (weight) => {
    const weightInKg = weight / 1000;
    if (weightInKg <= 20) return { color: 'text-secondary', bg: 'bg-secondary/10', status: 'Good' };
    if (weightInKg <= 23) return { color: 'text-amber-600', bg: 'bg-amber-100', status: 'Warning' };
    return { color: 'text-red-600', bg: 'bg-red-100', status: 'Over Limit' };
  };

  const totalStatus = getWeightStatus(weightData.totalWeight);
  const packedStatus = getWeightStatus(weightData.packedWeight);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-soft border border-surface-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-surface-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-surface-200 rounded w-full"></div>
            <div className="h-4 bg-surface-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-soft border border-surface-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Icon name="Scale" className="w-5 h-5 text-primary" />
          </div>
          <Title level={3} className="text-surface-800">Weight Calculator</Title>
        </div>
        
        <button
          onClick={() => setUnit(unit === 'kg' ? 'lbs' : 'kg')}
          className="px-3 py-1 text-sm bg-surface-100 rounded-lg hover:bg-surface-200 transition-colors"
        >
          {unit}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Weight */}
        <div className={`p-4 rounded-xl ${totalStatus.bg} border-l-4 border-l-${totalStatus.color.replace('text-', '')}`}>
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm text-surface-600 mb-1">Total Weight</Text>
              <div className="flex items-baseline space-x-1">
                <Text className={`text-2xl font-bold ${totalStatus.color}`}>
                  {convertWeight(weightData.totalWeight)}
                </Text>
                <Text className="text-sm text-surface-500">{unit}</Text>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${totalStatus.bg} ${totalStatus.color}`}>
              {totalStatus.status}
            </div>
          </div>
        </div>

        {/* Packed Weight */}
        <div className={`p-4 rounded-xl ${packedStatus.bg} border-l-4 border-l-${packedStatus.color.replace('text-', '')}`}>
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm text-surface-600 mb-1">Packed Weight</Text>
              <div className="flex items-baseline space-x-1">
                <Text className={`text-2xl font-bold ${packedStatus.color}`}>
                  {convertWeight(weightData.packedWeight)}
                </Text>
                <Text className="text-sm text-surface-500">{unit}</Text>
              </div>
            </div>
            <Icon name="CheckCircle" className={`w-5 h-5 ${packedStatus.color}`} />
          </div>
        </div>

        {/* Remaining Weight */}
        <div className="p-4 rounded-xl bg-surface-50 border-l-4 border-l-surface-300">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm text-surface-600 mb-1">Remaining</Text>
              <div className="flex items-baseline space-x-1">
                <Text className="text-2xl font-bold text-surface-700">
                  {convertWeight(weightData.unpackedWeight)}
                </Text>
                <Text className="text-sm text-surface-500">{unit}</Text>
              </div>
            </div>
            <Icon name="Package" className="w-5 h-5 text-surface-400" />
          </div>
        </div>
      </div>

      {/* Weight Guidelines */}
      <div className="mt-6 p-4 bg-surface-50 rounded-xl">
        <Text className="text-sm font-medium text-surface-700 mb-2">Airline Weight Guidelines</Text>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 bg-secondary/20 text-secondary-dark rounded">Under 20kg: Standard</span>
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded">20-23kg: Check limits</span>
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Over 23kg: Excess fees</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeightCalculator;