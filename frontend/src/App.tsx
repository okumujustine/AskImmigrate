import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { InputArea } from './components/InputArea';
import { useChat } from './hooks/useChat';

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
    createNewChat,
    refreshSessions
  } = useChat();

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

  const handleCreateNewChat = () => {
    createNewChat();
    setIsSidebarOpen(false);
  };

  const currentSessionTitle = currentSession?.title || 'New Immigration Consultation';

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onCreateNewChat={handleCreateNewChat}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        isLoading={isLoading}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          onToggleSidebar={handleToggleSidebar}
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
    </div>
  );
}

export default App;