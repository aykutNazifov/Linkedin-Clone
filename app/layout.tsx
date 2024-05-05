import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linkedin Clone",
  description: "Linkedin clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <header className="border-b sticky top-0 bg-white z-50">
            <Header />
          </header>
          <main className="bg-[#f4f2ed] flex-1 w-full">
            {children}
          </main>

        </body>
      </html>
    </ClerkProvider>
  );
}
