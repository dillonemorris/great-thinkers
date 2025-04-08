"use client";

import { Character } from "@/types/character";
import Image from "next/image";

interface CharacterBioProps {
  character: Character;
}

export default function CharacterBio({ character }: CharacterBioProps) {
  return (
    <div className="p-6">
      <div className="flex items-start gap-6">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={character.avatar}
            alt={character.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p className="text-gray-600">{character.title}</p>
          <p className="text-sm text-gray-400 mt-1">{character.era}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-700">{character.bio}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {character.expertise.map(skill => (
                <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
