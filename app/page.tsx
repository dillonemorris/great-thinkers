'use client';
import Assistant from '@/components/assistant';
import { Menu } from 'lucide-react';

export default function Main() {
  return (
    <div className="flex justify-center h-screen">
      <div className="w-full md:w-[70%]">
        <Assistant />
      </div>
      {/* Hamburger menu for small screens */}
      <div className="absolute top-4 right-4 md:hidden">
        <Menu size={24} />
      </div>
    </div>
  );
}
