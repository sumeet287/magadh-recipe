import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import madhubani from "@/assets/art/madhubani_art.jpg";
import tikuli from "@/assets/art/tikuli_art.jpeg";
import wood from "@/assets/art/wood_art.jpeg";
import glass from "@/assets/art/glass_art.png";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Craft Categories | Bihar Bazaar",
  description:
    "Explore our collection of authentic Bihari handicrafts and art forms",
};

const categories = [
  {
    id: "madhubani",
    name: "Madhubani Art",
    description:
      "Traditional folk art with intricate patterns and vibrant colors",
    image: madhubani,
  },
  {
    id: "tikuli",
    name: "Tikuli Art",
    description: "Traditional glass painting with intricate designs",
    image: tikuli,
  },
  {
    id: "wood",
    name: "Wood Craft",
    description: "Handcrafted wooden artifacts and furniture",
    image: wood,
  },
  {
    id: "glass",
    name: "Glass Work",
    description: "Traditional glass bangles and decorative items",
    image: glass,
  },
  {
    id: "bamboo",
    name: "Bamboo Craft",
    description: "Eco-friendly bamboo products and furniture",
    image: madhubani,
  },
  {
    id: "sujani",
    name: "Sujani",
    description: "Traditional quilt work with intricate embroidery",
    image: wood,
  },
  {
    id: "sikki",
    name: "Sikki Craft",
    description: "Traditional grass weaving and basketry",
    image: tikuli,
  },
  {
    id: "lac",
    name: "Lac Bangles",
    description: "Traditional lacquer work and bangles",
    image: glass,
  },
];

export default function ProductTypesPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Craft Categories</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the rich heritage of Bihar through our diverse range of
            traditional crafts
          </p>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/category/${category.id.toLowerCase()}`}
            >
              <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
