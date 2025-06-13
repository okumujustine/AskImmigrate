import { MessageSquare, RefreshCw, X } from 'lucide-react';
import React from 'react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  isOpen,
  onClose,
  isLoading = false
}) => {
  
  const trimSessionId = (sessionId: string) => {
    if (sessionId && sessionId.length > 20) {
      return sessionId.substring(0, 17) + '...';
    }
    return sessionId;
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-black border-r border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white">Sessions</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-900 rounded-lg lg:hidden"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <RefreshCw className="w-12 h-12 mx-auto mb-3 text-gray-700 animate-spin" />
                <p>Loading sessions...</p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-700" />
                <p>No sessions found</p>
              </div>
            ) : (
              <div className="p-2">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`
                      group relative p-3 rounded-lg cursor-pointer transition-colors mb-2
                      ${currentSessionId === session.id 
                        ? 'bg-emerald-900/30 border border-emerald-700/50' 
                        : 'hover:bg-gray-900'
                      }
                    `}
                    onClick={() => onSelectSession(session.id)}
                    title={session.id} // Show full ID on hover
                  >
                    <div className="flex items-center space-x-3">
                      <MessageSquare className={`
                        w-5 h-5 flex-shrink-0
                        ${currentSessionId === session.id ? 'text-emerald-400' : 'text-gray-600'}
                      `} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {trimSessionId(session.id)}
                        </h3>
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