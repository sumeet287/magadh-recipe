"use client";

import Image from "next/image";
import { Heart, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useCartActions } from "@/hooks/useCartActions";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

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
  const { addToCart: addToCartAction } = useCartActions();
  const { addToWishlist, wishlist, removeFromWishlist } = useCart();
  const isInWishlist = wishlist.some((item) => item.id === id);
  const { token } = useAuth();
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

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        {token && (
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm cursor-pointer"
              onClick={handleWishlist}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex gap-2">
          <span className="inline-block bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
          {hasDiscount && (
            <Badge variant="destructive" className="bg-orange-600">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-500">By {artist}</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-orange-600">
              ₹
              {(hasDiscount ? discountedPrice : originalPrice).toLocaleString()}
            </p>
            {hasDiscount && (
              <p className="text-sm text-gray-500 line-through">
                ₹{originalPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Button
          className="w-full gap-2 bg-orange-600 hover:bg-orange-700 cursor-pointer"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2 border-orange-600 text-orange-600 hover:bg-orange-50 cursor-pointer"
        >
          <CreditCard className="h-4 w-4" />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
