import { Metadata } from "next";
import { notFound } from "next/navigation";

// Define valid categories
const validCategories = ["madhubani", "tikuli", "wood", "glass"];

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Capitalize and format category name
  const title =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

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

export default function CategoryPage({ params }: Props) {
  if (!validCategories.includes(params.category)) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">
        {params.category.charAt(0).toUpperCase() + params.category.slice(1)} Art
      </h1>
      {/* Add your category-specific content */}
    </main>
  );
}
