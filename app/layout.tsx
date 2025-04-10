import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

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
    // TODO: Update icon`
    icon: "logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        <div className="flex h-screen bg-[#F7F6F4] w-full items-center justify-center text-stone-900">
          <main className="h-[85vh] w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
