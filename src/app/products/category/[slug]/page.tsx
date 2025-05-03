"use client";
import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "@/components/products/product-card";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/types/product";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { ProductFilters } from "@/components/products/product-filters";
import { StockFilter } from "@/utils/products.utils";
import { products } from "@/data/products"; // Replace with your actual data
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";

type ClientProductsPageProps = {
  title: string;
  initialProducts: Product[];
};

export function ClientProductsPage({
  title,
  initialProducts,
}: ClientProductsPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">(
    "newest"
  );
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");

  // Filter products by search query and other filters
  const filteredProducts = useMemo(() => {
    let result = initialProducts;

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
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...result].sort((a, b) => b.price - a.price);
      case "newest":
        return [...result].sort((a, b) => parseInt(b.id) - parseInt(a.id));
      default:
        return result;
    }
  }, [initialProducts, searchQuery, sortBy, stockFilter]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderProducts = () => {
    if (isLoading) {
      return Array(8)
        .fill(0)
        .map((_, i) => <ProductCardSkeleton key={`skeleton-${i}`} />);
    }

    if (filteredProducts.length > 0) {
      return filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          images={product.images}
          category={product.category}
        />
      ));
    }

    return (
      <div className="col-span-full text-center py-12">
        <p className="text-xl text-muted-foreground mb-2">No products found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  };

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
        {renderProducts()}
      </div>
    </main>
  );
}

// Default export for Next.js dynamic route
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Filter products by category slug
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === slug
  );

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <ClientProductsPage title={slug} initialProducts={filteredProducts} />
    </>
  );
}
