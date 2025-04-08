export interface Character {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  prompt: string;
  conversationStarters: string[];
  era: string;
  expertise: string[];
}

export interface CharacterMessage {
  type: 'message';
  role: 'user' | 'assistant' | 'system';
  characterId?: string;
  id?: string;
  content: {
    type: 'input_text' | 'output_text' | 'refusal' | 'output_audio';
    annotations?: {
      type: 'file_citation' | 'url_citation';
      fileId?: string;
      url?: string;
      title?: string;
      filename?: string;
      index?: number;
    }[];
    text?: string;
  }[];
} 