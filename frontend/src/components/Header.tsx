import React from 'react';
import { Menu, MapPin } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  currentSessionTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  currentSessionTitle
}) => {
  return (
    <header className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-emerald-100 rounded-lg transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-emerald-700" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-emerald-900">AskImmigrations</h1>
            <p className="text-sm text-emerald-600 truncate max-w-48">
              {currentSessionTitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};