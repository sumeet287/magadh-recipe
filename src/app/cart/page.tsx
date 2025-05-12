"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/lib/ui/button/button";
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
import { Typography } from "@/lib/ui/typography/typography";

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
        <Typography
          variant="h1"
          weight="bold"
          seoTitle="Your Cart"
          className="text-4xl text-[#D84315]"
        >
          Your Cart
        </Typography>
      </div>

      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-orange-50 rounded-lg border border-orange-100"
        >
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-[#D84315]" />
          </div>
          <Typography
            variant="h2"
            weight="bold"
            className="text-2xl font-semibold mb-4 text-[#D84315]"
          >
            Your cart is empty
          </Typography>
          <Typography variant="p" className="text-muted-foreground mb-6">
            Add some beautiful handcrafted items to your cart
          </Typography>
          <Button asChild className="bg-[#D84315] hover:bg-[#D84315]/90">
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
                  className="rounded-lg border border-orange-100 shadow-sm bg-orange-50/50 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-md overflow-hidden flex-shrink-0 border-2 border-orange-200">
                        <Image
                          src={item.productImage}
                          alt={item.name || "Unnamed Product"}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-[#D84315] hover:bg-[#D84315]/90">
                          Handcrafted
                        </Badge>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <Typography
                              variant="h3"
                              weight="semibold"
                              className="text-lg text-[#D84315]"
                            >
                              {item.name || "Unnamed Product"}
                            </Typography>
                            <Typography
                              variant="p"
                              className="text-muted-foreground text-sm"
                            >
                              {item.category || "Uncategorized"}
                            </Typography>
                            <Typography variant="p" className="text-sm mt-1">
                              <Typography
                                variant="span"
                                weight="medium"
                                className="text-[#D84315]"
                              >
                                Artisan:
                              </Typography>{" "}
                              {item.artistName || "Unknown Artisan"}
                            </Typography>
                            <Typography variant="p" className="text-sm mt-1">
                              <Typography
                                variant="span"
                                weight="medium"
                                className="text-[#D84315]"
                              >
                                Material:
                              </Typography>{" "}
                              {item.materials?.join(", ") || "Not specified"}
                            </Typography>
                          </div>
                          <div className="text-right">
                            <Typography
                              variant="p"
                              className="font-semibold text-[#D84315]"
                            >
                              ₹{item.price.toLocaleString("en-IN")}
                            </Typography>
                            <Typography
                              variant="p"
                              className="text-sm text-muted-foreground"
                            >
                              ₹{item.price.toLocaleString("en-IN")} each
                            </Typography>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center border border-orange-200 rounded-md bg-white">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer p-2 hover:bg-orange-50 transition-colors"
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
                              className="cursor-pointer p-2 hover:bg-orange-50 transition-colors"
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
                            className="text-[#D84315] hover:text-[#D84315]/80 transition-colors flex items-center gap-1 cursor-pointer"
                            aria-label="Remove item"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={removingItemId === item.id}
                          >
                            {removingItemId === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            <Typography
                              variant="small"
                              as="span"
                              className="hidden sm:inline"
                            >
                              Remove
                            </Typography>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Related items - displayed once */}
              <div className="rounded-lg border border-orange-100 shadow-sm bg-orange-50/50 p-6">
                <Typography
                  variant="h3"
                  weight="bold"
                  className="mb-4 text-[#D84315]"
                >
                  You might also like
                </Typography>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item, index) => (
                    <div key={item} className="group cursor-pointer">
                      <div className="relative aspect-square rounded-md overflow-hidden mb-2 border-2 border-orange-200">
                        <Image
                          src={`https://picsum.photos/300?random=${index}`}
                          alt={`Related item ${item}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <Typography
                        variant="h4"
                        weight="medium"
                        className="text-sm font-medium truncate text-[#D84315]"
                      >
                        Handcrafted Item {item}
                      </Typography>
                      <Typography
                        variant="p"
                        className="text-sm text-muted-foreground"
                      >
                        ₹{599 + item * 50}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-orange-100 shadow-sm bg-orange-50/50 sticky top-18">
                <div className="p-6">
                  <Typography
                    variant="h2"
                    weight="bold"
                    className="text-xl font-semibold mb-4 text-[#D84315]"
                  >
                    Order Summary
                  </Typography>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Typography
                        variant="small"
                        as="span"
                        className="text-muted-foreground"
                      >
                        Subtotal
                      </Typography>
                      <Typography
                        variant="small"
                        as="span"
                        className="font-medium"
                      >
                        ₹{total ? total.toLocaleString("en-IN") : 0}
                      </Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography
                        variant="small"
                        as="span"
                        className="text-muted-foreground"
                      >
                        Shipping
                      </Typography>
                      <Typography
                        variant="small"
                        as="span"
                        className="font-medium"
                      >
                        {shipping === 0
                          ? "Free"
                          : `₹${
                              shipping ? shipping.toLocaleString("en-IN") : 0
                            }`}
                      </Typography>
                    </div>

                    {/* Coupon code */}
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Coupon code"
                          className="flex-1 border-orange-200 focus:border-[#D84315]"
                        />
                        <Button
                          variant="outline"
                          className="border-[#D84315] text-[#D84315] hover:bg-orange-50"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>

                    <Separator className="bg-orange-200" />

                    <div className="flex justify-between font-semibold text-lg text-[#D84315]">
                      <Typography variant="small" as="span">
                        Total
                      </Typography>
                      <Typography variant="small" as="span">
                        ₹{finalTotal ? finalTotal.toLocaleString("en-IN") : 0}
                      </Typography>
                    </div>

                    <Typography
                      variant="p"
                      className="text-xs text-muted-foreground"
                    >
                      Taxes and discounts calculated at checkout
                    </Typography>

                    <Button
                      className="w-full bg-[#D84315] hover:bg-[#D84315]/90"
                      size="lg"
                      asChild
                    >
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>

                    <div className="flex justify-center">
                      <button
                        className="text-sm text-muted-foreground hover:text-[#D84315] transition-colors"
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
                      <Typography
                        variant="p"
                        className="text-xs text-center text-muted-foreground mb-2"
                      >
                        Secure payment methods
                      </Typography>
                      <div className="flex justify-center gap-2">
                        {["Visa", "Mastercard", "PayPal", "UPI"].map(
                          (method) => (
                            <div
                              key={method}
                              className="px-2 py-1 border border-orange-200 rounded text-xs bg-white"
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
          <div className="mt-12 rounded-lg border border-orange-100 shadow-sm bg-orange-50/50 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <Typography
                  variant="h3"
                  weight="semibold"
                  className="font-semibold text-[#D84315]"
                >
                  Need help with your order?
                </Typography>
                <Typography
                  variant="p"
                  className="text-sm text-muted-foreground"
                >
                  Our customer support team is here to help
                </Typography>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-[#D84315] text-[#D84315] hover:bg-orange-50"
                >
                  Chat with Us
                </Button>
                <Button
                  variant="secondary"
                  className="bg-[#D84315] hover:bg-[#D84315]/90 text-white"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
