import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/lib/ui/button/button";

interface FeaturedCollectionProps {
  title: string;
  description: string;
  image: string;
}

export function FeaturedCollection({
  title,
  description,
  image,
}: FeaturedCollectionProps) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
        <div className="space-y-6 text-white">
          <div>
            <h2 className="text-3xl text-[#fff] font-bold">{title}</h2>
            <p className="mt-2 text-white/80 max-w-md font-semibold">
              {description}
            </p>
          </div>
          <Button
            variant="secondary"
            postIcon={<ArrowRight className="h-4 w-4" />}
          >
            Explore Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
