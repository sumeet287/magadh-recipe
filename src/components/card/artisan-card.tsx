import Image from "next/image";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ArtisanCardProps {
  name: string;
  craft: string;
  image: string;
  location: string;
  experience: number;
}

export function ArtisanCard({
  name,
  craft,
  image,
  location,
  experience,
}: ArtisanCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4 text-center">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-orange-600">{craft}</p>
        <div className="flex items-center justify-center gap-1 mt-1 text-sm text-gray-500">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {experience} years of experience
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
