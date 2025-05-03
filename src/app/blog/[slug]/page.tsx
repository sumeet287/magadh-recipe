import { Metadata } from "next";
import { notFound } from "next/navigation";
import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import tikuliArt from "@/assets/art/tikuli_art.jpeg";
import woodArt from "@/assets/art/wood_art.jpeg";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";

const blogPosts = [
  {
    slug: "ancient-art-of-madhubani-painting",
    title: "The Ancient Art of Madhubani Painting",
    excerpt:
      "Discover the rich history and cultural significance of Madhubani painting, a traditional art form that has been passed down through generations in Bihar.",
    content: `
      Madhubani painting, also known as Mithila painting, is a style of Indian painting that originated in the Mithila region of Bihar. This ancient art form has been practiced for centuries, passed down through generations of skilled artisans.

      The paintings are characterized by their distinctive geometric patterns, nature-inspired motifs, and the use of natural dyes and pigments. Traditional Madhubani paintings often depict scenes from Hindu epics, mythological stories, and important life events like weddings.

      What makes Madhubani painting truly special is its deep connection to the cultural identity of Bihar. Each painting tells a story, not just through its subject matter, but through the techniques and traditions that have been preserved over time.

      Today, Madhubani artists are innovating while staying true to their roots. They're exploring new themes and materials while maintaining the distinctive style that makes this art form unique. Through their work, they're ensuring that this beautiful tradition continues to thrive in the modern world.
    `,
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
    content: `
      Tikuli art, a lesser-known but equally fascinating craft from Bihar, has a rich history dating back several centuries. Originally, Tikuli was a small dot worn by married women on their foreheads, but it has evolved into a sophisticated art form.

      The craft involves creating intricate paintings on small, circular metal plates. Artists use fine brushes to paint detailed designs, often incorporating traditional motifs, religious symbols, and nature-inspired patterns.

      What's remarkable about Tikuli art is its journey from a simple marriage symbol to a celebrated craft form. Today, artists create everything from wall decorations to jewelry using these techniques, helping preserve this unique aspect of Bihar's cultural heritage.

      The revival of Tikuli art has provided economic opportunities for many artisans, particularly women, who are at the forefront of keeping this tradition alive. Their work showcases the potential for traditional crafts to adapt and thrive in contemporary markets.
    `,
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
    content: `
      Wood carving in Bihar is more than just a craft - it's a legacy that has been shaped by generations of skilled artisans. These master craftsmen transform simple blocks of wood into intricate works of art that tell stories of our cultural heritage.

      The tradition of wood carving in Bihar dates back centuries, with artisans creating everything from elaborate temple doors to delicate decorative pieces. Each piece showcases the remarkable skill and patience required to bring these designs to life.

      What sets Bihar's wood carving apart is the unique blend of influences from various historical periods. You can see elements of Buddhist, Islamic, and Hindu art seamlessly integrated into the designs, reflecting Bihar's rich multicultural heritage.

      Today's woodcarvers are facing new challenges and opportunities. While traditional markets may be changing, there's growing appreciation for handcrafted wooden items among urban consumers. These artisans are adapting their skills to create pieces that appeal to contemporary tastes while maintaining their traditional techniques.
    `,
    image: woodArt,
    author: "Amit Verma",
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
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
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
