import { Metadata } from "next";
import Image from "next/image";
import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";
import { Typography } from "@/lib/ui/typography/typography";

export const metadata: Metadata = {
  title: "About Us | Magadh Recipe",
  description:
    "Learn about Magadh Recipe's mission to promote and preserve Bihar's rich pickle heritage through authentic handmade pickles.",
};

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Typography
                  variant="h1"
                  weight="bold"
                  seoTitle="Preserving Bihar's Pickle Heritage"
                  className="text-4xl md:text-5xl text-slate-900 dark:text-white"
                >
                  Preserving Bihar's
                  <span className="block text-orange-600 mt-2">
                    Pickle Heritage
                  </span>
                </Typography>
                <Typography
                  variant="p"
                  className="text-lg text-slate-700 dark:text-slate-200"
                >
                  Magadh Recipe is dedicated to bringing the rich tradition of handmade pickles from Bihar to your table. We connect skilled women pickle makers from Bihar's villages with food lovers across India and beyond, ensuring you get the most authentic taste and they get fair livelihoods.
                </Typography>
                <Typography
                  variant="p"
                  className="text-lg text-slate-700 dark:text-slate-200"
                >
                  Our pickles are made using age-old recipes, pure ingredients, and lots of love—just like your dadi or nani would make at home. From spicy mango to tangy lemon and stuffed chilli, every jar is a taste of Bihar's heritage.
                </Typography>
                <Typography
                  variant="p"
                  className="text-lg text-slate-700 dark:text-slate-200"
                >
                  By choosing Magadh Recipe, you help preserve traditional recipes and empower local women entrepreneurs. Taste the difference, share the love, and be a part of our journey to make Bihar's pickles famous worldwide!
                </Typography>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={madhubaniArt} // Replace with a pickle image if available
                  alt="Bihar's Pickle Heritage"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Mission & Vision */}
        <section className="py-16 bg-white/80 dark:bg-slate-800/80">
          {/* You can add more pickle-specific mission/vision content here if needed */}
        </section>
      </main>
    </>
  );
}
