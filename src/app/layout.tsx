import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientRoot from "@/components/ClientRoot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magadh Recipe - Pure Handmade Pickles from Bihar",
  description:
    "Discover authentic handmade pickles from Bihar's traditional kitchens. Taste the heritage with Magadh Recipe!",
  keywords:
    "Bihar pickles, Magadh Recipe, handmade pickles, traditional achar, Indian pickles, authentic taste, homemade achar, Bihari pickles, mango pickle, lemon pickle, chilli pickle, mixed pickle",
  authors: [{ name: "Magadh Recipe" }],
  openGraph: {
    title: "Magadh Recipe | Authentic Bihari Pickles Marketplace",
    description:
      "Discover authentic Bihari pickles - Mango, Lemon, Mixed, Chilli, and more. Pure handmade taste from Bihar.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Magadh Recipe - Pickles Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
