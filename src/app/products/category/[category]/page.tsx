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

type Params = Promise<{ category: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const title =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

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

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  if (!validCategories.includes(params.category as ProductCategory)) {
    notFound();
  }

  const title =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  const categoryProducts = products.filter(
    (product) => product.category === (params.category as ProductCategory)
  );

  return (
    <ClientProductsPage title={title} initialProducts={categoryProducts} />
  );
}
