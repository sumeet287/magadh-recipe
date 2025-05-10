export type ProductCategory =
  | "madhubani"
  | "tikuli"
  | "wood"
  | "glass"
  | "bamboo"
  | "sujani"
  | "sikki"
  | "lac";

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: ProductCategory;
  slug: string;
  productImage: string;
  images: string[];
  inStock?: boolean;
  artisanId?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: "cm" | "inch";
    _id?: string;
  };
  weight?: {
    value: number;
    unit: "g" | "kg";
    _id?: string;
  };
  materials?: string[];
  tags?: string[];
  artistName?: string;
  createdAt?: string;
  updatedAt?: string;
  totalItems?: number;
  __v?: number;
}

export interface ProductCategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
}

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "newest" | "price-low" | "price-high";
  search?: string;
}

export interface ProductPagination {
  page: number;
  limit: number;
  total: number;
}

export interface ProductResponse {
  products: Product[];
  pagination: ProductPagination;
}
