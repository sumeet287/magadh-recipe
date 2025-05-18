import { StaticImageData } from "next/image";

export type CraftType =
  | "all"
  | "madhubani"
  | "tikuli"
  | "wood"
  | "glass"
  | "bamboo"
  | "sujani"
  | "sikki"
  | "lac"
  | "mango"
  | "lemon"
  | "mixed"
  | "chili";

export interface Artisan {
  id: string;
  name: string;
  slug: string;
  craft: CraftType;
  craftType: CraftType;
  description: string;
  image: string | StaticImageData;
  awards: string[];
  story: string;
  location: string;
  yearsOfExperience: number;
  featuredProducts?: string[];
}
