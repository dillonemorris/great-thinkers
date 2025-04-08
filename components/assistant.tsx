"use client";
import React from "react";
import Chat from "./chat";
import useConversationStore from "@/stores/useConversationStore";
import { processMessages } from "@/lib/assistant";
import { Character } from "@/types/character";
import CharacterSelector from "@/components/character-selector";
import useCharacterStore from "@/stores/useCharacterStore";

// TODO: Rename
export default function Assistant() {
  const { chatMessages, addConversationItem, addChatMessage } = useConversationStore();
  const { setSelectedCharacter } = useCharacterStore();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userItem: any = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: message.trim() }],
    };
    const userMessage: any = {
      role: "user",
      content: message.trim(),
    };

    try {
      addConversationItem(userMessage);
      addChatMessage(userItem);
      await processMessages();
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="h-full p-4 w-full bg-white">
      <CharacterSelector onSelectAction={handleCharacterSelect} />
      <Chat items={chatMessages} onSendMessage={handleSendMessage} />
    </div>
  );
}
