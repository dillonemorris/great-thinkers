"use client";
import React from "react";
import Image from "next/image";
import ThinkersChat from "@/components/thinkers-chat";
import { Button } from "@/components/ui/button";
import useCharacterStore from "@/stores/useCharacterStore";
import { characters } from "@/config/characters";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@reach/visually-hidden";
import { Menu, X } from "lucide-react";

export default function Main() {
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { setSelectedCharacter, selectedCharacter } = useCharacterStore();

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="flex h-full w-full">
      <div className="p-2 bg-[#e8e6e1] h-full w-[250px] z-10 hidden lg:flex">
        <div className="mt-16 flex flex-col gap-2 w-full">
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
                <Image src={character.avatar} alt={character.name} fill className="object-cover" />
              </div>
              <h2 className="text-md font-medium">{character.name}</h2>
            </Button>
          ))}
        </div>
      </div>
      <main className="flex-1 flex h-[85vh] lg:ml-[-160px] m-auto justify-center">
        <div className="flex h-full flex-col items-center max-w-3xl w-full">
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
        </div>
      </main>

      <Sheet open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <SheetTitle>Character Selector</SheetTitle>
        </VisuallyHidden>
        <SheetTrigger asChild>
          <Button aria-expanded={open} variant="ghost" className={"lg-hidden absolute top-4 left-4"}>
            {open ? <X /> : <Menu size={24} />}
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="p-2 mt-16 flex flex-col gap-4">
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
                 <Image src={character.avatar} alt={character.name} fill className="object-cover" />
               </div>
               <h2 className="text-md font-medium">{character.name}</h2>
             </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
