import { useState, useEffect } from 'react';
import { UserPreferences } from '../types';

const defaultPreferences: UserPreferences = {
  theme: 'light',
  notifications: true,
  fontSize: 'medium',
  language: 'en'
};

export const useSettings = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('chatbot-preferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Failed to parse preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatbot-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
  };

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const exportData = () => {
    // Mock export functionality
    const dataToExport = {
      preferences,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chatbot-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('chatbot-preferences');
      localStorage.removeItem('chatbot-sessions');
      setPreferences(defaultPreferences);
      window.location.reload();
    }
  };

  return {
    preferences,
    isSettingsOpen,
    updatePreferences,
    openSettings,
    closeSettings,
    exportData,
    clearAllData
  };
};