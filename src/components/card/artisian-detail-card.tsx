import Image from "next/image";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ArtisanDetailCardProps {
  name: string;
  craft: string;
  image: string;
  location: string;
  description: string;
  awards: string[];
}

export function ArtisanDetailCard({
  name,
  craft,
  image,
  location,
  description,
  awards,
}: ArtisanDetailCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image || "/placeholder.svg?height=300&width=400"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-wrap gap-1 max-w-[80%] justify-end">
          {awards.map((award, index) => (
            <Badge
              key={index}
              className="bg-orange-600 text-xs whitespace-nowrap"
            >
              {award}
            </Badge>
          ))}
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-xl">{name}</h3>
        <p className="text-orange-600 font-medium">{craft} Art</p>
        <div className="flex items-center gap-1 text-gray-600 mt-1 mb-3">
          <MapPin className="h-3 w-3" />
          <span className="text-sm">{location}</span>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-orange-600 text-orange-600 hover:bg-orange-50 flex-1"
        >
          View Profile
        </Button>
        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 flex-1">
          See Crafts
        </Button>
      </CardFooter>
    </Card>
  );
}
