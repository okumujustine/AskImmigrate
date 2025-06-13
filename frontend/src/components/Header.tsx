import React from 'react';
import { Settings, Menu, MapPin } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
  currentSessionTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenSettings,
  currentSessionTitle
}) => {
  return (
    <header className="bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-900 rounded-lg transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-gray-300" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-white">AskImmigrate</h1>
            <p className="text-sm text-gray-400 truncate max-w-48">
              {currentSessionTitle}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenSettings}
          className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </header>
  );
};