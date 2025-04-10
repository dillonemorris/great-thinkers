import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { MessageItem } from "@/lib/chat-processor";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { useStore } from "zustand";
import useCharacterStore from "@/stores/useCharacterStore";

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
const stores = new Map<string, ReturnType<typeof createPersistedStore>>();

const createPersistedStore = (characterId: string) => {
  const { selectedCharacter } = useCharacterStore.getState();
  
  return createStore<ConversationState>()(
    persist(
      set => ({
        chatMessages: [
          {
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: selectedCharacter.initialMessage }],
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
      }),
      {
        name: `conversation-${characterId}`, // unique name for each character's storage
      }
    )
  );
};

// Get or create a store for a character
export const getConversationStore = (characterId: string) => {
  if (!stores.has(characterId)) {
    stores.set(characterId, createPersistedStore(characterId));
  }
  return stores.get(characterId)!;
};

// Create a bounded useStore hook for React components
export function useConversationStore(characterId: string) {
  const store = getConversationStore(characterId);
  return useStore(store);
}

export default getConversationStore;
