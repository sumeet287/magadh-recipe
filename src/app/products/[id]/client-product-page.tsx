"use client";

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
import { Heart, Share2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

export function ClientProductPage({ id }: { id: string }) {
  const { addToCart } = useCart();

  // Mock product data - replace with actual data fetching
  const product = {
    id,
    name: "Madhubani Painting - Krishna",
    description:
      "A beautiful hand-painted Madhubani artwork depicting Lord Krishna",
    price: 2999,
    category: "madhubani" as const,
    images: [
      `/products/${id}-1.jpg`,
      `/products/${id}-2.jpg`,
      `/products/${id}-3.jpg`,
    ],
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Carousel */}
        <Card>
          <CardContent className="p-4">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
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
            <Badge>In Stock</Badge>
            <Badge variant="outline">Madhubani Art</Badge>
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
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <dl className="grid grid-cols-1 gap-2">
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Material</dt>
                  <dd className="font-medium">Handmade Paper</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Dimensions</dt>
                  <dd className="font-medium">30 x 40 cm</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Weight</dt>
                  <dd className="font-medium">250g</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Artisan</dt>
                  <dd className="font-medium">Rajesh Kumar</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="font-medium">Madhubani, Bihar</dd>
                </div>
              </dl>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4">
              <div className="space-y-4">
                <p>Free shipping on all orders above ₹5,000</p>
                <p>Estimated delivery: 5-7 business days</p>
                <p>Returns accepted within 7 days of delivery</p>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex gap-4">
            <Button size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
