import { ProductsClient } from "@/components/products/products-client";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsClient />
      </Suspense>
    </>
  );
}
