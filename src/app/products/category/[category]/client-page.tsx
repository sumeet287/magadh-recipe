"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/products/product-card";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/types/product";
import {
  ProductFilters,
  type StockFilter,
} from "@/components/products/product-filters";

type ClientProductsPageProps = {
  title: string;
  initialProducts: Product[];
};

export function ClientProductsPage({
  title,
  initialProducts,
}: ClientProductsPageProps) {
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
