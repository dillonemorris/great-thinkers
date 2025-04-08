import { create } from 'zustand';
import { MessageItem } from '@/lib/assistant';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { INITIAL_MESSAGE } from '@/config/constants';

interface ConversationState {
  // Items displayed in the chat
  chatMessages: MessageItem[];
  // Items sent to the Responses API
  conversationItems: any[];

  setChatMessages: (items: MessageItem[]) => void;
  setConversationItems: (messages: any[]) => void;
  addChatMessage: (item: MessageItem) => void;
  addConversationItem: (message: ChatCompletionMessageParam) => void;
  rawSet: (state: any) => void;
}

const useConversationStore = create<ConversationState>(set => ({
  chatMessages: [
    {
      type: 'message',
      role: 'assistant',
      content: [{ type: 'output_text', text: INITIAL_MESSAGE }],
    },
  ],
  conversationItems: [],
  setChatMessages: items => set({ chatMessages: items }),
  setConversationItems: messages => set({ conversationItems: messages }),
  addChatMessage: item => set(state => ({ chatMessages: [...state.chatMessages, item] })),
  addConversationItem: message =>
    set(state => ({
      conversationItems: [...state.conversationItems, message],
    })),
  rawSet: set,
}));

export default useConversationStore;
