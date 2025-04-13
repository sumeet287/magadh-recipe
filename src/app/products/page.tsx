import { ProductsClient } from "@/components/products/products-client";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
