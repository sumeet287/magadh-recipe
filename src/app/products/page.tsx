"use client";

import { ProductCard } from "@/components/products/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { products } from "@/data/products";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search products..."
                className="w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={sortBy}
                onValueChange={(value: "newest" | "price-low" | "price-high") =>
                  setSortBy(value)
                }
              >
                <SelectTrigger className="w-full sm:w-[250px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right side info */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-
              {Math.min(startIndex + pageSize, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => handlePageSizeChange(Number(value))}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>
          </div>
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
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  );
}
