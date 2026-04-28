import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import FloatingChatbot from "@/components/modules/Chatbot/FloatingChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PH Healthcare Management System",
  description: "A comprehensive healthcare management system built with Next.js, TypeScript, and Tailwind CSS. It offers features for patient management, appointment scheduling, medical records, and more.",
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
       <QueryProviders>{children}
         <FloatingChatbot />
          <Toaster position="top-right" richColors />
       </QueryProviders>
      </body>
    </html>
  );
}
