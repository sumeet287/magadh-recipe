"use client";

import { useCart } from "@/contexts/cart-context";
import { ProductCard } from "@/components/products/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { Button } from "@/lib/ui/button/button";
import { Heart, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Check out my wishlist on Bihar Bazaar! ${url}`;

    try {
      await navigator.share({
        title: "My Bihar Bazaar Wishlist",
        text,
        url,
      });
    } catch (error) {
      // Fallback for browsers that don't support native share
      console.log("Share failed:", error);
      navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    }
  };

  const renderWishlist = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))}
        </div>
      );
    }

    if (wishlist.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              images={product.images}
              category={product.category}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-16">
        <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-8">
          Start adding items you love to your wishlist
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={clearWishlist}
            disabled={wishlist.length === 0}
          >
            Clear Wishlist
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Wishlist
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {renderWishlist()}
    </main>
  );
}
