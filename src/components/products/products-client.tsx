"use client";

import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductPagination } from "@/components/products/product-pagination";
import { AddressSelector } from "@/components/products/address-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";

export function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAddressId, setSelectedAddressId] = useState("1");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize state from URL params with proper type checking
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">(
    "newest"
  );
  const [stockFilter, setStockFilter] = useState<
    "all" | "in-stock" | "out-of-stock"
  >("all");
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
  }, [searchParams, currentPage, pageSize]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply stock filter
    if (stockFilter !== "all") {
      filtered = filtered.filter((product) =>
        stockFilter === "in-stock" ? product.inStock : !product.inStock
      );
    }

    // Apply sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        // Assuming newer products have higher IDs
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, stockFilter]);

  // Calculate pagination with dynamic page size
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  // Reset to first page when search/sort/pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, pageSize]);

  // Update handlers
  const handlePageChange = (page: number) => {
    updatePagination(page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    updatePagination(1, size); // Reset to page 1 when changing page size
  };

  const renderProducts = () => {
    if (isLoading) {
      return Array(8)
        .fill(0)
        .map((_, i) => <ProductCardSkeleton key={`skeleton-${i}`} />);
    }

    if (paginatedProducts.length > 0) {
      return paginatedProducts.map((product) => (
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
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <p className="text-xl text-muted-foreground mb-2">No products found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold">Our Products</h1>
          <div className="text-sm text-muted-foreground">Delivery Address</div>
          <AddressSelector
            selectedAddressId={selectedAddressId}
            onAddressChange={setSelectedAddressId}
          />
        </div>

        <div className="space-y-4">
          <ProductFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            stockFilter={stockFilter}
            onStockFilterChange={setStockFilter}
          />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing {startIndex + 1}-
              {Math.min(startIndex + pageSize, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Show</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => handlePageSizeChange(Number(value))}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue placeholder={pageSize.toString()} />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground">per page</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderProducts()}
        </div>
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
