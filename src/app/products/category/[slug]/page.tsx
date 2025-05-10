"use client";
import { useState, useMemo, useEffect, use } from "react";
import { CraftCard } from "@/components/card/craft-card";
import { Separator } from "@/components/ui/separator";
import type { Product, ProductCategory } from "@/types/product";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { ProductFilters } from "@/components/products/product-filters";
import { StockFilter } from "@/utils/products.utils";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";
import { useCategoryProducts } from "@/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ClientProductsPageProps = {
  title: string;
  initialProducts: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  onPageChange: (page: number) => void;
};

export function ClientProductsPage({
  title,
  initialProducts,
  pagination,
  onPageChange,
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
        return [...result].sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
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
        <CraftCard
          key={product._id}
          id={product._id}
          title={product.name}
          originalPrice={product.price}
          image={product.productImage}
          category={product.category}
          artist={product.artistName}
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

  const totalPages = Math.ceil(pagination.total / pagination.limit);

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

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {pagination.page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </main>
  );
}

// Default export for Next.js dynamic route
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);
  const { products, isLoading, error, pagination, fetchCategoryProducts } =
    useCategoryProducts();

  // Validate and format the slug
  const formattedSlug = useMemo(() => {
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

    const formatted = slug.toLowerCase();
    if (!validCategories.includes(formatted as ProductCategory)) {
      router.push("/404");
      return null;
    }
    return formatted;
  }, [slug, router]);

  useEffect(() => {
    if (formattedSlug) {
      fetchCategoryProducts(formattedSlug);
    }
  }, [formattedSlug, fetchCategoryProducts]);

  const handlePageChange = (page: number) => {
    if (formattedSlug) {
      fetchCategoryProducts(formattedSlug, page);
    }
  };

  if (!formattedSlug) {
    return null; // Will redirect to 404
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <ClientProductsPage
        title={formattedSlug.charAt(0).toUpperCase() + formattedSlug.slice(1)}
        initialProducts={products}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </>
  );
}
