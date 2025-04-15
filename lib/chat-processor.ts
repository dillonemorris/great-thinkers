import { Annotation } from "@/components/annotations";
import useCharacterStore from "@/stores/useCharacterStore";
import { getConversationStore } from "@/stores/useConversationStore";

export interface ContentItem {
  type: "input_text" | "output_text" | "refusal" | "output_audio";
  annotations?: Annotation[];
  text?: string;
}

// Message items for storing conversation history matching API shape
export interface MessageItem {
  type: "message";
  role: "user" | "assistant" | "system";
  id?: string;
  content: ContentItem[];
}

export const handleTurn = async (messages: any[], onMessage: (data: any) => void) => {
  try {
    // Get response from the API (defined in app/api/turn_response/route.ts)
    const response = await fetch("/api/turn_response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages,
      }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }

    // Reader for streaming data
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      buffer += chunkValue;

      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataStr = line.slice(6);
          if (dataStr === "[DONE]") {
            done = true;
            break;
          }
          const data = JSON.parse(dataStr);
          onMessage(data);
        }
      }
    }

    // Handle any remaining data in buffer
    if (buffer && buffer.startsWith("data: ")) {
      const dataStr = buffer.slice(6);
      if (dataStr !== "[DONE]") {
        const data = JSON.parse(dataStr);
        onMessage(data);
      }
    }
  } catch (error) {
    console.error("Error handling turn:", error);
  }
};

export const processMessages = async () => {
  const { selectedCharacter } = useCharacterStore.getState();
  const store = getConversationStore(selectedCharacter.id);

  const { chatMessages, conversationItems } = store.getState();

  const allConversationItems = [
    {
      role: "developer",
      content: selectedCharacter?.prompt,
    },
    ...conversationItems,
  ];

  let assistantMessageContent = "";
  let currentMessageId: string | undefined;

  try {
    await handleTurn(allConversationItems, async ({ event, data }) => {
      if (event === "response.output_text.delta") {
        const { delta, item_id } = data;
        assistantMessageContent += delta;
        currentMessageId = item_id;

        // If the last message isn't an assistant message, create a new one
        const lastItem = chatMessages[chatMessages.length - 1];
        if (
          !lastItem ||
          lastItem.type !== "message" ||
          lastItem.role !== "assistant" ||
          (lastItem.id && lastItem.id !== currentMessageId)
        ) {
          store.setState({
            chatMessages: [
              ...chatMessages,
              {
                type: "message",
                role: "assistant",
                id: currentMessageId,
                content: [
                  {
                    type: "output_text",
                    text: assistantMessageContent,
                  },
                ],
              },
            ],
          });
        } else {
          const contentItem = lastItem.content[0];
          if (contentItem && contentItem.type === "output_text") {
            contentItem.text = assistantMessageContent;
            store.setState({ chatMessages: [...chatMessages] });
          }
        }
      }
    });

    // Add the final message to conversation items
    if (assistantMessageContent) {
      store.setState({
        conversationItems: [
          ...conversationItems,
          {
            role: "assistant",
            content: assistantMessageContent,
          },
        ],
      });
    }
  } catch (error) {
    // Add error message to chat
    store.setState({
      chatMessages: [
        ...chatMessages,
        {
          type: "message",
          role: "assistant",
          content: [
            {
              type: "output_text",
              text: "I apologize, but I encountered an error while processing your request. Please try again.",
            },
          ],
        },
      ],
    });
    throw error; // Re-throw to be handled by the UI
  }
};

