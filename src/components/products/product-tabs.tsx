"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/lib/ui/button/button";
import type { Product } from "@/types/product";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="pt-4">
        <div className="space-y-4">
          <p>{product.description || "No description available."}</p>
          {product.materials && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Materials Used:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {product.materials.map((material: string) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="details" className="pt-4">
        <div className="space-y-4">
          {product.dimensions && (
            <div>
              <h3 className="font-medium">Dimensions:</h3>
              <p>
                {product.dimensions.length} × {product.dimensions.width} ×{" "}
                {product.dimensions.height} {product.dimensions.unit}
              </p>
            </div>
          )}
          {product.weight && (
            <div>
              <h3 className="font-medium">Weight:</h3>
              <p>
                {product.weight.value} {product.weight.unit}
              </p>
            </div>
          )}
          {product.artisanId && (
            <div>
              <h3 className="font-medium">Artisan:</h3>
              <Button variant="link" className="p-0 h-auto font-medium">
                View Artisan Profile
              </Button>
            </div>
          )}
          <div>
            <h3 className="font-medium">Category:</h3>
            <p className="capitalize">
              {product.category.label || product.category.name}
            </p>
          </div>
          {product.tags && (
            <div>
              <h3 className="font-medium">Tags:</h3>
              <div className="flex gap-1 flex-wrap mt-2">
                {product.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Free Shipping</Badge>
            <span>on orders above ₹5,000</span>
          </div>
          <div>
            <p>
              <span className="font-medium">Standard Delivery:</span> 3-5
              business days
            </p>
            <p>
              <span className="font-medium">Express Delivery:</span> 1-2
              business days (additional charges apply)
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Delivery Information:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
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
  );
}
