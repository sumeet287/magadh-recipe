import Image from "next/image";
import { Button } from "@/components/ui/button";
import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import tikuliArt from "@/assets/art/tikuli_art.jpeg";
import woodArt from "@/assets/art/wood_art.jpeg";
import glassArt from "@/assets/art/glass_art.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pattern-grid-lg dark:opacity-5" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white">
              Bihar Bazaar{" "}
              <span className="block text-2xl md:text-3xl mt-2 text-orange-600">
                Handicrafts ka Digital Marketplace
              </span>
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-200">
              Bihar ki rich cultural heritage aur traditional crafts ko duniya
              se connect karne ka platform. Madhubani, Tikuli, Glass art aur
              bahut saare authentic handicrafts ek hi jagah par.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Shop Now
              </Button>
              <Button size="lg" variant="outline">
                Explore Crafts
              </Button>
            </div>
          </div>

          {/* Right Content - Craft Images Grid */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={madhubaniArt}
                  alt="Madhubani Art"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={glassArt}
                  alt="Glass Art"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={tikuliArt}
                  alt="Tikuli Art"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={woodArt}
                  alt="Wood Art"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
