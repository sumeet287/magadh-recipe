"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { artisans } from "@/components/artisans/artisans-data";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import type { Artisan } from "@/types/artisan";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";
import { Typography } from "@/lib/ui/typography/typography";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ArtistProfilePage({ params }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [artist, setArtist] = useState<Artisan | null>(null);
  const [artistProducts, setArtistProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadData() {
      const resolvedParams = await params;
      const foundArtist = artisans.find((a) => a.slug === resolvedParams.slug);

      if (!foundArtist) {
        notFound();
        return;
      }

      setArtist(foundArtist);
      setArtistProducts(
        products.filter((product) => product.category === foundArtist.craft)
      );
      setIsLoading(false);
    }

    loadData();
  }, [params]);

  if (!artist) return null;

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
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
            <Typography
              variant="h1"
              weight="bold"
              seoTitle={artist.name}
              className="text-4xl font-bold mb-4"
            >
              {artist.name}
            </Typography>
            <Typography
              variant="p"
              className="text-xl text-orange-600 dark:text-orange-400 mb-4"
            >
              {artist.craft}
            </Typography>
            <Typography
              variant="p"
              className="text-slate-600 dark:text-slate-300 mb-6"
            >
              {artist.description}
            </Typography>
            <div className="space-y-2 mb-6">
              <Typography
                variant="p"
                className="text-slate-700 dark:text-slate-200"
              >
                📍 {artist.location}
              </Typography>
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
          <Typography
            variant="h2"
            weight="bold"
            className="text-2xl font-bold mb-6"
          >
            Featured Works
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => <ProductCardSkeleton key={`skeleton-${i}`} />)
              : artistProducts.map((product) => (
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
    </div>
  );
}
