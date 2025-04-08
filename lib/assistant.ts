import { parse } from 'partial-json';
import useConversationStore from '@/stores/useConversationStore';
import { Annotation } from '@/components/annotations';
import { characters } from '@/config/characters';

export interface ContentItem {
  type: 'input_text' | 'output_text' | 'refusal' | 'output_audio';
  annotations?: Annotation[];
  text?: string;
}

// Message items for storing conversation history matching API shape
export interface MessageItem {
  type: 'message';
  role: 'user' | 'assistant' | 'system';
  id?: string;
  content: ContentItem[];
}

export const handleTurn = async (messages: any[], onMessage: (data: any) => void) => {
  try {
    // Get response from the API (defined in app/api/turn_response/route.ts)
    const response = await fetch('/api/turn_response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    let buffer = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      buffer += chunkValue;

      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6);
          if (dataStr === '[DONE]') {
            done = true;
            break;
          }
          const data = JSON.parse(dataStr);
          onMessage(data);
        }
      }
    }

    // Handle any remaining data in buffer
    if (buffer && buffer.startsWith('data: ')) {
      const dataStr = buffer.slice(6);
      if (dataStr !== '[DONE]') {
        const data = JSON.parse(dataStr);
        onMessage(data);
      }
    }
  } catch (error) {
    console.error('Error handling turn:', error);
  }
};

export const processMessages = async () => {
  const { chatMessages, conversationItems, setChatMessages, setConversationItems } =
    useConversationStore.getState();

  const allConversationItems = [
    // Adding developer prompt as first item in the conversation
    {
      role: 'developer',
      // TODO: Pass in the currently selected character's prompt
      content: characters[0].prompt,
    },
    ...conversationItems,
  ];

  let assistantMessageContent = '';

  await handleTurn(allConversationItems, async ({ event, data }) => {
    switch (event) {
      case 'response.output_text.delta':
      case 'response.output_text.annotation.added': {
        const { delta, item_id, annotation } = data;

        console.log('event', data);

        let partial = '';
        if (typeof delta === 'string') {
          partial = delta;
        }
        assistantMessageContent += partial;

        // If the last message isn't an assistant message, create a new one
        const lastItem = chatMessages[chatMessages.length - 1];
        if (
          !lastItem ||
          lastItem.type !== 'message' ||
          lastItem.role !== 'assistant' ||
          (lastItem.id && lastItem.id !== item_id)
        ) {
          chatMessages.push({
            type: 'message',
            role: 'assistant',
            id: item_id,
            content: [
              {
                type: 'output_text',
                text: assistantMessageContent,
              },
            ],
          } as MessageItem);
        } else {
          const contentItem = lastItem.content[0];
          if (contentItem && contentItem.type === 'output_text') {
            contentItem.text = assistantMessageContent;
            if (annotation) {
              contentItem.annotations = [...(contentItem.annotations ?? []), annotation];
            }
          }
        }

        setChatMessages([...chatMessages]);
        break;
      }

      case 'response.output_item.added': {
        const { item } = data || {};
        // New item coming in
        if (!item || !item.type) {
          break;
        }
        const text = item.content?.text || '';
        chatMessages.push({
          type: 'message',
          role: 'assistant',
          content: [
            {
              type: 'output_text',
              text,
            },
          ],
        });
        conversationItems.push({
          role: 'assistant',
          content: [
            {
              type: 'output_text',
              text,
            },
          ],
        });
        setChatMessages([...chatMessages]);
        setConversationItems([...conversationItems]);
        break;
      }

      case 'response.output_item.done': {
        // After output item is done
        const { item } = data || {};
        conversationItems.push(item);
        setConversationItems([...conversationItems]);
        break;
      }

      // Handle other events as needed
    }
  });
};
