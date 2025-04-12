"use client";
import React from "react";
import Image from "next/image";
import ThinkersChat from "@/components/thinkers-chat";
import { Button } from "@/components/ui/button";
import useCharacterStore from "@/stores/useCharacterStore";
import { characters } from "@/config/characters";
import { cn } from "@/lib/utils";

export default function Main() {
  const [isHydrated, setIsHydrated] = React.useState(false);
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
      <main className="flex-1 flex flex-col">
        <div className="flex flex-col items-center max-w-3xl w-full h-[calc(100vh-140px)] m-auto">
          <div className="flex-1 justify-center h-full">
            <ThinkersChat />
          </div>
        </div>
      </main>
    </div>
  );
}
