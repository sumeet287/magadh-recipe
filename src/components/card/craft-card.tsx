"use client";

import Image from "next/image";
import { Heart, ShoppingCart, CreditCard, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useCartActions } from "@/hooks/useCartActions";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CraftCardProps {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice?: number;
  image: string;
  category: string;
  artist?: string;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  onAddToWishlist?: () => void;
  onClick?: () => void;
}

export function CraftCard({
  id,
  title,
  originalPrice,
  discountedPrice,
  image,
  artist,
  category,
}: CraftCardProps) {
  const router = useRouter();
  const { addToCart: addToCartAction } = useCartActions();
  const { addToWishlist, wishlist, removeFromWishlist } = useCart();
  const isInWishlist = wishlist.some((item) => item.id === id);
  const hasDiscount =
    discountedPrice !== undefined && discountedPrice < originalPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - discountedPrice!) / originalPrice) * 100)
    : 0;

  console.log(id);

  const handleAddToCart = async () => {
    try {
      console.log("🎯 Product Card - Adding to Cart:", {
        productId: id,
        quantity: 1,
      });

      const result = await addToCartAction({
        productId: id,
        quantity: 1,
      });
      console.log("✅ Add to Cart Result:", result);
    } catch (error) {
      console.error("❌ Product Card - Add to Cart Error:", error);
    }
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id,
        name: title,
        price: originalPrice,
        productImage: image,
        category: category,
        images: [image],
      });
      toast.success("Added to wishlist!");
    }
  };

  // Share functionality
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/products/${id}`;
    const shareText = `Check out this product: ${title}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl, text: shareText });
      } catch {
        // User cancelled or error
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied!");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  const handleBuyNow = async () => {
    try {
      const result = await addToCartAction({
        productId: id,
        quantity: 1,
      });
      if (result) {
        console.log("✅ Add to Cart Result:", result);
        router.push(`/checkout?productId=${id}`);
      }
    } catch (error) {
      console.error("❌ Add to Cart Error:", error);
    }
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
      <CardHeader className="p-0 relative">
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/products/${id}`}>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
          {
            <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/80 backdrop-blur-sm cursor-pointer"
                onClick={handleWishlist}
              >
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/80 backdrop-blur-sm cursor-pointer"
                onClick={handleShare}
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          }
          <div className="absolute bottom-2 left-2 flex gap-1 sm:gap-2">
            <span className="inline-block bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
              {category}
            </span>
            {hasDiscount && (
              <Badge variant="destructive" className="bg-orange-600 text-xs">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium line-clamp-2 text-sm sm:text-base">
              {title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">By {artist}</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-orange-600 text-base sm:text-lg">
              ₹
              {(hasDiscount ? discountedPrice : originalPrice).toLocaleString()}
            </p>
            {hasDiscount && (
              <p className="text-xs sm:text-sm text-gray-500 line-through">
                ₹{originalPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button
          className="w-full gap-1 bg-orange-600 hover:bg-orange-700 cursor-pointer text-xs sm:text-sm"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          className="w-full gap-1 border-orange-600 text-orange-600 hover:bg-orange-50 cursor-pointer text-xs sm:text-sm"
          onClick={handleBuyNow}
        >
          <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
