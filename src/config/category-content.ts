// Import category images
import madhubaniArt from "@/assets/art/madhubani_art.jpg";
import tikuliArt from "@/assets/art/tikuli_art.jpeg";
import woodArt from "@/assets/art/wood_art.jpeg";
import glassArt from "@/assets/art/glass_art.png";

export const categoryContent = {
  madhubani: {
    title: "Madhubani Art",
    description:
      "Traditional Mithila painting that originated in the Madhubani district of Bihar. Known for its intricate patterns, geometric designs, and nature-inspired motifs.",
    image: madhubaniArt,
    features: [
      "Natural colors and dyes",
      "Geometric patterns",
      "Religious themes",
      "Folk storytelling",
    ],
    gallery: [
      { id: 1, title: "Traditional Scene", image: madhubaniArt },
      { id: 2, title: "Wedding Ceremony", image: madhubaniArt },
      { id: 3, title: "Village Life", image: madhubaniArt },
      { id: 4, title: "Festival Celebration", image: madhubaniArt },
      { id: 5, title: "Nature Motifs", image: madhubaniArt },
    ],
  },
  tikuli: {
    title: "Tikuli Art",
    description:
      "Ancient Bihari craft of decorative art, traditionally created on circular discs. Features intricate designs and patterns painted with precision.",
    image: tikuliArt,
    features: [
      "Detailed miniature work",
      "Vibrant colors",
      "Traditional motifs",
      "Modern interpretations",
    ],
    gallery: [
      { id: 1, title: "Classic Design", image: tikuliArt },
      { id: 2, title: "Modern Pattern", image: tikuliArt },
      { id: 3, title: "Abstract Style", image: tikuliArt },
      { id: 4, title: "Contemporary Fusion", image: tikuliArt },
      { id: 5, title: "Traditional Motifs", image: tikuliArt },
    ],
  },
  wood: {
    title: "Wood Craft",
    description:
      "Traditional wooden artifacts showcasing Bihar's woodworking expertise. Each piece tells a story through intricate carving and design.",
    image: woodArt,
    features: [
      "Hand-carved details",
      "Sustainable wood",
      "Traditional techniques",
      "Functional art",
    ],
    gallery: [
      { id: 1, title: "Carved Box", image: woodArt },
      { id: 2, title: "Decorative Panel", image: woodArt },
      { id: 3, title: "Utility Items", image: woodArt },
      { id: 4, title: "Wall Decor", image: woodArt },
      { id: 5, title: "Furniture Piece", image: woodArt },
    ],
  },
  glass: {
    title: "Glass Art",
    description:
      "Contemporary glass artwork blending traditional Bihar craftsmanship with modern aesthetics. Each piece captures light and color in unique ways.",
    image: glassArt,
    features: [
      "Modern designs",
      "Light play",
      "Colorful patterns",
      "Unique textures",
    ],
    gallery: [
      { id: 1, title: "Modern Vase", image: glassArt },
      { id: 2, title: "Decorative Bowl", image: glassArt },
      { id: 3, title: "Wall Art", image: glassArt },
      { id: 4, title: "Table Centerpiece", image: glassArt },
      { id: 5, title: "Hanging Light", image: glassArt },
    ],
  },
} as const;

export const validCategories = Object.keys(categoryContent);
