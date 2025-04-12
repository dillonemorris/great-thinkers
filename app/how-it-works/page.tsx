import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, MessageSquare, Sparkles } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif font-bold text-center mb-8">
        How It Works
      </h1>
      
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-muted p-4 rounded-full">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">AI-Powered Conversations</h2>
            <p className="text-muted-foreground">
              Our advanced AI technology carefully analyzes historical writings, speeches, and documented 
              perspectives of each thinker to create authentic and engaging conversations. The AI models 
              are trained to maintain the unique voice and perspective of each historical figure.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-muted p-4 rounded-full">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Choose Your Thinker</h2>
            <p className="text-muted-foreground">
              Select from our curated collection of history's greatest minds. Each thinker brings their 
              unique perspective and expertise to the conversation. Whether you're interested in philosophy, 
              science, literature, or politics, there's a thinker for every topic.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-muted p-4 rounded-full">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Start the Conversation</h2>
            <p className="text-muted-foreground">
              Begin your conversation by asking questions, discussing ideas, or exploring topics of interest. 
              The AI will respond in character, drawing from the thinker's known perspectives and writings 
              while maintaining historical accuracy.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/chat">
            <Button size="lg" className="gap-2">
              Start Chatting
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 