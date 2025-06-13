import React from 'react';
import { MessageSquare, X, RefreshCw, Plus } from 'lucide-react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onCreateNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onCreateNewChat,
  isOpen,
  onClose,
  isLoading = false
}) => {
  // Function to trim session ID if it's too long
  const trimSessionId = (sessionId: string) => {
    if (sessionId.length > 20) {
      return sessionId.substring(0, 17) + '...';
    }
    return sessionId;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-emerald-200 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-emerald-100 bg-emerald-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-emerald-900 text-lg">Sessions</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-emerald-100 rounded-lg lg:hidden transition-colors"
              >
                <X className="w-5 h-5 text-emerald-600" />
              </button>
            </div>
            
            {/* New Chat Button */}
            <button
              onClick={onCreateNewChat}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>New Chat</span>
            </button>
          </div>
          
          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto bg-white">
            {isLoading ? (
              <div className="p-6 text-center text-emerald-600">
                <RefreshCw className="w-12 h-12 mx-auto mb-3 text-emerald-500 animate-spin" />
                <p className="font-medium">Loading sessions...</p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-6 text-center text-emerald-600">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                <p className="font-medium">No sessions found</p>
                <p className="text-sm mt-2 text-emerald-500">Start a new chat to begin</p>
              </div>
            ) : (
              <div className="p-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`
                      group relative p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2 border
                      ${currentSessionId === session.id 
                        ? 'bg-emerald-50 border-emerald-200 shadow-sm' 
                        : 'hover:bg-emerald-25 hover:border-emerald-100 border-transparent'
                      }
                    `}
                    onClick={() => onSelectSession(session.id)}
                    title={session.id} // Show full ID on hover
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                        ${currentSessionId === session.id 
                          ? 'bg-emerald-100' 
                          : 'bg-emerald-50 group-hover:bg-emerald-100'
                        }
                      `}>
                        <MessageSquare className={`
                          w-5 h-5 transition-colors
                          ${currentSessionId === session.id ? 'text-emerald-700' : 'text-emerald-600'}
                        `} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold truncate transition-colors ${
                          currentSessionId === session.id ? 'text-emerald-900' : 'text-emerald-800'
                        }`}>
                          {trimSessionId(session.id)}
                        </h3>
                        <p className="text-xs text-emerald-500 mt-1">
                          Immigration Session
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};