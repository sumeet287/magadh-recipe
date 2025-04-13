"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentSummary } from "@/components/checkout/payment-summary";
import { PaymentOptions } from "@/components/checkout/payment-options";

export default function CheckoutPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products to your cart to proceed with checkout
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cart">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <OrderSummary />
        </div>

        <div>
          <PaymentSummary />
          <PaymentOptions />
        </div>
      </div>
    </main>
  );
}
