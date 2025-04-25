"use client";

import { useCallback } from "react";
import { api } from "@/lib/axios";
import { cartEndpoints } from "@/lib/endpoints/cart";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    productImage: string;
    inStock: boolean;
  };
  name: string;
  quantity: number;
  price: number;
  image: string;
  _id: string;
}

interface AddToCartRequest {
  productId: string;
  quantity: number;
}

interface UpdateCartRequest {
  quantity: number;
}

interface CartResponse {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ValidationResponse {
  isValid: boolean;
  invalidItems?: {
    productId: string;
    reason: string;
  }[];
}

export function useCartActions() {
  const {
    addToCart: addToCartContext,
    removeFromCart: removeFromCartContext,
    updateQuantity: updateQuantityContext,
    clearCart: clearCartContext,
    setCart: setCartContext,
  } = useCart();

  // Get cart and update context
  const getCart = useCallback(async () => {
    try {
      const { data } = await api.get<CartResponse>(cartEndpoints.getCart);

      // Transform API items to CartItems format with quantity
      const cartItems = data.items.map((item) => ({
        id: item.product._id,
        name: item.name,
        price: item.price,
        category: "madhubani",
        images: [item.image],
        inStock: item.product.inStock,
        productImage: item.image,
        quantity: item.quantity,
      }));

      setCartContext(cartItems);
      console.log("Cart updated with items:", cartItems); // Debug log
      return data;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Failed to fetch cart");
      throw error;
    }
  }, [setCartContext]);

  // Add to cart
  const addToCart = useCallback(
    async (request: AddToCartRequest) => {
      try {
        console.log("🔍 AddToCart Request:", request);

        const { data } = await api.post<CartResponse>(
          cartEndpoints.addToCart,
          request
        );
        console.log("✅ API Response:", data);

        // Find the added item by matching product._id instead of productId
        const addedItem = data.items.find(
          (item) => item.product._id === request.productId
        );
        console.log("📦 Found Added Item:", addedItem);

        if (addedItem) {
          addToCartContext({
            id: addedItem.product._id, // Use product._id instead of productId
            name: addedItem.name,
            price: addedItem.price,
            category: { label: "Default", name: "default", value: "default" }, // Add default category if needed
            images: [addedItem.image], // Convert single image to array
            inStock: addedItem.product.inStock,
            productImage: addedItem.image,
          });
          toast.success("Added to cart");
        } else {
          console.warn("⚠️ Item not found in cart response");
          toast.error("Failed to update cart");
        }

        return data;
      } catch (error) {
        console.error("❌ Add to Cart Error:", error);
        toast.error("Failed to add item to cart");
        throw error;
      }
    },
    [addToCartContext]
  );

  // Update cart
  const updateCartItem = useCallback(
    async (productId: string, request: UpdateCartRequest) => {
      try {
        // Make API call with new quantity
        const { data } = await api.patch<CartResponse>(
          `${cartEndpoints.updateCart}/${productId}`,
          { quantity: request.quantity }
        );

        // Update context with new quantity
        updateQuantityContext(productId, request.quantity);

        toast.success("Cart updated");
        return data;
      } catch (error) {
        toast.error("Failed to update cart");
        throw error;
      }
    },
    [updateQuantityContext]
  );

  // Remove from cart
  const removeFromCart = useCallback(
    async (productId: string) => {
      try {
        // Call API to remove item
        const { data } = await api.delete<CartResponse>(
          `${cartEndpoints.deleteCart}/${productId}`
        );

        // Update context after successful API call
        removeFromCartContext(productId);

        toast.success("Item removed from cart");
        return data;
      } catch (error) {
        toast.error("Failed to remove item");
        throw error;
      }
    },
    [removeFromCartContext]
  );

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      // Call API to clear cart
      const { data } = await api.delete<CartResponse>(cartEndpoints.clearCart);

      // Update context after successful API call
      clearCartContext();

      toast.success("Cart cleared");
      return data;
    } catch (error) {
      toast.error("Failed to clear cart");
      throw error;
    }
  }, [clearCartContext]);

  // Validate cart
  const validateCart = useCallback(async () => {
    try {
      const { data } = await api.get<ValidationResponse>(
        cartEndpoints.validateCart
      );

      if (!data.isValid) {
        toast.error("Some items in your cart need attention");
      }

      return data;
    } catch (error) {
      toast.error("Failed to validate cart");
      throw error;
    }
  }, []);

  // Error handler utility
  const handleCartError = useCallback((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    toast.error(message);
    return { error: message };
  }, []);

  return {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    validateCart,
    handleCartError,
  };
}
