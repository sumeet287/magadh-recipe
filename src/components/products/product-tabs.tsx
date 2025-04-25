"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description" className=" cursor-pointer">
          Description
        </TabsTrigger>
        <TabsTrigger value="details" className=" cursor-pointer">
          Details
        </TabsTrigger>
        <TabsTrigger value="shipping" className=" cursor-pointer">
          Shipping
        </TabsTrigger>
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
            <dd className="font-medium capitalize">
              {product.category.label || product.category.name}
            </dd>
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
  );
}
