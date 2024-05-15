import { Nav } from "@/components/Nav";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ultimate golf platfrom",
  description: "A website for all things golf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="itme flex flex-col items-center">
          <Nav />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
