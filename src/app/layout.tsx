import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bihar Bazaar | Authentic Bihari Handicrafts Marketplace",
  description:
    "Discover authentic Bihari handicrafts - Madhubani, Tikuli, Wood Craft, and more. Supporting local artisans and preserving Bihar's rich cultural heritage through digital innovation.",
  keywords:
    "Bihar handicrafts, Madhubani art, Tikuli art, Wood craft, Bihar artisans, Indian handicrafts, traditional art",
  authors: [{ name: "Bihar Bazaar" }],
  openGraph: {
    title: "Bihar Bazaar | Authentic Bihari Handicrafts Marketplace",
    description:
      "Discover authentic Bihari handicrafts - Madhubani, Tikuli, Wood Craft, and more.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Bihar Bazaar - Handicrafts Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar Bazaar | Authentic Bihari Handicrafts Marketplace",
    description:
      "Discover authentic Bihari handicrafts - Madhubani, Tikuli, Wood Craft, and more.",
    images: ["/logo.png"],
  },
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
        <Header />
        {children}
      </body>
    </html>
  );
}
