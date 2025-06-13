import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { Message } from '../types';
import { MapPin, AlertCircle, RefreshCw } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  isLoading?: boolean;
  isLoadingMessages?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  isTyping, 
  isLoading = false,
  isLoadingMessages = false,
  error = null,
  onRefresh
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Loading state for initial app load
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/20">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <RefreshCw className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-emerald-900 mb-2">
              Loading Sessions
            </h2>
            <p className="text-emerald-700">
              Please wait while we load your consultation sessions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state for session messages
  if (isLoadingMessages) {
    return (
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/20">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <RefreshCw className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-emerald-900 mb-2">
              Loading Chat History
            </h2>
            <p className="text-emerald-700">
              Please wait while we load your conversation history...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/20">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-emerald-900 mb-2">
              Connection Error
            </h2>
            <p className="text-emerald-700 mb-4">
              {error}
            </p>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/20">
      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 shadow-sm">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span className="text-red-800 text-sm">{error}</span>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="ml-auto px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {messages.length === 0 && !isTyping ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-emerald-900 mb-2">
              Welcome to AskImmigrations
            </h2>
            <p className="text-emerald-700 mb-6 max-w-md">
              Your trusted immigration assistant. I'm here to help answer your questions about 
              visas, green cards, citizenship, and immigration processes. Start a new conversation by typing your question below.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full text-sm text-emerald-700 shadow-sm hover:shadow-md transition-all duration-200">
                Visa requirements
              </div>
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full text-sm text-emerald-700 shadow-sm hover:shadow-md transition-all duration-200">
                Green card process
              </div>
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full text-sm text-emerald-700 shadow-sm hover:shadow-md transition-all duration-200">
                Citizenship questions
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
            />
          ))}
          
          {/* Typing Indicator - shows for both new chats and existing sessions */}
          {isTyping && (
            <div className="flex justify-center mb-4">
              <div className="flex items-start space-x-3 max-w-3xl">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="bg-white/90 backdrop-blur-sm text-emerald-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-md border border-emerald-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};