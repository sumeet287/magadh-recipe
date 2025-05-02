"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCartActions } from "@/hooks/useCartActions";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
  const { cart } = useCart();
  const {
    removeFromCart,
    updateCartItem,
    clearCart: clearCartAction,
  } = useCartActions();
  const [isLoading, setIsLoading] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 5000 ? 0 : 200;
  const finalTotal = total + shipping;

  const handleClearCart = async () => {
    try {
      setIsLoading(true);
      await clearCartAction();
      toast.success("Cart cleared successfully");
    } catch (error: unknown) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      setRemovingItemId(id);
      await removeFromCart(id);
    } catch (error: unknown) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    try {
      await updateCartItem(id, { quantity: newQuantity });
    } catch (error: unknown) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold">Your Cart</h1>
      </div>

      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products to your cart to see them here
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border shadow-sm bg-card"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.productImage}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600">
                          Handcrafted
                        </Badge>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {item.category}
                            </p>
                            <p className="text-sm mt-1">
                              <span className="font-medium">Artisan:</span>{" "}
                              {item.artistName}
                            </p>
                            <p className="text-sm mt-1">
                              <span className="font-medium">Material:</span>
                              will update
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ₹{item.price.toLocaleString("en-IN")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ₹{item.price.toLocaleString("en-IN")} each
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer p-2 hover:bg-muted transition-colors"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 text-center min-w-[40px] font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer p-2 hover:bg-muted transition-colors"
                              aria-label="Increase quantity"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/80 transition-colors flex items-center gap-1 cursor-pointer"
                            aria-label="Remove item"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={removingItemId === item.id}
                          >
                            {removingItemId === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Related items - displayed once */}
              <div className="rounded-lg border shadow-sm bg-card p-6">
                <h3 className="font-semibold mb-4">You might also like</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item, index) => (
                    <div key={item} className="group cursor-pointer">
                      <div className="relative aspect-square rounded-md overflow-hidden mb-2">
                        <Image
                          src={`https://picsum.photos/300?random=${index}`}
                          alt={`Related item ${item}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-sm font-medium truncate">
                        Handcrafted Item {item}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ₹{599 + item * 50}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border shadow-sm bg-card sticky top-18">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0
                          ? "Free"
                          : `₹${shipping.toLocaleString("en-IN")}`}
                      </span>
                    </div>

                    {/* Coupon code */}
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <Input placeholder="Coupon code" className="flex-1" />
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Taxes and discounts calculated at checkout
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      variant={"default"}
                      asChild
                    >
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>

                    <div className="flex justify-center">
                      <button
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                        onClick={handleClearCart}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Clearing...
                          </>
                        ) : (
                          "Clear Cart"
                        )}
                      </button>
                    </div>

                    {/* Payment methods */}
                    <div className="pt-4">
                      <div className="text-xs text-center text-muted-foreground mb-2">
                        Secure payment methods
                      </div>
                      <div className="flex justify-center gap-2">
                        {["Visa", "Mastercard", "PayPal", "UPI"].map(
                          (method) => (
                            <div
                              key={method}
                              className="px-2 py-1 border rounded text-xs bg-muted"
                            >
                              {method}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer support */}
          <div className="mt-12 rounded-lg border shadow-sm bg-card p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Need help with your order?</h3>
                <p className="text-sm text-muted-foreground">
                  Our customer support team is here to help
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Chat with Us</Button>
                <Button variant="secondary">Contact Support</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
