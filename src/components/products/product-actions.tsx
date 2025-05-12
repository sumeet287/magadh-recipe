"use client";

import { Button } from "@/lib/ui/button/button";
import { Heart, Share2, Facebook, Twitter, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Product } from "@/types/product";

interface ProductActionsProps {
  product: Product;
  isInWishlist: boolean;
  onAddToCart: () => void;
  onWishlistToggle: () => void;
}

export function ProductActions({
  product,
  isInWishlist,
  onAddToCart,
  onWishlistToggle,
}: ProductActionsProps) {
  const handleShare = async (platform: "facebook" | "twitter" | "whatsapp") => {
    const url = window.location.href;
    const text = `Check out this amazing ${product.name} on Bihar Bazaar!`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
    };

    window.open(shareUrls[platform], "_blank");
  };

  return (
    <div className="flex gap-4">
      <Button size="lg" onClick={onAddToCart} disabled={!product.inStock}>
        Add to Cart
      </Button>

      <Button
        size="lg"
        variant="outline"
        onClick={onWishlistToggle}
        className={isInWishlist ? "text-red-500" : ""}
      >
        <Heart className="h-4 w-4 mr-2" />
        {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="lg" variant="outline">
            <Share2 className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Share this product</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="h-4 w-4 mr-2" />
              Share on Facebook
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="h-4 w-4 mr-2" />
              Share on Twitter
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleShare("whatsapp")}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Share on WhatsApp
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
