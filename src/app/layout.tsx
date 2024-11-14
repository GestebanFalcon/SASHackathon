import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAS Greater Hackathon",
  description: "Awesome Sauce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <header>
          <Navbar></Navbar>
        </header>
        <main className="main">
          {children}
        </main>
        <footer>
        </footer>
      </body>
    </html>
  );
}
