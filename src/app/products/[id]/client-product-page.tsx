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
import { ProductActions } from "@/components/products/product-actions";
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

export function ClientProductPage({ id }: { id: string }) {
  const { addToCart, addToWishlist, wishlist, removeFromWishlist } = useCart();
  const { fetchProductById } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await fetchProductById(id);
        if (result?.data) {
          setProduct(result.data);
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={stagger}
        >
          {/* Product Image Carousel */}
          <MotionCard variants={scaleUp}>
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
            </CardContent>
          </MotionCard>

          {/* Product Details */}
          <motion.div variants={slideUp}>
            <motion.div
              className="flex items-center gap-2 mb-2"
              variants={stagger}
            >
              <MotionBadge variant="secondary" variants={fadeIn}>
                {product?.category?.label || product?.category?.name}
              </MotionBadge>
              <MotionBadge
                variants={fadeIn}
                variant={product.inStock ? "default" : "destructive"}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </MotionBadge>
            </motion.div>

            <motion.h1 className="text-3xl font-bold mb-2" variants={slideUp}>
              {product.name}
            </motion.h1>

            <motion.p
              className="text-2xl font-semibold mb-4"
              variants={slideUp}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </motion.p>

            <Separator className="my-4" />

            <motion.div variants={fadeIn}>
              <ProductTabs product={product} />
            </motion.div>

            <Separator className="my-6" />

            <motion.div variants={slideUp}>
              <ProductActions
                product={product}
                isInWishlist={isInWishlist}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlist}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          className="mt-16"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h2 className="text-2xl font-bold mb-8" variants={slideUp}>
            Related Products
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
