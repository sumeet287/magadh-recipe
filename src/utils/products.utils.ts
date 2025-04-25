export type SortOption = "newest" | "price-low" | "price-high";
export type StockFilter = "all" | "in-stock" | "out-of-stock";

export interface FilterState {
  searchQuery: string;
  sortBy: SortOption;
  stockFilter: StockFilter;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

export interface URLParamUpdates {
  query?: string;
  sort?: string;
  stock?: string;
  page?: string;
  size?: string;
}

export const isSortOption = (value: string | null): value is SortOption => {
  return ["newest", "price-low", "price-high"].includes(value as string);
};

export const isStockFilter = (value: string | null): value is StockFilter => {
  return ["all", "in-stock", "out-of-stock"].includes(value as string);
};
