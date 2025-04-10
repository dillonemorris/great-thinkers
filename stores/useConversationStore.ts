import { createStore } from "zustand/vanilla";
import { MessageItem } from "@/lib/chat-processor";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { INITIAL_MESSAGE } from "@/config/constants";
import { useStore } from "zustand";

interface ConversationState {
  // Items displayed in the chat
  chatMessages: MessageItem[];
  // Items sent to the Responses API
  conversationItems: any[];

  setChatMessages: (items: MessageItem[]) => void;
  setConversationItems: (messages: any[]) => void;
  addChatMessage: (item: MessageItem) => void;
  addConversationItem: (message: ChatCompletionMessageParam) => void;
}

// Store instances for each character
const stores = new Map<string, ReturnType<typeof createConversationStore>>();

const createConversationStore = () => {
  return createStore<ConversationState>()(set => ({
    chatMessages: [
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: INITIAL_MESSAGE }],
      },
    ],
    conversationItems: [],
    setChatMessages: items => set({ chatMessages: items }),
    setConversationItems: messages => set({ conversationItems: messages }),
    addChatMessage: item =>
      set(state => ({
        chatMessages: [...state.chatMessages, item],
      })),
    addConversationItem: message =>
      set(state => ({
        conversationItems: [...state.conversationItems, message],
      })),
  }));
};

// Get or create a store for a character
export const getConversationStore = (characterId: string) => {
  if (!stores.has(characterId)) {
    stores.set(characterId, createConversationStore());
  }
  return stores.get(characterId)!;
};

export function useConversationStore(characterId: string) {
  const store = getConversationStore(characterId);
  return useStore(store);
}

export default getConversationStore;
