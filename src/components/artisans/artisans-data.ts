import { Artisan, CraftType } from "@/types/artisan";

export const CRAFT_FILTERS: { label: string; value: CraftType }[] = [
  { label: "All Crafts", value: "all" },
  { label: "Madhubani Art", value: "madhubani" },
  { label: "Tikuli Art", value: "tikuli" },
  { label: "Wood Craft", value: "wood" },
  { label: "Glass Art", value: "glass" },
];

export const artisans: Artisan[] = [
  {
    id: 1,
    name: "Smt. Sita Devi",
    image: "/artists/sita-devi.jpg",
    craft: "Madhubani Art",
    craftType: "madhubani",
    awards: ["Padma Shri", "Bihar Ratna Samman"],
    location: "Madhubani, Bihar",
    description: "One of the most well-known Madhubani artists from India.",
    slug: "sita-devi",
  },
  // Add more artisans...
];
