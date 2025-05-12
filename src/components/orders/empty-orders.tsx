"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Package, ArrowRight } from "lucide-react";
import { Button } from "@/lib/ui/button/button";

interface EmptyOrdersProps {
  hasSearchQuery: boolean;
}

export function EmptyOrders({ hasSearchQuery }: EmptyOrdersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4 border border-dashed rounded-lg bg-muted/10"
    >
      <div className="mb-6 p-6 bg-amber-600/10 rounded-full">
        {hasSearchQuery ? (
          <Package className="h-16 w-16 text-amber-600" />
        ) : (
          <ShoppingBag className="h-16 w-16 text-amber-600" />
        )}
      </div>
      <h3 className="text-2xl font-semibold mb-2">
        {hasSearchQuery
          ? "No matching orders found"
          : "Your order history is empty"}
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        {hasSearchQuery
          ? "Try adjusting your search or filter criteria to find what you're looking for."
          : "Discover Bihar's handcrafted treasures and start your collection today."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/products">
            Explore Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        {hasSearchQuery && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = "/orders")}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </motion.div>
  );
}
