import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryContent from "@/components/Category/category-content";
import { categoryContent, validCategories } from "@/config/category-content";

type Props = Readonly<{
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category =
    categoryContent[(await params).category as keyof typeof categoryContent];
  if (!category) return notFound();

  return {
    title: `${category.title} | Bihar Bazaar`,
    description: category.description,
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
    console.log("Invalid category:", category);
    return notFound();
  }

  const categoryKey = category as keyof typeof categoryContent;
  const categoryData = categoryContent[categoryKey];

  if (!categoryData) {
    console.error("Category not found:", category);
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <CategoryContent category={categoryData} params={{ category }} />
    </div>
  );
}
