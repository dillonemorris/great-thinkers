"use client";
import React from "react";
import Chat from "./chat";
import { useConversationStore } from "@/stores/useConversationStore";
import { processMessages } from "@/lib/chat-processor";
import useCharacterStore from "@/stores/useCharacterStore";

export default function ThinkersChat() {
  const { selectedCharacter } = useCharacterStore();
  const { addConversationItem, addChatMessage } = useConversationStore(selectedCharacter.id);

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

  return (
    <div className="h-full p-2">
      <Chat onSendMessage={handleSendMessage} />
    </div>
  );
}
