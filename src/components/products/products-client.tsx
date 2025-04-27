"use client";

import { ProductCard } from "@/components/products/product-card";
import { useState, useEffect, useCallback } from "react";
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
import { useProduct } from "@/hooks/useProduct";
import { toast } from "sonner";
import { useAddresses } from "@/hooks/useAddresses";

import { motion, AnimatePresence } from "framer-motion";
import {
  FilterState,
  isSortOption,
  SortOption,
  isStockFilter,
  StockFilter,
  PaginationState,
  URLParamUpdates,
} from "@/utils/products.utils";
import { Button } from "../ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
// Add these animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAddressId, setSelectedAddressId] = useState<string>("1");
  const { products, isLoading, fetchFilteredAndSortedProducts, pagination } =
    useProduct();
  const { addresses } = useAddresses();

  // Initialize filter state
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: searchParams.get("query") || "",
    sortBy: isSortOption(searchParams.get("sort"))
      ? (searchParams.get("sort") as SortOption)
      : "newest",
    stockFilter: isStockFilter(searchParams.get("stock"))
      ? (searchParams.get("stock") as StockFilter)
      : "all",
  });

  // Initialize pagination state
  const [paginationState, setPaginationState] = useState<PaginationState>(
    () => {
      const page = searchParams.get("page");
      const size = searchParams.get("size");
      return {
        currentPage: page ? Number(page) : 1,
        pageSize: size ? Number(size) : 10,
      };
    }
  );

  // Type-safe URL parameter updater
  const updateURLParams = useCallback(
    (updates: URLParamUpdates): void => {
      const params = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Type-safe filter state updaters
  const handleSearchChange = useCallback(
    (query: string): void => {
      setFilterState((prev) => ({ ...prev, searchQuery: query }));
      updateURLParams({ query, page: "1" }); // Reset to first page on search
      setPaginationState((prev) => ({ ...prev, currentPage: 1 }));
    },
    [updateURLParams]
  );

  const handleSortChange = useCallback(
    (sort: SortOption): void => {
      setFilterState((prev) => ({ ...prev, sortBy: sort }));
      updateURLParams({ sort, page: "1" }); // Reset to first page on sort change
      setPaginationState((prev) => ({ ...prev, currentPage: 1 }));
    },
    [updateURLParams]
  );

  const handleStockFilterChange = useCallback(
    (filter: StockFilter): void => {
      setFilterState((prev) => ({ ...prev, stockFilter: filter }));
      updateURLParams({ stock: filter, page: "1" }); // Reset to first page on filter change
      setPaginationState((prev) => ({ ...prev, currentPage: 1 }));
    },
    [updateURLParams]
  );

  // Type-safe pagination state updaters
  const handlePageChange = useCallback(
    (page: number): void => {
      setPaginationState((prev) => ({ ...prev, currentPage: page }));
      updateURLParams({ page: page.toString() });
    },
    [updateURLParams]
  );

  const handlePageSizeChange = useCallback(
    (size: number): void => {
      setPaginationState((prev) => ({
        ...prev,
        currentPage: 1,
        pageSize: size,
      }));
      updateURLParams({ size: size.toString(), page: "1" });
    },
    [updateURLParams]
  );

  // Fetch products when filters or pagination change
  useEffect(() => {
    const { sortBy, stockFilter } = filterState;
    const { currentPage, pageSize } = paginationState;

    fetchFilteredAndSortedProducts(
      currentPage,
      pageSize,
      sortBy,
      stockFilter
    ).catch((err) => {
      toast.error("Failed to load products. Please try again later.");
      console.error("Error loading products:", err);
    });
  }, [filterState, paginationState]);

  // Sync URL params with state
  useEffect(() => {
    const sort = searchParams.get("sort");
    const stock = searchParams.get("stock");
    const query = searchParams.get("query");
    const page = searchParams.get("page");
    const size = searchParams.get("size");

    if (page && !isNaN(Number(page))) {
      setPaginationState((prev) => ({ ...prev, currentPage: Number(page) }));
    }
    if (size && !isNaN(Number(size))) {
      setPaginationState((prev) => ({ ...prev, pageSize: Number(size) }));
    }
    if (query !== null) {
      setFilterState((prev) => ({ ...prev, searchQuery: query }));
    }
    if (sort && isSortOption(sort)) {
      setFilterState((prev) => ({ ...prev, sortBy: sort }));
    }
    if (stock && isStockFilter(stock)) {
      setFilterState((prev) => ({ ...prev, stockFilter: stock }));
    }
  }, [searchParams]);

  // Calculate total pages from the pagination data
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <AnimatePresence>
      <section className="relative bg-amber-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/Bihar_Bazaar.png?height=600&width=1200')] bg-cover bg-center" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bihar&apos;s Finest Crafts
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover authentic handcrafted treasures from the heart of Bihar,
              created by skilled artisans preserving centuries-old traditions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                Shop All <ShoppingBag className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 border-white"
              >
                Learn About Artisans
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-amber-900">
            Browse Categories
          </h2>
          <Link
            href="/categories"
            className="text-amber-700 hover:text-amber-800 flex items-center"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Paintings", "Textiles", "Handicrafts", "Pottery"].map(
            (category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="group relative h-40 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-amber-900/40 group-hover:bg-amber-900/60 transition-all duration-300" />
                <Image
                  src="/Bihar_Bazaar.png"
                  alt="Bihar Bazaar Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-medium">
                    {category}
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      </section>

      <motion.main
        className="container mx-auto px-4 py-6"
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
        >
          {/* Header section */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <h1 className="text-2xl sm:text-4xl font-bold">Our Products</h1>
            <div className="text-sm text-muted-foreground">
              Delivery Address
            </div>
            <AddressSelector
              addresses={addresses || []}
              selectedAddressId={selectedAddressId || ""}
              onAddressChange={setSelectedAddressId}
            />
          </motion.div>

          {/* Filters section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <ProductFilters
              searchQuery={filterState.searchQuery}
              onSearchChange={handleSearchChange}
              sortBy={filterState.sortBy}
              onSortChange={handleSortChange}
              stockFilter={filterState.stockFilter}
              onStockFilterChange={handleStockFilterChange}
            />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {(pagination.page - 1) * pagination.limit + 1}-
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total} products
              </span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Show</span>
                <Select
                  value={paginationState.pageSize.toString()}
                  onValueChange={(value) => handlePageSizeChange(Number(value))}
                >
                  <SelectTrigger className="w-[70px] h-8">
                    <SelectValue
                      placeholder={paginationState.pageSize.toString()}
                    />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {addresses.map((addr, idx) => (
                      <SelectItem
                        key={addr.id || addr._id || idx}
                        value={addr.id.toString()}
                      >
                        {addr.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">per page</span>
              </div>
            </div>
          </motion.div>

          {/* Products grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {isLoading ? (
              // Shimmer loading state
              Array.from({ length: 8 }).map((_, i) => (
                <motion.div key={`skeleton-${i}`} variants={itemVariants}>
                  <ProductCardSkeleton />
                </motion.div>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    productImage={product.productImage}
                    category={product.category}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                variants={itemVariants}
              >
                <p className="text-xl text-muted-foreground mb-2">
                  No products found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Pagination */}
          {products.length > 0 && (
            <motion.div variants={itemVariants}>
              <ProductPagination
                currentPage={pagination.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
}
