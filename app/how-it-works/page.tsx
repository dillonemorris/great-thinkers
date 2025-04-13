"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { characters } from "@/config/characters";
import { cn } from "@/lib/utils";

export default function HowItWorks() {
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
                <div key={character.id} className="flex items-center gap-3 mb-4 last:mb-0">
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
                src={characters[0].avatar}
                alt={characters[0].name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-base font-medium">{characters[0].name}</span>
          </div>
          <div className="p-6 space-y-4 bg-white flex flex-col gap-2">
            <div className="rounded-lg border border-stone-200 bg-[#E8F1FB] px-4 py-2 ml-auto w-fit">
              What inspired your theory of relativity?
            </div>
            <div className="rounded-lg border border-stone-200 bg-[#ededed] px-4 py-2 w-4/5">
              Ah, the theory of relativity was inspired by several fundamental ideas. The constant
              speed of light in a vacuum led me to question our understanding of space and time...
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
          <div className="grid grid-cols-2 divide-x">
            {characters.slice(0, 2).map(character => (
              <div
                key={character.id}
                className={cn(
                  "p-6 bg-white",
                  character.id === "einstein" && "ring-1 ring-inset ring-black"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
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
                <p className="text-sm text-muted-foreground">
                  {character.id === "einstein"
                    ? "Physics & Relativity"
                    : "Radioactivity & Chemistry"}
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
