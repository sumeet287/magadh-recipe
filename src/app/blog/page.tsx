import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import tikuliArt from "@/assets/art/tikuli_art.jpeg";
import woodArt from "@/assets/art/wood_art.jpeg";
import Subscribe from "@/components/subscribe/subscribe";

export const metadata: Metadata = {
  title: "Blog | Bihar Bazaar",
  description:
    "Explore stories about Bihar's rich cultural heritage, traditional arts, and talented artisans.",
};

const blogPosts = [
  {
    slug: "ancient-art-of-madhubani-painting",
    title: "The Ancient Art of Madhubani Painting",
    excerpt:
      "Discover the rich history and cultural significance of Madhubani painting, a traditional art form that has been passed down through generations in Bihar.",
    image: madhubaniArt,
    author: "Priya Kumar",
    date: "April 15, 2025",
    readTime: "5 min read",
    category: "Art & Culture",
  },
  {
    slug: "tikuli-art-bihars-hidden-gem",
    title: "Tikuli Art: Bihar's Hidden Gem",
    excerpt:
      "Learn about the intricate craft of Tikuli art, once worn by Bihari women as a symbol of marriage, now transformed into beautiful decorative pieces.",
    image: tikuliArt,
    author: "Rajesh Singh",
    date: "April 12, 2025",
    readTime: "4 min read",
    category: "Traditional Crafts",
  },
  {
    slug: "master-woodcarvers-of-bihar",
    title: "The Master Woodcarvers of Bihar",
    excerpt:
      "Meet the skilled artisans keeping the ancient tradition of wood carving alive in Bihar, creating masterpieces that tell stories of our heritage.",
    image: woodArt,
    author: "Amit Verma",
    date: "April 10, 2025",
    readTime: "6 min read",
    category: "Artisan Stories",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Stories from
              <span className="block text-orange-600 mt-2">
                Bihar&apos;s Artisans
              </span>
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-200">
              Explore the rich cultural heritage of Bihar through stories of our
              artisans, traditional arts, and the evolution of centuries-old
              crafts.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <Subscribe />
        </div>
      </section>
    </main>
  );
}
