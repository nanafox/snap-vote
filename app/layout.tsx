import { AuthProvider } from "@/contexts/auth";
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
  title: {
    default: "SnapVote - Create & Share Polls Instantly",
    template: "%s | SnapVote",
  },
  description:
    "Create engaging polls and gather insights from your audience with SnapVote. Build multiple choice, rating, and text-based polls with beautiful, shareable interfaces.",
  keywords: ["polls", "voting", "surveys", "feedback", "engagement"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
