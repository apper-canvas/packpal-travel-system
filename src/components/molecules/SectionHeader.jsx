import React from 'react';
import Title from '../atoms/Title';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

const SectionHeader = ({ title, showMenuButton, onMenuButtonClick, quickActions = [] }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-surface-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {showMenuButton && (
            <Button
              onClick={onMenuButtonClick}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
              icon="Menu"
              iconClassName="h-6 w-6 text-surface-600"
            />
          )}

          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
              <Icon name="Luggage" className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <Title level={1} className="text-xl font-bold text-gradient">PackPal</Title>
              <p className="text-xs text-surface-500">Smart Packing Assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                className="hidden md:flex items-center space-x-2 px-3 py-2 bg-surface-100 rounded-lg hover:bg-surface-200 transition-colors"
                icon={action.icon}
                iconClassName="h-4 w-4 text-surface-600"
              >
                <span className="text-sm text-surface-600">{action.label}</span>
              </Button>
            ))}
            <Button onClick={() => {}} className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors" icon="Plus" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SectionHeader;