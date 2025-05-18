import { Artisan, CraftType } from "@/types/artisan";
import SitaDevi from "@/assets/artist/Smt_Sita_Devi.png";
import DulariDevi from "@/assets/artist/Smt_Dulari_Devi.jpg";
import KalpanaDevi from "@/assets/artist/Smt_Kalpana_Devi.png";
import ManishaJha from "@/assets/artist/Smt_Manisha_Devi.png";

export const CRAFT_FILTERS: { label: string; value: CraftType }[] = [
  { label: "All Pickles", value: "all" },
  { label: "Mango Pickle", value: "mango" },
  { label: "Lemon Pickle", value: "lemon" },
  { label: "Mixed Pickle", value: "mixed" },
  { label: "Chili Pickle", value: "chili" },
];

export const artisans: Artisan[] = [
  {
    id: "1",
    name: "Smt. Sunita Devi",
    image: SitaDevi, // Replace with pickle artisan image if available
    craft: "mango",
    craftType: "mango",
    awards: ["Pickle Queen of Bihar", "Magadh Taste Award"],
    location: "Patna, Bihar",
    description:
      "Renowned for her traditional mango pickle recipes passed down generations.",
    slug: "sunita-devi",
    story: "Started making pickles at age 10, using her grandmother's Magadh Recipe.",
    yearsOfExperience: 30,
  },
  {
    id: "2",
    name: "Smt. Rekha Kumari",
    image: DulariDevi, // Replace with pickle artisan image if available
    craft: "lemon",
    craftType: "lemon",
    awards: ["State Pickle Award"],
    location: "Gaya, Bihar",
    description:
      "Expert in tangy lemon pickles, known for unique sun-curing techniques.",
    slug: "rekha-kumari",
    story: "Inspired by her mother, she crafts pickles with authentic Bihari flavors.",
    yearsOfExperience: 20,
  },
  {
    id: "3",
    name: "Smt. Asha Singh",
    image: KalpanaDevi, // Replace with pickle artisan image if available
    craft: "mixed",
    craftType: "mixed",
    awards: ["Magadh Recipe Excellence Award"],
    location: "Nalanda, Bihar",
    description:
      "Specializes in mixed vegetable pickles, blending seasonal produce with traditional spices.",
    slug: "asha-singh",
    story: "Continues a family tradition of pickle making for over 3 generations.",
    yearsOfExperience: 25,
  },
  {
    id: "4",
    name: "Smt. Manju Devi",
    image: ManishaJha, // Replace with pickle artisan image if available
    craft: "chili",
    craftType: "chili",
    awards: ["Spicy Pickle Award"],
    location: "Bhagalpur, Bihar",
    description:
      "Famous for her spicy green chili pickles, a favorite in local markets.",
    slug: "manju-devi",
    story: "Revived traditional chili pickle recipes with a modern twist.",
    yearsOfExperience: 18,
  },
];
