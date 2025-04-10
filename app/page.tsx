"use client";
import React from "react";
import ThinkersChat from "@/components/thinkers-chat";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CharacterSelector from "@/components/character-selector";
import useCharacterStore from "@/stores/useCharacterStore";
import { VisuallyHidden } from "@reach/visually-hidden";

export default function Main() {
  const [open, setOpen] = React.useState(false);
  const { setSelectedCharacter } = useCharacterStore();

  return (
    <div className="flex h-full flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="font-serif text-5xl tracking-tight font-medium mb-3">Great Thinkers</h1>
        <p className="text-lg text-stone-600">
          {"Chat with AI versions of history's greatest minds."}
        </p>
      </div>

      <div className="flex-1 w-full max-w-[1200px] h-[calc(100vh-320px)]">
        <ThinkersChat />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            aria-expanded={open}
            size="icon"
            variant={"ghost"}
            className="absolute top-4 left-4 md:hidden"
          >
            {open ? <X /> : <Menu size={24} />}
          </Button>
        </DialogTrigger>
        <DialogContent className="top-[35%]">
          <VisuallyHidden>
            <DialogTitle>Character Selector</DialogTitle>
          </VisuallyHidden>
          <CharacterSelector onSelectAction={setSelectedCharacter} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
