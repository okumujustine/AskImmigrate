import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { InputArea } from './components/InputArea';
import { SettingsPanel } from './components/SettingsPanel';
import { useChat } from './hooks/useChat';
import { useSettings } from './hooks/useSettings';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const {
    sessions,
    currentSession,
    currentSessionId,
    isTyping,
    isLoading,
    isLoadingMessages,
    error,
    sendMessage,
    selectSession,
    refreshSessions
  } = useChat();

  const {
    preferences,
    isSettingsOpen,
    updatePreferences,
    openSettings,
    closeSettings,
    exportData,
    clearAllData
  } = useSettings();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSelectSession = (sessionId: string) => {
    selectSession(sessionId);
    setIsSidebarOpen(false);
  };

  const currentSessionTitle = currentSession?.title || 'New Immigration Consultation';

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        isLoading={isLoading}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          onToggleSidebar={handleToggleSidebar}
          onOpenSettings={openSettings}
          currentSessionTitle={currentSessionTitle}
        />
        
        {/* Chat Interface */}
        <ChatInterface
          messages={currentSession?.messages || []}
          isTyping={isTyping}
          isLoading={isLoading}
          isLoadingMessages={isLoadingMessages}
          error={error}
          onRefresh={refreshSessions}
        />
        
        {/* Input Area */}
        <InputArea
          onSendMessage={sendMessage}
          disabled={isTyping || isLoading || isLoadingMessages}
        />
      </div>
      
      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={closeSettings}
        preferences={preferences}
        onUpdatePreferences={updatePreferences}
        onExportData={exportData}
        onClearAllData={clearAllData}
      />
    </div>
  );
}

export default App;