"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categoryContent } from "@/config/category-content";

interface CategoryContentProps {
  category: (typeof categoryContent)[keyof typeof categoryContent];
  params: {
    category: string;
  };
}

const CategoryContent: FC<CategoryContentProps> = ({ category, params }) => {
  const [mounted, setMounted] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!category?.title || !params?.category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Category</h1>
          <p className="text-gray-600">
            Unable to load category data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
              <p className="text-lg opacity-90">{category.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-amber-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {category.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center"
              >
                <p className="text-lg font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>
          <div className="relative">
            <div className="flex gap-4">
              {/* Main large image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-[65%] aspect-[16/9] overflow-hidden rounded-xl shadow-lg"
              >
                <Image
                  src={category.gallery[0].image}
                  alt={category.gallery[0].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Grid of smaller images */}
              <div className="w-[35%] grid grid-cols-2 gap-4">
                {category.gallery.slice(1, 5).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-square overflow-hidden rounded-xl shadow-lg group"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>

              {/* Show all photos button */}
              <Dialog open={showGallery} onOpenChange={setShowGallery}>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    className="absolute bottom-4 right-4 z-10 shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white"
                    size="sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm12 0V2H4v2h12z" />
                    </svg>
                    Show all photos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[800px] w-full min-h-[500px] p-0">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <DialogHeader className="px-6 py-3 border-b flex items-center justify-between bg-white">
                      <DialogTitle className="text-lg font-medium">
                        All Photos - {category.title}
                      </DialogTitle>
                    </DialogHeader>

                    {/* Main Content */}
                    <div className="flex-1 relative bg-white">
                      <Carousel className="w-full h-full">
                        <CarouselContent>
                          {category.gallery.map((item) => (
                            <CarouselItem key={item.id} className="h-[400px]">
                              <div className="relative w-full h-full">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-contain"
                                  priority
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-md" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-md" />
                      </Carousel>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-100 dark:bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Explore Our {category.title} Collection
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover authentic pieces crafted by skilled artisans from Bihar.
            Each piece tells a unique story of tradition and craftsmanship.
          </p>
          <Link href={`/products/category/${params.category}`}>
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CategoryContent;
