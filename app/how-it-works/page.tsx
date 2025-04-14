"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { characters } from "@/config/characters";
import { cn } from "@/lib/utils";

type SampleChat = {
  question: string;
  answer: string;
};

type SampleChats = {
  [key: string]: SampleChat;
};

const sampleChats: SampleChats = {
  einstein: {
    question: "What inspired your theory of relativity?",
    answer: "Ah, the theory of relativity was inspired by several fundamental ideas. The constant speed of light in a vacuum led me to question our understanding of space and time..."
  },
  curie: {
    question: "What drove your passion for radioactivity research?",
    answer: "My fascination with radioactivity began with the discovery of mysterious rays by Henri Becquerel. The possibility of these invisible forces revolutionizing our understanding of matter was simply irresistible..."
  },
  plato: {
    question: "What is your view on the nature of reality?",
    answer: "The physical world we perceive is but a shadow of true reality. In my allegory of the cave, I explain how what we see are mere reflections of the perfect, unchanging Forms..."
  },
  douglass: {
    question: "What role did education play in your journey to freedom?",
    answer: "Education was the pathway to understanding not just my condition, but the very nature of freedom itself. Learning to read and write opened my eyes to new possibilities and gave me the tools to fight for justice..."
  }
};

type CharacterProfile = {
  expertise: string;
  description: string;
};

type CharacterProfiles = {
  [key: string]: CharacterProfile;
};

const characterProfiles: CharacterProfiles = {
  einstein: {
    expertise: "Physics & Relativity",
    description: "Chat with a playful teacher who loves using analogies and thought experiments. Einstein breaks down complex physics into digestible ideas, often sprinkling in witty observations about life and the universe."
  },
  curie: {
    expertise: "Radioactivity & Chemistry",
    description: "Engage with a methodical mentor who guides you through scientific reasoning. Marie shares both her groundbreaking discoveries and her passionate belief in the power of persistent curiosity."
  },
  plato: {
    expertise: "Philosophy & Ethics",
    description: "Experience the Socratic method firsthand as Plato guides you through deep questions. He'll challenge your assumptions and help you discover new perspectives through thoughtful dialogue."
  },
  douglass: {
    expertise: "Freedom & Social Justice",
    description: "Connect with an inspiring storyteller who weaves personal experiences into powerful insights. Frederick encourages critical thinking about liberty, justice, and human dignity through compelling discourse."
  }
};

export default function HowItWorks() {
  const [selectedDemo, setSelectedDemo] = useState(characters[0]);

  const steps = [
    {
      title: "Pick a figure",
      description: "Choose from our collection of historical figures to start your conversation.",
      content: (
        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 border-b bg-white flex items-center gap-1">
            <Sparkles width={20} height={20} className="text-muted-foreground" />
            <h3 className="text-xl font-serif tracking-tight">Great Thinkers</h3>
          </div>
          <div className="grid grid-cols-2">
            <div className="p-6 border-r bg-white">
              {characters.map(character => (
                <div 
                  key={character.id} 
                  className={cn(
                    "flex items-center gap-3 mb-4 last:mb-0 p-2 rounded-lg cursor-pointer transition-colors",
                    selectedDemo.id === character.id ? "bg-stone-100" : "hover:bg-stone-50"
                  )}
                  onClick={() => setSelectedDemo(character)}
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                    <Image
                      src={character.avatar}
                      alt={character.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-base">{character.name}</span>
                </div>
              ))}
            </div>
            <div className="p-6 bg-white"></div>
          </div>
        </div>
      ),
    },
    {
      title: "Start your conversation",
      description: "Ask questions and engage in meaningful dialogue with historical figures.",
      content: (
        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 border-b bg-white flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
              <Image
                src={selectedDemo.avatar}
                alt={selectedDemo.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-base font-medium">{selectedDemo.name}</span>
          </div>
          <div className="p-6 space-y-4 bg-white flex flex-col gap-2">
            <div className="rounded-lg border border-stone-200 bg-[#E8F1FB] px-4 py-2 ml-auto w-fit">
              {sampleChats[selectedDemo.id].question}
            </div>
            <div className="rounded-lg border border-stone-200 bg-[#ededed] px-4 py-2 w-4/5">
              {sampleChats[selectedDemo.id].answer}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Explore different perspectives",
      description: "Switch between thinkers to gain diverse insights on your topics of interest.",
      content: (
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-2">
            {characters.map((character, index) => (
              <div
                key={character.id}
                className={cn(
                  "p-6 bg-white",
                  index % 2 === 0 && "border-r",
                  index < 2 && "border-b"
                )}
              >
                <div className="flex gap-2 mb-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={character.avatar}
                      alt={character.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base leading-none">{character.name}</h3>
                    <p className="text-sm font-medium text-stone-500">
                      {characterProfiles[character.id].expertise}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {characterProfiles[character.id].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full bg-[#F7F6F4] py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-serif tracking-tight mb-4">How It Works</h1>
        <p className="text-xl text-muted-foreground mb-16">
          Learn how to chat with historical figures in a few simple steps.
        </p>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-serif">
                  {index + 1}. {step.title}
                </h2>
                <p className="text-base text-muted-foreground">{step.description}</p>
              </div>
              {step.content}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/chat">
            <Button variant="default" size="lg" className="gap-2 text-base h-11 px-5 rounded-md">
              Start Chatting
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
