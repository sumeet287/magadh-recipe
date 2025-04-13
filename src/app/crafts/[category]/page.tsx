import { Metadata } from "next";
import { notFound } from "next/navigation";

// Define valid categories
const validCategories = ["madhubani", "tikuli", "wood", "glass"];

type Props = Readonly<{
  params: { category: string };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  // Capitalize and format category name
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${title} Art | Bihar Bazaar`,
    description: `Explore authentic ${title} art and crafts from Bihar`,
  };
}

export function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">{title} Art</h1>
      {/* Add your category-specific content */}
    </main>
  );
}
