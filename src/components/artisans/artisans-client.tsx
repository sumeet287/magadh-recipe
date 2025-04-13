"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { artisans, CRAFT_FILTERS } from "@/components/artisans/artisans-data";
import { CraftType, Artisan } from "@/types/artisan";

export function ArtisansClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<CraftType>(
    (searchParams.get("craft") as CraftType) || "all"
  );
  const [filteredArtisans, setFilteredArtisans] = useState(artisans);

  useEffect(() => {
    const filtered =
      activeFilter === "all"
        ? artisans
        : artisans.filter((artisan) => artisan.craftType === activeFilter);
    setFilteredArtisans(filtered);
  }, [activeFilter]);

  const handleFilterChange = (filter: CraftType) => {
    setActiveFilter(filter);
    const params = new URLSearchParams(searchParams);
    if (filter === "all") {
      params.delete("craft");
    } else {
      params.set("craft", filter);
    }
    router.push(`/artisans?${params.toString()}`);
  };

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Master Artisans of Bihar
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Meet the skilled craftspeople who are preserving and innovating
            Bihar&apos;s rich artistic heritage
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {CRAFT_FILTERS.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              className={`rounded-full ${
                activeFilter === filter.value
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
              onClick={() => handleFilterChange(filter.value)}
            >
              {filter.label}
              {activeFilter === filter.value && (
                <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {filteredArtisans.length}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {filteredArtisans.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-slate-600 dark:text-slate-300">
              No artisans found for this category
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ArtisanCard({ artisan }: Readonly<{ artisan: Artisan }>) {
  return (
    <Link
      href={`/artisans/${artisan.slug}`}
      className="group bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/3] relative">
        <Image
          src={artisan.image}
          alt={artisan.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold mb-1">{artisan.name}</h2>
            <p className="text-orange-600 dark:text-orange-400">
              {artisan.craft}
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {artisan.awards.map((award) => (
              <span
                key={`${award}-${artisan.id}`}
                className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 text-xs px-2 py-1 rounded-full"
              >
                {award}
              </span>
            ))}
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
          {artisan.description}
        </p>
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {artisan.location}
        </div>
      </div>
    </Link>
  );
}
