import Image from "next/image";
import { notFound } from "next/navigation";
import { artisans } from "@/components/artisans/artisans-data";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArtistProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const artist = artisans.find((a) => a.slug === resolvedParams.slug);

  if (!artist) {
    notFound();
  }

  const artistProducts = products.filter(
    (product) => product.category === artist.craft
  );

  return (
    <main className="container mx-auto px-4 py-16">
      {/* Artist Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>
          <p className="text-xl text-orange-600 dark:text-orange-400 mb-4">
            {artist.craft}
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {artist.description}
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-slate-700 dark:text-slate-200">
              📍 {artist.location}
            </p>
            <div className="flex flex-wrap gap-2">
              {artist.awards.map((award: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm"
                >
                  {award}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Artist's Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artistProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              images={product.images}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
