import React from 'react';
import { AnimatePresence } from 'framer-motion';
import PackingItem from '../molecules/PackingItem';
import CategoryHeader from '../molecules/CategoryHeader';

const PackingList = ({ itemsByCategory, categories, onTogglePacked, onDeleteItem }) => {
  return (
    <div className="space-y-4">
      {Object.entries(itemsByCategory).map(([categoryKey, items]) => {
        const category = categories[categoryKey] || categories.other;
        return (
          <div key={categoryKey} className="bg-white rounded-2xl shadow-soft border border-surface-200 overflow-hidden">
            <CategoryHeader
              icon={category.icon}
              label={category.label}
              packedCount={items.filter(item => item.isPacked).length}
              totalCount={items.length}
              colorClass={category.color}
            />

            <div className="p-4 space-y-2">
              <AnimatePresence>
                {items.map((item) => (
                  <PackingItem
                    key={item.id}
                    item={item}
                    onTogglePacked={onTogglePacked}
                    onDeleteItem={onDeleteItem}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PackingList;