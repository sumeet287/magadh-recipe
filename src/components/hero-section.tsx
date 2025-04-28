"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { ArrowRight } from "lucide-react";
import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import tikuliArt from "@/assets/art/tikuli_art.jpeg";
import woodArt from "@/assets/art/wood_art.jpeg";
import glassArt from "@/assets/art/glass_art.png";
import SitaDevi from "@/assets/artist/Smt_Sita_Devi.png";
import DulariDevi from "@/assets/artist/Smt_Dulari_Devi.jpg";
import KalpanaDevi from "@/assets/artist/Smt_Kalpana_Devi.png";
import ManishaJha from "@/assets/artist/Smt_Manisha_Devi.png";

import { ArtisanCard } from "./card/artisan-card";
import { TestimonialCarousel } from "./testimonials/testimonial-carousel";
import { FeaturedCollection } from "./collection/featured-collection";
import { CraftCard } from "./card/craft-card";
import { CategoryCard } from "./card/category-card";
import Subscribe from "./subscribe/subscribe";
export function HeroSection() {
  const router = useRouter();

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  Bihar Bazaar
                </h1>
                <p className="text-xl md:text-2xl font-medium text-orange-600 mt-2">
                  Handicrafts ka Digital Marketplace
                </p>
              </div>
              <p className="text-gray-600 md:text-lg max-w-md">
                Bihar ki rich cultural heritage aur traditional crafts ko duniya
                se connect karne ka platform. Madhubani, Tikuli, Glass art aur
                bahut saare authentic handicrafts ek hi jagah par.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => router.push("/products")}
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                  onClick={() => router.push("/crafts")}
                >
                  Explore Crafts
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src={madhubaniArt}
                  alt="Madhubani Art"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-lg transform translate-y-6"
                />
                <Image
                  src={tikuliArt}
                  alt="Traditional Sculpture"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-lg transform -translate-y-6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="bg-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-orange-600">
                1000+
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Artisans Supported
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-orange-600">
                50+
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Years of Heritage
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-orange-600">
                100+
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Craft Varieties
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-orange-600">
                5000+
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Products Delivered
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold">
              Explore Bihar&apos;s Rich Heritage
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Discover the diverse range of traditional crafts that showcase the
              artistic excellence of Bihar&apos;s skilled artisans
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Madhubani Art"
              image={madhubaniArt.src}
              count={42}
            />
            <CategoryCard title="Tikuli Art" image={tikuliArt.src} count={28} />
            <CategoryCard
              title="Sujini Embroidery"
              image={glassArt.src}
              count={35}
            />
            <CategoryCard title="Bamboo Craft" image={woodArt.src} count={19} />
            <CategoryCard title="Sikki Craft" image={woodArt.src} count={24} />
            <CategoryCard title="Pottery" image={woodArt.src} count={31} />
            <CategoryCard title="Wood Carving" image={woodArt.src} count={17} />
            <CategoryCard title="Metal Craft" image={glassArt.src} count={22} />
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Crafts</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Handpicked selection of Bihar&apos;s finest handicrafts, each
              telling a unique story of tradition and craftsmanship
            </p>
          </div>
          <Tabs defaultValue="popular" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white rounded-full shadow-md flex gap-2 p-1">
                <TabsTrigger
                  value="popular"
                  className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600 rounded-full px-6 py-2 font-semibold transition-all duration-200 hover:bg-orange-50"
                >
                  Popular
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600 rounded-full px-6 py-2 font-semibold transition-all duration-200 hover:bg-orange-50"
                >
                  New Arrivals
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600 rounded-full px-6 py-2 font-semibold transition-all duration-200 hover:bg-orange-50"
                >
                  Trending
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="popular" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <CraftCard
                  id="1"
                  title="Madhubani Painting - Krishna Leela"
                  originalPrice={2500}
                  image={SitaDevi.src}
                  artist="Rekha Devi"
                  category="Madhubani Art"
                />
                <CraftCard
                  id="2"
                  title="Handcrafted Bamboo Basket"
                  originalPrice={850}
                  image={DulariDevi.src}
                  artist="Mohan Kumar"
                  category="Bamboo Craft"
                />
                <CraftCard
                  id="3"
                  title="Tikuli Art Wall Hanging"
                  originalPrice={1800}
                  image={KalpanaDevi.src}
                  artist="Sunita Kumari"
                  category="Tikuli Art"
                />
                <CraftCard
                  id="4"
                  title="Sujini Embroidered Cushion Cover"
                  originalPrice={950}
                  image={ManishaJha.src}
                  artist="Geeta Devi"
                  category="Sujini Embroidery"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                >
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="new" className="space-y-8 animate-fade-in">
              {/* Similar grid of products for new arrivals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* New arrival products would go here */}
              </div>
            </TabsContent>
            <TabsContent value="trending" className="space-y-8 animate-fade-in">
              {/* Similar grid of products for trending items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Trending products would go here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Featured Collection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FeaturedCollection
            title="Festival Collection"
            description="Celebrate the vibrant festivals of Bihar with our specially curated collection of traditional crafts"
            image={madhubaniArt.src}
          />
        </div>
      </section>
      {/* Featured Artisans */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold">Meet Our Artisans</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              The skilled hands behind Bihar&apos;s beautiful handicrafts,
              preserving centuries-old traditions
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ArtisanCard
              name="Rekha Devi"
              craft="Madhubani Artist"
              image={SitaDevi.src}
              location="Madhubani, Bihar"
              experience={25}
            />
            <ArtisanCard
              name="Ramesh Kumar"
              craft="Wood Carving Expert"
              image={DulariDevi.src}
              location="Patna, Bihar"
              experience={30}
            />
            <ArtisanCard
              name="Sunita Kumari"
              craft="Tikuli Artist"
              image={KalpanaDevi.src}
              location="Patna, Bihar"
              experience={15}
            />
            <ArtisanCard
              name="Mohan Singh"
              craft="Bamboo Craftsman"
              image={ManishaJha.src}
              location="Bhagalpur, Bihar"
              experience={20}
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              Meet All Artisans
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src={madhubaniArt.src}
                alt="Bihar's Craft Heritage"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="text-lg font-medium">
                  Our mission is to preserve and promote Bihar&apos;s rich
                  cultural heritage while providing sustainable livelihoods to
                  our artisans.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-gray-600">
                Bihar Bazaar was born from a passion to preserve the rich
                cultural heritage of Bihar and provide a platform for the
                talented artisans to showcase their craftsmanship to the world.
              </p>
              <p className="text-gray-600">
                For generations, Bihar&apos;s artisans have been creating
                magnificent pieces of art that tell stories of our traditions,
                beliefs, and way of life. However, many of these art forms were
                at risk of being lost in the modern world.
              </p>
              <p className="text-gray-600">
                We work directly with artisans from remote villages of Bihar,
                ensuring fair compensation for their work and helping them
                preserve their ancestral crafts while adapting to contemporary
                tastes.
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Read More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Hear from people who have experienced the beauty and quality of
              Bihar&apos;s traditional crafts
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>
      {/* Newsletter */}
      <Subscribe />
    </main>
  );
}
