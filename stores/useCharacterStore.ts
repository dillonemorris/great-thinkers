import { create } from 'zustand';
import { Character, CharacterMessage } from '@/types/character';

interface CharacterState {
  selectedCharacter: Character | null;
  messages: CharacterMessage[];
  setSelectedCharacter: (character: Character | null) => void;
  addMessage: (message: CharacterMessage) => void;
  clearMessages: () => void;
}

const useCharacterStore = create<CharacterState>((set) => ({
  selectedCharacter: null,
  messages: [],
  setSelectedCharacter: (character) => set({ selectedCharacter: character }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  clearMessages: () => set({ messages: [] }),
}));

export default useCharacterStore; 