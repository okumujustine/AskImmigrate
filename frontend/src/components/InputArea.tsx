import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      const messageToSend = message.trim();
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
      
      try {
        await onSendMessage(messageToSend);
      } catch (error) {
        console.error('Failed to send message:', error);
        // Message will be restored if needed by the parent component
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div className="border-t border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Please wait..." : "Ask about immigration processes, visas, or legal requirements..."}
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-900 placeholder-emerald-500 shadow-sm transition-all duration-200"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
        </div>
        
        {/* Send button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 p-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};