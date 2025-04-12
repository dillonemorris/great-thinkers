import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight, Sparkles } from "lucide-react";
import { characters } from "@/config/characters";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 pt-16 gap-12 max-w-7xl mx-auto">
        {/* Character Grid */}
        <div className="grid grid-cols-2 w-full md:w-1/2">
          {characters.map((character, index) => (
            <div 
              key={character.id} 
              className="relative aspect-square"
              style={{
                marginRight: index % 2 === 0 ? '-32px' : '0',
                marginLeft: index % 2 === 1 ? '-48px' : '0',
                marginBottom: index < 2 ? '-48px' : '0'
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
          <h1 className="text-5xl font-serif font-bold mb-6">
            Chat with History's Greatest Minds
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Engage in meaningful conversations with AI-powered versions of history's most influential thinkers. 
            Experience their wisdom, perspectives, and insights firsthand.
          </p>
          <div className="flex gap-4">
            <Link href="/chat">
              <Button size="lg" className="gap-2 bg-blue-950 text-white font-semibold">
                <Sparkles className="h-4 w-4" />
                Start a Conversation
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button className="gap-2 text-blue-950" variant="ghost" size="lg">
                See how it works
                <MoveRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">
            Why Chat with Great Thinkers?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-background">
              <h3 className="text-xl font-serif font-semibold mb-3">Historical Insights</h3>
              <p className="text-muted-foreground">
                Gain unique perspectives from some of history's most brilliant minds on topics that matter to you.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background">
              <h3 className="text-xl font-serif font-semibold mb-3">Intellectual Growth</h3>
              <p className="text-muted-foreground">
                Challenge your thinking and expand your knowledge through engaging conversations.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background">
              <h3 className="text-xl font-serif font-semibold mb-3">AI-Powered Experience</h3>
              <p className="text-muted-foreground">
                Our advanced AI technology brings these historical figures to life in a realistic and engaging way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}