import React from 'react';
import { X, User, Bell, Type, Globe, Palette, Download, Trash2 } from 'lucide-react';
import { UserPreferences } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
  onExportData: () => void;
  onClearAllData: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  onExportData,
  onClearAllData
}) => {
  if (!isOpen) return null;

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    onUpdatePreferences({
      ...preferences,
      [key]: value
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50" onClick={onClose} />
      
      {/* Settings Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-black shadow-xl border-l border-gray-800">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Profile Section */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <User className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium text-white">Profile</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Appearance Section */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Palette className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium text-white">Appearance</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Theme
                  </label>
                  <select
                    value={preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Font Size
                  </label>
                  <select
                    value={preferences.fontSize}
                    onChange={(e) => handlePreferenceChange('fontSize', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Notifications Section */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium text-white">Notifications</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Push notifications</span>
                  <button
                    onClick={() => handlePreferenceChange('notifications', !preferences.notifications)}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${preferences.notifications ? 'bg-emerald-600' : 'bg-gray-700'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${preferences.notifications ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Language Section */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium text-white">Language</h3>
              </div>
              <div>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
            
            {/* Data Management Section */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Download className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium text-white">Data Management</h3>
              </div>
              <div className="space-y-3">
                <button
                  onClick={onExportData}
                  className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  Export Consultation History
                </button>
                <button
                  onClick={onClearAllData}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};