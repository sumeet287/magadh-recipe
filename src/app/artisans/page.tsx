import { Metadata } from "next";
import { Suspense } from "react";
import ArtisansClient from "@/components/artisans/artisans-client";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Master Artisans of Bihar | Bihar Bazaar",
  description:
    "Meet the skilled artisans preserving Bihar's rich cultural heritage through traditional crafts and art forms",
};

export default function ArtisansPage() {
  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ArtisansClient />
      </Suspense>
    </div>
  );
}
