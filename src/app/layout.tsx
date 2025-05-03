import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./Providers";
import FloatingCart from "@/components/FloatingCart";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restaurant App",
  description: "A modern restaurant website with online ordering",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <FloatingCart />
            <footer className="bg-gray-100 py-6">
              <div className="container mx-auto px-4 text-center text-gray-600">
                © 2024 Restaurant App. All rights reserved.
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
