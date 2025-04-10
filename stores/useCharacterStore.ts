import { create } from "zustand";
import { Character, CharacterMessage } from "@/types/character";
import { characters } from "@/config/characters";

interface CharacterState {
  selectedCharacter: Character;
  messages: CharacterMessage[];
  setSelectedCharacter: (character: Character) => void;
  addMessage: (message: CharacterMessage) => void;
  clearMessages: () => void;
}

const defaultCharacterId = "einstein";
const defaultCharacter = characters.find(char => char.id === defaultCharacterId) as Character;

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
