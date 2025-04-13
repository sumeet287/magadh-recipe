import { Artisan, CraftType } from "@/types/artisan";
import SitaDevi from "@/assets/artist/Smt_Sita_Devi.png";
import DulariDevi from "@/assets/artist/Smt_Dulari_Devi.jpg";
import KalpanaDevi from "@/assets/artist/Smt_Kalpana_Devi.png";
import ManishaJha from "@/assets/artist/Smt_Manisha_Devi.png";

export const CRAFT_FILTERS: { label: string; value: CraftType }[] = [
  { label: "All Crafts", value: "all" },
  { label: "Madhubani Art", value: "madhubani" },
  { label: "Tikuli Art", value: "tikuli" },
  { label: "Wood Craft", value: "wood" },
  { label: "Glass Art", value: "glass" },
];

export const artisans: Artisan[] = [
  {
    id: "1",
    name: "Smt. Sita Devi",
    image: SitaDevi,
    craft: "madhubani",
    craftType: "madhubani",
    awards: ["Padma Shri", "Bihar Ratna Samman"],
    location: "Madhubani, Bihar",
    description:
      "One of the most well-known Madhubani artists from India, known for her intricate designs and vibrant colors.",
    slug: "sita-devi",
    story: "Started painting at age 12, trained under her grandmother",
    yearsOfExperience: 45,
  },
  {
    id: "2",
    name: "Smt. Dulari Devi",
    image: DulariDevi,
    craft: "madhubani",
    craftType: "madhubani",
    awards: ["National Award", "State Award"],
    location: "Madhubani, Bihar",
    description:
      "Renowned for her unique style of Madhubani painting, blending traditional motifs with contemporary themes.",
    slug: "dulari-devi",
    story: "Self-taught artist who revolutionized Madhubani art",
    yearsOfExperience: 35,
  },
  {
    id: "3",
    name: "Smt. Kalpana Devi",
    image: KalpanaDevi,
    craft: "glass",
    craftType: "glass",
    awards: ["State Award", "Craft Excellence Award"],
    location: "Gaya, Bihar",
    description:
      "Master artisan specializing in traditional glass art and bangle making, preserving ancient techniques.",
    slug: "kalpana-devi",
    story:
      "Learned glass art from her father, continuing a 3-generation tradition",
    yearsOfExperience: 25,
  },
  {
    id: "4",
    name: "Smt. Manisha Jha",
    image: ManishaJha,
    craft: "tikuli",
    craftType: "tikuli",
    awards: ["National Award", "Craft Excellence Award"],
    location: "Patna, Bihar",
    description:
      "Expert in Tikuli art, creating intricate designs on glass with traditional motifs and patterns.",
    slug: "manisha-jha",
    story: "Revived the dying art of Tikuli through modern interpretations",
    yearsOfExperience: 15,
  },
];
