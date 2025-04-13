import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ProductCategory } from "@/types/product";
import { products } from "@/data/products";
import { ClientProductsPage } from "./client-page";

const validCategories: ProductCategory[] = [
  "madhubani",
  "tikuli",
  "wood",
  "glass",
  "bamboo",
  "sujani",
  "sikki",
  "lac",
];

type Props = Readonly<{
  params: { category: string };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params;
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${title} Products | Bihar Bazaar`,
    description: `Shop authentic ${title} crafts and artwork from Bihar's skilled artisans`,
  };
}

export function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

export default async function Page({ params }: Props) {
  const { category } = params;

  if (!validCategories.includes(category as ProductCategory)) {
    notFound();
  }

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  const categoryProducts = products.filter(
    (product) => product.category === (category as ProductCategory)
  );

  return (
    <ClientProductsPage title={title} initialProducts={categoryProducts} />
  );
}
