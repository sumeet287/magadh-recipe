import { Card, CardContent } from "@/components/ui/card";
import { Shimmer } from "@/components/ui/shimmer";
import { Separator } from "@/components/ui/separator";

export function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Carousel Skeleton */}
        <Card>
          <CardContent className="p-4">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Shimmer className="w-full h-full" />
            </div>
          </CardContent>
        </Card>

        {/* Product Details Skeleton */}
        <div>
          {/* Badges */}
          <div className="flex items-center gap-2 mb-2">
            <Shimmer className="w-24 h-6" />
            <Shimmer className="w-20 h-6" />
          </div>

          {/* Title and Price */}
          <Shimmer className="w-3/4 h-8 mb-2" />
          <Shimmer className="w-1/3 h-7 mb-4" />

          <Separator className="my-4" />

          {/* Tabs Skeleton */}
          <div className="space-y-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <Shimmer key={i} className="w-24 h-10" />
              ))}
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Shimmer key={i} className="w-full h-4" />
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Action Buttons Skeleton */}
          <div className="flex gap-4">
            <Shimmer className="w-32 h-11" />
            <Shimmer className="w-40 h-11" />
            <Shimmer className="w-11 h-11" />
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="mt-16">
        <Shimmer className="w-48 h-8 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Shimmer className="aspect-square mb-4" />
                <Shimmer className="w-3/4 h-5 mb-2" />
                <Shimmer className="w-1/2 h-4 mb-4" />
                <div className="flex gap-2">
                  <Shimmer className="w-3/4 h-9" />
                  <Shimmer className="w-9 h-9" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
