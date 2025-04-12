import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-5xl font-serif font-bold mb-6">
          Chat with History's Greatest Minds
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Engage in meaningful conversations with AI-powered versions of history's most influential thinkers. 
          Experience their wisdom, perspectives, and insights firsthand.
        </p>
        <div className="flex gap-4">
          <Link href="/chat">
            <Button size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Start Chatting
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Why Chat with Great Thinkers?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-background">
              <h3 className="text-xl font-semibold mb-3">Historical Insights</h3>
              <p className="text-muted-foreground">
                Gain unique perspectives from some of history's most brilliant minds on topics that matter to you.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background">
              <h3 className="text-xl font-semibold mb-3">Intellectual Growth</h3>
              <p className="text-muted-foreground">
                Challenge your thinking and expand your knowledge through engaging conversations.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background">
              <h3 className="text-xl font-semibold mb-3">AI-Powered Experience</h3>
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