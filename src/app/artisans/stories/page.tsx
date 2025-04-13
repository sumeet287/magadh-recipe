"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { artisans } from "@/components/artisans/artisans-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ArtistStoriesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Artist Stories
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-200">
            Discover the inspiring journeys of Bihar&apos;s master craftspeople
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {artisans.map((artist) => (
            <motion.div
              key={artist.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                >
                  <Link href={`/artists/${artist.slug}`}>
                    <Button variant="outline" className="bg-white/90">
                      View Profile
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <div className="p-6">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
                >
                  {artist.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-orange-600 dark:text-orange-400 font-medium mb-4"
                >
                  {artist.craft}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-600 dark:text-slate-300 mb-4"
                >
                  {artist.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2"
                >
                  {artist.awards.map((award, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm"
                    >
                      {award}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
