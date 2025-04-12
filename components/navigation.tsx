"use client";
import React from "react";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@reach/visually-hidden";
import { characters } from "@/config/characters";
import useCharacterStore from "@/stores/useCharacterStore";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navigation() {
  const [open, setOpen] = React.useState(false);
  const { setSelectedCharacter, selectedCharacter } = useCharacterStore();

  return (
    <nav className="w-full border-b border-border bg-[#F7F6F4]">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Mobile Character Drawer */}
          <Sheet open={open} onOpenChange={setOpen}>
            <VisuallyHidden>
              <SheetTitle>Character Selector</SheetTitle>
            </VisuallyHidden>
            <SheetTrigger asChild>
              <Button aria-expanded={open} variant="ghost" className="block lg:hidden">
                {open ? <X /> : <Menu size={24} />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="p-2 mt-12 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-4">
                  <h1 className="font-serif text-xl tracking-tight font-medium">Great Thinkers</h1>
                </div>
                {characters.map(character => (
                  <Button
                    key={character.id}
                    variant="ghost"
                    onClick={() => setSelectedCharacter(character)}
                    className={cn(
                      "w-full flex cursor-pointer gap-2 justify-start pl-0 hover:bg-[#d9d7d0]",
                      selectedCharacter?.id === character.id ? "bg-[#d9d7d0]" : ""
                    )}
                  >
                    <div className="relative w-16 h-16">
                      <Image
                        src={character.avatar}
                        alt={character.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h2 className="text-md font-medium">{character.name}</h2>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 flex-1">
            <Sparkles width={24} height={24} className="text-muted-foreground" />
            <h1 className="font-serif text-lg md:text-2xl tracking-tight font-medium">
              Great Thinkers
            </h1>
          </Link>

          <div className="flex items-center gap-6 pr-8">
            <Link
              href="/chat"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Chat
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
