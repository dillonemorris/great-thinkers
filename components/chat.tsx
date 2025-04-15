"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Message from "./message";
import Annotations from "./annotations";
import useCharacterStore from "@/stores/useCharacterStore";
import { useConversationStore } from "@/stores/useConversationStore";
import { Toaster } from "sonner";

interface ChatProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const Chat: React.FC<ChatProps> = ({ onSendMessage, isLoading }) => {
  const { selectedCharacter } = useCharacterStore();
  const { chatMessages } = useConversationStore(selectedCharacter.id);
  const itemsEndRef = useRef<HTMLDivElement>(null);
  const [inputMessageText, setinputMessageText] = useState<string>("");
  // This state is used to provide better user experience for non-English IMEs such as Japanese
  const [isComposing, setIsComposing] = useState(false);

  const hasUserSentMessage = chatMessages.some(message => message.role === "user");

  const scrollToBottom = () => {
    itemsEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey && !isComposing && !isLoading) {
        event.preventDefault();
        onSendMessage(inputMessageText);
        setinputMessageText("");
      }
    },
    [onSendMessage, inputMessageText, isComposing, isLoading]
  );

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex h-full justify-center">
        <div className={"flex h-full w-full max-w-screen-md"}>
          {/* Chat area */}
          <div className="flex-1 flex flex-col border border-border rounded-lg w-full">
            <div className="border-b border-border p-2 md:p-4 flex items-center gap-2">
              <div className="relative w-12 h-12">
                <Image
                  src={selectedCharacter.avatar}
                  alt={selectedCharacter.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-md md:text-xl font-medium">{selectedCharacter.name}</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((item, index) => (
                <div key={item?.id || index} className="flex flex-col gap-2">
                  <Message message={item} />
                  {item.content &&
                    item.content[0].annotations &&
                    item.content[0].annotations.length > 0 && (
                      <Annotations annotations={item.content[0].annotations} />
                    )}
                </div>
              ))}
              <div ref={itemsEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-border p-4">
              {!hasUserSentMessage ? (
                <ConversationStarters onConversationStartClick={setinputMessageText} />
              ) : null}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Send a message..."
                  className="flex-1 rounded-lg border border-stone-200 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                  value={inputMessageText}
                  onChange={e => setinputMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  disabled={isLoading}
                />
                <button
                  disabled={!inputMessageText || isLoading}
                  onClick={() => {
                    onSendMessage(inputMessageText);
                    setinputMessageText("");
                  }}
                  className="px-4 py-2 bg-black text-white rounded-lg disabled:bg-stone-200"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type ConversationStarersProps = {
  onConversationStartClick: (starter: string) => void;
};

const ConversationStarters = ({ onConversationStartClick }: ConversationStarersProps) => {
  const { selectedCharacter } = useCharacterStore();

  return (
    <ul className="space-y-3 pb-4 flex flex-col">
      {selectedCharacter?.conversationStarters.map((starter, index) => (
        <li key={index}>
          <button
            onClick={() => onConversationStartClick(starter)}
            className="text-left text-sm  p-2 rounded bg-[#ededed] cursor-pointer transition-all hover:ring-2 hover:ring-stone-300"
          >
            {starter}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Chat;
