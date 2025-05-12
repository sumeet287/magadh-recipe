"use client";
import Image from "next/image";
import { MapPin, Search } from "lucide-react";
import { ArtisanDetailCard } from "@/components/card/artisian-detail-card";
import { Button } from "@/lib/ui/button/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { artisans } from "@/components/artisans/artisans-data"; // Your static/dynamic data
import { CraftType } from "@/types/artisan";
import SitaDevi from "@/assets/artist/Smt_Sita_Devi.png";
import Link from "next/link";
import { Typography } from "@/lib/ui/typography/typography";

export default function ArtisansPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<CraftType>("all");

  const filteredArtisans = useMemo(() => {
    return artisans.filter((artisan) => {
      const matchesFilter =
        activeFilter === "all" || artisan.craftType === activeFilter;
      const matchesSearch =
        artisan.name.toLowerCase().includes(search.toLowerCase()) ||
        artisan.craft.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const handleFilterChange = (filter: CraftType) => setActiveFilter(filter);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/artisans-hero.jpg')] bg-cover bg-center opacity-15" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Typography
              variant="h1"
              weight="bold"
              seoTitle="Master Artisans of Bihar"
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
            >
              Master Artisans of Bihar
            </Typography>
            <Typography
              variant="p"
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Meet the skilled craftspeople who are preserving and innovating
              Bihar&apos;s rich artistic heritage
            </Typography>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Search artisans by name or craft..."
                className="pl-10 bg-white border-orange-200 focus-visible:ring-orange-500"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <Tabs
              value={activeFilter}
              onValueChange={handleFilterChange as (value: string) => void}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-white/50 p-1 h-auto flex flex-wrap justify-center md:justify-start">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  All Crafts
                </TabsTrigger>
                <TabsTrigger
                  value="madhubani"
                  className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  Madhubani Art
                </TabsTrigger>
                <TabsTrigger
                  value="tikuli"
                  className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  Tikuli Art
                </TabsTrigger>
                <TabsTrigger
                  value="wood"
                  className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  Wood Craft
                </TabsTrigger>
                <TabsTrigger
                  value="glass"
                  className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  Glass Art
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Featured Artisan */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-orange-600">National Award</Badge>
                    <Badge className="bg-orange-600">Padma Shri</Badge>
                  </div>
                  <Typography
                    variant="h2"
                    weight="bold"
                    className="text-3xl font-bold"
                  >
                    Smt. Sita Devi
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-orange-600 font-medium"
                  >
                    Madhubani Art
                  </Typography>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>Madhubani, Bihar</span>
                  </div>
                </div>
                <Typography variant="p" className="text-gray-700">
                  One of the most well-known Madhubani artists from India, Smt.
                  Sita Devi is renowned for her intricate designs and vibrant
                  colors. Her work has been exhibited internationally and has
                  received numerous accolades for preserving this ancient art
                  form.
                </Typography>
                <div className="space-y-2">
                  <Typography
                    variant="h3"
                    weight="medium"
                    className="font-medium"
                  >
                    Achievements:
                  </Typography>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Padma Shri Award recipient</li>
                    <li>Bihar Ratna Samman</li>
                    <li>Featured in National Gallery of Modern Art</li>
                    <li>Conducted workshops across 15+ countries</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Link href="/artisans/sita-devi">View Profile</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-600 text-orange-600 hover:bg-orange-50"
                  >
                    Browse Artworks
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src={SitaDevi}
                  alt="Smt. Sita Devi - Master Madhubani Artist"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisans Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Typography
            variant="h2"
            weight="bold"
            className="text-2xl font-bold mb-8"
          >
            Explore More Master Artisans
          </Typography>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtisans.length === 0 ? (
              <div className="text-center py-12">
                <Typography
                  variant="h3"
                  weight="medium"
                  className="text-xl font-medium text-slate-600 dark:text-slate-300"
                >
                  No artisans found for this category
                </Typography>
              </div>
            ) : (
              filteredArtisans.map((artisan) => (
                <ArtisanDetailCard
                  key={artisan.id}
                  name={artisan.name}
                  craft={artisan.craft}
                  image={artisan.image as string}
                  location={artisan.location}
                  description={artisan.description}
                  awards={artisan.awards}
                />
              ))
            )}
          </div>
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              Load More Artisans
            </Button>
          </div>
        </div>
      </section>

      {/* Artisan Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Typography
              variant="h2"
              weight="bold"
              className="text-3xl font-bold mb-4"
            >
              Artisan Stories
            </Typography>
            <Typography variant="p" className="text-gray-600">
              Discover the journeys, challenges, and triumphs of Bihar&apos;s
              master craftspeople
            </Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/story-1.jpg"
                  alt="From Tradition to Innovation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <Typography
                  variant="h3"
                  weight="bold"
                  className="font-bold text-lg mb-2"
                >
                  From Tradition to Innovation
                </Typography>
                <Typography variant="p" className="text-gray-600 mb-4">
                  How Madhubani artists are adapting ancient techniques for the
                  modern market while preserving cultural heritage.
                </Typography>
                <Button
                  variant="link"
                  className="text-orange-600 p-0 h-auto font-medium"
                >
                  Read Story
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/story-2.jpg"
                  alt="The Women Behind Bihar's Craft Revival"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <Typography
                  variant="h3"
                  weight="bold"
                  className="font-bold text-lg mb-2"
                >
                  The Women Behind Bihar&apos;s Craft Revival
                </Typography>
                <Typography variant="p" className="text-gray-600 mb-4">
                  How female artisans are leading the preservation and economic
                  revival of traditional crafts in rural Bihar.
                </Typography>
                <Button
                  variant="link"
                  className="text-orange-600 p-0 h-auto font-medium"
                >
                  Read Story
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/story-3.jpg"
                  alt="Teaching the Next Generation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <Typography
                  variant="h3"
                  weight="bold"
                  className="font-bold text-lg mb-2"
                >
                  Teaching the Next Generation
                </Typography>
                <Typography variant="p" className="text-gray-600 mb-4">
                  How master artisans are ensuring their knowledge and skills
                  are passed down to younger craftspeople.
                </Typography>
                <Button
                  variant="link"
                  className="text-orange-600 p-0 h-auto font-medium"
                >
                  Read Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become an Artisan */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Typography
              variant="h2"
              weight="bold"
              className="text-3xl font-bold"
            >
              Are You a Traditional Craft Artisan?
            </Typography>
            <Typography variant="p" className="text-orange-100 text-lg">
              Join our platform to showcase your work to a global audience and
              connect with art enthusiasts worldwide
            </Typography>
            <Button className="bg-white text-orange-600 hover:bg-orange-100">
              Join as an Artisan
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
