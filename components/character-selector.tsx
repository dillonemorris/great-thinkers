"use client";

import { Character } from "@/types/character";
import { characters } from "@/config/characters";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

interface CharacterSelectorProps {
  onSelectAction: (character: Character) => void;
}

export default function CharacterSelector({ onSelectAction }: CharacterSelectorProps) {
  return (
    <div className="border-2 border-border rounded-lg flex flex-col gap-4 px-2 py-2 w-full h-full overflow-y-auto">
      {characters.map(character => (
        <Card
          key={character.id}
          className={"cursor-pointer transition-all hover:ring-2 hover:ring-stone-300"}
          onClick={() => onSelectAction(character)}
        >
          <CardContent className="p-1">
            <div className="flex items-center gap-2">
              <div className="relative w-24 h-24">
                <Image
                  src={character.avatar}
                  alt={character.name}
                  fill
                  className="object-cover bg-[#f5f2eb] border border-stone-300 rounded-md"
                />
              </div>
              <h3 className="text-lg font-semibold">{character.name}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
