import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "newest" | "price-low" | "price-high";
type StockFilter = "all" | "in-stock" | "out-of-stock";

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  stockFilter: StockFilter;
  onStockFilterChange: (filter: StockFilter) => void;
}

export function ProductFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  stockFilter,
  onStockFilterChange,
}: Readonly<ProductFiltersProps>) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
      <Input
        placeholder="Search products..."
        className="w-full sm:w-[280px]"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select
          value={stockFilter}
          onValueChange={(value: StockFilter) => onStockFilterChange(value)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Items" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortBy}
          onValueChange={(value: SortOption) => onSortChange(value)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Newest First" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
