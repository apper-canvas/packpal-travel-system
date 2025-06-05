import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const AddItemForm = ({ onAddItem, disabled }) => {
  const [newItemText, setNewItemText] = useState('');

  const handleSubmit = () => {
    onAddItem(newItemText);
    setNewItemText('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-surface-200">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add packing item..."
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Button
          onClick={handleSubmit}
          disabled={disabled || !newItemText.trim()}
          className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          icon="Plus"
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default AddItemForm;