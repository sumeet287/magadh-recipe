import Image from "next/image";
import Link from "next/link";

import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import tikuliArt from "@/assets/art/tikuli_art.jpeg";
import woodArt from "@/assets/art/wood_art.jpeg";
import glassArt from "@/assets/art/glass_art.png";
export function FeaturedCategories() {
  const categories = [
    {
      name: "Madhubani Art",
      image: madhubaniArt,
      description: "Traditional Mithila painting styles",
      link: "/crafts/madhubani",
    },
    {
      name: "Tikuli Art",
      image: tikuliArt,
      description: "Ancient Bihari craft of decorative art",
      link: "/crafts/tikuli",
    },
    {
      name: "Wood Craft",
      image: woodArt,
      description: "Traditional wooden artifacts",
      link: "/crafts/wood",
    },
    {
      name: "Glass Art",
      image: glassArt,
      description: "Contemporary glass artwork",
      link: "/crafts/glass",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Categories
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore Bihar&apos;s rich heritage through our curated collection of
            traditional and contemporary crafts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              href={category.link}
              key={category.name}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
