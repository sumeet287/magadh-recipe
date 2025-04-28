"use client";

import { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { useProduct } from "@/hooks/useProduct";
import type { Product } from "@/types/product";
import { ProductTabs } from "@/components/products/product-tabs";
import { ProductDetailsSkeleton } from "@/components/products/product-details-skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeIn,
  slideUp,
  stagger,
  scaleUp,
  MotionCard,
  MotionImage,
  MotionBadge,
} from "@/components/products/product-animations";
import { Heart, Share2, Star, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ClientProductPage({ id }: { id: string }) {
  const { addToCart, addToWishlist, wishlist, removeFromWishlist } = useCart();
  const { fetchProductById } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  console.log(quantity);
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

  // Helper for star rating (static for now, can be dynamic)
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-orange-500 fill-orange-500" : "text-gray-300"
          }`}
          fill={i < rating ? "#f97316" : "none"}
        />
      ))}
    </div>
  );

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

  const renderRelatedProducts = () => {
    if (isLoading) {
      return Array(4)
        .fill(0)
        .map((_, i) => <ProductCardSkeleton key={`skeleton-${i}`} />);
    }

    if (relatedProducts.length > 0) {
      return relatedProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          productImage={product.productImage}
          category={product.category}
        />
      ));
    }

    return (
      <div className="col-span-full text-center py-8">
        <p className="text-muted-foreground">No related products found</p>
      </div>
    );
  };
  console.log(product);

  // Quantity limit logic
  const maxQuantity = product.totalItems || 4; // fallback to 4 if not present
  console.log(maxQuantity);

  return (
    <AnimatePresence>
      <motion.main
        className="container mx-auto px-4 py-16"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg p-6 md:p-10"
          variants={stagger}
        >
          {/* Product Image Carousel */}
          <MotionCard variants={scaleUp} className="bg-orange-50">
            <CardContent className="p-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image: string, index: number) => (
                    <CarouselItem key={`${id}-image-${index + 1}`}>
                      <div className="relative aspect-square w-full">
                        <MotionImage
                          src={image || product.productImage}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                          priority={index === 0}
                          variants={fadeIn}
                          transition={{ duration: 0.3 }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 justify-center">
                {product.images.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img || product.productImage}
                    alt="thumb"
                    className="w-14 h-14 object-cover rounded-md border hover:border-orange-500 cursor-pointer"
                  />
                ))}
              </div>
            </CardContent>
          </MotionCard>

          {/* Product Details */}
          <motion.div variants={slideUp} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MotionBadge
                variant="secondary"
                variants={fadeIn}
                className="capitalize"
              >
                {product?.category?.label ||
                  product?.category?.name ||
                  product?.category}
              </MotionBadge>
              <MotionBadge
                variants={fadeIn}
                variant={product.inStock ? "default" : "destructive"}
                className={
                  product.inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              >
                {product.inStock ? `In Stock` : "Out of Stock"}
              </MotionBadge>
              {/* Tags */}
              {product.tags &&
                product.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    className="bg-orange-100 text-orange-700 ml-1"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>

            <motion.h1 className="text-3xl font-bold mb-2" variants={slideUp}>
              {product.name}
            </motion.h1>

            {(product.artistName || product.artisanId) && (
              <div className="text-md text-orange-700 font-medium mb-2">
                By {product.artistName || product.artisanId}
              </div>
            )}

            {/* Star Rating & Reviews */}
            <div className="flex items-center gap-2 mb-2">
              {renderStars(4)}
              <span className="text-sm text-gray-500">12 reviews</span>
            </div>

            {/* Price, Discount, Original Price */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl font-bold text-orange-600">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </div>

            <Separator className="my-4" />

            {/* Quantity Selector & Actions */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 text-lg font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (quantity < maxQuantity) {
                      setQuantity((q) => q + 1);
                    } else {
                      toast.warning(
                        `You can only add up to ${maxQuantity} items.`
                      );
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200"
                onClick={handleAddToCart}
                disabled={!product.inStock || quantity > maxQuantity}
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`border-orange-600 text-orange-600 hover:bg-orange-50 flex items-center gap-2 ${
                  isInWishlist ? "bg-orange-50" : ""
                }`}
                onClick={handleWishlist}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlist ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isInWishlist ? "In Wishlist" : "Wishlist"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                onClick={() =>
                  navigator.share
                    ? navigator.share({
                        title: product.name,
                        url: window.location.href,
                      })
                    : toast.info("Share feature not supported")
                }
              >
                <Share2 className="h-5 w-5" /> Share
              </Button>
            </div>

            <Separator className="my-4" />

            <motion.div variants={fadeIn}>
              <ProductTabs product={product} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          className="mt-16 bg-orange-50 rounded-2xl p-8"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h2
            className="text-2xl font-bold mb-8 text-orange-700"
            variants={slideUp}
          >
            You may also like
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={stagger}
          >
            {renderRelatedProducts()}
          </motion.div>
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
}
