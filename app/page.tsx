import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight, Sparkles } from "lucide-react";
import { characters } from "@/config/characters";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:gap-12 max-w-7xl mx-auto mb-20">
        {/* Character Grid */}
        <div className="grid grid-cols-2 w-full md:w-1/2">
          {characters.map((character, index) => (
            <div
              key={character.id}
              className="relative aspect-square"
              style={{
                marginRight: index % 2 === 0 ? "-32px" : "0",
                marginLeft: index % 2 === 1 ? "-48px" : "0",
                marginTop: index >= 2 ? "-48px" : "0",
              }}
            >
              <Image
                src={character.avatar}
                alt={character.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2 md:mb-6">
            Chat with History&apos;s Greatest Minds
          </h1>
          <p className="text-md md:text-xl text-muted-foreground mb-6 md:mb-12">
            Engage in meaningful conversations with AI-powered versions of history&apos;s most
            influential thinkers. Experience their wisdom, perspectives, and insights firsthand.
          </p>
          <div className="flex gap-4">
            <Link href="/chat">
              <Button size="lg" className="gap-2 bg-blue-950 text-white font-semibold text-md">
                <Sparkles className="h-4 w-4" />
                Start a Conversation
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="gap-2 font-semibold text-md">
                How It Works
                <MoveRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
