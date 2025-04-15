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
  title: {
    default: "Great Thinkers",
    template: "%s | Great Thinkers",
  },
  description:
    "Chat with AI versions of history's greatest minds. Engage in conversations with historical figures and explore their perspectives on modern topics.",
  keywords: [
    "AI",
    "chat",
    "history",
    "great thinkers",
    "historical figures",
    "conversation",
    "education",
  ],
  authors: [{ name: "Great Thinkers Team" }],
  creator: "Great Thinkers",
  publisher: "Great Thinkers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://great-thinkers.vercel.app"),
  openGraph: {
    title: "Great Thinkers",
    description: "Chat with AI versions of history's greatest minds",
    url: "https://great-thinkers.vercel.app",
    siteName: "Great Thinkers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Great Thinkers - Chat with History's Greatest Minds",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Thinkers",
    description: "Chat with AI versions of history's greatest minds",
    images: ["/og-image.png"],
    creator: "@greatthinkers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
