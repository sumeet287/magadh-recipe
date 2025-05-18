"use client";

import Image from "next/image";
import { Button } from "@/lib/ui/button/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { ArrowRight } from "lucide-react";
import magadhWomen from "@/assets/art/Magadh_Women.png";
import magadhJar from "@/assets/art/Magadh_Jar.png";
import magadhAchar from "@/assets/art/Magadh_Achar.png";
import SitaDevi from "@/assets/artist/Smt_Sita_Devi.png";
import DulariDevi from "@/assets/artist/Smt_Dulari_Devi.jpg";
import KalpanaDevi from "@/assets/artist/Smt_Kalpana_Devi.png";
import ManishaJha from "@/assets/artist/Smt_Manisha_Devi.png";
import BiharBazaarBg from "@/assets/intro/Bihar_Bazaar_bg.webp";
import { ArtisanCard } from "./card/artisan-card";
import { TestimonialCarousel } from "./testimonials/testimonial-carousel";
import { FeaturedCollection } from "./collection/featured-collection";
import { CraftCard } from "./card/craft-card";
import Subscribe from "./subscribe/subscribe";
import "./hero.css";
import Link from "next/link";
import TickerSlider from "./tickerslider/ticker-slider";
import { motion } from "framer-motion";
import { Typography } from "@/lib/ui/typography/typography";

