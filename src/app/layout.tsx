import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waveside — Wave Pool Feasibility Calculator",
  description:
    "Explore wave pool technologies and calculate the feasibility of building a wave pool in your backyard or commercial property.",
  openGraph: {
    title: "Waveside — Wave Pool Feasibility Calculator",
    description: "Democratizing surf culture, one wave pool at a time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen overflow-x-hidden`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
