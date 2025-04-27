import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface CraftCardProps {
  title: string;
  price: number;
  image: string;
  artist: string;
  category: string;
}

export function CraftCard({
  title,
  price,
  image,
  artist,
  category,
}: CraftCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="inline-block bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-500">By {artist}</p>
          <p className="font-bold text-orange-600">₹{price.toLocaleString()}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2 bg-orange-600 hover:bg-orange-700">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