export function HeroSection() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex-1"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden flex items-center bg-orange-50">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BiharBazaarBg.src})` }}
        />

        {/* Light Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />

        {/* Content */}
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Left Side: Text Content */}
            <div className="space-y-8 animate-fadeInUp">
              <div>
                <Typography
                  variant="h1"
                  weight="bold"
                  color="primary"
                  seoTitle="Magadh Recipe"
                  className="text-5xl md:text-7xl font-extrabold tracking-tighter"
                >
                  Magadh Recipe
                </Typography>
                <Typography
                  variant="p"
                  color="primary"
                  className="text-2xl md:text-3xl font-semibold mt-4"
                >
                  Bihar ke Pure Handmade Pickles
                </Typography>
              </div>
              <Typography
                variant="p"
                color="secondary"
                className="md:text-xl max-w-2xl leading-relaxed"
              >
                Bihar ki rich pickle heritage aur traditional recipes ko duniya
                se connect karne ka platform. Mango, Lemon, Mixed aur bahut
                saare authentic pickles ek hi jagah par.
              </Typography>

              <div className="flex flex-col sm:flex-row gap-6"></div>
            </div>

            {/* Right Side: Floating Image Stack */}
       <div className="relative w-[400px] h-[400px] hidden md:block group cursor-pointer">
  {/* First (backmost) image */}
  <div
    className="
      absolute left-16 top-40 w-[260px] h-[340px] z-0 
      rotate-[2deg] shadow-2xl border-4 border-white rounded-xl overflow-hidden 
      transition-all duration-500
      group-hover:rotate-[12deg] group-hover:translate-x-16 group-hover:translate-y-8
    "
  >
    <Image
      src={magadhAchar}
      alt="Mixed Pickle"
      fill
      className="object-cover"
    />
  </div>

  {/* Second (middle) image */}
  <div
    className="
      absolute left-0 top-12 w-[260px] h-[340px] z-10 
      rotate-[-10deg] shadow-2xl border-4 border-white rounded-xl overflow-hidden 
      transition-all duration-500
      group-hover:rotate-[-18deg] group-hover:-translate-x-16 group-hover:-translate-y-8
    "
  >
    <Image
      src={magadhWomen}
      alt="Mango Pickle"
      fill
      className="object-cover"
    />
  </div>

  {/* Third (topmost) image */}
  <div
    className="
      absolute left-28 top-0 w-[260px] h-[340px] z-20 
      rotate-[8deg] shadow-2xl border-4 border-white rounded-xl overflow-hidden 
      transition-all duration-500
      group-hover:rotate-[0deg] group-hover:translate-x-0 group-hover:-translate-y-12
    "
  >
    <Image
      src={magadhJar}
      alt="Lemon Pickle"
      fill
      className="object-cover"
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
                5000+
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Jars Delivered
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-orange-600">
                50+
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Years of Recipe Heritage
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-orange-600">
                20+
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Pickle Varieties
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-orange-600">
                1000+
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <Typography
              variant="h2"
              weight="bold"
              color="primary"
              align="center"
              className="text-4xl font-bold"
            >
              Explore Bihar's Pickle Heritage
            </Typography>
            <Typography
              variant="p"
              color="secondary"
              align="center"
              className="mt-2 max-w-2xl text-lg font-medium"
            >
              Discover the diverse range of traditional pickles that showcase the
              authentic taste of Bihar's kitchens.
            </Typography>
          </div>
          <TickerSlider />
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <Typography
              variant="h2"
              weight="bold"
              color="primary"
              align="center"
              className="text-3xl font-bold"
            >
              Featured Pickles
            </Typography>
            <Typography
              variant="p"
              color="secondary"
              align="center"
              className="mt-2 max-w-2xl"
            >
              Handpicked selection of Bihar's finest pickles, each jar telling a unique story of tradition and taste.
            </Typography>
          </div>
          <Tabs defaultValue="popular" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white rounded-xl shadow-md flex gap-2 p-1">
                <TabsTrigger
                  value="popular"
                  className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600 rounded-full px-6 py-2 font-semibold transition-all duration-200 hover:bg-orange-50 cursor-pointer"
                >
                  Popular
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600 rounded-full px-6 py-2 font-semibold transition-all duration-200 hover:bg-orange-50 cursor-pointer"
                >
                  New Arrivals
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600 rounded-full px-6 py-2 font-semibold transition-all duration-200 hover:bg-orange-50 cursor-pointer"
                >
                  Trending
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="popular" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <CraftCard
                  id="1"
                  title="Aam ka Achar (Mango Pickle)"
                  originalPrice={350}
                  image={SitaDevi.src}
                  artist="Savitri Devi"
                  category="Mango Pickle"
                />
                <CraftCard
                  id="2"
                  title="Nimbu ka Achar (Lemon Pickle)"
                  originalPrice={300}
                  image={DulariDevi.src}
                  artist="Meena Kumari"
                  category="Lemon Pickle"
                />
                <CraftCard
                  id="3"
                  title="Mix Achar (Mixed Pickle)"
                  originalPrice={400}
                  image={KalpanaDevi.src}
                  artist="Sunita Devi"
                  category="Mixed Pickle"
                />
                <CraftCard
                  id="4"
                  title="Mirch ka Bharwa Achar (Stuffed Chilli Pickle)"
                  originalPrice={450}
                  image={ManishaJha.src}
                  artist="Geeta Devi"
                  category="Chilli Pickle"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-2 border-orange-600 text-amber-600 hover:bg-white  hover:text-orange-700 px-8 py-4 cursor-pointer"
                >
                  View All Pickles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="new" className="space-y-8 animate-fade-in">
              {/* New arrival pickles would go here */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* New arrival pickles would go here */}
              </div>
            </TabsContent>
            <TabsContent value="trending" className="space-y-8 animate-fade-in">
              {/* Trending pickles would go here */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Trending pickles would go here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Featured Collection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FeaturedCollection
            title="Seasonal Pickle Collection"
            description="Celebrate the flavors of Bihar with our specially curated collection of traditional seasonal pickles."
            image={magadhWomen.src}
          />
        </div>
      </section>
      {/* Featured Artisans */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <Typography
              variant="h2"
              weight="bold"
              color="primary"
              align="center"
              className="text-3xl font-bold"
            >
              Meet Our Pickle Makers
            </Typography>
            <Typography
              variant="p"
              color="secondary"
              align="center"
              className="mt-2 max-w-2xl"
            >
              The skilled hands behind Bihar's delicious pickles, preserving generations-old recipes.
            </Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ArtisanCard
              name="Savitri Devi"
              craft="Mango Pickle Specialist"
              image={SitaDevi.src}
              location="Gaya, Bihar"
              experience={25}
            />
            <ArtisanCard
              name="Meena Kumari"
              craft="Lemon Pickle Expert"
              image={DulariDevi.src}
              location="Patna, Bihar"
              experience={30}
            />
            <ArtisanCard
              name="Sunita Devi"
              craft="Mixed Pickle Maker"
              image={KalpanaDevi.src}
              location="Nalanda, Bihar"
              experience={15}
            />
            <ArtisanCard
              name="Geeta Devi"
              craft="Chilli Pickle Artisan"
              image={ManishaJha.src}
              location="Bhagalpur, Bihar"
              experience={20}
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50 cursor-pointer"
            >
              Meet All Pickle Makers
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
                src={magadhWomen.src}
                alt="Bihar's Pickle Heritage"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="text-lg font-medium">
                  Our mission is to preserve and promote Bihar's rich pickle heritage while providing sustainable livelihoods to our pickle makers.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <Typography
                variant="h2"
                weight="bold"
                color="primary"
                className="text-3xl font-bold"
              >
                Our Story
              </Typography>
              <Typography variant="p" color="secondary">
                Magadh Recipe was born from a passion to preserve the rich
                pickle heritage of Bihar and provide a platform for the
                talented pickle makers to showcase their recipes to the world.
              </Typography>
              <Typography variant="p" color="secondary">
                For generations, Bihar's families have been creating
                mouthwatering pickles that tell stories of our traditions,
                flavors, and way of life. However, many of these recipes were
                at risk of being lost in the modern world.
              </Typography>
              <Typography variant="p" color="secondary">
                We work directly with pickle makers from remote villages of Bihar,
                ensuring fair compensation for their work and helping them
                preserve their ancestral recipes while adapting to contemporary
                tastes.
              </Typography>
              <Button className="bg-orange-600 hover:bg-orange-700 cursor-pointer">
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
            <Typography
              variant="h2"
              weight="bold"
              color="primary"
              align="center"
              className="text-3xl font-bold"
            >
              What Our Customers Say
            </Typography>
            <Typography
              variant="p"
              color="secondary"
              align="center"
              className="mt-2 max-w-2xl"
            >
              Hear from people who have experienced the authentic taste and quality of Bihar's traditional pickles.
            </Typography>
          </div>
          <TestimonialCarousel />
        </div>
      </section>
      {/* Newsletter */}
      <Subscribe />
    </motion.main>
  );
}
