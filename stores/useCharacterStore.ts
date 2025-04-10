import { create } from "zustand";
import { Character, CharacterMessage } from "@/types/character";
import { characters } from "@/config/characters";

interface CharacterState {
  selectedCharacter: Character | null;
  messages: CharacterMessage[];
  setSelectedCharacter: (character: Character | null) => void;
  addMessage: (message: CharacterMessage) => void;
  clearMessages: () => void;
}

// Get Einstein as the default character
const defaultCharacter = characters.find(char => char.id === "einstein") || null;

const useCharacterStore = create<CharacterState>(set => ({
  selectedCharacter: defaultCharacter,
  messages: [],
  setSelectedCharacter: character => set({ selectedCharacter: character }),
  addMessage: message =>
    set(state => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () => set({ messages: [] }),
}));

export default useCharacterStore;
