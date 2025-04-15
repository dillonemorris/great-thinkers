"use client";
import React, { useState } from "react";
import Chat from "./chat";
import { useConversationStore } from "@/stores/useConversationStore";
import { processMessages } from "@/lib/chat-processor";
import useCharacterStore from "@/stores/useCharacterStore";
import { toast } from "sonner";

const ThinkersChat = () => {
  const { selectedCharacter } = useCharacterStore();
  const { addConversationItem, addChatMessage } = useConversationStore(selectedCharacter.id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    if (isLoading) return;

    setIsLoading(true);

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
      
      // Handle different types of errors
      if (error instanceof Error) {
        if (error.message.includes('rate_limit_exceeded')) {
          toast.error("You're sending messages too quickly. Please wait a moment and try again.");
        } else if (error.message.includes('API_KEY_MISSING')) {
          toast.error("Service configuration error. Please try again later.");
        } else {
          toast.error("An error occurred while processing your message. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full p-2">
      <Chat onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ThinkersChat;
