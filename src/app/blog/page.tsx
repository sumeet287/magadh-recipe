import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import tikuliArt from "@/assets/art/tikuli_art.jpeg";
import woodArt from "@/assets/art/wood_art.jpeg";

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

          {/* Newsletter Subscription */}
          <div className="mt-16 bg-white/80 dark:bg-slate-800/80 rounded-lg p-8">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Get the latest stories about Bihar&apos;s artisans and crafts
                delivered directly to your inbox.
              </p>
              <form className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
