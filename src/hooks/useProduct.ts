"use client";

import { useState, useCallback } from "react";
import type { Product } from "@/types/product";
import { productsEndpoints } from "@/lib/endpoints/products";
import { api } from "@/lib/axios";
import { ApiProduct, ApiResponse, ProductState } from "@/types/products";
import { StockFilter } from "@/utils/products.utils";

/**
 * useProduct Hook
 *
 * Ye hook products ko manage karne ke liye use hota hai. Isme mainly 3 cheezein hain:
 *
 * 1. State Management:
 *    - products: All products list
 *    - selectedProduct: Currently selected product
 *    - isLoading: Loading status
 *    - error: Error messages
 *    - pagination: Page related info (current page, limit, total)
 *
 * 2. Data Transformation:
 *    - transformProduct function API se aaye raw data ko UI format mein convert karta hai
 *    - Default values set karta hai missing fields ke liye
 *
 * 3. API Integration:
 *    - fetchFilteredAndSortedProducts: Main function jo API se products fetch karta hai
 *    - Filtering, sorting aur pagination support karta hai
 *    - Error handling bhi manage karta hai
 *
 * Usage Example:
 * const { products, isLoading, error, fetchFilteredAndSortedProducts } = useProduct();
 *
 * await fetchFilteredAndSortedProducts(1, 10, "newest", "all");
 */

export function useProduct() {
  const [productState, setProductState] = useState<ProductState>({
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
  });

  const transformProduct = useCallback((apiProduct: ApiProduct): Product => {
    return {
      id: apiProduct._id,
      name: apiProduct.name,
      description: apiProduct.description || "",
      price: apiProduct.price || 0,
      images: apiProduct.images || [],
      slug: apiProduct.slug || "",
      productImage: apiProduct.productImage || "",
      category: apiProduct.category || "madhubani",
      inStock: apiProduct.inStock ?? true,
      materials: apiProduct.materials || [],
      tags: apiProduct.tags || [],
      artistName: apiProduct.artistName || "",
      dimensions: {
        length: apiProduct.dimensions?.length || 0,
        width: apiProduct.dimensions?.width || 0,
        height: apiProduct.dimensions?.height || 0,
        unit: apiProduct.dimensions?.unit || "cm",
      },
      totalItems: apiProduct.totalItems || 0,
      weight: {
        value: apiProduct.weight?.value || 0,
        unit: apiProduct.weight?.unit || "g",
      },
      createdAt: apiProduct.createdAt || new Date().toISOString(),
      updatedAt: apiProduct.updatedAt || new Date().toISOString(),
    };
  }, []);

  const fetchFilteredAndSortedProducts = useCallback(
    async (
      page: number,
      pageSize: number,
      sortBy: string,
      filterBy: StockFilter
    ) => {
      try {
        setProductState((prev) => ({ ...prev, isLoading: true, error: null }));

        let stockParam = "";
        if (filterBy === "in-stock") {
          stockParam = "&inStock=true";
        } else if (filterBy === "out-of-stock") {
          stockParam = "&inStock=false";
        }

        const url = `${productsEndpoints.getProducts}?page=${page}&limit=${pageSize}&sortBy=${sortBy}${stockParam}`;

        const response = await api.get<ApiResponse>(url);
        const data = response.data;

        if (data) {
          const transformedProducts = data.products.map(transformProduct);
          setProductState((prev) => ({
            ...prev,
            products: transformedProducts,
            pagination: data.pagination || {
              page,
              limit: pageSize,
              total: transformedProducts.length,
            },
          }));
        }
      } catch (err) {
        setProductState((prev) => ({
          ...prev,
          error:
            err instanceof Error ? err.message : "Failed to fetch products",
        }));
      } finally {
        setProductState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [transformProduct]
  );

  const fetchProductBySlug = useCallback(
    async (slug: string) => {
      try {
        setProductState((prev) => ({ ...prev, isLoading: true, error: null }));

        const url = `${productsEndpoints.getProducts}/slug/${slug}`;
        const response = await api.get<ApiProduct>(url);
        const data = response.data;

        if (data) {
          const transformedProduct = transformProduct(data);
          setProductState((prev) => ({
            ...prev,
            selectedProduct: transformedProduct,
          }));
        }
      } catch (err) {
        setProductState((prev) => ({
          ...prev,
          error:
            err instanceof Error
              ? err.message
              : "Failed to fetch product by slug",
        }));
      } finally {
        setProductState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [transformProduct]
  );

  const fetchProductById = useCallback(
    async (productId: string) => {
      try {
        setProductState((prev) => ({ ...prev, isLoading: true, error: null }));

        const url = `${productsEndpoints.getProducts}/id/${productId}`;

        const response = await api.get<ApiProduct>(url);
        const data = response.data;

        if (data) {
          const transformedProduct = transformProduct(data);
          setProductState((prev) => ({
            ...prev,
            selectedProduct: transformedProduct,
          }));
          return { data: transformedProduct, error: null };
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to fetch product";
        setProductState((prev) => ({
          ...prev,
          error: errorMsg,
        }));
        return { data: null, error: errorMsg };
      } finally {
        setProductState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [transformProduct]
  );

  return {
    fetchFilteredAndSortedProducts,
    fetchProductBySlug,
    fetchProductById,
    products: productState?.products,
    selectedProduct: productState?.selectedProduct,
    isLoading: productState?.isLoading,
    error: productState?.error,
    pagination: productState?.pagination,
  };
}
