import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type StockFilter = "all" | "in-stock" | "out-of-stock";

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: "newest" | "price-low" | "price-high";
  onSortChange: (sort: "newest" | "price-low" | "price-high") => void;
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
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
      <Input
        placeholder="Search products..."
        className="w-full sm:w-[280px] hover:border-orange-200 focus:border-orange-300 transition-colors"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select
          value={stockFilter}
          onValueChange={(value: StockFilter) => onStockFilterChange(value)}
        >
          <SelectTrigger className="w-[130px] hover:border-orange-200 active:scale-[0.98] transition-all">
            <SelectValue placeholder="All Items" />
          </SelectTrigger>
          <SelectContent align="end" className="w-[130px]">
            <SelectItem
              value="all"
              className="cursor-pointer hover:bg-orange-50"
            >
              All Items
            </SelectItem>
            <SelectItem
              value="in-stock"
              className="cursor-pointer hover:bg-orange-50"
            >
              In Stock
            </SelectItem>
            <SelectItem
              value="out-of-stock"
              className="cursor-pointer hover:bg-orange-50"
            >
              Out of Stock
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortBy}
          onValueChange={(value: "newest" | "price-low" | "price-high") =>
            onSortChange(value)
          }
        >
          <SelectTrigger className="w-[130px] hover:border-orange-200 active:scale-[0.98] transition-all">
            <SelectValue placeholder="Newest First" />
          </SelectTrigger>
          <SelectContent align="end" className="w-[130px]">
            <SelectItem
              value="newest"
              className="cursor-pointer hover:bg-orange-50"
            >
              Newest First
            </SelectItem>
            <SelectItem
              value="price-low"
              className="cursor-pointer hover:bg-orange-50"
            >
              Price: Low to High
            </SelectItem>
            <SelectItem
              value="price-high"
              className="cursor-pointer hover:bg-orange-50"
            >
              Price: High to Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
