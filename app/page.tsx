"use client";
import React from "react";
import ThinkersChat from "@/components/thinkers-chat";
import Image from "next/image";
import { Maximize, Menu, Minimize, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import useCharacterStore from "@/stores/useCharacterStore";
import { useFullscreenStore } from "@/stores/useFullscreenStore";
import { VisuallyHidden } from "@reach/visually-hidden";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { characters } from "@/config/characters";

export default function Main() {
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { setSelectedCharacter } = useCharacterStore();
  const { isFullScreenMode, toggleFullScreenMode } = useFullscreenStore();

  // Wait for hydration to complete
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Don't render anything until hydration is complete
  if (!isHydrated) {
    return null; // or a loading skeleton if you prefer
  }

  return (
    <div className="flex h-full flex-col items-center">
      <div className="text-center mb-4 md:mb-8">
        <h1 className="font-serif text-3xl md:text-5xl tracking-tight font-medium md:mb-3">
          Great Thinkers
        </h1>
        <p className="text-md md:text-lg text-stone-600">
          {"Chat with AI versions of history's greatest minds."}
        </p>
      </div>

      <div className="flex-1 w-full h-[calc(100vh-320px)]">
        <ThinkersChat />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <SheetTitle>Character Selector</SheetTitle>
        </VisuallyHidden>
        <SheetTrigger asChild>
          <Button
            aria-expanded={open}
            variant="ghost"
            className={cn("absolute top-4 left-4", isFullScreenMode ? "block" : "md:hidden")}
          >
            {open ? <X /> : <Menu size={24} />}
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="p-2 mt-16 flex flex-col gap-4">
            {characters.map(character => (
              <Card
                key={character.id}
                className={
                  "cursor-pointer transition-all hover:ring-2 hover:ring-stone-300 flex items-center gap-2"
                }
                onClick={() => setSelectedCharacter(character)}
              >
                <div className="relative w-12 h-12">
                  <Image
                    src={character.avatar}
                    alt={character.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-md font-medium">{character.name}</h2>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Button
        variant={"ghost"}
        className="absolute top-4 right-4 hidden md:block"
        onClick={toggleFullScreenMode}
      >
        {isFullScreenMode ? <Minimize size={24} /> : <Maximize size={24} />}
      </Button>
    </div>
  );
}
