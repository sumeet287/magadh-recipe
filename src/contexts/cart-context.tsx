"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/types/product";

type CartItem = Omit<Product, "createdAt" | "updatedAt" | "slug"> & {
  quantity: number;
};
type WishlistItem = Omit<Product, "createdAt" | "updatedAt" | "slug">;

interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (
    product: Omit<Product, "createdAt" | "updatedAt" | "slug">
  ) => void;
  removeFromCart: (productId: string) => void;
  addToWishlist: (
    product: Omit<Product, "createdAt" | "updatedAt" | "slug">
  ) => void;
  removeFromWishlist: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  clearWishlist: () => void;
  setCart: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToCart = useCallback(
    (product: Omit<Product, "createdAt" | "updatedAt" | "slug">) => {
      console.log("🛒 Cart Context - Adding Product:", product);
      console.log("🛒 Current Cart State:", cart);

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        console.log("🔍 Existing Item Found:", existingItem);

        if (existingItem) {
          console.log("📝 Updating existing item quantity");
          const newCart = prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          console.log("✨ New Cart State:", newCart);
          return newCart;
        }

        console.log("➕ Adding new item to cart");
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        console.log("✨ New Cart State:", newCart);
        return newCart;
      });
    },
    [cart]
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const addToWishlist = useCallback(
    (product: Omit<Product, "createdAt" | "updatedAt" | "slug">) => {
      setWishlist((prevWishlist) => {
        if (prevWishlist.some((item) => item.id === product.id)) {
          return prevWishlist;
        }
        return [...prevWishlist, product];
      });
    },
    []
  );

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        updateQuantity,
        clearCart,
        clearWishlist,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
