import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bihar Bazaar - Handcrafted Treasures from Bihar",
  description:
    "Discover authentic handcrafted products from Bihar's skilled artisans",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <BackgroundGradient>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <Toaster position="top-center" />
              </div>
            </BackgroundGradient>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
