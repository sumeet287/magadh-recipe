"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import { products } from "@/data/products";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { useProduct } from "@/hooks/useProduct";
import type { Product } from "@/types/product";
import { ProductTabs } from "@/components/products/product-tabs";
import { ProductDetailsSkeleton } from "@/components/products/product-details-skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/components/products/product-animations";
import {
  Heart,
  Share2,
  Star,
  Minus,
  Plus,
  Package,
  Truck,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/lib/ui/button/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useCartActions } from "@/hooks/useCartActions";
import { useRouter } from "next/navigation";
export function ClientProductPage({ id }: { id: string }) {
  const { addToCart, addToWishlist, wishlist, removeFromWishlist } = useCart();
  const {} = useCartActions();
  const { fetchProductById } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart: addToCartAction, updateCartItem } = useCartActions();
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await fetchProductById(id);
        if (result?.data) {
          setProduct(result.data);
          console.log(result.data);
        } else {
          setError(result?.error || "Failed to fetch product");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id, fetchProductById]);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!product)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );

  const isInWishlist = wishlist.some((item) => item.id === id);

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist!");
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

  const renderRelatedProducts = () => {
    if (isLoading) {
      return Array(4)
        .fill(0)
        .map((_, i) => <ProductCardSkeleton key={`skeleton-${i}`} />);
    }

    if (relatedProducts.length > 0) {
      return (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt={`Related product ${item}`}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">
                    Handcrafted Bamboo Basket
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold">₹599</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm ml-1">4.5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="col-span-full text-center py-8">
        <p className="text-muted-foreground">No related products found</p>
      </div>
    );
  };

  // Quantity limit logic
  const maxQuantity = product.totalItems || 4; // fallback to 4 if not present

  return (
    <AnimatePresence>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border bg-background">
              <Image
                src={product.productImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
                  onClick={handleWishlist}
                >
                  <Heart
                    className={`h-4 w-4 text-gray-700 ${
                      isInWishlist ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
                  onClick={() =>
                    navigator.share
                      ? navigator.share({
                          title: product.name,
                          url: window.location.href,
                        })
                      : toast.info("Share feature not supported")
                  }
                >
                  <Share2 className="h-4 w-4 text-gray-700" />
                  <span className="sr-only">Share product</span>
                </Button>
              </div>
            </div>

            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 py-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {product?.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant={tag === "In Stock" ? "default" : "outline"}
                    className={
                      tag === "In Stock"
                        ? "bg-green-600 hover:bg-green-700"
                        : ""
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                {product.name}
              </h1>

              {/* <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(Math.floor(product.rating))].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-500 text-amber-500"
                  />
                ))}
                {product.rating % 1 > 0 && (
                  <StarHalf className="h-5 w-5 fill-amber-500 text-amber-500" />
                )}
                {[...Array(5 - Math.ceil(product.rating))].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-muted-foreground" />
                ))}
              </div>
              <span className="text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div> */}

              <Link
                href={`/artisans/${product?.artistName
                  ?.replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className="text-primary hover:underline inline-block mt-1"
              >
                By {product.artistName}
              </Link>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-600">
                ₹{product.price}
              </span>
              <span className="text-muted-foreground line-through">
                ₹{Math.round(product.price * 1.2)}
              </span>
              <Badge
                variant="outline"
                className="ml-2 bg-amber-50 text-amber-700 hover:bg-amber-50"
              >
                Save 20%
              </Badge>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-none cursor-pointer"
                  onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 border-y px-4 py-2 text-center">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-none cursor-pointer"
                  onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                  disabled={quantity >= maxQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="default">
                  <Link href="/crafts">Explore All Crafts</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/artisans">Meet The Artisans</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="default"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || quantity > maxQuantity}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="default"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>

              <div className="col-span-2 flex items-center justify-start text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Package className="mr-1 h-4 w-4" />
                  In stock
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <Card>
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="bg-amber-50 p-2 rounded-full">
                    <Truck className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      On orders over ₹999
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="bg-amber-50 p-2 rounded-full">
                    <Package className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Handcrafted</p>
                    <p className="text-sm text-muted-foreground">
                      By local artisans
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <motion.div variants={fadeIn}>
              <ProductTabs product={product} />
            </motion.div>
          </div>
        </div>
        {/* Related Products */}
        {renderRelatedProducts()}
      </div>
    </AnimatePresence>
  );
}
