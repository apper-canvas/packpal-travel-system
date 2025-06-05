import React from 'react';
import { motion } from 'framer-motion';
import Checkbox from '../atoms/Checkbox';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import NumberInput from '../atoms/NumberInput';

const PackingItem = ({ item, onTogglePacked, onDelete, onWeightChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`
        flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200
        ${item.isPacked
          ? 'bg-secondary/10 border-secondary/20'
          : 'bg-surface-50 border-surface-200 hover:border-surface-300'
        }
      `}
    >
      <Checkbox checked={item.isPacked} onChange={() => onTogglePacked(item.id)} />

      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <Text as="span" className={`
            font-medium transition-all duration-200
            ${item.isPacked ? 'line-through text-surface-500' : 'text-surface-800'}
          `}>
            {item.name}
          </Text>
          {item.isEssential && (
            <Text as="span" className="bg-accent/20 text-amber-700 text-xs px-2 py-1 rounded-full">
              Essential
            </Text>
)}
        </div>
        <div className="flex items-center space-x-4 mt-1">
          {item.quantity > 1 && (
            <Text as="span" className="text-sm text-surface-500">Qty: {item.quantity}</Text>
          )}
<div className="flex items-center space-x-2">
            <Text as="span" className="text-xs text-surface-500">Weight:</Text>
            <NumberInput
              value={item.weight || 0}
              onChange={(value) => onWeightChange && onWeightChange(item.id, value)}
              placeholder="0"
              className="w-16 text-xs"
              min={0}
              step={0.1}
            />
            <Text as="span" className="text-xs text-surface-500">g</Text>
          </div>
        </div>
      </div>

      <Button
        onClick={() => onDelete(item.id)}
        className="p-2 text-surface-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
        icon="Trash2"
      />
    </motion.div>
  );
};

export default PackingItem;