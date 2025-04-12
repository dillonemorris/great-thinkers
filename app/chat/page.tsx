"use client";
import React from "react";
import Image from "next/image";
import ThinkersChat from "@/components/thinkers-chat";
import { Button } from "@/components/ui/button";
import useCharacterStore from "@/stores/useCharacterStore";
import { characters } from "@/config/characters";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@reach/visually-hidden";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";

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
        <Link href="/" className="lg:flex items-center gap-2 ml-6 mt-4 hidden w-fit">
          <Sparkles width={24} height={24} color="#78716c" />
          <h1 className="font-serif text-lg md:text-2xl tracking-tight font-medium">
            Great Thinkers
          </h1>
        </Link>
        <div className="flex flex-col items-center max-w-3xl w-full h-[calc(100vh-140px)] m-auto">
          <div className="flex-1 justify-center h-full">
            <ThinkersChat />
          </div>
        </div>
      </main>

      <MobileDrawer />
    </div>
  );
}

const MobileDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const { setSelectedCharacter, selectedCharacter } = useCharacterStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <SheetTitle>Character Selector</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button
          aria-expanded={open}
          variant="ghost"
          className={"lg-hidden absolute top-2 ml[-8px]"}
        >
          {open ? <X /> : <Menu size={24} />}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="p-2 mt-12 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles width={20} height={20} color="#78716c" />
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
                <Image src={character.avatar} alt={character.name} fill className="object-cover" />
              </div>
              <h2 className="text-md font-medium">{character.name}</h2>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
