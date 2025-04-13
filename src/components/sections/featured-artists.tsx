import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import SitaDevi from "@/assets/artist/Smt_Sita_Devi.png";
import DulariDevi from "@/assets/artist/Smt_Dulari_Devi.jpg";
import KalpanaDevi from "@/assets/artist/Smt_Kalpana_Devi.png";
import ManishaJha from "@/assets/artist/Smt_Manisha_Devi.png";
const artists = [
  {
    id: 1,
    name: "Smt. Sita Devi",
    title: "Padma Shri Awardee - Madhubani Art",
    image: SitaDevi,
    link: "/artists/sita-devi",
  },
  {
    id: 2,
    name: "Smt. Manisha Jha",
    title: "Master Artisan - Tikuli Art",
    image: ManishaJha,
    link: "/artists/manisha-jha",
  },
  {
    id: 3,
    name: "Smt. Dulari Devi",
    title: "National Award Winner - Madhubani Art",
    image: DulariDevi,
    link: "/artists/dulari-devi",
  },
  {
    id: 4,
    name: "Smt. Kalpana Devi",
    title: "State Award Winner - Glass Art",
    image: KalpanaDevi,
    link: "/artists/kalpana-devi",
  },
];

export function FeaturedArtists() {
  return (
    <section className="py-16 bg-amber-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Featured Artists
        </h2>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {artists.map((artist) => (
                <CarouselItem
                  key={artist.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                        {artist.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                        {artist.title}
                      </p>
                      <Link href={artist.link}>
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
