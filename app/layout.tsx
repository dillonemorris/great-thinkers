import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Great Thinkers",
  description: "Chat with AI versions of history's greatest minds",
  icons: {
    icon: "logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        <Navigation />
        <div className="flex bg-[#F7F6F4] w-full items-center justify-center text-stone-900">
          {children}
        </div>
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
