"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "./message";
import Annotations from "./annotations";
import { MessageItem } from "@/lib/assistant";
import useCharacterStore from "@/stores/useCharacterStore";
import CharacterSelector from "@/components/character-selector";

interface ChatProps {
  items: MessageItem[];
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ items, onSendMessage }) => {
  const { selectedCharacter, setSelectedCharacter } = useCharacterStore();
  const itemsEndRef = useRef<HTMLDivElement>(null);
  const [inputMessageText, setinputMessageText] = useState<string>("");
  // This state is used to provide better user experience for non-English IMEs such as Japanese
  const [isComposing, setIsComposing] = useState(false);

  const scrollToBottom = () => {
    itemsEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey && !isComposing) {
        event.preventDefault();
        onSendMessage(inputMessageText);
        setinputMessageText("");
      }
    },
    [onSendMessage, inputMessageText]
  );

  useEffect(() => {
    scrollToBottom();
  }, [items]);

  const handleConversationStarterClick = (starter: string) => {
    onSendMessage(starter);
    setinputMessageText("");
  };

  return (
    <div className="flex h-full justify-center">
      <div className="flex h-full w-full max-w-[1200px]">
        {/* Left sidebar */}
        <div className="w-[320px] pr-4 flex h-full">
          <div className="overflow-y-auto h-full">
            <CharacterSelector onSelectAction={setSelectedCharacter} />
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col border-2 border-border rounded-lg">
          <div className="border-b-2 border-border p-4">
            <h2 className="text-xl font-medium">{selectedCharacter?.name}</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.map((item, index) => (
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
          <div className="border-t-2 border-border p-4">
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
              />
              <button
                disabled={!inputMessageText}
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

        {/* Right sidebar - Conversation Starters */}
        <div className="w-[320px] pl-4 h-full">
          <div className="overflow-y-auto border-2 border-border rounded-lg p-4 h-full">
            <h3 className="text-lg font-medium mb-2">Conversation Starters</h3>
            <ul className="space-y-2">
              {selectedCharacter?.conversationStarters.map((starter, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleConversationStarterClick(starter)}
                    className="text-left w-full p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    {starter}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
