import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Shimmer } from "@/components/ui/shimmer";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square bg-muted">
          <Shimmer />
        </div>
      </CardContent>
      <CardContent className="p-4 space-y-2">
        <div className="relative h-4 w-3/4 bg-muted rounded">
          <Shimmer />
        </div>
        <div className="relative h-3 w-1/2 bg-muted rounded">
          <Shimmer />
        </div>
        <div className="relative h-5 w-1/3 bg-muted rounded">
          <Shimmer />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <div className="relative h-9 w-4/5 bg-muted rounded">
          <Shimmer />
        </div>
        <div className="relative h-9 w-9 bg-muted rounded">
          <Shimmer />
        </div>
      </CardFooter>
    </Card>
  );
}
