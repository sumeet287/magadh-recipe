import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  image: string;
  count: number;
}

export function CategoryCard({ title, image, count }: CategoryCardProps) {
  return (
    <Link href="#">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-white/80">{count} products</p>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
