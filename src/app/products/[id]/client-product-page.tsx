"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share2, Facebook, Twitter, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Product } from "@/types/product";

export function ClientProductPage({ id }: { id: string }) {
  const { addToCart, addToWishlist, wishlist, removeFromWishlist } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const product = products.find((p) => p.id === id) as Product | undefined;
  const isInWishlist = wishlist.some((item) => item.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

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

  const handleShare = async (platform: "facebook" | "twitter" | "whatsapp") => {
    const url = window.location.href;
    const text = `Check out this amazing ${product.name} on Bihar Bazaar!`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${text} ${url}`, "_blank");
        break;
    }
  };

  if (!isClient) {
    return null; // Prevent hydration errors
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Carousel */}
        <Card>
          <CardContent className="p-4">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image: string, index: number) => (
                  <CarouselItem key={`${id}-image-${index + 1}`}>
                    <div className="relative aspect-square">
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>

        {/* Product Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </Badge>
            {product.inStock ? (
              <Badge>In Stock</Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <Separator className="my-4" />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="prose mt-4">
              <p>{product.description || "No description available."}</p>
              {product.materials && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Materials Used:</h4>
                  <ul>
                    {product.materials.map((material: string) => (
                      <li key={material}>{material}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <dl className="grid grid-cols-1 gap-2">
                {product.dimensions && (
                  <div className="flex justify-between py-2">
                    <dt className="text-muted-foreground">Dimensions</dt>
                    <dd className="font-medium">
                      {product.dimensions.length} × {product.dimensions.width} ×{" "}
                      {product.dimensions.height} {product.dimensions.unit}
                    </dd>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between py-2">
                    <dt className="text-muted-foreground">Weight</dt>
                    <dd className="font-medium">
                      {product.weight.value} {product.weight.unit}
                    </dd>
                  </div>
                )}
                {product.artisanId && (
                  <div className="flex justify-between py-2">
                    <dt className="text-muted-foreground">Artisan</dt>
                    <dd className="font-medium">
                      <Button variant="link" className="p-0 h-auto font-medium">
                        View Artisan Profile
                      </Button>
                    </dd>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium capitalize">{product.category}</dd>
                </div>
                {product.tags && (
                  <div className="flex justify-between py-2">
                    <dt className="text-muted-foreground">Tags</dt>
                    <dd className="font-medium">
                      <div className="flex gap-1 flex-wrap justify-end">
                        {product.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
              </dl>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Free Shipping</Badge>
                  <span>on orders above ₹5,000</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Delivery Information:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Estimated delivery: 5-7 business days</li>
                    <li>Secure packaging for safe delivery</li>
                    <li>Track your order with real-time updates</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Return Policy:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>7 days return policy</li>
                    <li>Easy return process</li>
                    <li>Full refund on damaged items</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWishlist}
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
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
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
        </div>
      )}
    </main>
  );
}
