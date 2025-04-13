import { Metadata } from "next";
import { ProductCard } from "@/components/products/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "All Products | Bihar Bazaar",
  description:
    "Browse our collection of authentic Bihari handicrafts and artworks",
};

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Our Products</h1>

        <div className="flex gap-4 mt-4 md:mt-0">
          <Input placeholder="Search products..." className="w-[200px]" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          id="1"
          name="Madhubani Painting - Krishna"
          price={2999}
          images={["/products/madhubani-1.jpg"]}
          category="madhubani"
        />
      </div>
    </main>
  );
}
