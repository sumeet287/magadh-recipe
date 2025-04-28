"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CraftCard, { CraftCardProps } from "./craft-card";

const allCrafts: CraftCardProps[] = [
  {
    id: "madhubani-1",
    title: "Traditional Madhubani Painting - Krishna & Radha",
    image:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Hand-painted authentic Madhubani painting depicting Krishna and Radha, made by master artisans of Bihar.",
    price: "₹3,500",
    category: "Madhubani",
  },
  {
    id: "madhubani-2",
    title: "Madhubani Wall Art - Tree of Life",
    image:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Beautiful Tree of Life Madhubani painting on handmade paper, showcasing the rich cultural heritage of Bihar.",
    price: "₹2,800",
    category: "Madhubani",
  },
  {
    id: "tikuli-1",
    title: "Handcrafted Tikuli Art Wall Piece",
    image:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Beautifully detailed Tikuli art piece that showcases the intricate craftsmanship of Bihar's artisans.",
    price: "₹2,200",
    category: "Tikuli",
  },
  {
    id: "tikuli-2",
    title: "Tikuli Art Jewelry Box",
    image:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Handcrafted wooden jewelry box adorned with traditional Tikuli art, perfect for storing precious items.",
    price: "₹1,950",
    category: "Tikuli",
  },
  {
    id: "glass-1",
    title: "Bihar Glass Art Decorative Bowl",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Glass art bowl with traditional Bihari motifs, perfect for home decor or as a special gift.",
    price: "₹1,800",
    category: "Glass Art",
  },
  {
    id: "glass-2",
    title: "Colorful Glass Wind Chimes",
    image:
      "https://images.unsplash.com/photo-1596395463910-4a5372e61f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Handmade colorful glass wind chimes that create melodious sounds and add a touch of Bihar to your home.",
    price: "₹1,200",
    category: "Glass Art",
  },
  {
    id: "bamboo-1",
    title: "Eco-friendly Bamboo Home Decor Set",
    image:
      "https://images.unsplash.com/photo-1596395463910-4a5372e61f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Sustainable bamboo craft set including basket, table mats, and decorative items, handmade in Bihar.",
    price: "₹1,200",
    category: "Bamboo",
  },
  {
    id: "bamboo-2",
    title: "Bamboo Kitchen Utilities",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Set of bamboo kitchen utilities including spatulas, serving spoons, and cutting boards from rural Bihar.",
    price: "₹950",
    category: "Bamboo",
  },
];

const categories = ["All", "Madhubani", "Tikuli", "Glass Art", "Bamboo"];

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
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-stone-800 mb-4">
              Explore <span className="text-bihar-red">Bihar&apos;s</span>{" "}
              Handicrafts
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover the finest collection of traditional crafts, each piece
              telling a story of cultural heritage and artisanal excellence.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search crafts..."
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
              <p className="text-xl text-stone-600">
                No crafts found matching your search.
              </p>
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
