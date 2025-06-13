import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export interface SendMessageRequest {
  sessionId?: string;
  content: string;
}

export interface SendMessageResponse {
  answer: string;
  session_id: string;
}

export interface GetSessionIdsResponse {
  sessionIds: string[];
}

export interface GetSessionHistoryResponse {
  history: string;
}

export const sessionApi = {

  getSessionIds: async (): Promise<string[]> => {
    try {
     
      const response = await api.get<GetSessionIdsResponse>('/chat-sessions');
      return response.data.sessionIds;
    } catch (error) {
      console.error('Failed to fetch session IDs:', error);
      throw new Error('Failed to load session list');
    }
  },

  getSessionHistory: async (sessionId: string): Promise<string> => {
    try {
    
      const response = await api.get<GetSessionHistoryResponse>(`/history/${sessionId}`);
      return response.data.history;
    } catch (error) {
      console.error('Failed to fetch session history:', error);
      throw new Error('Failed to load session history');
    }
  }
};

export const messageApi = {
  sendMessage: async (sessionId: string | null, content: string): Promise<{ sessionId: string; response: string }> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 9000));
      
      const response = await api.post<SendMessageResponse>('/chat', {
        session_id: sessionId,
        question: content
      });
      return {
        sessionId: response.data.session_id,
        response: response.data.answer
      };
    } catch (error) {
      console.error('Failed to send message:', error);
      throw new Error('Failed to send message');
    }
  }
};

export default api;