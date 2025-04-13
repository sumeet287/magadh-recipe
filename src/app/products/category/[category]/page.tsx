import { Metadata } from "next";
import { notFound } from "next/navigation";
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
import type { ProductCategory } from "@/types/product";

const validCategories: ProductCategory[] = [
  "madhubani",
  "tikuli",
  "wood",
  "glass",
  "bamboo",
  "sujani",
  "sikki",
  "lac",
];

type Props = Readonly<{
  params: { category: string };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params;
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${title} Products | Bihar Bazaar`,
    description: `Shop authentic ${title} crafts and artwork from Bihar's skilled artisans`,
  };
}

export function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

export default function CategoryProductsPage({ params }: Props) {
  const { category } = params;

  if (!validCategories.includes(category as ProductCategory)) {
    notFound();
  }

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title} Products</h1>

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
        {/* Example products - will be dynamic in real implementation */}
        <ProductCard
          id="1"
          name={`${title} Art - Sample 1`}
          price={2999}
          images={[`/products/${category}-1.jpg`]}
          category={category as ProductCategory}
        />
        <ProductCard
          id="2"
          name={`${title} Art - Sample 2`}
          price={3999}
          images={[`/products/${category}-2.jpg`]}
          category={category as ProductCategory}
        />
      </div>
    </main>
  );
}
