"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/lib/ui/button/button";
import CraftCard, { CraftCardProps } from "./craft-card";
import { Typography } from "@/lib/ui/typography/typography";

const allCrafts: CraftCardProps[] = [
  {
    id: "mango-pickle-1",
    title: "Traditional Mango Pickle - Aam ka Achar",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    description:
      "Handmade mango pickle using age-old Magadh Recipe, bursting with authentic Bihari flavors.",
    price: "₹350",
    category: "Mango",
  },
  {
    id: "lemon-pickle-1",
    title: "Lemon Pickle - Nimbu ka Achar",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    description:
      "Tangy and spicy lemon pickle, sun-cured and handmade in Bihar.",
    price: "₹250",
    category: "Lemon",
  },
  {
    id: "mixed-pickle-1",
    title: "Mixed Vegetable Pickle",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    description:
      "A medley of seasonal vegetables pickled with traditional Bihari spices.",
    price: "₹300",
    category: "Mixed",
  },
  {
    id: "chili-pickle-1",
    title: "Green Chili Pickle - Hari Mirch ka Achar",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    description:
      "Spicy green chili pickle, a Magadh Recipe specialty.",
    price: "₹200",
    category: "Chili",
  },
];

const categories = ["All", "Mango", "Lemon", "Mixed", "Chili"];

const Crafts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCrafts = allCrafts.filter((craft) => {
    const matchesSearch =
      craft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      craft.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || craft.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Typography
              variant="h2"
              weight="bold"
              align="center"
              className="text-bihar-red mb-4"
            >
              Explore <span className="text-bihar-red">Bihar&apos;s</span>{" "}
              Handmade Pickles
            </Typography>
            <Typography
              variant="p"
              color="secondary"
              align="center"
              className="max-w-2xl mx-auto"
            >
              Discover the finest collection of traditional pickles, each jar
              telling a story of cultural heritage and artisanal excellence.
            </Typography>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search pickles..."
                className="w-full py-2 pl-10 pr-4 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bihar-red focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
                size={18}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={
                    activeCategory === category
                      ? "bg-bihar-red hover:bg-bihar-red/90"
                      : ""
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {filteredCrafts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCrafts.map((craft) => (
                <CraftCard key={craft.id} {...craft} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Typography variant="p" className="text-xl text-stone-600">
                No pickles found matching your search.
              </Typography>
              <Button
                variant="outline"
                className="mt-4 border-bihar-red text-bihar-red hover:bg-bihar-red/10"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Crafts;
