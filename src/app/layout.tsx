import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SoulMatch - Find Your Perfect Match",
  description:
    "Join thousands of successful matches on SoulMatch. Take our quick survey to find your perfect partner today!",
  keywords: "dating, matchmaking, relationships, love, singles, SoulMatch",
  authors: [{ name: "SoulMatch Team" }],
  robots: "index, follow",
  openGraph: {
    title: "SoulMatch - Find Your Perfect Match",
    description:
      "Join thousands of successful matches on SoulMatch. Take our quick survey to find your perfect partner today!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulMatch - Find Your Perfect Match",
    description:
      "Join thousands of successful matches on SoulMatch. Take our quick survey to find your perfect partner today!",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
