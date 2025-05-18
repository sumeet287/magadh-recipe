import { Metadata } from "next";
import { notFound } from "next/navigation";
import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import tikuliArt from "@/assets/art/tikuli_art.jpeg";
import woodArt from "@/assets/art/wood_art.jpeg";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";
import { Typography } from "@/lib/ui/typography/typography";

const blogPosts = [
  {
    slug: "mango-pickle-tradition-bihar",
    title: "The Tradition of Mango Pickle in Bihar",
    excerpt:
      "Discover the rich history and cultural significance of mango pickle, a staple in every Bihari household.",
    content: `
      Mango pickle, or aam ka achar, is an integral part of Bihar's culinary heritage. Handmade using traditional Magadh Recipe methods, it is cherished for its tangy, spicy flavors and long shelf life.

      The process involves sun-curing raw mangoes and mixing them with a blend of spices unique to the region. Each family has its own secret recipe, passed down through generations.

      Today, Bihari mango pickle is enjoyed across India and abroad, symbolizing the taste of home for many.
    `,
    image: madhubaniArt, // Replace with pickle image if available
    author: "Sunita Devi",
    date: "April 15, 2025",
    readTime: "5 min read",
    category: "Pickle Heritage",
  },
  {
    slug: "lemon-pickle-bihar-flavors",
    title: "Lemon Pickle: Bihar's Tangy Treasure",
    excerpt:
      "Learn about the art of making lemon pickle in Bihar, a tangy delight that brightens every meal.",
    content: `
      Lemon pickle, or nimbu ka achar, is a favorite in Bihar for its zesty flavor and digestive benefits. The pickles are sun-cured and spiced with a blend of mustard, fenugreek, and chili.

      The tradition of making lemon pickle is a family affair, with recipes and techniques handed down through generations. Magadh Recipe brings this authentic taste to your table.
    `,
    image: tikuliArt, // Replace with pickle image if available
    author: "Rekha Kumari",
    date: "April 12, 2025",
    readTime: "4 min read",
    category: "Traditional Pickles",
  },
  {
    slug: "mixed-pickle-bihar-story",
    title: "Mixed Pickle: A Medley of Bihar's Flavors",
    excerpt:
      "Meet the artisans who create Bihar's famous mixed pickles, blending seasonal vegetables with traditional spices.",
    content: `
      Mixed vegetable pickle is a celebration of Bihar's agricultural bounty. Artisans select the freshest produce and pickle them using the Magadh Recipe, ensuring a burst of flavors in every bite.

      The result is a tangy, spicy, and crunchy delight that pairs perfectly with any meal.
    `,
    image: woodArt, // Replace with pickle image if available
    author: "Asha Singh",
    date: "April 10, 2025",
    readTime: "6 min read",
    category: "Artisan Stories",
  },
];

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return {
    title: `${post.title} | Bihar Bazaar Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: { params: Params }) {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          <Typography
            variant="h1"
            weight="bold"
            seoTitle={post.title}
            className="text-4xl font-bold mb-4"
          >
            {post.title}
          </Typography>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300 mb-8">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            {post.content}
          </div>
        </article>
      </main>
    </>
  );
}
