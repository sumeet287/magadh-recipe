declare type CraftType = "all" | "madhubani" | "tikuli" | "wood" | "glass";

declare interface Artisan {
  id: number;
  name: string;
  image: string;
  craft: string;
  craftType: CraftType;
  awards: string[];
  location: string;
  description: string;
  slug: string;
}

export { CraftType, Artisan };
