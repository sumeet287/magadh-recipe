import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/product-card";
import { Separator } from "@/components/ui/separator";
import type { ProductCategory } from "@/types/product";
import { products } from "@/data/products";
import { useState, useMemo } from "react";
import {
  ProductFilters,
  type StockFilter,
} from "@/components/products/product-filters";

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

export default function CategoryProductsPage({ params }: Props) {
  const { category } = params;

  if (!validCategories.includes(category as ProductCategory)) {
    notFound();
  }

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">(
    "newest"
  );
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (product) => product.category === (category as ProductCategory)
    );

    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description?.toLowerCase() || "").includes(
            searchQuery.toLowerCase()
          )
      );
    }

    if (stockFilter === "in-stock") {
      result = result.filter((product) => product.inStock);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [category, searchQuery, sortBy, stockFilter]);

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title} Products</h1>

        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          stockFilter={stockFilter}
          onStockFilterChange={setStockFilter}
        />
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              images={product.images}
              category={product.category}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-muted-foreground mb-2">
              No products found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
