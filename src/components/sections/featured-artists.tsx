import Image from "next/image";
import { Button } from "@/components/ui/button";
import SitaDevi from "@/assets/artist/Smt_Sita_Devi.png";
export function FeaturedArtists() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Master Artisans
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover the skilled craftspeople preserving Bihar&apos;s artistic
            heritage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Example Artist Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-[4/3] relative">
              <Image
                src={SitaDevi}
                alt="Artist Name"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Smt. Sita Devi</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                Padma Shri Awardee - Madhubani Art
              </p>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </div>
          </div>
          {/* Add more artist cards */}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Artists
          </Button>
        </div>
      </div>
    </section>
  );
}
