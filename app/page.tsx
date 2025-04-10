"use client";
import ThinkersChat from "@/components/thinkers-chat";
import { Menu } from "lucide-react";

export default function Main() {
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

      {/* Hamburger menu for small screens */}
      <div className="absolute top-4 right-4 md:hidden">
        <Menu size={24} />
      </div>
    </div>
  );
}
