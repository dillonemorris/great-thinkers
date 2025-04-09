import { MessageItem } from "@/lib/assistant";
import React from "react";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  message: MessageItem;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="text-sm">
      {message.role === "user" ? (
        <div className="flex justify-end">
          <div className="max-w-[80%]">
            <div className="rounded-lg border border-stone-200 bg-[#E8F1FB] px-4 py-2 text-black">
              <ReactMarkdown>{message.content[0].text as string}</ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="max-w-[80%]">
            <div className="rounded-lg border border-stone-200 bg-[#ededed] px-4 py-2 text-black">
              <ReactMarkdown>{message.content[0].text as string}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
