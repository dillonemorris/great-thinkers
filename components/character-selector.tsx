"use client";

import { useState } from "react";
import { Character } from "@/types/character";
import { characters } from "@/config/characters";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface CharacterSelectorProps {
  onSelect: (character: Character) => void;
  selectedCharacter?: Character;
}

export default function CharacterSelector({ onSelect, selectedCharacter }: CharacterSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {characters.map(character => (
        <Card
          key={character.id}
          className={`cursor-pointer transition-all ${
            selectedCharacter?.id === character.id ? "ring-2 ring-blue-500" : "hover:shadow-lg"
          }`}
          onClick={() => onSelect(character)}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={character.avatar}
                  alt={character.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{character.name}</h3>
              <p className="text-sm text-gray-500">{character.title}</p>
              <p className="text-xs text-gray-400 mt-1">{character.era}</p>
              <div className="flex flex-wrap gap-1 mt-2 justify-center">
                {character.expertise.slice(0, 2).map(skill => (
                  <span key={skill} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
