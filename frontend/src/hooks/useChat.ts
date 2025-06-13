import { useState, useCallback, useEffect } from 'react';
import { Message, ChatSession } from '../types';
import { sessionApi, messageApi } from '../services/api';

export const useChat = () => {
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [loadedSessions, setLoadedSessions] = useState<Map<string, ChatSession>>(new Map());
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get current session
  const currentSession = currentSessionId ? loadedSessions.get(currentSessionId) : null;

  // Load session IDs on mount
  useEffect(() => {
    loadSessionIds();
  }, []);

  // Load session IDs from API
  const loadSessionIds = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedSessionIds = await sessionApi.getSessionIds();
      setSessionIds(fetchedSessionIds);
      
      // Set current session to the first one if none selected
      if (!currentSessionId && fetchedSessionIds.length > 0) {
        setCurrentSessionId(fetchedSessionIds[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sessions');
      console.error('Error loading session IDs:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentSessionId]);

  // Parse markdown history into messages
  const parseMarkdownHistory = (markdownHistory: string): Message[] => {
    const messages: Message[] = [];
    
    // Split content by double line breaks to separate different message blocks
    const blocks = markdownHistory.split(/\n\n(?=[A-Za-z])/);
    
    blocks.forEach((block, index) => {
      const trimmedBlock = block.trim();
      if (trimmedBlock) {
        messages.push({
          id: `msg-${index + 1}`,
          content: trimmedBlock
        });
      }
    });
    
    return messages;
  };

  // Load history for a specific session
  const loadSessionHistory = useCallback(async (sessionId: string) => {
    // If session is already loaded, don't reload
    if (loadedSessions.has(sessionId)) {
      return;
    }

    try {
      setIsLoadingMessages(true);
      setError(null);
      const markdownHistory = await sessionApi.getSessionHistory(sessionId);
      
      // Parse markdown history into messages
      const messages = parseMarkdownHistory(markdownHistory);
      
      // Create session object with parsed messages
      const session: ChatSession = {
        id: sessionId,
        title: messages.length > 0 ? messages[0].content.slice(0, 50).replace(/[#*]/g, '').trim() + '...' : 'New Immigration Consultation',
        messages,
        createdAt: new Date(),
        lastActivity: new Date()
      };

      setLoadedSessions(prev => new Map(prev).set(sessionId, session));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load session history');
      console.error('Error loading session history:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  }, []);

  // Send message - backend automatically creates session if sessionId is null
  const sendMessage = useCallback(async (content: string) => {
    try {
      setError(null);
      setIsTyping(true);

      // Send message to API - backend will create session if currentSessionId is null
      const { sessionId: responseSessionId, response } = await messageApi.sendMessage(currentSessionId, content);

      // If this is a new session (backend created a new session)
      if (responseSessionId !== currentSessionId) {
        // Add new session ID to the list and set as current
        setSessionIds(prev => [responseSessionId, ...prev.filter(id => id !== responseSessionId)]);
        setCurrentSessionId(responseSessionId);
      }

      // Create response message
      const responseMessage: Message = {
        id: `response-${Date.now()}`,
        content: response
      };

      // Update or create session with the response
      setLoadedSessions(prev => {
        const newMap = new Map(prev);
        const existingSession = newMap.get(responseSessionId);
        
        if (existingSession) {
          // Update existing session with new response
          newMap.set(responseSessionId, {
            ...existingSession,
            messages: [...existingSession.messages, responseMessage],
            lastActivity: new Date()
          });
        } else {
          // Create new session with the response (for newly created sessions)
          const newSession: ChatSession = {
            id: responseSessionId,
            title: content.slice(0, 50) + '...',
            messages: [responseMessage],
            createdAt: new Date(),
            lastActivity: new Date()
          };
          newMap.set(responseSessionId, newSession);
        }
        
        return newMap;
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setIsTyping(false);
    }
  }, [currentSessionId]);

  // Select session
  const selectSession = useCallback(async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setError(null);
    
    // Load history if not already loaded
    await loadSessionHistory(sessionId);
  }, [loadSessionHistory]);

  // Convert session IDs to session objects for display
  const sessions = sessionIds.map(id => {
    const loadedSession = loadedSessions.get(id);
    return loadedSession || {
      id,
      title: `Session ${id}`,
      messages: [],
      createdAt: new Date(),
      lastActivity: new Date()
    };
  });

  return {
    sessions,
    currentSession,
    currentSessionId,
    isTyping,
    isLoading,
    isLoadingMessages,
    error,
    sendMessage,
    selectSession,
    refreshSessions: loadSessionIds
  };
};