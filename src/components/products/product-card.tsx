"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/lib/ui/button/button";
import { Heart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import { ProductCardProps } from "@/utils/products.utils";
import { motion } from "framer-motion";
import { scaleUp } from "./product-animations";
import { useCartActions } from "@/hooks/useCartActions";

export function ProductCard({
  id,
  name,
  price,
  productImage,
  category,
}: ProductCardProps) {
  const { addToCart: addToCartAction } = useCartActions();
  const { addToWishlist, wishlist, removeFromWishlist } = useCart();
  const isInWishlist = wishlist.some((item) => item.id === id);

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
        name,
        price,
        productImage,
        category,
        images: [productImage],
      });
      toast.success("Added to wishlist!");
    }
  };

  return (
    <motion.div
      variants={scaleUp}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="group overflow-hidden">
        <CardHeader className="p-0">
          <Link href={`/products/${id}`}>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={productImage}
                alt={name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="object-cover transition-transform group-hover:scale-105"></div>
            </div>
          </Link>
        </CardHeader>
        <CardContent className="p-4">
          <Link href={`/products/${id}`}>
            <h3 className="font-medium text-lg truncate hover:text-orange-600">
              {name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">{category}</p>
          <p className="text-lg font-semibold mt-2">
            ₹{price.toLocaleString("en-IN")}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button className="w-4/5" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleWishlist}
            className={isInWishlist ? "text-red-500" : ""}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
