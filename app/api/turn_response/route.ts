import { MODEL } from "@/config/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with error handling
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Custom error class for OpenAI API errors
class OpenAIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json();
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      throw new OpenAIError("OpenAI API key is not configured", 500, "API_KEY_MISSING");
    }

    console.log("Processing request with messages:", JSON.stringify(body.messages, null, 2));

    // Process the request
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: body.messages,
      stream: true,
    });

    // Create a ReadableStream that emits SSE data
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              const data = JSON.stringify({
                event: "response.output_text.delta",
                data: {
                  delta: content,
                  item_id: chunk.id,
                },
              });
              controller.enqueue(`data: ${data}\n\n`);
            }
          }
          controller.close();
        } catch (error) {
          console.error("Error in streaming loop:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);

    // Handle different types of errors
    if (error instanceof OpenAIError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          type: error.type,
        },
        { status: error.status || 500 }
      );
    }

    // Handle rate limit errors specifically
    if (error instanceof Error && error.message.includes('rate_limit_exceeded')) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
