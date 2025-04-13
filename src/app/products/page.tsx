"use client";

import { ProductCard } from "@/components/products/product-card";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductPagingInfo } from "@/components/products/product-paging-info";
import { ProductPagination } from "@/components/products/product-pagination";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params with proper type checking
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">(
    "newest"
  );
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    const parsedPage = page ? parseInt(page) : 1;
    return isNaN(parsedPage) ? 1 : parsedPage;
  });
  const [pageSize, setPageSize] = useState(() => {
    const size = searchParams.get("size");
    const parsedSize = size ? parseInt(size) : 10;
    return isNaN(parsedSize) ? 10 : parsedSize;
  });

  // Add effect to sync with URL params when they change
  useEffect(() => {
    const page = searchParams.get("page");
    const size = searchParams.get("size");

    const parsedPage = page ? parseInt(page) : 1;
    const parsedSize = size ? parseInt(size) : 10;

    if (!isNaN(parsedPage) && parsedPage !== currentPage) {
      setCurrentPage(parsedPage);
    }

    if (!isNaN(parsedSize) && parsedSize !== pageSize) {
      setPageSize(parsedSize);
    }
  }, [searchParams]);

  // Function to update URL and state
  const updatePagination = (page: number, size: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("size", size.toString());
    router.push(`/products?${params.toString()}`);
    setCurrentPage(page);
    setPageSize(size);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
  }, [searchQuery, sortBy]);

  // Calculate pagination with dynamic page size
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  // Reset to first page when search/sort/pageSize changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, pageSize]);

  // Update handlers
  const handlePageChange = (page: number) => {
    updatePagination(page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    updatePagination(1, size); // Reset to page 1 when changing page size
  };

  return (
    <main className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          {/* Left side filters */}
          <ProductFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Right side info */}
          <ProductPagingInfo
            startIndex={startIndex}
            pageSize={pageSize}
            totalProducts={filteredProducts.length}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Products Grid */}
      <div className="min-h-[400px]">
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                images={product.images}
                category={product.category}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <p className="text-xl text-muted-foreground mb-2">
              No products found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}
