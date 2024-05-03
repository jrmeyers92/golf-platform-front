import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

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
        </body>
      </html>
    </ClerkProvider>
  );
}
