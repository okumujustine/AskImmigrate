import React from 'react';
import { MapPin } from 'lucide-react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  // Format markdown content
  const formatMarkdownContent = (content: string) => {
    // Simple markdown formatting - you can enhance this or use a proper markdown library
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-800">$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em class="text-emerald-700">$1</em>') // Italic
      .replace(/`(.*?)`/g, '<code class="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded text-sm">$1</code>') // Inline code
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-emerald-900">$1</h3>') // H3
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2 text-emerald-900">$1</h2>') // H2
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2 text-emerald-900">$1</h1>') // H1
      .replace(/^- (.*$)/gm, '<li class="ml-4 text-emerald-800">• $1</li>') // Bullet points
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 text-emerald-800">$1</li>') // Numbered lists
      .replace(/\n\n/g, '</p><p class="mb-2 text-emerald-800">') // Paragraphs
      .replace(/\n/g, '<br>'); // Line breaks
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-start space-x-3 max-w-4xl w-full">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-sm">
          <MapPin className="w-5 h-5 text-emerald-600" />
        </div>
        
        {/* Message Content */}
        <div className="bg-white/90 backdrop-blur-sm text-emerald-800 px-6 py-4 rounded-2xl rounded-bl-md flex-1 shadow-md border border-emerald-100">
          <div 
            className="prose prose-emerald max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: `<p class="mb-2 text-emerald-800">${formatMarkdownContent(message.content)}</p>` 
            }}
          />
        </div>
      </div>
    </div>
  );
};