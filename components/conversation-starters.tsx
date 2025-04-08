"use client";

import { Character } from "@/types/character";
import { Button } from "./ui/button";

interface ConversationStartersProps {
  character: Character;
  onSelect: (starter: string) => void;
}

export default function ConversationStarters({ character, onSelect }: ConversationStartersProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Start a conversation with {character.name}</h3>
      <div className="grid grid-cols-1 gap-2">
        {character.conversationStarters.map((starter, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start text-left h-auto py-3 px-4"
            onClick={() => onSelect(starter)}
          >
            {starter}
          </Button>
        ))}
      </div>
    </div>
  );
}
