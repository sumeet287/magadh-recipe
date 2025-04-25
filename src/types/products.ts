import { Product, ProductCategory } from "./product";

interface ApiProductDimension {
  length?: number;
  width?: number;
  height?: number;
  unit?: "cm" | "inch";
  _id?: string;
}

interface ApiProductWeight {
  value?: number;
  unit?: "g" | "kg";
  _id?: string;
}

interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  productImage: string;
  description?: string;
  price?: number;
  stock?: number;
  images?: string[];
  category?: ProductCategory;
  inStock?: boolean;
  status?: string;
  isFeatured?: boolean;
  materials?: string[];
  tags?: string[];
  dimensions?: ApiProductDimension;
  weight?: ApiProductWeight;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ApiResponse {
  products: ApiProduct[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export type { ApiProduct, ApiResponse, ProductState };
